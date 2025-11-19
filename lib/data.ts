import 'server-only';
import { Article, JBWIndex, Issue, VolumeData } from './types';
import { readFile } from 'fs/promises';
import path from 'path';
import { getYearFromVolume, getSeason } from './utils';

export { getYearFromVolume } from './utils';

let cachedIndex: JBWIndex | null = null;

export async function getJBWIndex(): Promise<JBWIndex> {
  if (cachedIndex) {
    return cachedIndex;
  }

  const filePath = path.join(process.cwd(), 'public', 'jbw-index.json');
  const fileContent = await readFile(filePath, 'utf-8');
  cachedIndex = JSON.parse(fileContent);
  return cachedIndex!;
}

export async function getAllArticles(): Promise<Article[]> {
  const index = await getJBWIndex();
  return index.articles;
}

export async function getArticlesByVolume(volume: number): Promise<Article[]> {
  const articles = await getAllArticles();
  return articles.filter(article => article.volume === volume);
}

export async function getArticlesByIssue(volume: number, issue: number): Promise<Article[]> {
  const articles = await getAllArticles();
  return articles.filter(article =>
    article.volume === volume && article.issue === issue
  );
}

export async function searchArticles(query: string): Promise<Article[]> {
  const articles = await getAllArticles();
  const lowerQuery = query.toLowerCase();

  return articles.filter(article => {
    const titleMatch = article.title.toLowerCase().includes(lowerQuery);
    const authorMatch = article.authors.some(author =>
      author.toLowerCase().includes(lowerQuery)
    );
    return titleMatch || authorMatch;
  });
}

export async function getLatestIssue(): Promise<Issue | null> {
  const articles = await getAllArticles();
  if (articles.length === 0) return null;

  // Find the latest volume and issue
  const latestArticle = articles.reduce((latest, current) => {
    if (current.volume > latest.volume) return current;
    if (current.volume === latest.volume && current.issue > latest.issue) return current;
    return latest;
  });

  const issueArticles = await getArticlesByIssue(latestArticle.volume, latestArticle.issue);

  return {
    volume: latestArticle.volume,
    issue: latestArticle.issue,
    year: getYearFromVolume(latestArticle.volume),
    season: getSeason(latestArticle.issue),
    articles: issueArticles
  };
}

export async function getAllIssues(): Promise<Issue[]> {
  const articles = await getAllArticles();
  const issueMap = new Map<string, Article[]>();

  articles.forEach(article => {
    const key = `v${article.volume}n${article.issue}`;
    if (!issueMap.has(key)) {
      issueMap.set(key, []);
    }
    issueMap.get(key)!.push(article);
  });

  const issues: Issue[] = [];
  issueMap.forEach((articles, key) => {
    const volume = articles[0].volume;
    const issue = articles[0].issue;
    issues.push({
      volume,
      issue,
      year: getYearFromVolume(volume),
      season: getSeason(issue),
      articles
    });
  });

  // Sort by volume and issue descending
  return issues.sort((a, b) => {
    if (b.volume !== a.volume) return b.volume - a.volume;
    return b.issue - a.issue;
  });
}

export async function getAllVolumes(): Promise<VolumeData[]> {
  const issues = await getAllIssues();
  const volumeMap = new Map<number, Issue[]>();

  issues.forEach(issue => {
    if (!volumeMap.has(issue.volume)) {
      volumeMap.set(issue.volume, []);
    }
    volumeMap.get(issue.volume)!.push(issue);
  });

  const volumes: VolumeData[] = [];
  volumeMap.forEach((issues, volume) => {
    const totalArticles = issues.reduce((sum, issue) => sum + issue.articles.length, 0);
    volumes.push({
      volume,
      issues,
      totalArticles
    });
  });

  return volumes.sort((a, b) => b.volume - a.volume);
}

export async function getAuthorIndex(): Promise<Map<string, Article[]>> {
  const articles = await getAllArticles();
  const authorMap = new Map<string, Article[]>();

  articles.forEach(article => {
    // Check if article has authors with only page numbers but PDF URL contains "shaughnessy"
    const hasOnlyPageNumbers = article.authors.length > 0 &&
      article.authors.every(author => /^\(pp\.\s*\d+[-–]\s*\d+\)$/i.test(author.trim()));
    const isShaughnessyArticle = article.pdf_url.toLowerCase().includes('shaughnessy');

    let authorsToProcess = article.authors;

    // If article has only page numbers but is a Shaughnessy article, attribute it to her
    if (hasOnlyPageNumbers && isShaughnessyArticle) {
      authorsToProcess = ['Mina P. Shaughnessy'];
    }

    authorsToProcess.forEach(author => {
      const cleanAuthor = cleanAuthorName(author);
      if (cleanAuthor) {
        if (!authorMap.has(cleanAuthor)) {
          authorMap.set(cleanAuthor, []);
        }

        // Check for duplicate articles (same title, volume, issue)
        const existingArticles = authorMap.get(cleanAuthor)!;
        const isDuplicate = existingArticles.some(existing =>
          existing.title === article.title &&
          existing.volume === article.volume &&
          existing.issue === article.issue
        );

        if (!isDuplicate) {
          authorMap.get(cleanAuthor)!.push(article);
        }
      }
    });
  });

  return new Map([...authorMap.entries()].sort());
}

function cleanAuthorName(author: string): string {
  // Remove DOI, page numbers, and other metadata from author names
  let cleaned = author
    .split('\n')[0]
    .replace(/DOI:.*$/i, '')
    .replace(/^by\s+/i, '')  // Remove leading "by"
    .trim();

  // If the author is ONLY page numbers (e.g., "(pp. 91-97)"), return empty string
  if (/^\(pp\.\s*\d+[-–]\s*\d+\)$/i.test(cleaned)) {
    return '';
  }

  // Remove page numbers from the end of author names (e.g., "Mina P. Shaughnessy (pp. 1-3)")
  cleaned = cleaned.replace(/\s*\(pp\.\s*\d+[-–]\s*\d+\)\s*$/i, '').trim();

  return cleaned;
}


export function getArticlePDFPath(article: Article): string {
  // Use WAC Clearinghouse URLs directly
  return article.pdf_url;
}

export async function getUniqueAuthorCount(): Promise<number> {
  const authorMap = await getAuthorIndex();
  return authorMap.size;
}

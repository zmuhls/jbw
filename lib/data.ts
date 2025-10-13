import { Article, JBWIndex, Issue, VolumeData } from './types';

let cachedIndex: JBWIndex | null = null;

export async function getJBWIndex(): Promise<JBWIndex> {
  if (cachedIndex) {
    return cachedIndex;
  }

  const basePath = process.env.NODE_ENV === 'production' ? '/jbw' : '';
  const response = await fetch(`${basePath}/jbw-index.json`);
  cachedIndex = await response.json();
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
    article.authors.forEach(author => {
      const cleanAuthor = cleanAuthorName(author);
      if (cleanAuthor) {
        if (!authorMap.has(cleanAuthor)) {
          authorMap.set(cleanAuthor, []);
        }
        authorMap.get(cleanAuthor)!.push(article);
      }
    });
  });

  return new Map([...authorMap.entries()].sort());
}

function cleanAuthorName(author: string): string {
  // Remove DOI and other metadata from author names
  const cleaned = author
    .split('\n')[0]
    .replace(/DOI:.*$/i, '')
    .trim();
  return cleaned;
}

function getYearFromVolume(volume: number): number {
  // Volume-to-year mapping (some years had no publications)
  // Volume 1 = 1975, Volume 43 = 2024
  // Missing years: 2014-2021 (volumes 34-40 have gaps)
  const volumeYearMap: { [key: number]: number } = {
    1: 1975, 2: 1976, 3: 1977, 4: 1978, 5: 1979,
    6: 1980, 7: 1981, 8: 1982, 9: 1983, 10: 1984,
    11: 1985, 12: 1986, 13: 1987, 14: 1988, 15: 1989,
    16: 1990, 17: 1991, 18: 1992, 19: 1993, 20: 1994,
    21: 1995, 22: 1996, 23: 1997, 24: 1998, 25: 1999,
    26: 2000, 27: 2001, 28: 2002, 29: 2003, 30: 2004,
    31: 2005, 32: 2006, 33: 2007, 34: 2008, 35: 2009,
    36: 2010, 37: 2011, 38: 2012, 39: 2013, 40: 2014,
    41: 2022, 42: 2023, 43: 2024
  };

  return volumeYearMap[volume] || (1974 + volume);
}

function getSeason(issue: number): string {
  return issue === 1 ? 'Spring' : 'Fall';
}

export function getArticlePDFPath(article: Article): string {
  // Use WAC Clearinghouse URLs directly
  return article.pdf_url;
}

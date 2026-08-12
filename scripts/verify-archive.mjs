import { readFile } from 'node:fs/promises';

const index = JSON.parse(
  await readFile(new URL('../public/jbw-index.json', import.meta.url), 'utf8'),
);

const normalizeTitle = (title) =>
  title
    .normalize('NFKC')
    .replace(/[’‘]/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

const isEditorial = (title) => {
  const normalized = normalizeTitle(title);
  return (
    /^(?:editor's|editors') column(?::|$)/.test(normalized) ||
    normalized === 'editorial board' ||
    normalized === 'view the members'
  );
};

const isArticle = (record) => {
  const normalizedTitle = normalizeTitle(record.title);
  const isAncillary =
    isEditorial(record.title) ||
    normalizedTitle === 'news and announcements' ||
    normalizedTitle.startsWith('cumulative index');

  return (
    !isAncillary &&
    (Boolean(record.doi) || (record.volume === 44 && record.issue === 2))
  );
};

const canonicalNames = {
  "Sarah D'eloia": "Sarah D'Eloia",
  'Victor Villanueva, Jr.': 'Victor Villanueva',
  'Donald Mccrary': 'Donald McCrary',
  'Irvin Hashimoto': 'Irvin Y. Hashimoto',
  'Terence Collins': 'Terence G. Collins',
  'Rebecca Mlynarczyk': 'Rebecca Williams Mlynarczyk',
  'Hope A. Parisi': 'Hope Parisi',
  'Linda Stine': 'Linda J. Stine',
  'Emily Suh': 'Emily K. Suh',
  'Peter Adams': 'Peter Dow Adams',
  'Rexford Brown': 'Rexford G. Brown',
  'Andrea L. Lunsford': 'Andrea A. Lunsford',
  'E. D. Hirsch': 'E. D. Hirsch, Jr.',
  'E.D. Hirsch, Jr.': 'E. D. Hirsch, Jr.',
  'Tom Reynolds': 'Thomas Reynolds',
  'Mary Hurley Moran': 'Molly Hurley Moran',
  'Wilma Wolcott': 'Willa Wolcott',
  'Kathryn A. Fitzgerald': 'Kathryn R. Fitzgerald',
};

const cleanAuthor = (author) => {
  const cleaned = author
    .split('\n')[0]
    .replace(/DOI:.*$/i, '')
    .replace(/^by\s+/i, '')
    .replace(/\s*\(pp?\.\s*\d+.*$/i, '')
    .trim();

  return canonicalNames[cleaned] ?? cleaned;
};

const records = index.articles;
const articles = records.filter(isArticle);
const volumes = new Set(records.map(({ volume }) => volume));
const issues = new Set(records.map(({ issue, volume }) => `${volume}.${issue}`));
const authors = new Set(
  articles.flatMap(({ authors: names }) => names.map(cleanAuthor)).filter(Boolean),
);
const duplicateKeys = records
  .map(({ issue, title, volume }) => `${volume}.${issue}|${normalizeTitle(title)}`)
  .filter((key, position, keys) => keys.indexOf(key) !== position);
const authorlessArticles = articles.filter(({ authors: names }) =>
  names.map(cleanAuthor).every((name) => !name),
);
const combinedAuthorFields = articles.flatMap((article) =>
  article.authors
    .filter((author) => /,\s*$/.test(author))
    .map((author) => ({ article: article.title, author })),
);

const calculated = {
  volumes: volumes.size,
  issues: issues.size,
  records: records.length,
  articles: articles.length,
  authors: authors.size,
  years: 2025 - 1975,
};
const expected = {
  volumes: index.metadata.total_volumes,
  issues: index.metadata.total_issues,
  records: index.metadata.total_records,
  articles: index.metadata.total_articles,
  authors: index.metadata.total_authors,
  years: 50,
};

const failures = [];
for (const key of Object.keys(expected)) {
  if (calculated[key] !== expected[key]) {
    failures.push(`${key}: calculated ${calculated[key]}, expected ${expected[key]}`);
  }
}
if (duplicateKeys.length) failures.push(`${duplicateKeys.length} duplicate record keys`);
if (authorlessArticles.length) {
  failures.push(`${authorlessArticles.length} article records lack author attribution`);
}
if (combinedAuthorFields.length) {
  failures.push(`${combinedAuthorFields.length} article records combine multiple authors`);
}

console.log(
  JSON.stringify(
    { calculated, expected, duplicateKeys, authorlessArticles, combinedAuthorFields },
    null,
    2,
  ),
);

if (failures.length) {
  console.error(`Archive verification failed:\n- ${failures.join('\n- ')}`);
  process.exit(1);
}

console.log('Archive verification passed.');

'use client';

import { useState, useEffect } from 'react';
import { Users, FileText } from 'lucide-react';
import { getYearFromVolume } from '@/lib/utils';
import type { Article, JBWIndex } from '@/lib/types';

function cleanAuthorName(author: string): string {
  let cleaned = author
    .split('\n')[0]
    .replace(/DOI:.*$/i, '')
    .replace(/^by\s+/i, '')
    .trim();

  if (/^\(pp\.\s*\d+[-–]\s*\d+\)$/i.test(cleaned)) {
    return '';
  }

  cleaned = cleaned.replace(/\s*\(pp\.\s*\d+[-–]\s*\d+\)\s*$/i, '').trim();
  return cleaned;
}

function buildAuthorIndex(articles: Article[]): Map<string, Article[]> {
  const authorMap = new Map<string, Article[]>();

  articles.forEach(article => {
    const hasOnlyPageNumbers = article.authors.length > 0 &&
      article.authors.every(author => /^\(pp\.\s*\d+[-–]\s*\d+\)$/i.test(author.trim()));
    const isShaughnessyArticle = article.pdf_url.toLowerCase().includes('shaughnessy');

    let authorsToProcess = article.authors;

    if (hasOnlyPageNumbers && isShaughnessyArticle) {
      authorsToProcess = ['Mina P. Shaughnessy'];
    }

    authorsToProcess.forEach(author => {
      const cleanAuthor = cleanAuthorName(author);
      if (cleanAuthor) {
        if (!authorMap.has(cleanAuthor)) {
          authorMap.set(cleanAuthor, []);
        }

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

export default function AuthorsPage() {
  const [authorMap, setAuthorMap] = useState<Map<string, Article[]>>(new Map());
  const [loading, setLoading] = useState(true);
  const [selectedLetter, setSelectedLetter] = useState<string>('');

  useEffect(() => {
    fetch('/jbw/jbw-index.json')
      .then((res) => res.json())
      .then((data: JBWIndex) => {
        setAuthorMap(buildAuthorIndex(data.articles));
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading authors...</p>
        </div>
      </div>
    );
  }

  const authors = Array.from(authorMap.entries());
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const authorsByLetter = new Map<string, Array<[string, Article[]]>>();
  authors.forEach(([name, articles]) => {
    const firstLetter = name[0]?.toUpperCase() || '#';
    if (!authorsByLetter.has(firstLetter)) {
      authorsByLetter.set(firstLetter, []);
    }
    authorsByLetter.get(firstLetter)!.push([name, articles]);
  });

  const filteredAuthors = selectedLetter
    ? authorsByLetter.get(selectedLetter) || []
    : authors;

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Author Index</h1>
          <p className="text-xl text-gray-600">
            Browse works by {authors.length}+ authors who have published in JFW
          </p>
        </div>

        {/* Alphabet Filter */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setSelectedLetter('')}
              className={`px-3 py-1 rounded ${
                !selectedLetter
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } transition-colors`}
            >
              All
            </button>
            {alphabet.map((letter) => {
              const hasAuthors = authorsByLetter.has(letter);
              return (
                <button
                  key={letter}
                  onClick={() => setSelectedLetter(letter)}
                  disabled={!hasAuthors}
                  className={`px-3 py-1 rounded ${
                    selectedLetter === letter
                      ? 'bg-blue-600 text-white'
                      : hasAuthors
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : 'bg-gray-50 text-gray-300 cursor-not-allowed'
                  } transition-colors`}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Authors List */}
        <div className="space-y-4">
          {filteredAuthors.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No authors found for this letter</p>
            </div>
          ) : (
            filteredAuthors.map(([name, articles]) => (
              <div key={name} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {articles.length} publication{articles.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {articles.map((article, idx) => (
                    <div key={idx} className="flex items-start space-x-3 pl-4 border-l-2 border-blue-600">
                      <FileText className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <a
                          href={article.pdf_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 hover:underline block"
                        >
                          {article.title}
                        </a>
                        <p className="text-sm text-gray-600 mt-1">
                          Volume {article.volume}, Issue {article.issue} ({getYearFromVolume(article.volume)})
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

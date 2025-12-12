'use client';

import { useState, useEffect } from 'react';
import { Search as SearchIcon, FileText, X } from 'lucide-react';
import type { Article, JBWIndex } from '@/lib/types';
import { isEditorialContent, renderMarkdownItalics } from '@/lib/utils';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Article[]>([]);
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [volumeFilter, setVolumeFilter] = useState<string>('');
  const [yearFilter, setYearFilter] = useState<string>('');

  useEffect(() => {
    fetch('/jbw/jbw-index.json')
      .then((res) => res.json())
      .then((data: JBWIndex) => setAllArticles(data.articles));
  }, []);

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    const lowerQuery = searchQuery.toLowerCase();
    const searchResults = allArticles.filter(article => {
      const titleMatch = article.title.toLowerCase().includes(lowerQuery);
      const authorMatch = article.authors.some(author =>
        author.toLowerCase().includes(lowerQuery)
      );
      const keywordMatch = article.keywords?.some(keyword =>
        keyword.toLowerCase().includes(lowerQuery)
      ) ?? false;
      return titleMatch || authorMatch || keywordMatch;
    });

    // Apply filters
    let filtered = searchResults;
    if (volumeFilter) {
      filtered = filtered.filter((a: Article) => a.volume === parseInt(volumeFilter));
    }
    if (yearFilter) {
      const year = parseInt(yearFilter);
      filtered = filtered.filter((a: Article) => 1974 + a.volume === year);
    }

    setResults(filtered);
    setLoading(false);
  };

  const uniqueVolumes = Array.from(
    new Set(allArticles.map((a) => a.volume))
  ).sort((a, b) => b - a);

  const uniqueYears = uniqueVolumes.map((v) => 1974 + v);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Search the Archive</h1>
          <p className="text-xl text-gray-600">
            Search across {allArticles.length > 0 ? `${allArticles.filter(a => !isEditorialContent(a.title)).length}+` : ''} articles by title, author, or keyword
          </p>
        </div>

        {/* Search Box */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  handleSearch(e.target.value);
                }}
                placeholder="Search by title, author, or keyword..."
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {query && (
                <button
                  onClick={() => {
                    setQuery('');
                    setResults([]);
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-4">
            <select
              value={volumeFilter}
              onChange={(e) => {
                setVolumeFilter(e.target.value);
                if (query) handleSearch(query);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Volumes</option>
              {uniqueVolumes.map((vol) => (
                <option key={vol} value={vol}>
                  Volume {vol}
                </option>
              ))}
            </select>

            <select
              value={yearFilter}
              onChange={(e) => {
                setYearFilter(e.target.value);
                if (query) handleSearch(query);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Years</option>
              {uniqueYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Searching...</p>
          </div>
        )}

        {!loading && query && results.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <SearchIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filters
            </p>
          </div>
        )}

        {!loading && results.length > 0 && (
          <div>
            <div className="mb-4 text-gray-600">
              Found {results.length} article{results.length !== 1 ? 's' : ''}
            </div>

            <div className="space-y-4">
              {results.map((article, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <FileText className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <a
                        href={article.pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl font-semibold text-blue-600 hover:text-blue-800 hover:underline block mb-2"
                        dangerouslySetInnerHTML={{ __html: renderMarkdownItalics(article.title) }}
                      />

                      {article.authors.length > 0 && (
                        <p className="text-gray-700 mb-2">
                          {article.authors
                            .map((a) => a.split('\n')[0].replace(/DOI:.*$/i, '').trim())
                            .filter((a) => a)
                            .join(', ')}
                        </p>
                      )}

                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>
                          Volume {article.volume}, Issue {article.issue}
                        </span>
                        <span>•</span>
                        <span>{1974 + article.volume}</span>
                      </div>

                      {article.doi && (
                        <a
                          href={article.doi}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-gray-500 hover:text-gray-700 mt-2 inline-block"
                        >
                          {article.doi}
                        </a>
                      )}

                      {article.keywords && article.keywords.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {article.keywords.map((keyword, kidx) => (
                            <span
                              key={kidx}
                              onClick={() => {
                                setQuery(keyword);
                                handleSearch(keyword);
                              }}
                              className="inline-block px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-full cursor-pointer hover:bg-blue-100 transition-colors"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!query && !loading && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <SearchIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Start searching</h3>
            <p className="text-gray-600">
              Enter a title, author name, or keyword to begin
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, ChevronDown, ChevronRight, FileText } from 'lucide-react';
import { getAllVolumes, getArticlePDFPath } from '@/lib/data';
import type { VolumeData } from '@/lib/types';

export default function ArchivePage() {
  const [volumes, setVolumes] = useState<VolumeData[]>([]);
  const [expandedVolumes, setExpandedVolumes] = useState<Set<number>>(new Set([43]));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllVolumes().then((data) => {
      setVolumes(data);
      setLoading(false);
    });
  }, []);

  const toggleVolume = (volume: number) => {
    const newExpanded = new Set(expandedVolumes);
    if (newExpanded.has(volume)) {
      newExpanded.delete(volume);
    } else {
      newExpanded.add(volume);
    }
    setExpandedVolumes(newExpanded);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading archive...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Complete Archive
          </h1>
          <p className="text-xl text-gray-600">
            Browse all {volumes.length} volumes of the Journal of Basic Writing (1975–2024)
          </p>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 grid grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{volumes.length}</div>
            <div className="text-sm text-gray-600">Volumes</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">
              {volumes.reduce((sum, v) => sum + v.issues.length, 0)}
            </div>
            <div className="text-sm text-gray-600">Issues</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">
              {volumes.reduce((sum, v) => sum + v.totalArticles, 0)}
            </div>
            <div className="text-sm text-gray-600">Articles</div>
          </div>
        </div>

        {/* Volumes List */}
        <div className="space-y-4">
          {volumes.map((volumeData) => {
            const isExpanded = expandedVolumes.has(volumeData.volume);
            const year = volumeData.issues[0]?.year || 1974 + volumeData.volume;

            return (
              <div key={volumeData.volume} className="bg-white rounded-lg shadow-sm overflow-hidden">
                {/* Volume Header */}
                <button
                  onClick={() => toggleVolume(volumeData.volume)}
                  className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex items-center space-x-4">
                    {isExpanded ? (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    )}
                    <BookOpen className="h-6 w-6 text-blue-600" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        Volume {volumeData.volume} ({year})
                      </h3>
                      <p className="text-sm text-gray-600">
                        {volumeData.issues.length} issue{volumeData.issues.length !== 1 ? 's' : ''} •{' '}
                        {volumeData.totalArticles} article{volumeData.totalArticles !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                </button>

                {/* Issues List */}
                {isExpanded && (
                  <div className="border-t border-gray-200 bg-gray-50">
                    {volumeData.issues.map((issue) => (
                      <div key={`${issue.volume}-${issue.issue}`} className="border-b border-gray-200 last:border-0">
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-semibold text-gray-900">
                              Issue {issue.issue}: {issue.season} {issue.year}
                            </h4>
                            <span className="text-sm text-gray-600">
                              {issue.articles.length} article{issue.articles.length !== 1 ? 's' : ''}
                            </span>
                          </div>

                          {/* Articles List */}
                          <div className="space-y-3">
                            {issue.articles.map((article, idx) => (
                              <div key={idx} className="flex items-start space-x-3 p-3 hover:bg-white rounded transition-colors">
                                <FileText className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <a
                                    href={getArticlePDFPath(article)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 font-medium block hover:underline"
                                  >
                                    {article.title}
                                  </a>
                                  {article.authors.length > 0 && (
                                    <p className="text-sm text-gray-600 mt-1">
                                      {article.authors
                                        .map((a) => a.split('\n')[0].replace(/DOI:.*$/i, '').trim())
                                        .filter((a) => a)
                                        .join(', ')}
                                    </p>
                                  )}
                                  {article.doi && (
                                    <a
                                      href={article.doi}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-xs text-gray-500 hover:text-gray-700 mt-1 inline-block"
                                    >
                                      DOI: {article.doi.split('/').slice(-3).join('/')}
                                    </a>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

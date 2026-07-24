'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { useEffect, useState } from 'react';
import { LATEST_ISSUE } from '@/lib/latestIssue';

export default function NewIssueBanner() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const updateVisibility = () => {
      setIsVisible(Date.now() < Date.parse(LATEST_ISSUE.bannerExpiresAt));
    };

    updateVisibility();
    const interval = window.setInterval(updateVisibility, 60 * 60 * 1000);

    return () => window.clearInterval(interval);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <aside
      aria-label="New issue announcement"
      className="border-b-4 border-[#C9A961] bg-gradient-to-r from-[#163F66] via-[#1E5B8C] to-[#2B5AA0] text-white"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="flex items-start gap-3">
          <BookOpen className="mt-1 h-6 w-6 flex-none text-[#F1D99D]" aria-hidden="true" />
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-[#F1D99D]">
              New issue · {LATEST_ISSUE.season} {LATEST_ISSUE.year} · Volume {LATEST_ISSUE.volume}, Number {LATEST_ISSUE.issue}
            </p>
            <p className="max-w-4xl font-serif text-lg font-semibold leading-snug sm:text-xl">
              {LATEST_ISSUE.title}
            </p>
          </div>
        </div>
        <Link
          href={LATEST_ISSUE.pdfPath}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-none items-center justify-center gap-2 self-start border border-white/70 bg-white px-4 py-2.5 text-sm font-bold text-[#1E5B8C] shadow-sm transition-colors hover:bg-[#F8EBCB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:self-center"
        >
          Read the issue (PDF)
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </aside>
  );
}

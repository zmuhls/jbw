'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
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
      className="new-issue-banner"
    >
      <div className="new-issue-banner__inner">
        <p
          className="new-issue-banner__copy"
          title={`${LATEST_ISSUE.season} ${LATEST_ISSUE.year}, Volume ${LATEST_ISSUE.volume}, Number ${LATEST_ISSUE.issue}: ${LATEST_ISSUE.title}`}
        >
          <span className="new-issue-banner__label">New issue</span>
          <span className="new-issue-banner__meta">
            {LATEST_ISSUE.season} {LATEST_ISSUE.year} · Vol. {LATEST_ISSUE.volume}, No. {LATEST_ISSUE.issue}
          </span>
          <span className="new-issue-banner__title">{LATEST_ISSUE.title}</span>
        </p>
        <Link
          href={LATEST_ISSUE.pdfPath}
          target="_blank"
          rel="noopener noreferrer"
          className="new-issue-banner__link"
        >
          Read PDF
          <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </aside>
  );
}

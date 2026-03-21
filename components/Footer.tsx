'use client';

import Link from 'next/link';

import { appConfig } from '../lib/config';
import { getSourceUrl } from '../lib/share';
import { trackEvent } from '../lib/analytics';

export function Footer() {
  const sourceUrl = getSourceUrl();

  return (
    <footer className="rounded-[2rem] border border-white/60 bg-white/80 p-6 text-sm text-slate-600 shadow-panel backdrop-blur sm:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Built by {appConfig.founder.name}</p>
          <p className="mt-3 text-base font-medium text-slate-900">{appConfig.founder.role} · {appConfig.founder.tagline}</p>
          <p className="mt-3 leading-7">
            HypeOmeter evaluates writing signals, not factual truth or personal credibility. It was built to help people reduce hype, improve clarity, and publish stronger AI writing.
          </p>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <Link
            href="/about"
            className="text-slate-700 transition hover:text-slate-950"
            onClick={() => trackEvent('about_creator_clicked')}
          >
            About the creator
          </Link>
          <a
            href={appConfig.founder.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="text-slate-700 transition hover:text-slate-950"
            onClick={() => trackEvent('linkedin_profile_clicked')}
          >
            LinkedIn
          </a>
          {appConfig.founder.githubUrl ? <a href={appConfig.founder.githubUrl} target="_blank" rel="noreferrer" className="text-slate-700 transition hover:text-slate-950">GitHub</a> : null}
          {appConfig.founder.websiteUrl ? <a href={appConfig.founder.websiteUrl} target="_blank" rel="noreferrer" className="text-slate-700 transition hover:text-slate-950">Website</a> : null}
          {sourceUrl ? <a href={sourceUrl} target="_blank" rel="noreferrer" className="text-slate-700 transition hover:text-slate-950">View source</a> : null}
          <Link href="/" className="text-slate-700 transition hover:text-slate-950" onClick={() => trackEvent('analyze_your_own_clicked')}>
            Analyze your own post
          </Link>
        </div>
      </div>
    </footer>
  );
}

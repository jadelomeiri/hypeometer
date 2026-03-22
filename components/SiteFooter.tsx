import Link from 'next/link';

import { APP_CONFIG, optionalLinks } from '../lib/config';

export function SiteFooter() {
  const links = optionalLinks();

  return (
    <footer className="rounded-3xl border border-white/60 bg-white/80 p-6 text-sm text-slate-600 shadow-panel backdrop-blur">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-2xl">
          <p className="font-semibold text-slate-900">Built by {APP_CONFIG.founder.name}</p>
          <p className="mt-1">{APP_CONFIG.founder.role} · {APP_CONFIG.founder.headline}</p>
          <p className="mt-3 text-slate-500">
            HypeOmeter was built to separate signal from noise in AI discourse while giving founders, operators, and job seekers a sharper way to pressure-test posts before publishing.
          </p>
        </div>

        <div className="flex flex-col gap-2 text-left sm:text-right">
          <Link href="/" className="font-medium text-slate-900 transition hover:text-primary">Analyze your own post</Link>
          <Link href="/about" className="transition hover:text-primary">About the creator</Link>
          <a href={APP_CONFIG.founder.linkedinUrl} target="_blank" rel="noreferrer" className="transition hover:text-primary">LinkedIn</a>
          {links.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="transition hover:text-primary">
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div className="mt-5 border-t border-slate-100 pt-5 text-xs text-slate-500">
        HypeOmeter evaluates writing signals, not factual truth or personal credibility.
      </div>
    </footer>
  );
}

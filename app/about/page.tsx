import Link from 'next/link';

import { SiteFooter } from '../../components/SiteFooter';
import { APP_CONFIG, optionalLinks } from '../../lib/config';

export default function AboutPage() {
  const links = optionalLinks();

  return (
    <main className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <section className="rounded-[2rem] border border-white/60 bg-gradient-to-br from-white via-slate-50 to-blue-50 p-8 shadow-panel sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">About the creator</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            {APP_CONFIG.founder.name}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
            {APP_CONFIG.founder.role}. {APP_CONFIG.founder.headline}. I built {APP_CONFIG.name} to help separate signal from noise in AI discourse and make “thought leadership” a little easier to evaluate before it gets posted.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={APP_CONFIG.founder.linkedinUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
              Connect on LinkedIn
            </a>
            <Link href="/" className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary">
              Analyze your own post
            </Link>
          </div>
        </section>

        <section className="rounded-3xl border border-border bg-card p-6 shadow-panel sm:p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Why HypeOmeter exists</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600">
            <p>
              HypeOmeter is a lightweight review layer for AI posts: not to decide who is right, but to make it easier to tell when a post is grounded in evidence, operator detail, and specificity versus broad performance and templated phrasing.
            </p>
            <p>
              The goal is simple: help people check a post before they publish, share stronger analysis publicly, and keep the product serious, useful, and credible.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={APP_CONFIG.founder.linkedinUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-primary hover:text-primary">
              LinkedIn
            </a>
            {links.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-primary hover:text-primary">
                {link.label}
              </a>
            ))}
          </div>
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}

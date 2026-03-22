import Link from 'next/link';

import { PostInput } from '../components/PostInput';
import { SiteFooter } from '../components/SiteFooter';
import { APP_CONFIG } from '../lib/config';

export default function HomePage() {
  return (
    <main className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <section className="rounded-[2rem] border border-white/60 bg-gradient-to-br from-white via-slate-50 to-blue-50 p-8 shadow-panel sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">{APP_CONFIG.name}</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Separate AI substance from AI vibes.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Paste a LinkedIn post about AI and get a structured breakdown of hype, substance, evidence,
            specificity, operator signals, and AI-style phrasing likelihood.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/about" className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary">
              Built by {APP_CONFIG.founder.name}
            </Link>
            <a href={APP_CONFIG.founder.linkedinUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary">
              LinkedIn
            </a>
          </div>
        </section>

        <PostInput />

        <SiteFooter />
      </div>
    </main>
  );
}

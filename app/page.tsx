import Link from 'next/link';

import { AboutCreator } from '../components/AboutCreator';
import { Footer } from '../components/Footer';
import { PostInput } from '../components/PostInput';

export default function HomePage() {
  return (
    <main className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <section className="rounded-[2rem] border border-white/60 bg-gradient-to-br from-white via-slate-50 to-blue-50 p-8 shadow-panel sm:p-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">HypeOmeter</p>
              <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                Separate AI substance from AI vibes.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                Paste a LinkedIn post about AI and get a structured breakdown of hype, substance, evidence,
                specificity, operator signals, AI-style phrasing likelihood, a verdict, and a stronger rewrite.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/about" className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-950">
                About the creator
              </Link>
              <Link href="/leaderboard" className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-950">
                Result patterns
              </Link>
            </div>
          </div>
        </section>

        <PostInput />
        <AboutCreator />
        <Footer />
      </div>
    </main>
  );
}

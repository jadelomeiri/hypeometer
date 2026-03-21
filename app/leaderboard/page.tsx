import Link from 'next/link';

import { appConfig } from '../../lib/config';
import { Footer } from '../../components/Footer';

export default function LeaderboardPage() {
  return (
    <main className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-4xl flex-col gap-8">
        <Link href="/" className="text-sm font-medium text-primary">← Back to HypeOmeter</Link>
        <section className="rounded-[2rem] border border-border bg-card p-6 shadow-panel sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Result patterns</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Leaderboard coming soon</h1>
          <p className="mt-4 text-base leading-8 text-slate-700">
            A public hall of fame can be useful, but only if it stays anonymous, content-focused, and avoids becoming a naming-and-shaming tool. The storage layer for persistent leaderboard entries is intentionally disabled in this MVP.
          </p>
          <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-600">
            Feature flag status: <span className="font-semibold text-slate-900">{String(appConfig.features.leaderboard)}</span>. Once a persistence layer is added, this page can surface the most hype-heavy, most substantive, and most operator-heavy anonymous examples.
          </div>
        </section>
        <Footer />
      </div>
    </main>
  );
}

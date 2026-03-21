import Link from 'next/link';

import { AboutCreator } from '../../components/AboutCreator';
import { Footer } from '../../components/Footer';

export default function AboutPage() {
  return (
    <main className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-4xl flex-col gap-8">
        <Link href="/" className="text-sm font-medium text-primary">← Back to HypeOmeter</Link>
        <AboutCreator />
        <section className="rounded-[2rem] border border-border bg-card p-6 shadow-panel sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Why HypeOmeter exists</p>
          <p className="mt-4 text-base leading-8 text-slate-700">
            The AI conversation is full of bold claims, stylized certainty, and shallow consensus. HypeOmeter exists to make those posts easier to inspect and easier to improve. The goal is not to shame writers, but to reward specificity, evidence, and real operator signals.
          </p>
        </section>
        <Footer />
      </div>
    </main>
  );
}

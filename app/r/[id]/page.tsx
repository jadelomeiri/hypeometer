import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ExpandableText } from '../../../components/ExpandableText';
import { ResultSummaryCard } from '../../../components/ResultSummaryCard';
import { SiteFooter } from '../../../components/SiteFooter';
import { APP_CONFIG } from '../../../lib/config';
import { buildPublicShareUrl } from '../../../lib/publicResult';
import { getSharedResultStore, sanitizeShareId } from '../../../lib/share/store';
import { SharedResultRecordV1 } from '../../../lib/types';

interface PublicResultPageProps {
  params: Promise<{ id: string }>;
}

async function loadShareRecord(id: string): Promise<SharedResultRecordV1 | null> {
  const sanitized = sanitizeShareId(id);
  if (!sanitized) return null;

  try {
    const store = getSharedResultStore();
    return await store.getById(sanitized);
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PublicResultPageProps): Promise<Metadata> {
  const { id } = await params;
  const record = await loadShareRecord(id);

  if (!record) {
    return {
      title: `Result not found | ${APP_CONFIG.name}`,
      description: 'This shared result is missing, expired, or unavailable.',
    };
  }

  const title = `${record.result.verdict} | ${APP_CONFIG.name}`;
  const description = `Hype ${record.result.hype}, Substance ${record.result.substance}, Evidence ${record.result.evidence}. Public analysis by ${APP_CONFIG.name}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: buildPublicShareUrl(record.id),
      images: [`/r/${record.id}/opengraph-image`],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/r/${record.id}/opengraph-image`],
    },
  };
}

export default async function PublicResultPage({ params }: PublicResultPageProps) {
  const { id } = await params;
  const record = await loadShareRecord(id);

  if (!record) {
    notFound();
  }

  const store = getSharedResultStore();
  void store.incrementViews(record.id).catch((error) => {
    console.error('Failed to increment shared result views', error);
  });

  return (
    <main className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <section className="rounded-[2rem] border border-white/60 bg-gradient-to-br from-white via-slate-50 to-blue-50 p-8 shadow-panel sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Public result</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            A shared {APP_CONFIG.name} analysis of an AI post.
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
            Review the score breakdown, inspect the rewrite, and run your own post through the same lens.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/" className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
              Analyze your own post
            </Link>
            <a href={APP_CONFIG.founder.linkedinUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary">
              Built by {APP_CONFIG.founder.name}
            </a>
          </div>
        </section>

        <ResultSummaryCard result={record.result} explanationLimit={3} />

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <ExpandableText text={record.originalText} />
            <div className="rounded-3xl border border-border bg-card p-6 shadow-panel sm:p-8">
              <h2 className="text-xl font-semibold tracking-tight text-slate-950">Rewrite as a stronger post</h2>
              <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-700">{record.result.strongerRewrite}</p>
              <p className="mt-4 text-sm text-slate-500">Want this to land better? Use the stronger rewrite as a starting point and add specific evidence, setup details, and tradeoffs.</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-panel sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">About the creator</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">Built by {APP_CONFIG.founder.name}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {APP_CONFIG.name} was built by {APP_CONFIG.founder.name}, a {APP_CONFIG.founder.role.toLowerCase()} interested in separating signal from noise in AI discourse. He is currently exploring new opportunities.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href={APP_CONFIG.founder.linkedinUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-primary hover:text-primary">
                  LinkedIn
                </a>
                <Link href="/about" className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-primary hover:text-primary">
                  More about the creator
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 shadow-panel sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Try HypeOmeter</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">Check another post</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Use HypeOmeter before posting to reduce hype, improve signal, and sharpen the strongest version of your point.
              </p>
              <Link href="/" className="mt-5 inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                Analyze your own post
              </Link>
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}

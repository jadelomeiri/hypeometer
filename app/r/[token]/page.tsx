import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Footer } from '../../../components/Footer';
import { PublicResultClient } from '../../../components/PublicResultClient';
import { ResultCard } from '../../../components/ResultCard';
import { appConfig, getAbsoluteUrl } from '../../../lib/config';
import { capitalize, deserializePublicResult } from '../../../lib/share';

export async function generateMetadata({ params }: { params: Promise<{ token: string }> }): Promise<Metadata> {
  const { token } = await params;
  const payload = deserializePublicResult(token);

  if (!payload) {
    return {
      title: `Result not found | ${appConfig.appName}`,
    };
  }

  const title = `${payload.result.verdict} | ${appConfig.appName}`;
  const description = `Hype ${payload.result.hype}, Substance ${payload.result.substance}, Evidence ${payload.result.evidence}. ${capitalize(payload.mode)} mode analysis.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: getAbsoluteUrl(`/r/${token}`),
      images: [getAbsoluteUrl(`/r/${token}/opengraph-image`)],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [getAbsoluteUrl(`/r/${token}/opengraph-image`)],
    },
  };
}

export default async function PublicResultPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const payload = deserializePublicResult(token);

  if (!payload) {
    notFound();
  }

  return (
    <main className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="text-sm font-medium text-primary">← Analyze your own post</Link>
          <p className="text-sm text-slate-500">Built by {appConfig.founder.name}</p>
        </div>
        <ResultCard payload={payload} />
        <PublicResultClient payload={payload} />
        <Footer />
      </div>
    </main>
  );
}

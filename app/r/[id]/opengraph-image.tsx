import { ImageResponse } from 'next/og';

import { APP_CONFIG } from '../../../lib/config';
import { getSharedResultStore, sanitizeShareId } from '../../../lib/share/store';

export const runtime = 'nodejs';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function OpenGraphImage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const sanitizedId = sanitizeShareId(id);
  const payload = sanitizedId ? await getSharedResultStore().getById(sanitizedId) : null;

  if (!payload) {
    return new ImageResponse(
      (
        <div style={{ display: 'flex', width: '100%', height: '100%', background: '#f8fafc', color: '#0f172a', alignItems: 'center', justifyContent: 'center', fontSize: 44, fontWeight: 700 }}>
          HypeOmeter
        </div>
      ),
      size,
    );
  }

  const scoreBox = (label: string, value: number, background: string, color: string) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '24px 28px', borderRadius: 28, background, minWidth: 220 }}>
      <span style={{ fontSize: 24, color: '#475569' }}>{label}</span>
      <span style={{ fontSize: 72, fontWeight: 800, color }}>{value}</span>
    </div>
  );

  return new ImageResponse(
    (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', background: 'linear-gradient(135deg, #ffffff, #f8fafc 65%, #eff6ff)', padding: 48, color: '#0f172a', fontFamily: 'Arial' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 24, letterSpacing: 6, textTransform: 'uppercase', color: '#2563eb', fontWeight: 700 }}>{APP_CONFIG.name}</span>
            <span style={{ marginTop: 18, fontSize: 54, fontWeight: 800, maxWidth: 900 }}>{payload.result.verdict}</span>
          </div>
          <div style={{ display: 'flex', borderRadius: 999, border: '1px solid #cbd5e1', padding: '14px 22px', fontSize: 24, background: '#fff7ed', color: '#9a3412' }}>
            AI-style: {payload.result.aiStyleLikelihood}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 24, marginTop: 44 }}>
          {scoreBox('Hype', payload.result.hype, 'linear-gradient(135deg, #fbbf24, #f97316)', '#ffffff')}
          {scoreBox('Substance', payload.result.substance, 'linear-gradient(135deg, #3b82f6, #6366f1)', '#ffffff')}
          {scoreBox('Evidence', payload.result.evidence, 'linear-gradient(135deg, #10b981, #14b8a6)', '#ffffff')}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 36, padding: 28, borderRadius: 28, background: '#ffffff', border: '1px solid #e2e8f0' }}>
          {payload.result.explanation.slice(0, 2).map((item) => (
            <div key={item} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', fontSize: 26, color: '#334155' }}>
              <div style={{ width: 10, height: 10, borderRadius: 999, background: '#2563eb', marginTop: 12 }} />
              <span>{item}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', fontSize: 24, color: '#475569' }}>
          <span>Separate AI substance from AI vibes.</span>
          <span>Built by {APP_CONFIG.founder.name}</span>
        </div>
      </div>
    ),
    size,
  );
}

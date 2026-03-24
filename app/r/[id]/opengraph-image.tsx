import { ImageResponse } from 'next/og';

import { APP_CONFIG } from '../../../lib/config';
import { getSharedResultStore, sanitizeShareId } from '../../../lib/share/store';

export const runtime = 'nodejs';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

function clampText(value: string, maxLength: number) {
  const normalized = value.trim().replace(/\s+/g, ' ');
  if (!normalized) return '';
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength - 1).trimEnd()}…`;
}

async function loadPayload(id: string) {
  const sanitizedId = sanitizeShareId(id);
  if (!sanitizedId) return null;

  try {
    return await getSharedResultStore().getById(sanitizedId);
  } catch {
    return null;
  }
}

export default async function OpenGraphImage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const payload = await loadPayload(id);

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

  const safeVerdict = clampText(payload.result.verdict, 44) || 'No verdict available.';

  const scoreBox = (label: string, value: number, background: string, color: string) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '24px 28px', borderRadius: 28, background, minWidth: 0, flex: 1 }}>
      <span style={{ fontSize: 24, color: '#475569' }}>{label}</span>
      <span style={{ fontSize: 72, fontWeight: 800, color }}>{value}</span>
    </div>
  );

  return new ImageResponse(
    (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', background: 'linear-gradient(135deg, #ffffff, #f8fafc 65%, #eff6ff)', padding: 48, color: '#0f172a', fontFamily: 'Arial' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span style={{ fontSize: 24, letterSpacing: 6, textTransform: 'uppercase', color: '#2563eb', fontWeight: 700 }}>{APP_CONFIG.name}</span>
          <span style={{ fontSize: 32, color: '#475569', fontWeight: 600 }}>Hype vs Substance Analysis</span>
        </div>

        <div style={{ display: 'flex', gap: 18, marginTop: 28 }}>
          {scoreBox('Hype', payload.result.hype, 'linear-gradient(135deg, #fbbf24, #f97316)', '#ffffff')}
          {scoreBox('Substance', payload.result.substance, 'linear-gradient(135deg, #3b82f6, #6366f1)', '#ffffff')}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 24, padding: 24, borderRadius: 24, background: '#ffffff', border: '1px solid #e2e8f0', minHeight: 144 }}>
          <span style={{ fontSize: 24, color: '#475569' }}>Verdict</span>
          <span style={{ marginTop: 12, fontSize: 48, fontWeight: 800, lineHeight: 1.12 }}>{safeVerdict}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', fontSize: 24, color: '#475569' }}>
          <span>{APP_CONFIG.name}</span>
          <span>Built by Jad El Omeiri</span>
        </div>
      </div>
    ),
    size,
  );
}

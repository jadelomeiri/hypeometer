import { ImageResponse } from 'next/og';

import { appConfig } from '../../../lib/config';
import { capitalize, deserializePublicResult } from '../../../lib/share';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function OGImage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const payload = deserializePublicResult(token);

  if (!payload) {
    return new ImageResponse(
      (
        <div style={{ display: 'flex', width: '100%', height: '100%', background: '#020617', color: 'white', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>
          Invalid HypeOmeter result
        </div>
      ),
      size,
    );
  }

  const metrics = [
    ['Hype', payload.result.hype],
    ['Substance', payload.result.substance],
    ['Evidence', payload.result.evidence],
  ];

  return new ImageResponse(
    (
      <div style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        background: '#020617',
        color: 'white',
        padding: '52px',
        fontFamily: 'Arial, sans-serif',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 24, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#94a3b8' }}>{appConfig.appName}</div>
            <div style={{ fontSize: 58, fontWeight: 700, marginTop: 28, maxWidth: 860, lineHeight: 1.1 }}>{payload.result.verdict}</div>
            <div style={{ fontSize: 28, color: '#cbd5e1', marginTop: 18 }}>Mode: {capitalize(payload.mode)} · AI-style likelihood: {capitalize(payload.result.aiStyleLikelihood)}</div>
          </div>
          <div style={{ display: 'flex', background: '#111827', borderRadius: 999, padding: '12px 20px', fontSize: 20, color: '#e2e8f0' }}>
            Built by {appConfig.founder.name}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 20 }}>
          {metrics.map(([label, value]) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '28px', background: '#111827', borderRadius: 28, border: '1px solid #1e293b' }}>
              <div style={{ fontSize: 20, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#94a3b8' }}>{label}</div>
              <div style={{ fontSize: 72, fontWeight: 700, marginTop: 16 }}>{String(value)}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 850 }}>
            {payload.result.explanation.slice(0, 2).map((item) => (
              <div key={item} style={{ display: 'flex', fontSize: 24, lineHeight: 1.4, color: '#e2e8f0', marginTop: 10 }}>
                • {item}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 22, color: '#94a3b8' }}>Separate AI substance from AI vibes.</div>
        </div>
      </div>
    ),
    size,
  );
}

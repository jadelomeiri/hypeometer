'use client';

interface ToastProps {
  message: string;
  tone?: 'success' | 'error';
}

export function Toast({ message, tone = 'success' }: ToastProps) {
  return (
    <div
      className={`fixed bottom-4 right-4 z-50 rounded-2xl border px-4 py-3 text-sm shadow-lg ${
        tone === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-rose-200 bg-rose-50 text-rose-700'
      }`}
    >
      {message}
    </div>
  );
}

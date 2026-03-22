interface ToastProps {
  message: string;
  tone?: 'success' | 'error';
}

export function Toast({ message, tone = 'success' }: ToastProps) {
  return (
    <div
      aria-live="polite"
      className={tone === 'success'
        ? 'rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700'
        : 'rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700'}
    >
      {message}
    </div>
  );
}

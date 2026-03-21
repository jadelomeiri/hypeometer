'use client';

export type AnalyticsEventName =
  | 'analyze_clicked'
  | 'share_link_copied'
  | 'share_text_copied'
  | 'public_result_opened'
  | 'analyze_your_own_clicked'
  | 'linkedin_profile_clicked'
  | 'about_creator_clicked';

export type AnalyticsPayload = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    hypeOmeterAnalytics?: {
      track: (event: AnalyticsEventName, payload?: AnalyticsPayload) => void;
    };
  }
}

export function trackEvent(event: AnalyticsEventName, payload?: AnalyticsPayload) {
  if (typeof window === 'undefined') return;
  window.hypeOmeterAnalytics?.track?.(event, payload);
}

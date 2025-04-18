interface Window {
  dataLayer: any[];
  gtag: (...args: any[]) => void;
}

declare const window: Window;

export const useGoogleAnalytics = () => {
  const trackPageView = (path: string) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', 'G-83JX9F9C6R', {
        page_path: path
      });
    }
  };

  const trackEvent = (category: string, action: string, label?: string, value?: number) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value
      });
    }
  };

  return {
    trackPageView,
    trackEvent
  };
}; 
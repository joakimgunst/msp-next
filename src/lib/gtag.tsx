const prod = process.env.NODE_ENV === 'production';

export const GA_TRACKING_ID = prod ? 'UA-10908509-1' : 'UA-10908509-3';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (path: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: path,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: Event) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

interface Event {
  action: string;
  category?: string;
  label?: string;
  value?: string;
}

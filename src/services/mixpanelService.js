import mixpanel from 'mixpanel-browser';

// Initialize Mixpanel with project token
const MIXPANEL_TOKEN = import.meta.env.VITE_MIXPANEL_TOKEN || 'demo-token';

class MixpanelService {
  constructor() {
    // Initialize Mixpanel
    mixpanel.init(MIXPANEL_TOKEN, {
      debug: import.meta.env.DEV,
      track_pageview: true,
      persistence: 'localStorage',
      api_host: 'https://api.mixpanel.com',
      loaded: () => {
        console.log('Mixpanel loaded successfully');
      }
    });

    this.mixpanel = mixpanel;
  }

  // Track page views
  trackPageView(pageName, properties = {}) {
    this.mixpanel.track('Page View', {
      page: pageName,
      url: window.location.href,
      referrer: document.referrer,
      timestamp: new Date().toISOString(),
      ...properties
    });
  }

  // Track user interactions
  trackEvent(eventName, properties = {}) {
    this.mixpanel.track(eventName, {
      timestamp: new Date().toISOString(),
      url: window.location.href,
      ...properties
    });
  }

  // Track button clicks
  trackButtonClick(buttonName, location, properties = {}) {
    this.trackEvent('Button Click', {
      button_name: buttonName,
      location: location,
      ...properties
    });
  }

  // Track form submissions
  trackFormSubmission(formName, properties = {}) {
    this.trackEvent('Form Submission', {
      form_name: formName,
      ...properties
    });
  }

  // Track marketing funnel events
  trackMarketingEvent(eventType, properties = {}) {
    const marketingEvents = {
      'landing_page_view': 'Marketing - Landing Page View',
      'hero_cta_click': 'Marketing - Hero CTA Click',
      'features_view': 'Marketing - Features Section View',
      'learn_more_click': 'Marketing - Learn More Click',
      'final_cta_click': 'Marketing - Final CTA Click',
      'scroll_depth': 'Marketing - Scroll Depth'
    };

    const eventName = marketingEvents[eventType] || `Marketing - ${eventType}`;
    this.trackEvent(eventName, properties);
  }

  // Track user engagement
  trackEngagement(engagementType, duration = null, properties = {}) {
    this.trackEvent('User Engagement', {
      engagement_type: engagementType,
      duration_seconds: duration,
      ...properties
    });
  }

  // Track conversion events
  trackConversion(conversionType, value = null, properties = {}) {
    this.trackEvent('Conversion', {
      conversion_type: conversionType,
      value: value,
      ...properties
    });
  }

  // Set user properties
  setUserProperties(properties) {
    this.mixpanel.people.set(properties);
  }

  // Identify user
  identifyUser(userId, properties = {}) {
    this.mixpanel.identify(userId);
    this.setUserProperties({
      user_id: userId,
      first_seen: new Date().toISOString(),
      ...properties
    });
  }

  // Track user journey
  trackUserJourney(step, properties = {}) {
    this.trackEvent('User Journey', {
      journey_step: step,
      ...properties
    });
  }

  // Track performance metrics
  trackPerformance(metric, value, properties = {}) {
    this.trackEvent('Performance Metric', {
      metric_name: metric,
      metric_value: value,
      ...properties
    });
  }

  // Track scroll depth
  trackScrollDepth(percentage) {
    this.trackMarketingEvent('scroll_depth', {
      scroll_percentage: percentage,
      page_height: document.body.scrollHeight,
      viewport_height: window.innerHeight
    });
  }

  // Track time on page
  trackTimeOnPage(duration) {
    this.trackEngagement('time_on_page', duration);
  }

  // Track device and browser info
  trackDeviceInfo() {
    this.trackEvent('Device Info', {
      user_agent: navigator.userAgent,
      screen_width: screen.width,
      screen_height: screen.height,
      viewport_width: window.innerWidth,
      viewport_height: window.innerHeight,
      device_pixel_ratio: window.devicePixelRatio,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language
    });
  }
}

// Create singleton instance
const mixpanelService = new MixpanelService();

export default mixpanelService;


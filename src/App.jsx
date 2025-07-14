import React, { useEffect, useState } from 'react';
import mixpanelService from './services/mixpanelService';
import './App.css';

function App() {
  const [pageLoadTime] = useState(Date.now());

  useEffect(() => {
    // Track page load and device info
    mixpanelService.trackMarketingEvent('landing_page_view');
    mixpanelService.trackDeviceInfo();

    // Track scroll depth
    let maxScrollDepth = 0;
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.offsetHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = Math.round((scrollTop / (docHeight - winHeight)) * 100);
      
      if (scrollPercent > maxScrollDepth) {
        maxScrollDepth = scrollPercent;
        if (scrollPercent % 25 === 0 && scrollPercent > 0) {
          mixpanelService.trackScrollDepth(scrollPercent);
        }
      }
    };

    // Track time on page when user leaves
    const handleBeforeUnload = () => {
      const timeOnPage = Math.round((Date.now() - pageLoadTime) / 1000);
      mixpanelService.trackTimeOnPage(timeOnPage);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [pageLoadTime]);

  const handleStartJourneyClick = () => {
    mixpanelService.trackMarketingEvent('hero_cta_click', {
      cta_text: 'Start Your Journey',
      cta_position: 'hero_primary'
    });
    mixpanelService.trackConversion('hero_cta_click', 1);
    // Here you would typically redirect to app download or signup
    console.log('Redirecting to app...');
  };

  const handleLearnMoreClick = () => {
    mixpanelService.trackMarketingEvent('learn_more_click', {
      cta_text: 'Learn More',
      cta_position: 'hero_secondary'
    });
    // Scroll to features section
    document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
  };

  const handleFinalCtaClick = () => {
    mixpanelService.trackMarketingEvent('final_cta_click', {
      cta_text: 'Get Started Today',
      cta_position: 'final_cta'
    });
    mixpanelService.trackConversion('final_cta_click', 1);
    console.log('Redirecting to app...');
  };

  const handleFeatureView = (featureName) => {
    mixpanelService.trackMarketingEvent('features_view', {
      feature_name: featureName
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="text-center text-white max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white to-teal-100 bg-clip-text text-transparent">
              TuneAtLife
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-teal-100">
              AI-Powered Wellness Coaching for a Healthier You
            </p>
            <p className="text-lg mb-12 text-teal-200 max-w-2xl mx-auto">
              Experience personalized health coaching with cultural intelligence, 
              advanced AI experts, and smart nutrition guidance tailored to your lifestyle.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={handleStartJourneyClick}
              className="bg-white text-teal-700 px-8 py-4 rounded-full font-semibold text-lg hover:bg-teal-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Start Your Journey
            </button>
            <button 
              onClick={handleLearnMoreClick}
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-teal-700 transition-all duration-300 transform hover:scale-105"
            >
              Learn More
            </button>
          </div>
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-white/3 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-teal-800 mb-16">
            Revolutionary AI Health Coaching
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div 
              className="text-center p-8 rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              onMouseEnter={() => handleFeatureView('Cultural Intelligence')}
            >
              <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🧠</span>
              </div>
              <h3 className="text-xl font-bold text-teal-800 mb-4">Cultural Intelligence</h3>
              <p className="text-teal-700">
                First AI health system with market-specific adaptation for personalized cultural wellness approaches.
              </p>
            </div>
            
            <div 
              className="text-center p-8 rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              onMouseEnter={() => handleFeatureView('Lightning Fast')}
            >
              <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-teal-800 mb-4">Lightning Fast</h3>
              <p className="text-teal-700">
                90% faster responses with advanced Redis caching and optimized AI processing for instant insights.
              </p>
            </div>
            
            <div 
              className="text-center p-8 rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              onMouseEnter={() => handleFeatureView('Smart Engagement')}
            >
              <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-bold text-teal-800 mb-4">Smart Engagement</h3>
              <p className="text-teal-700">
                8 types of intelligent notifications with user preferences and advanced targeting for optimal results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-teal-700 to-teal-800">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Health?
          </h2>
          <p className="text-xl mb-8 text-teal-100">
            Join thousands who've discovered personalized wellness with TuneAtLife AI
          </p>
          <button 
            onClick={handleFinalCtaClick}
            className="bg-white text-teal-700 px-12 py-4 rounded-full font-bold text-xl hover:bg-teal-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Get Started Today
          </button>
        </div>
      </section>
    </div>
  );
}

export default App;


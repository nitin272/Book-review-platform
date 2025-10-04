import React from 'react';
import HeroSection from '../../components/Home/HeroSection';
import StatsSection from '../../components/Home/StatsSection';
import FeaturesSection from '../../components/Home/FeaturesSection';
import TestimonialsSection from '../../components/Home/TestimonialsSection';
import CTASection from '../../components/Home/CTASection';
import './Home.scss';

const Home = () => {
  return (
    <div className="home-page">
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
};

export default Home;
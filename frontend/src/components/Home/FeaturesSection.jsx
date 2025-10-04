import React from 'react';
import { Container } from '@mui/material';
import {
  AutoStories,
  Star,
  Groups,
  ThumbUp
} from '@mui/icons-material';

const FeaturesSection = () => {
  const features = [
    {
      icon: <AutoStories />,
      title: 'Curated Library',
      description: 'Explore our carefully curated collection of over 10,000 books across every genre, from timeless classics to trending bestsellers.',
      color: '#667eea',
      gradient: 'linear-gradient(135deg, #667eea, #764ba2)'
    },
    {
      icon: <Star />,
      title: 'Authentic Reviews',
      description: 'Read detailed, honest reviews from verified readers. Our community-driven rating system helps you make informed choices.',
      color: '#ffc107',
      gradient: 'linear-gradient(135deg, #ffc107, #ff8f00)'
    },
    {
      icon: <Groups />,
      title: 'Vibrant Community',
      description: 'Join book clubs, participate in discussions, and connect with passionate readers who share your literary interests.',
      color: '#4caf50',
      gradient: 'linear-gradient(135deg, #4caf50, #2e7d32)'
    },
    {
      icon: <ThumbUp />,
      title: 'Smart Recommendations',
      description: 'Get AI-powered book suggestions tailored to your reading history, preferences, and favorite genres.',
      color: '#f093fb',
      gradient: 'linear-gradient(135deg, #f093fb, #f5576c)'
    }
  ];

  return (
    <section className="features-section" style={{ padding: '6rem 0' }}>
      <Container maxWidth="lg">
        <div className="section-header">
          <div className="section-badge">Powerful Features</div>
          <h2 className="section-title">
            Everything You Need to{' '}
            <span className="gradient-text">Discover Books</span>
          </h2>
          <p className="section-subtitle">
            From discovering new reads to connecting with fellow book lovers, 
            Readly provides all the tools you need for your literary journey
          </p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card"
              style={{ 
                '--feature-color': feature.color,
                '--feature-gradient': feature.gradient
              }}
            >
              <div className="feature-icon-wrapper">
                <div className="feature-icon">{feature.icon}</div>
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturesSection;
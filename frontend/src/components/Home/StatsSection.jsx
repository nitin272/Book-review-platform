import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import {
  MenuBook,
  Star,
  People,
  RateReview
} from '@mui/icons-material';

const StatsSection = () => {
  const stats = [
    { 
      number: '12,847', 
      label: 'Books Reviewed', 
      icon: <MenuBook />,
      color: '#667eea'
    },
    { 
      number: '28,394', 
      label: 'Community Reviews', 
      icon: <RateReview />,
      color: '#764ba2'
    },
    { 
      number: '5,672', 
      label: 'Active Readers', 
      icon: <People />,
      color: '#f093fb'
    },
    { 
      number: '4.9', 
      label: 'Average Rating', 
      icon: <Star />,
      color: '#ffc107'
    }
  ];

  return (
    <section className="stats-section" style={{ padding: '5rem 0' }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={6}>
          <Typography
            variant="overline"
            sx={{
              color: 'primary.main',
              fontWeight: 700,
              letterSpacing: 2,
              fontSize: '0.875rem'
            }}
          >
            TRUSTED BY THOUSANDS
          </Typography>
          <Typography
            variant="h3"
            fontWeight={700}
            color="text.primary"
            sx={{ mt: 1, fontSize: { xs: '1.75rem', md: '2.25rem' } }}
          >
            Join Our Growing Community
          </Typography>
        </Box>
        
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="stat-card"
              style={{ 
                '--stat-color': stat.color, 
                '--stat-color-light': `${stat.color}cc` 
              }}
            >
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default StatsSection;
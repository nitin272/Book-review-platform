
import { Container, Box, Typography, Chip, useTheme } from '@mui/material';
import { useTheme as useCustomTheme } from '../../context/ThemeContext';
import {
  AutoStories,
  Star,
  Groups,
  ThumbUp
} from '@mui/icons-material';

const FeaturesSection = () => {
  const theme = useTheme();
  const { isDarkMode } = useCustomTheme();
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
    <Box 
      component="section" 
      sx={{
        padding: '6rem 0',
        background: theme.palette.background.default
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{
          textAlign: 'center',
          maxWidth: 800,
          margin: '0 auto 4rem',
          px: 2
        }}>
          <Chip
            label="Powerful Features"
            sx={{
              background: isDarkMode 
                ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))'
                : 'linear-gradient(135deg, rgba(102, 126, 234, 0.15), rgba(118, 75, 162, 0.15))',
              color: '#667eea',
              px: 2,
              py: 1,
              fontSize: '0.875rem',
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: 'uppercase',
              mb: 3,
              border: '1px solid rgba(102, 126, 234, 0.25)',
              borderRadius: '50px'
            }}
          />
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '3.5rem' },
              fontWeight: 800,
              color: theme.palette.text.primary,
              mb: 3,
              lineHeight: 1.1
            }}
          >
            Everything You Need to{' '}
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Discover Books
            </Box>
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: '1.25rem',
              color: theme.palette.text.secondary,
              lineHeight: 1.6,
              fontWeight: 400
            }}
          >
            From discovering new reads to connecting with fellow book lovers, 
            Readly provides all the tools you need for your literary journey
          </Typography>
        </Box>
        
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 5,
          maxWidth: 1200,
          margin: '0 auto',
          px: 2
        }}>
          {features.map((feature, index) => (
            <Box 
              key={index}
              sx={{
                background: theme.palette.background.paper,
                borderRadius: 5,
                p: 6,
                border: `1px solid ${theme.palette.border.main}`,
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '-50%',
                  right: '-50%',
                  width: '100%',
                  height: '100%',
                  background: `radial-gradient(circle, ${feature.color}08 0%, transparent 70%)`,
                  opacity: 0,
                  transition: 'all 0.4s ease'
                },
                '&:hover': {
                  transform: 'translateY(-12px)',
                  boxShadow: isDarkMode 
                    ? '0 25px 50px rgba(0, 0, 0, 0.4)' 
                    : '0 25px 50px rgba(0, 0, 0, 0.15)',
                  borderColor: feature.color,
                  '&::before': {
                    opacity: 1
                  },
                  '& .feature-icon-wrapper': {
                    transform: 'scale(1.05)',
                    background: feature.gradient,
                    '& .feature-icon': {
                      color: 'white'
                    }
                  }
                }
              }}
            >
              <Box 
                className="feature-icon-wrapper"
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: 4,
                  background: `${feature.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 4,
                  transition: 'all 0.4s ease',
                  position: 'relative',
                  zIndex: 2
                }}
              >
                <Box 
                  className="feature-icon"
                  sx={{
                    fontSize: '2.5rem',
                    color: feature.color,
                    transition: 'all 0.3s ease'
                  }}
                >
                  {feature.icon}
                </Box>
              </Box>
              <Typography 
                variant="h5"
                sx={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: theme.palette.text.primary,
                  mb: 2,
                  position: 'relative',
                  zIndex: 2
                }}
              >
                {feature.title}
              </Typography>
              <Typography 
                variant="body1"
                sx={{
                  color: theme.palette.text.secondary,
                  lineHeight: 1.7,
                  position: 'relative',
                  zIndex: 2,
                  flexGrow: 1
                }}
              >
                {feature.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturesSection;
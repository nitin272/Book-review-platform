
import { Container, Box, Typography, useTheme } from '@mui/material';
import { useTheme as useCustomTheme } from '../../context/ThemeContext';
import {
  MenuBook,
  Star,
  People,
  RateReview
} from '@mui/icons-material';

const StatsSection = () => {
  const theme = useTheme();
  const { isDarkMode } = useCustomTheme();
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
    <Box 
      component="section" 
      sx={{
        padding: '5rem 0',
        background: isDarkMode 
          ? 'linear-gradient(135deg, #1f1f1f 0%, #2d2d2d 100%)' 
          : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isDarkMode
            ? `radial-gradient(circle at 20% 20%, rgba(102, 126, 234, 0.08) 0%, transparent 50%),
               radial-gradient(circle at 80% 80%, rgba(118, 75, 162, 0.08) 0%, transparent 50%)`
            : `radial-gradient(circle at 20% 20%, rgba(102, 126, 234, 0.03) 0%, transparent 50%),
               radial-gradient(circle at 80% 80%, rgba(118, 75, 162, 0.03) 0%, transparent 50%)`
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
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
        
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 4,
          maxWidth: 1200,
          margin: '0 auto',
          px: 2
        }}>
          {stats.map((stat, index) => (
            <Box 
              key={index}
              sx={{
                background: theme.palette.background.paper,
                borderRadius: 4,
                p: 4,
                textAlign: 'center',
                border: `1px solid ${theme.palette.border.main}`,
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: stat.color,
                  transform: 'scaleX(0)',
                  transition: 'transform 0.3s ease'
                },
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: isDarkMode 
                    ? '0 20px 40px rgba(0, 0, 0, 0.4)' 
                    : '0 20px 40px rgba(0, 0, 0, 0.12)',
                  '&::before': {
                    transform: 'scaleX(1)'
                  },
                  '& .stat-icon': {
                    transform: 'scale(1.1) rotate(5deg)'
                  }
                }
              }}
            >
              <Box 
                className="stat-icon"
                sx={{
                  fontSize: '2.5rem',
                  color: stat.color,
                  mb: 2,
                  transition: 'all 0.3s ease'
                }}
              >
                {stat.icon}
              </Box>
              <Typography 
                variant="h3"
                sx={{
                  fontSize: '2.75rem',
                  fontWeight: 800,
                  background: `linear-gradient(135deg, ${stat.color}, ${stat.color}cc)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  mb: 1,
                  lineHeight: 1
                }}
              >
                {stat.number}
              </Typography>
              <Typography 
                variant="body1"
                sx={{
                  color: theme.palette.text.secondary,
                  fontWeight: 500
                }}
              >
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default StatsSection;

import { Container, Box, Typography, Avatar, useTheme } from '@mui/material';
import { useTheme as useCustomTheme } from '../../context/ThemeContext';

const TestimonialsSection = () => {
  const theme = useTheme();
  const { isDarkMode } = useCustomTheme();
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Avid Reader',
      avatar: 'S',
      text: 'Readly has completely transformed how I discover new books. The community recommendations are spot-on and I\'ve found so many hidden gems!'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Book Blogger',
      avatar: 'M',
      text: 'The review system is fantastic. I love how detailed and helpful the community reviews are. It\'s like having a personal book advisor.'
    },
    {
      name: 'Emma Thompson',
      role: 'Literature Student',
      avatar: 'E',
      text: 'Perfect platform for book discussions. The community is so welcoming and I\'ve learned so much from other readers\' perspectives.'
    }
  ];

  return (
    <Box 
      component="section" 
      sx={{
        padding: '6rem 0',
        background: isDarkMode 
          ? 'linear-gradient(135deg, #1f1f1f 0%, #2d2d2d 100%)' 
          : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
      }}
    >
      <Container maxWidth="lg">
        <Box textAlign="center" mb={6}>
          <Typography
            variant="overline"
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 700,
              letterSpacing: 2,
              fontSize: '0.875rem'
            }}
          >
            TESTIMONIALS
          </Typography>
          <Typography
            variant="h3"
            fontWeight={700}
            color={theme.palette.text.primary}
            sx={{ mt: 1, fontSize: { xs: '1.75rem', md: '2.25rem' } }}
          >
            Loved by Readers Worldwide
          </Typography>
        </Box>
        
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: 4,
          maxWidth: 1200,
          margin: '0 auto',
          px: 2
        }}>
          {testimonials.map((testimonial, index) => (
            <Box 
              key={index}
              sx={{
                background: theme.palette.background.paper,
                borderRadius: 5,
                p: 5,
                border: `1px solid ${theme.palette.border.main}`,
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '"“"',
                  position: 'absolute',
                  top: '1rem',
                  left: '2rem',
                  fontSize: '4rem',
                  color: isDarkMode ? 'rgba(102, 126, 234, 0.2)' : 'rgba(102, 126, 234, 0.15)',
                  fontFamily: 'serif',
                  lineHeight: 1
                },
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: isDarkMode 
                    ? '0 20px 40px rgba(0, 0, 0, 0.4)' 
                    : '0 20px 40px rgba(0, 0, 0, 0.1)'
                }
              }}
            >
              <Typography 
                variant="body1"
                sx={{
                  fontSize: '1.125rem',
                  color: theme.palette.text.primary,
                  lineHeight: 1.7,
                  mb: 4,
                  fontStyle: 'italic',
                  position: 'relative',
                  zIndex: 2
                }}
              >
                "{testimonial.text}"
              </Typography>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2
              }}>
                <Avatar
                  sx={{
                    width: 50,
                    height: 50,
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '1.25rem'
                  }}
                >
                  {testimonial.avatar}
                </Avatar>
                <Box>
                  <Typography 
                    variant="body1"
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.text.primary,
                      mb: 0.5
                    }}
                  >
                    {testimonial.name}
                  </Typography>
                  <Typography 
                    variant="body2"
                    sx={{
                      fontSize: '0.875rem',
                      color: theme.palette.text.secondary
                    }}
                  >
                    {testimonial.role}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default TestimonialsSection;

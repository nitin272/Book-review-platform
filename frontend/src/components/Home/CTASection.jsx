import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useTheme as useCustomTheme } from '../../context/ThemeContext';
import { Container, Button, Box, Typography, useTheme } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';

const CTASection = () => {
  const { user } = useContext(AuthContext);
  const theme = useTheme();
  const { isDarkMode } = useCustomTheme();

  return (
    <Box 
      component="section" 
      sx={{
        padding: '6rem 0',
        background: isDarkMode 
          ? 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)' 
          : 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 20% 80%, rgba(102, 126, 234, 0.1) 0%, transparent 50%),
                       radial-gradient(circle at 80% 20%, rgba(118, 75, 162, 0.1) 0%, transparent 50%)`
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{
          textAlign: 'center',
          maxWidth: 700,
          margin: '0 auto',
          px: 2
        }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 800,
              mb: 3,
              lineHeight: 1.2,
              color: 'white'
            }}
          >
            Ready to Start Your Reading Journey?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: '1.25rem',
              opacity: 0.9,
              mb: 6,
              lineHeight: 1.6,
              color: 'white'
            }}
          >
            Join thousands of readers and discover your next favorite book today
          </Typography>
          
          <Box sx={{
            display: 'flex',
            gap: 2,
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {user ? (
              <Button
                component={Link}
                to="/add-book"
                variant="contained"
                size="large"
                endIcon={<ArrowForward />}
                sx={{
                  py: 2,
                  px: 6,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  backgroundColor: 'white',
                  color: '#1a1a1a',
                  borderRadius: 3,
                  textTransform: 'none',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }
                }}
              >
                Add Your First Book
              </Button>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/signup"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{
                    py: 2,
                    px: 6,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    backgroundColor: 'white',
                    color: '#1a1a1a',
                    borderRadius: 3,
                    textTransform: 'none',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }
                  }}
                >
                  Get Started Free
                </Button>
                <Button
                  component={Link}
                  to="/login"
                  variant="outlined"
                  size="large"
                  sx={{
                    py: 2,
                    px: 6,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderColor: 'rgba(255,255,255,0.5)',
                    color: 'white',
                    borderRadius: 3,
                    textTransform: 'none',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  Sign In
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CTASection;
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Container, Button } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';

const CTASection = () => {
  const { user } = useContext(AuthContext);

  return (
    <section className="cta-section" style={{ padding: '6rem 0' }}>
      <Container maxWidth="lg">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Start Your Reading Journey?</h2>
          <p className="cta-subtitle">
            Join thousands of readers and discover your next favorite book today
          </p>
          
          <div className="cta-buttons">
            {user ? (
              <Button
                component={Link}
                to="/add-book"
                variant="contained"
                size="large"
                endIcon={<ArrowForward />}
                sx={{
                  py: 1.5,
                  px: 4,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  backgroundColor: 'white',
                  color: 'text.primary',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                    transform: 'translateY(-2px)'
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
                    py: 1.5,
                    px: 4,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    backgroundColor: 'white',
                    color: 'text.primary',
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                      transform: 'translateY(-2px)'
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
                    py: 1.5,
                    px: 4,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderColor: 'rgba(255,255,255,0.5)',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  Sign In
                </Button>
              </>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CTASection;
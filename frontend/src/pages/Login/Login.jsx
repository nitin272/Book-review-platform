import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  Container,
  Stack,
  Chip,
  CircularProgress,
  Fade,
  useTheme
} from '@mui/material';
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Google,
  ArrowForward
} from '@mui/icons-material';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData.email, formData.password);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  const handleGoogleLogin = () => {
    setError('Google authentication will be available soon');
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: '#fafafa',
      display: 'flex'
    }}>
      {/* Left Side - Branding */}
      <Box sx={{
        flex: 1,
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: 6,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Pattern */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.05) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 0%, transparent 50%)`,
        }} />

        <Box sx={{ position: 'relative', textAlign: 'center', maxWidth: 400 }}>
          <Typography variant="h2" sx={{
            color: 'white',
            fontWeight: 800,
            mb: 2,
            fontSize: { xs: '2rem', md: '3rem' }
          }}>
            Readly
          </Typography>
          <Typography variant="h6" sx={{
            color: 'rgba(255,255,255,0.8)',
            mb: 4,
            lineHeight: 1.6
          }}>
            Discover, review, and share your favorite books with a community of passionate readers
          </Typography>

          <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap" gap={1}>
            <Chip label="10k+ Books" variant="outlined" sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }} />
            <Chip label="5k+ Reviews" variant="outlined" sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }} />
            <Chip label="Active Community" variant="outlined" sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }} />
          </Stack>
        </Box>
      </Box>

      {/* Right Side - Login Form */}
      <Box sx={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3
      }}>
        <Container maxWidth="sm">
          <Fade in timeout={800}>
            <Box sx={{
              background: 'white',
              borderRadius: 3,
              p: { xs: 4, sm: 6 },
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              border: '1px solid #e5e7eb',
              maxWidth: 480,
              mx: 'auto'
            }}>
              {/* Header */}
              <Box mb={4}>
                <Typography variant="h4" fontWeight={700} color="text.primary" gutterBottom>
                  Welcome back
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Sign in to your account to continue
                </Typography>
              </Box>

              {/* Google Button */}
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Google />}
                onClick={handleGoogleLogin}
                sx={{
                  mb: 3,
                  py: 1.5,
                  textTransform: 'none',
                  borderColor: '#e5e7eb',
                  color: '#374151',
                  fontWeight: 500,
                  '&:hover': {
                    borderColor: '#d1d5db',
                    backgroundColor: '#f9fafb'
                  }
                }}
              >
                Continue with Google
              </Button>

              {/* Divider */}
              <Box sx={{ position: 'relative', mb: 3 }}>
                <Box sx={{
                  position: 'absolute',
                  top: '50%',
                  left: 0,
                  right: 0,
                  height: '1px',
                  backgroundColor: '#e5e7eb'
                }} />
                <Typography
                  variant="body2"
                  sx={{
                    textAlign: 'center',
                    backgroundColor: 'white',
                    px: 2,
                    color: '#6b7280',
                    display: 'inline-block',
                    position: 'relative',
                    left: '50%',
                    transform: 'translateX(-50%)'
                  }}
                >
                  or
                </Typography>
              </Box>

              {/* Error Alert */}
              {error && (
                <Alert
                  severity="error"
                  sx={{
                    mb: 3,
                    borderRadius: 2,
                    '& .MuiAlert-message': { fontSize: '0.875rem' }
                  }}
                  onClose={() => setError('')}
                >
                  {error}
                </Alert>
              )}

              {/* Form */}
              <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Email address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '& fieldset': {
                          borderColor: '#e5e7eb',
                        },
                        '&:hover fieldset': {
                          borderColor: '#d1d5db',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: theme.palette.primary.main,
                          borderWidth: 2,
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#6b7280',
                        '&.Mui-focused': {
                          color: theme.palette.primary.main,
                        },
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            sx={{ color: '#6b7280' }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '& fieldset': {
                          borderColor: '#e5e7eb',
                        },
                        '&:hover fieldset': {
                          borderColor: '#d1d5db',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: theme.palette.primary.main,
                          borderWidth: 2,
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#6b7280',
                        '&.Mui-focused': {
                          color: theme.palette.primary.main,
                        },
                      },
                    }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={loading}
                    endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <ArrowForward />}
                    sx={{
                      py: 1.5,
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '1rem',
                      borderRadius: 2,
                      backgroundColor: '#1f2937',
                      '&:hover': {
                        backgroundColor: '#111827',
                      },
                      '&:disabled': {
                        backgroundColor: '#9ca3af',
                      },
                    }}
                  >
                    {loading ? 'Signing in...' : 'Sign in'}
                  </Button>
                </Stack>
              </Box>

              {/* Footer */}
              <Box textAlign="center" mt={4}>
                <Typography variant="body2" color="text.secondary">
                  Don't have an account?{' '}
                  <Link
                    to="/signup"
                    style={{
                      color: theme.palette.primary.main,
                      textDecoration: 'none',
                      fontWeight: 600
                    }}
                  >
                    Sign up
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Fade>
        </Container>
      </Box>
    </Box>
  );
};

export default Login;
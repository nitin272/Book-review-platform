import { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useTheme as useCustomTheme } from '../../context/ThemeContext';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Drawer,
  useTheme,
  useMediaQuery,
  Divider,
  Fade,
  Tooltip
} from '@mui/material';
import {
  MenuBook,
  Menu as MenuIcon,
  Add,
  Logout,
  AccountCircle,
  Settings,
  Search,
  KeyboardArrowDown,
  Close,
  LightMode,
  DarkMode
} from '@mui/icons-material';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { isDarkMode, toggleTheme } = useCustomTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setAnchorEl(null);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { label: 'Books', path: '/books', description: 'Browse books' },
    { label: 'Community', path: '/community', description: 'Join discussions' },
    { label: 'Reviews', path: '/reviews', description: 'Read reviews' }
  ];

  const drawer = (
    <Box sx={{ 
      width: 320, 
      height: '100%', 
      background: theme.palette.background.default,
      color: theme.palette.text.primary
    }}>
      {/* Mobile Header */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 3,
        borderBottom: `1px solid ${theme.palette.border.light}`
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{
            width: 32,
            height: 32,
            background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <MenuBook sx={{ color: 'white', fontSize: 18 }} />
          </Box>
          <Typography variant="h6" fontWeight={700} color={theme.palette.text.primary}>
            Readly
          </Typography>
        </Box>
        <IconButton onClick={handleDrawerToggle} sx={{ color: theme.palette.text.secondary }}>
          <Close />
        </IconButton>
      </Box>

      {/* Navigation Items */}
      <Box sx={{ p: 2 }}>
        {navItems.map((item) => (
          <Box
            key={item.label}
            component={Link}
            to={item.path}
            onClick={handleDrawerToggle}
            sx={{
              display: 'block',
              p: 2,
              borderRadius: 2,
              mb: 1,
              textDecoration: 'none',
              color: isActive(item.path) ? theme.palette.text.primary : theme.palette.text.secondary,
              backgroundColor: isActive(item.path) ? theme.palette.background.tertiary : 'transparent',
              '&:hover': {
                backgroundColor: theme.palette.background.secondary,
                color: theme.palette.text.primary
              }
            }}
          >
            <Typography variant="body1" fontWeight={600} sx={{ mb: 0.5 }}>
              {item.label}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.description}
            </Typography>
          </Box>
        ))}
      </Box>

      <Divider sx={{ mx: 2 }} />

      {/* User Section */}
      <Box sx={{ p: 2 }}>
        {user ? (
          <>
            <Box
              component={Link}
              to="/add-book"
              onClick={handleDrawerToggle}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 2,
                borderRadius: 2,
                mb: 1,
                textDecoration: 'none',
                color: theme.palette.text.secondary,
                '&:hover': {
                  backgroundColor: theme.palette.background.secondary,
                  color: theme.palette.text.primary
                }
              }}
            >
              <Add sx={{ fontSize: 20 }} />
              <Typography variant="body1" fontWeight={500}>
                Add Book
              </Typography>
            </Box>
            <Box
              component={Link}
              to="/profile"
              onClick={handleDrawerToggle}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 2,
                borderRadius: 2,
                mb: 1,
                textDecoration: 'none',
                color: theme.palette.text.secondary,
                '&:hover': {
                  backgroundColor: theme.palette.background.secondary,
                  color: theme.palette.text.primary
                }
              }}
            >
              <AccountCircle sx={{ fontSize: 20 }} />
              <Typography variant="body1" fontWeight={500}>
                Profile
              </Typography>
            </Box>
            {/* Theme Toggle */}
            <Box
              onClick={toggleTheme}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 2,
                borderRadius: 2,
                mb: 1,
                cursor: 'pointer',
                color: theme.palette.text.secondary,
                '&:hover': {
                  backgroundColor: theme.palette.background.secondary,
                  color: theme.palette.text.primary
                }
              }}
            >
              {isDarkMode ? <LightMode sx={{ fontSize: 20 }} /> : <DarkMode sx={{ fontSize: 20 }} />}
              <Typography variant="body1" fontWeight={500}>
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </Typography>
            </Box>
            <Box
              onClick={handleLogout}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 2,
                borderRadius: 2,
                cursor: 'pointer',
                color: theme.palette.text.secondary,
                '&:hover': {
                  backgroundColor: theme.palette.background.secondary,
                  color: theme.palette.text.primary
                }
              }}
            >
              <Logout sx={{ fontSize: 20 }} />
              <Typography variant="body1" fontWeight={500}>
                Sign Out
              </Typography>
            </Box>
          </>
        ) : (
          <>
            <Button
              component={Link}
              to="/login"
              onClick={handleDrawerToggle}
              fullWidth
              variant="outlined"
              sx={{
                mb: 2,
                py: 1.5,
                textTransform: 'none',
                fontWeight: 600,
                borderColor: '#e5e7eb',
                color: '#374151',
                borderRadius: 2,
                '&:hover': {
                  borderColor: '#d1d5db',
                  backgroundColor: '#f9fafb'
                }
              }}
            >
              Sign In
            </Button>
            <Button
              component={Link}
              to="/signup"
              onClick={handleDrawerToggle}
              fullWidth
              variant="contained"
              sx={{
                py: 1.5,
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 2,
                backgroundColor: '#1f2937',
                '&:hover': {
                  backgroundColor: '#111827'
                }
              }}
            >
              Get Started
            </Button>
          </>
        )}
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: theme.palette.navbar.background,
          backdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${theme.palette.navbar.border}`,
          color: theme.palette.text.primary,
          zIndex: 1100
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ px: { xs: 2, sm: 3 }, py: 1.5, minHeight: '72px !important' }}>
            {/* Logo */}
            <Box
              component={Link}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                textDecoration: 'none',
                color: 'inherit',
                mr: { xs: 2, lg: 8 }
              }}
            >
              <Box sx={{
                width: 40,
                height: 40,
                background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                borderRadius: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}>
                <MenuBook sx={{ color: 'white', fontSize: 22 }} />
              </Box>
              <Typography
                variant="h5"
                fontWeight={800}
                sx={{ color: theme.palette.text.primary, fontSize: '1.4rem' }}
              >
                Readly
              </Typography>
            </Box>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 6 }}>
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    component={Link}
                    to={item.path}
                    sx={{
                      color: isActive(item.path) ? theme.palette.text.primary : theme.palette.text.secondary,
                      fontWeight: isActive(item.path) ? 700 : 600,
                      textTransform: 'none',
                      px: 4,
                      py: 2,
                      borderRadius: 3,
                      fontSize: '1rem',
                      position: 'relative',
                      minHeight: 44,
                      '&:hover': {
                        backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)',
                        color: theme.palette.text.primary,
                        transform: 'translateY(-1px)'
                      },
                      '&::after': isActive(item.path) ? {
                        content: '""',
                        position: 'absolute',
                        bottom: 4,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '24px',
                        height: '3px',
                        backgroundColor: theme.palette.text.primary,
                        borderRadius: '2px'
                      } : {}
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}

            <Box sx={{ flexGrow: 1 }} />

            {/* Search Bar (Desktop) */}
            {!isMobile && (
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: theme.palette.background.secondary,
                borderRadius: 3,
                px: 3,
                py: 1.5,
                mr: 4,
                minWidth: 280,
                border: `1px solid ${theme.palette.border.main}`,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: theme.palette.border.dark,
                  backgroundColor: theme.palette.background.tertiary,
                  transform: 'translateY(-1px)',
                  boxShadow: isDarkMode ? '0 4px 6px -1px rgba(0, 0, 0, 0.3)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }
              }}>
                <Search sx={{ color: theme.palette.text.tertiary, fontSize: 22, mr: 2 }} />
                <Typography variant="body1" sx={{ color: theme.palette.text.tertiary, fontWeight: 500 }}>
                  Search books...
                </Typography>
              </Box>
            )}

            {/* Desktop Auth Section */}
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                {user ? (
                  <>
                    {/* Theme Toggle */}
                    <Tooltip title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
                      <IconButton 
                        onClick={toggleTheme}
                        sx={{
                          color: theme.palette.text.secondary,
                          width: 48,
                          height: 48,
                          borderRadius: 3,
                          '&:hover': { 
                            backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)',
                            transform: 'translateY(-1px)'
                          }
                        }}
                      >
                        {isDarkMode ? <LightMode sx={{ fontSize: 24 }} /> : <DarkMode sx={{ fontSize: 24 }} />}
                      </IconButton>
                    </Tooltip>

                    {/* Add Book Button */}
                    <Button
                      component={Link}
                      to="/add-book"
                      variant="outlined"
                      startIcon={<Add sx={{ fontSize: 20 }} />}
                      sx={{
                        textTransform: 'none',
                        borderRadius: 3,
                        fontWeight: 600,
                        px: 4,
                        py: 1.5,
                        borderColor: theme.palette.border.main,
                        color: theme.palette.text.secondary,
                        fontSize: '1rem',
                        minHeight: 48,
                        '&:hover': {
                          borderColor: theme.palette.border.dark,
                          backgroundColor: theme.palette.background.secondary,
                          transform: 'translateY(-1px)',
                          boxShadow: isDarkMode ? '0 4px 6px -1px rgba(0, 0, 0, 0.3)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }
                      }}
                    >
                      Add Book
                    </Button>

                    {/* User Profile */}
                    <Button
                      onClick={handleProfileMenuOpen}
                      sx={{
                        textTransform: 'none',
                        borderRadius: 3,
                        px: 3,
                        py: 1.5,
                        color: theme.palette.text.secondary,
                        minWidth: 'auto',
                        minHeight: 48,
                        '&:hover': {
                          backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)',
                          transform: 'translateY(-1px)'
                        }
                      }}
                      endIcon={<KeyboardArrowDown sx={{ fontSize: 18 }} />}
                    >
                      <Avatar
                        sx={{
                          bgcolor: '#1f2937',
                          width: 36,
                          height: 36,
                          fontSize: '1rem',
                          mr: 2,
                          fontWeight: 600
                        }}
                      >
                        {user.name?.charAt(0).toUpperCase()}
                      </Avatar>
                      <Box sx={{ textAlign: 'left' }}>
                        <Typography variant="body1" fontWeight={700} sx={{ lineHeight: 1.2, color: theme.palette.text.primary }}>
                          {user.name?.split(' ')[0]}
                        </Typography>
                        <Typography variant="body2" sx={{ color: theme.palette.text.tertiary, lineHeight: 1 }}>
                          {user.email?.length > 18 ? `${user.email.substring(0, 18)}...` : user.email}
                        </Typography>
                      </Box>
                    </Button>
                  </>
                ) : (
                  <>
                    {/* Theme Toggle for non-authenticated users */}
                    <Tooltip title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
                      <IconButton 
                        onClick={toggleTheme}
                        sx={{
                          color: theme.palette.text.secondary,
                          width: 48,
                          height: 48,
                          borderRadius: 3,
                          mr: 2,
                          '&:hover': { 
                            backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)',
                            transform: 'translateY(-1px)'
                          }
                        }}
                      >
                        {isDarkMode ? <LightMode sx={{ fontSize: 24 }} /> : <DarkMode sx={{ fontSize: 24 }} />}
                      </IconButton>
                    </Tooltip>
                    <Button
                      component={Link}
                      to="/login"
                      sx={{
                        textTransform: 'none',
                        color: theme.palette.text.secondary,
                        fontWeight: 600,
                        px: 4,
                        py: 1.5,
                        borderRadius: 3,
                        fontSize: '1rem',
                        minHeight: 48,
                        '&:hover': {
                          backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)',
                          color: theme.palette.text.primary,
                          transform: 'translateY(-1px)'
                        }
                      }}
                    >
                      Sign In
                    </Button>
                    <Button
                      component={Link}
                      to="/signup"
                      variant="contained"
                      sx={{
                        textTransform: 'none',
                        borderRadius: 3,
                        px: 5,
                        py: 1.5,
                        fontWeight: 700,
                        fontSize: '1rem',
                        minHeight: 48,
                        backgroundColor: isDarkMode ? '#ffffff' : '#1f2937',
                        color: isDarkMode ? '#000000' : '#ffffff',
                        boxShadow: isDarkMode ? '0 4px 6px -1px rgba(0, 0, 0, 0.3)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        '&:hover': {
                          backgroundColor: isDarkMode ? '#f3f4f6' : '#111827',
                          boxShadow: isDarkMode ? '0 10px 15px -3px rgba(0, 0, 0, 0.3)' : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                          transform: 'translateY(-2px)'
                        }
                      }}
                    >
                      Get Started
                    </Button>
                  </>
                )}
              </Box>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {/* Theme Toggle for Mobile */}
                <Tooltip title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
                  <IconButton 
                    onClick={toggleTheme}
                    sx={{
                      color: theme.palette.text.secondary,
                      width: 48,
                      height: 48,
                      borderRadius: 3,
                      '&:hover': { 
                        backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)',
                        transform: 'translateY(-1px)'
                      }
                    }}
                  >
                    {isDarkMode ? <LightMode sx={{ fontSize: 24 }} /> : <DarkMode sx={{ fontSize: 24 }} />}
                  </IconButton>
                </Tooltip>
                <IconButton
                  onClick={handleDrawerToggle}
                  sx={{
                    color: theme.palette.text.secondary,
                    width: 48,
                    height: 48,
                    borderRadius: 3,
                    '&:hover': { 
                      backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)',
                      transform: 'translateY(-1px)'
                    }
                  }}
                >
                  <MenuIcon sx={{ fontSize: 24 }} />
                </IconButton>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        slotProps={{
          paper: {
            sx: {
              mt: 1.5,
              borderRadius: 3,
              minWidth: 280,
              backgroundColor: theme.palette.background.paper,
              boxShadow: isDarkMode ? '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)' : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              border: `1px solid ${theme.palette.border.main}`,
              py: 1
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* User Info Header */}
        <Box sx={{ px: 4, py: 3, borderBottom: `1px solid ${theme.palette.border.light}` }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Avatar
              sx={{
                bgcolor: isDarkMode ? '#ffffff' : '#1f2937',
                color: isDarkMode ? '#000000' : '#ffffff',
                width: 48,
                height: 48,
                fontSize: '1.2rem',
                fontWeight: 700
              }}
            >
              {user?.name?.charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight={700} sx={{ color: theme.palette.text.primary }}>
                {user?.name}
              </Typography>
              <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                {user?.email}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Menu Items */}
        <MenuItem
          component={Link}
          to="/profile"
          onClick={handleMenuClose}
          sx={{
            px: 4,
            py: 2.5,
            gap: 3,
            minHeight: 64,
            '&:hover': { backgroundColor: theme.palette.background.secondary }
          }}
        >
          <AccountCircle sx={{ fontSize: 24, color: theme.palette.text.secondary }} />
          <Box>
            <Typography variant="body1" fontWeight={600} sx={{ color: theme.palette.text.primary }}>Profile</Typography>
            <Typography variant="body2" sx={{ color: theme.palette.text.tertiary }}>
              Manage your account
            </Typography>
          </Box>
        </MenuItem>

        <MenuItem
          component={Link}
          to="/settings"
          onClick={handleMenuClose}
          sx={{
            px: 4,
            py: 2.5,
            gap: 3,
            minHeight: 64,
            '&:hover': { backgroundColor: theme.palette.background.secondary }
          }}
        >
          <Settings sx={{ fontSize: 24, color: theme.palette.text.secondary }} />
          <Box>
            <Typography variant="body1" fontWeight={600} sx={{ color: theme.palette.text.primary }}>Settings</Typography>
            <Typography variant="body2" sx={{ color: theme.palette.text.tertiary }}>
              Preferences & privacy
            </Typography>
          </Box>
        </MenuItem>

        <Divider sx={{ my: 2 }} />

        <MenuItem
          onClick={handleLogout}
          sx={{
            px: 4,
            py: 2.5,
            gap: 3,
            minHeight: 64,
            '&:hover': { backgroundColor: isDarkMode ? 'rgba(239, 68, 68, 0.1)' : '#fef2f2' }
          }}
        >
          <Logout sx={{ fontSize: 24, color: '#ef4444' }} />
          <Box>
            <Typography variant="body1" fontWeight={600} sx={{ color: '#ef4444' }}>
              Sign Out
            </Typography>
            <Typography variant="body2" sx={{ color: theme.palette.text.tertiary }}>
              Sign out of your account
            </Typography>
          </Box>
        </MenuItem>
      </Menu>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 320,
            border: 'none',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          },
        }}
      >
        <Fade in={mobileOpen} timeout={200}>
          <Box>{drawer}</Box>
        </Fade>
      </Drawer>
    </>
  );
};

export default Navbar;
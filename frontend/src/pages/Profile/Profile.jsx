import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { bookAPI, reviewAPI } from '../../services/api';
import { useTheme } from '@mui/material/styles';
import { useTheme as useCustomTheme } from '../../context/ThemeContext';
import {
  Box,
  Typography,
  Avatar,
  Tabs,
  Tab,
  Button,
  Rating,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Skeleton,
  Fade,
  Zoom,
  CircularProgress
} from '@mui/material';
import {
  MenuBook,
  RateReview,
  Settings,
  MoreVert,
  Edit,
  Delete,
  Visibility,
  Add,
  Star,
  BookmarkBorder
} from '@mui/icons-material';
import ReviewsChart from '../../components/Charts/ReviewsChart';
import RatingDistributionChart from '../../components/Charts/RatingDistributionChart';

const Profile = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const { isDarkMode } = useCustomTheme();

  const [activeTab, setActiveTab] = useState(0);
  const [userBooks, setUserBooks] = useState([]);
  const [userReviews, setUserReviews] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteType, setDeleteType] = useState('');


  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    navigate('/login');
    return null;
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    setDataLoading(true);
    try {

      const booksResponse = await bookAPI.getUserBooks();
      if (booksResponse.data.success) {
        setUserBooks(booksResponse.data.data || []);
      }


      const reviewsResponse = await reviewAPI.getUserReviews();
      if (reviewsResponse.data.success) {
        setUserReviews(reviewsResponse.data.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch user data:', err);
      setUserBooks([]);
      setUserReviews([]);
    } finally {
      setDataLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleMenuOpen = (event, item, type) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
    setDeleteType(type);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
  };

  const handleEdit = () => {
    if (deleteType === 'book') {
      navigate(`/books/${selectedItem.id}/edit`);
    } else if (deleteType === 'review') {
      navigate(`/books/${selectedItem.book?.id}/review?edit=${selectedItem.id}`);
    }
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
    handleMenuClose();
  };

  const handleDeleteConfirm = async () => {
    try {
      if (deleteType === 'book') {
        setUserBooks(prev => prev.filter(book => book.id !== selectedItem.id));
      } else if (deleteType === 'review') {
        setUserReviews(prev => prev.filter(review => review.id !== selectedItem.id));
      }
    } catch (err) {
      console.error('Failed to delete:', err);
    }
    setDeleteDialogOpen(false);
    setSelectedItem(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getAverageRating = () => {
    if (userReviews.length === 0) return 0;
    const sum = userReviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / userReviews.length).toFixed(1);
  };

  const getStats = () => {
    return {
      booksAdded: userBooks.length,
      reviewsWritten: userReviews.length,
      averageRating: getAverageRating(),
      totalReviewsReceived: userBooks.reduce((acc, book) => acc + book.reviewCount, 0)
    };
  };

  const stats = getStats();

  const renderLoadingSkeleton = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {[...Array(3)].map((_, index) => (
        <Fade in key={index} timeout={600 + index * 200}>
          <Box
            sx={{
              background: theme.palette.background.paper,
              borderRadius: 4,
              p: 4,
              border: `1px solid ${theme.palette.border.main}`,
              boxShadow: isDarkMode 
                ? '0 1px 3px 0 rgba(0, 0, 0, 0.3)' 
                : '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <Box sx={{ flex: 1, mr: 2 }}>
                <Skeleton variant="text" width="65%" height={28} />
                <Skeleton variant="text" width="45%" height={22} />
                <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                  <Skeleton variant="rectangular" width={70} height={24} sx={{ borderRadius: 1 }} />
                  <Skeleton variant="rectangular" width={60} height={24} sx={{ borderRadius: 1 }} />
                </Box>
                <Skeleton variant="text" width={140} height={18} sx={{ mt: 1 }} />
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Skeleton variant="rectangular" width={80} height={36} sx={{ borderRadius: 1 }} />
                <Skeleton variant="circular" width={36} height={36} />
              </Box>
            </Box>
          </Box>
        </Fade>
      ))}
    </Box>
  );

  return (
    <Box 
      className="profile-page"
      sx={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        minHeight: '100vh'
      }}
    >
      <Box sx={{ maxWidth: 1200, margin: '0 auto', p: { xs: 2, md: 4 } }}>
        {/* Modern Profile Header */}
        <Zoom in timeout={800}>
          <Box
            sx={{
              background: isDarkMode 
                ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)' 
                : 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
              borderRadius: 6,
              p: { xs: 4, md: 6 },
              mb: 6,
              position: 'relative',
              overflow: 'hidden',
              boxShadow: isDarkMode 
                ? '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)' 
                : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
                            radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)`
              }
            }}
          >
            <Box
              sx={{
                position: 'relative',
                zIndex: 1,
                display: 'flex',
                alignItems: 'center',
                gap: { xs: 4, md: 6 },
                flexDirection: { xs: 'column', md: 'row' },
                textAlign: { xs: 'center', md: 'left' }
              }}
            >
              {/* Avatar Section */}
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  fontSize: '3rem',
                  fontWeight: 700,
                  border: '4px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                {user.name?.charAt(0).toUpperCase()}
              </Avatar>

              {/* User Info */}
              <Box sx={{ flex: 1, color: 'white' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    mb: 4,
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: { xs: 'center', md: 'flex-start' },
                    gap: { xs: 2, md: 0 }
                  }}
                >
                  <Box>
                    <Typography
                      variant="h3"
                      sx={{
                        fontSize: '2.5rem',
                        fontWeight: 800,
                        mb: 1,
                        background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}
                    >
                      {user.name}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontSize: '1.1rem',
                        fontWeight: 500
                      }}
                    >
                      {user.email}
                    </Typography>
                  </Box>

                  <IconButton
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: 3,
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        transform: 'translateY(-2px)'
                      }
                    }}
                    size="large"
                  >
                    <Settings />
                  </IconButton>
                </Box>

                {/* Stats Grid */}
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
                    gap: { xs: 2, md: 4 }
                  }}
                >
                  {[
                    { number: stats.booksAdded, label: 'Books Added', timeout: 1000 },
                    { number: stats.reviewsWritten, label: 'Reviews Written', timeout: 1200 },
                    { number: stats.averageRating, label: 'Avg Rating', timeout: 1400 },
                    { number: stats.totalReviewsReceived, label: 'Total Reviews', timeout: 1600 }
                  ].map((stat, index) => (
                    <Zoom in timeout={stat.timeout} key={index}>
                      <Box
                        sx={{
                          textAlign: 'center',
                          p: 3,
                          background: 'rgba(255, 255, 255, 0.1)',
                          borderRadius: 4,
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            background: 'rgba(255, 255, 255, 0.15)',
                            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)'
                          }
                        }}
                      >
                        <Typography
                          variant="h4"
                          sx={{
                            fontSize: '2rem',
                            fontWeight: 800,
                            mb: 1,
                            background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                          }}
                        >
                          {stat.number}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'rgba(255, 255, 255, 0.8)',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: 0.5
                          }}
                        >
                          {stat.label}
                        </Typography>
                      </Box>
                    </Zoom>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </Zoom>

        {/* Content Grid Layout */}
        <Fade in timeout={1000}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' },
              gap: 4
            }}
          >
            {/* Main Content */}
            <Box>
              <Box sx={{ mb: 4 }}>
                <Tabs
                  value={activeTab}
                  onChange={handleTabChange}
                  sx={{
                    background: theme.palette.background.paper,
                    borderRadius: 4,
                    p: 1,
                    boxShadow: isDarkMode 
                      ? '0 4px 6px -1px rgba(0, 0, 0, 0.3)' 
                      : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    border: `1px solid ${theme.palette.border.main}`,
                    '& .MuiTabs-indicator': {
                      background: isDarkMode 
                        ? 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)' 
                        : 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                      height: 3,
                      borderRadius: 3
                    }
                  }}
                >
                  <Tab 
                    icon={<MenuBook />} 
                    label={`My Books (${userBooks.length})`} 
                    iconPosition="start"
                    sx={{
                      textTransform: 'none',
                      fontWeight: 600,
                      color: theme.palette.text.secondary,
                      borderRadius: 3,
                      margin: '0 0.25rem',
                      minHeight: 48,
                      '&.Mui-selected': {
                        color: theme.palette.text.primary
                      }
                    }}
                  />
                  <Tab 
                    icon={<RateReview />} 
                    label={`My Reviews (${userReviews.length})`} 
                    iconPosition="start"
                    sx={{
                      textTransform: 'none',
                      fontWeight: 600,
                      color: theme.palette.text.secondary,
                      borderRadius: 3,
                      margin: '0 0.25rem',
                      minHeight: 48,
                      '&.Mui-selected': {
                        color: theme.palette.text.primary
                      }
                    }}
                  />
                </Tabs>
              </Box>

              <Box>
                {dataLoading ? (
                  renderLoadingSkeleton()
                ) : (
                  <>
                    {/* My Books Tab */}
                    {activeTab === 0 && (
                      <Fade in timeout={600}>
                        <Box>
                          {userBooks.length === 0 ? (
                            <Box
                              sx={{
                                textAlign: 'center',
                                py: 8,
                                px: 4,
                                background: theme.palette.background.paper,
                                borderRadius: 4,
                                border: `1px solid ${theme.palette.border.main}`
                              }}
                            >
                              <BookmarkBorder 
                                sx={{ 
                                  fontSize: 80, 
                                  color: theme.palette.text.tertiary, 
                                  mb: 2 
                                }} 
                              />
                              <Typography 
                                variant="h5"
                                sx={{
                                  fontWeight: 600,
                                  color: theme.palette.text.primary,
                                  mb: 1
                                }}
                              >
                                No books in your library yet
                              </Typography>
                              <Typography 
                                variant="body1"
                                sx={{
                                  color: theme.palette.text.secondary,
                                  mb: 4,
                                  maxWidth: 400,
                                  mx: 'auto'
                                }}
                              >
                                Start building your personal library by adding books you've read or want to read
                              </Typography>
                              <Button
                                component={Link}
                                to="/add-book"
                                variant="contained"
                                startIcon={<Add />}
                                sx={{
                                  borderRadius: 2,
                                  textTransform: 'none',
                                  fontWeight: 600,
                                  px: 4,
                                  py: 1.5,
                                  backgroundColor: isDarkMode ? '#ffffff' : '#1f2937',
                                  color: isDarkMode ? '#000000' : '#ffffff',
                                  '&:hover': {
                                    backgroundColor: isDarkMode ? '#f3f4f6' : '#111827'
                                  }
                                }}
                              >
                                Add Your First Book
                              </Button>
                            </Box>
                          ) : (
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                              {userBooks.map((book, index) => (
                                <Fade in timeout={400 + index * 100} key={book.id}>
                                  <Box
                                    sx={{
                                      background: theme.palette.background.paper,
                                      borderRadius: 4,
                                      p: 4,
                                      border: `1px solid ${theme.palette.border.main}`,
                                      boxShadow: isDarkMode 
                                        ? '0 1px 3px 0 rgba(0, 0, 0, 0.3)' 
                                        : '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                                      transition: 'all 0.2s ease',
                                      '&:hover': {
                                        borderColor: theme.palette.border.dark,
                                        boxShadow: isDarkMode 
                                          ? '0 4px 6px -1px rgba(0, 0, 0, 0.4)' 
                                          : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                      }
                                    }}
                                  >
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                      <Box sx={{ flex: 1, mr: 2 }}>
                                        <Typography 
                                          variant="h6"
                                          sx={{
                                            fontWeight: 600,
                                            color: theme.palette.text.primary,
                                            mb: 1
                                          }}
                                        >
                                          {book.title}
                                        </Typography>
                                        <Typography 
                                          variant="body2"
                                          sx={{
                                            color: theme.palette.text.secondary,
                                            mb: 2
                                          }}
                                        >
                                          by {book.author}
                                        </Typography>
                                        
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                                          <Box
                                            sx={{
                                              px: 2,
                                              py: 0.5,
                                              backgroundColor: theme.palette.background.secondary,
                                              borderRadius: 2,
                                              fontSize: '0.75rem',
                                              fontWeight: 500,
                                              color: theme.palette.text.secondary
                                            }}
                                          >
                                            {book.genre}
                                          </Box>
                                          <Box
                                            sx={{
                                              px: 2,
                                              py: 0.5,
                                              backgroundColor: theme.palette.background.secondary,
                                              borderRadius: 2,
                                              fontSize: '0.75rem',
                                              fontWeight: 500,
                                              color: theme.palette.text.secondary
                                            }}
                                          >
                                            {book.publishedYear}
                                          </Box>
                                        </Box>
                                        
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                                          <Rating 
                                            value={book.averageRating} 
                                            precision={0.1} 
                                            readOnly 
                                            size="small"
                                          />
                                          <Typography 
                                            variant="body2"
                                            sx={{ color: theme.palette.text.secondary }}
                                          >
                                            {book.averageRating} ({book.reviewCount} reviews)
                                          </Typography>
                                        </Box>
                                        
                                        <Typography 
                                          variant="body2"
                                          sx={{ color: theme.palette.text.tertiary }}
                                        >
                                          Added {formatDate(book.createdAt)}
                                        </Typography>
                                      </Box>
                                      
                                      <Box sx={{ display: 'flex', gap: 1 }}>
                                        <Button
                                          component={Link}
                                          to={`/books/${book.id}`}
                                          variant="contained"
                                          size="small"
                                          startIcon={<Visibility />}
                                          sx={{
                                            borderRadius: 2,
                                            textTransform: 'none',
                                            fontWeight: 600,
                                            backgroundColor: isDarkMode ? '#ffffff' : '#0f172a',
                                            color: isDarkMode ? '#000000' : '#ffffff',
                                            '&:hover': {
                                              backgroundColor: isDarkMode ? '#f3f4f6' : '#1e293b'
                                            }
                                          }}
                                        >
                                          View
                                        </Button>
                                        <IconButton
                                          onClick={(e) => handleMenuOpen(e, book, 'book')}
                                          sx={{
                                            color: theme.palette.text.secondary,
                                            '&:hover': {
                                              backgroundColor: theme.palette.background.secondary
                                            }
                                          }}
                                        >
                                          <MoreVert />
                                        </IconButton>
                                      </Box>
                                    </Box>
                                  </Box>
                                </Fade>
                              ))}
                            </Box>
                          )}
                        </Box>
                      </Fade>
                    )}

                    {/* My Reviews Tab */}
                    {activeTab === 1 && (
                      <Fade in timeout={600}>
                        <Box>
                          {userReviews.length === 0 ? (
                            <Box
                              sx={{
                                textAlign: 'center',
                                py: 8,
                                px: 4,
                                background: theme.palette.background.paper,
                                borderRadius: 4,
                                border: `1px solid ${theme.palette.border.main}`
                              }}
                            >
                              <Star 
                                sx={{ 
                                  fontSize: 80, 
                                  color: theme.palette.text.tertiary, 
                                  mb: 2 
                                }} 
                              />
                              <Typography 
                                variant="h5"
                                sx={{
                                  fontWeight: 600,
                                  color: theme.palette.text.primary,
                                  mb: 1
                                }}
                              >
                                No reviews written yet
                              </Typography>
                              <Typography 
                                variant="body1"
                                sx={{
                                  color: theme.palette.text.secondary,
                                  mb: 4,
                                  maxWidth: 400,
                                  mx: 'auto'
                                }}
                              >
                                Share your thoughts and help other readers discover great books
                              </Typography>
                              <Button
                                component={Link}
                                to="/books"
                                variant="contained"
                                startIcon={<RateReview />}
                                sx={{
                                  borderRadius: 2,
                                  textTransform: 'none',
                                  fontWeight: 600,
                                  px: 4,
                                  py: 1.5,
                                  backgroundColor: isDarkMode ? '#ffffff' : '#1f2937',
                                  color: isDarkMode ? '#000000' : '#ffffff',
                                  '&:hover': {
                                    backgroundColor: isDarkMode ? '#f3f4f6' : '#111827'
                                  }
                                }}
                              >
                                Browse Books to Review
                              </Button>
                            </Box>
                          ) : (
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                              {userReviews.map((review, index) => (
                                <Fade in timeout={400 + index * 100} key={review._id}>
                                  <Box
                                    sx={{
                                      background: theme.palette.background.paper,
                                      borderRadius: 4,
                                      p: 4,
                                      border: `1px solid ${theme.palette.border.main}`,
                                      boxShadow: isDarkMode 
                                        ? '0 1px 3px 0 rgba(0, 0, 0, 0.3)' 
                                        : '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                                      transition: 'all 0.2s ease',
                                      '&:hover': {
                                        borderColor: theme.palette.border.dark,
                                        boxShadow: isDarkMode 
                                          ? '0 4px 6px -1px rgba(0, 0, 0, 0.4)' 
                                          : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                      }
                                    }}
                                  >
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 3 }}>
                                      <Box sx={{ flex: 1, mr: 2 }}>
                                        <Typography 
                                          variant="h6"
                                          sx={{
                                            fontWeight: 600,
                                            color: theme.palette.text.primary,
                                            mb: 1
                                          }}
                                        >
                                          {review.book?.title || 'Unknown Title'}
                                        </Typography>
                                        <Typography 
                                          variant="body2"
                                          sx={{
                                            color: theme.palette.text.secondary,
                                            mb: 2
                                          }}
                                        >
                                          by {review.book?.author || 'Unknown Author'}
                                        </Typography>
                                        
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                                          <Rating 
                                            value={review.rating} 
                                            readOnly 
                                            size="small"
                                          />
                                          <Typography 
                                            variant="body2"
                                            sx={{ color: theme.palette.text.secondary }}
                                          >
                                            {review.rating} stars
                                          </Typography>
                                        </Box>
                                        
                                        <Typography 
                                          variant="body2"
                                          sx={{ color: theme.palette.text.tertiary }}
                                        >
                                          Reviewed {formatDate(review.createdAt)}
                                        </Typography>
                                      </Box>
                                      
                                      <Box sx={{ display: 'flex', gap: 1 }}>
                                        <Button
                                          component={Link}
                                          to={`/books/${review.book?.id || review.book?._id}`}
                                          variant="contained"
                                          size="small"
                                          startIcon={<Visibility />}
                                          sx={{
                                            borderRadius: 2,
                                            textTransform: 'none',
                                            fontWeight: 600,
                                            backgroundColor: isDarkMode ? '#ffffff' : '#0f172a',
                                            color: isDarkMode ? '#000000' : '#ffffff',
                                            '&:hover': {
                                              backgroundColor: isDarkMode ? '#f3f4f6' : '#1e293b'
                                            }
                                          }}
                                        >
                                          View Book
                                        </Button>
                                        <IconButton
                                          onClick={(e) => handleMenuOpen(e, review, 'review')}
                                          sx={{
                                            color: theme.palette.text.secondary,
                                            '&:hover': {
                                              backgroundColor: theme.palette.background.secondary
                                            }
                                          }}
                                        >
                                          <MoreVert />
                                        </IconButton>
                                      </Box>
                                    </Box>
                                    
                                    <Typography 
                                      variant="body1"
                                      sx={{
                                        color: theme.palette.text.primary,
                                        lineHeight: 1.6,
                                        fontStyle: 'italic',
                                        p: 3,
                                        backgroundColor: theme.palette.background.secondary,
                                        borderRadius: 3,
                                        border: `1px solid ${theme.palette.border.light}`
                                      }}
                                    >
                                      "{review.reviewText}"
                                    </Typography>
                                  </Box>
                                </Fade>
                              ))}
                            </Box>
                          )}
                        </Box>
                      </Fade>
                    )}
                  </>
                )}
              </Box>
            </Box>

            {/* Sidebar with Weekly Chart */}
            <Box>
              <Box
                sx={{
                  background: theme.palette.background.paper,
                  borderRadius: 4,
                  p: 4,
                  border: `1px solid ${theme.palette.border.main}`,
                  boxShadow: isDarkMode 
                    ? '0 1px 3px 0 rgba(0, 0, 0, 0.3)' 
                    : '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                  height: 'fit-content'
                }}
              >
                <Typography 
                  variant="h6"
                  sx={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: theme.palette.text.primary,
                    mb: 1
                  }}
                >
                  📈 Review Activity
                </Typography>
                <Typography 
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    mb: 4
                  }}
                >
                  Your review activity over the past 8 weeks
                </Typography>
                <Box sx={{ height: 300 }}>
                  <ReviewsChart reviews={userReviews} />
                </Box>
                {/* Debug info */}
                {process.env.NODE_ENV === 'development' && (
                  <Box sx={{ mt: 2, p: 2, bgcolor: 'background.secondary', borderRadius: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      Debug: {userReviews.length} reviews loaded
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Fade>

        {/* Action Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          slotProps={{
            paper: {
              sx: {
                borderRadius: 3,
                minWidth: 180,
                backgroundColor: theme.palette.background.paper,
                boxShadow: isDarkMode 
                  ? '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)' 
                  : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                border: `1px solid ${theme.palette.border.main}`,
                py: 1
              }
            }
          }}
        >
          <MenuItem 
            onClick={handleEdit} 
            sx={{ 
              gap: 2, 
              py: 1.5, 
              px: 3,
              color: theme.palette.text.primary,
              '&:hover': {
                backgroundColor: theme.palette.background.secondary
              }
            }}
          >
            <Edit sx={{ fontSize: 20 }} />
            Edit
          </MenuItem>
          <MenuItem 
            onClick={handleDeleteClick} 
            sx={{ 
              gap: 2, 
              py: 1.5, 
              px: 3, 
              color: '#ef4444',
              '&:hover': {
                backgroundColor: isDarkMode ? 'rgba(239, 68, 68, 0.1)' : '#fef2f2'
              }
            }}
          >
            <Delete sx={{ fontSize: 20 }} />
            Delete
          </MenuItem>
        </Menu>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          maxWidth="sm"
          fullWidth
          slotProps={{
            paper: {
              sx: {
                borderRadius: 3,
                backgroundColor: theme.palette.background.paper,
                boxShadow: isDarkMode 
                  ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' 
                  : '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
              }
            }
          }}
        >
          <DialogTitle>
            <Typography 
              variant="h6" 
              fontWeight={700}
              sx={{ color: theme.palette.text.primary }}
            >
              Delete {deleteType === 'book' ? 'Book' : 'Review'}
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Typography 
              variant="body1" 
              sx={{ 
                lineHeight: 1.6,
                color: theme.palette.text.primary
              }}
            >
              Are you sure you want to delete this {deleteType}? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ p: 3, gap: 2 }}>
            <Button
              onClick={() => setDeleteDialogOpen(false)}
              variant="outlined"
              sx={{ 
                borderRadius: 2, 
                textTransform: 'none', 
                fontWeight: 600,
                borderColor: theme.palette.border.main,
                color: theme.palette.text.secondary,
                '&:hover': {
                  borderColor: theme.palette.border.dark,
                  backgroundColor: theme.palette.background.secondary
                }
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              variant="contained"
              color="error"
              sx={{ 
                borderRadius: 2, 
                textTransform: 'none', 
                fontWeight: 600,
                boxShadow: 'none'
              }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Profile;
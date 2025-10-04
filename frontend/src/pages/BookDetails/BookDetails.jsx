import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { bookAPI, reviewAPI } from '../../services/api';
import { useTheme } from '@mui/material/styles';
import { useTheme as useCustomTheme } from '../../context/ThemeContext';
import {
  Container,
  Box,
  Typography,
  Button,
  Rating,
  Chip,
  Card,
  CardContent,
  Avatar,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Skeleton,
  LinearProgress
} from '@mui/material';
import {
  ArrowBack,
  Edit,
  Delete,
  MoreVert,
  Star,
  Person,
  CalendarToday,
  MenuBook,
  RateReview,
  Share,
  Favorite,
  FavoriteBorder
} from '@mui/icons-material';

const BookDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const { isDarkMode } = useCustomTheme();




  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);



  useEffect(() => {

    if (id && id !== 'undefined') {
      fetchBookDetails();
      fetchReviews();
    } else {

      setError('Invalid book ID. Please check the URL.');
      setLoading(false);
    }
  }, [id]);

  const fetchBookDetails = async () => {
    if (!id || id === 'undefined') {
      setError('Invalid book ID');
      setLoading(false);
      return;
    }

    setLoading(true);
    try {

      const response = await bookAPI.getBook(id);
      if (response.data.success) {
        setBook(response.data.data);
        setError('');
      } else {
        setError('Book not found.');
      }
    } catch (err) {
      console.error('Error fetching book:', err);
      setError(err.response?.data?.message || 'Failed to fetch book details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    if (!id || id === 'undefined') {

      return;
    }

    try {

      const response = await reviewAPI.getBookReviews(id);
      if (response.data.success) {
        setReviews(response.data.data.reviews || []);
      }
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
      setReviews([]);
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    navigate(`/books/${id}/edit`);
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
    handleMenuClose();
  };

  const handleDeleteConfirm = async () => {
    try {

      navigate('/books');
    } catch (err) {
      setError('Failed to delete book. Please try again.');
    }
    setDeleteDialogOpen(false);
  };

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      distribution[review.rating]++;
    });
    return distribution;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          minHeight: '100vh'
        }}
      >
        <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
          {/* Back button skeleton */}
          <Skeleton variant="text" width={120} height={32} sx={{ mb: 3 }} />
          <Box sx={{ mb: 4 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={3}>
                <Skeleton
                  variant="rectangular"
                  width={220}
                  height={300}
                  sx={{
                    borderRadius: 3,
                    mx: { xs: 'auto', md: 0 },
                    mb: { xs: 3, md: 0 }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={9}>
                <Box sx={{ mb: 3 }}>
                  <Skeleton variant="text" width="80%" height={40} sx={{ mb: 1 }} />
                  <Skeleton variant="text" width="50%" height={28} sx={{ mb: 2 }} />
                </Box>

                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                  <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 1 }} />
                  <Skeleton variant="rectangular" width={60} height={24} sx={{ borderRadius: 1 }} />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Skeleton variant="rectangular" width={120} height={24} sx={{ borderRadius: 1 }} />
                  <Skeleton variant="text" width={40} height={28} />
                  <Skeleton variant="text" width={80} height={20} />
                </Box>

                <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="90%" height={20} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="75%" height={20} sx={{ mb: 3 }} />

                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Skeleton variant="text" width={100} height={20} />
                  <Skeleton variant="text" width={120} height={20} />
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* Reviews section skeleton */}
          <Box sx={{ mb: 4 }}>
            <Skeleton variant="text" width={200} height={32} sx={{ mb: 3 }} />

            {[...Array(3)].map((_, index) => (
              <Card
                key={index}
                sx={{
                  mb: 3,
                  borderRadius: 3,
                  border: `1px solid ${theme.palette.border.main}`,
                  boxShadow: 'none',
                  backgroundColor: theme.palette.background.paper
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
                    <Skeleton variant="circular" width={40} height={40} />
                    <Box>
                      <Skeleton variant="text" width={120} height={20} sx={{ mb: 0.5 }} />
                      <Skeleton variant="text" width={80} height={16} />
                    </Box>
                    <Box sx={{ ml: 'auto' }}>
                      <Skeleton variant="rectangular" width={80} height={16} sx={{ borderRadius: 1 }} />
                    </Box>
                  </Box>
                  <Skeleton variant="text" width="100%" height={16} sx={{ mb: 0.5 }} />
                  <Skeleton variant="text" width="85%" height={16} />
                </CardContent>
              </Card>
            ))}
          </Box>

          {/* Book info skeleton */}
          <Card sx={{
            borderRadius: 3,
            border: `1px solid ${theme.palette.border.main}`,
            boxShadow: 'none',
            backgroundColor: theme.palette.background.paper
          }}>
            <CardContent sx={{ p: 4 }}>
              <Skeleton variant="text" width={150} height={24} sx={{ mb: 3 }} />
              {[...Array(3)].map((_, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Skeleton variant="text" width={60} height={16} sx={{ mb: 0.5 }} />
                  <Skeleton variant="text" width={100} height={20} />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Container>
      </Box>
    );
  }

  if (error && !book) {
    return (
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          minHeight: '100vh'
        }}
      >
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Alert severity="error" sx={{ borderRadius: 2 }}>
            {error}
          </Alert>
        </Container>
      </Box>
    );
  }

  const ratingDistribution = getRatingDistribution();
  const canEdit = user && book && book.addedBy && (user.id === book.addedBy.id || user.id === book.addedBy._id);

  return (
    <Box
      className="book-details-page"
      sx={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        minHeight: '100vh'
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
        {/* Clean Back Button */}
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/books')}
          sx={{
            mb: 3,
            textTransform: 'none',
            fontWeight: 500,
            color: theme.palette.text.secondary,
            fontSize: '0.9rem',
            '&:hover': {
              backgroundColor: theme.palette.background.secondary,
              color: theme.palette.text.primary
            }
          }}
        >
          Back to Books
        </Button>

        {/* Clean Book Header */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={3}>
              <Box
                sx={{
                  width: { xs: 200, md: 220 },
                  height: { xs: 280, md: 300 },
                  backgroundColor: theme.palette.background.secondary,
                  borderRadius: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: { xs: 'auto', md: 0 },
                  border: `1px solid ${theme.palette.border.main}`,
                  mb: { xs: 3, md: 0 }
                }}
              >
                <MenuBook sx={{ fontSize: 60, color: theme.palette.text.tertiary }} />
              </Box>
            </Grid>

            <Grid item xs={12} md={9}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 3 }}>
                <Box sx={{ flex: 1, mr: 2 }}>
                  <Typography variant="h4" fontWeight={700} color={theme.palette.text.primary} gutterBottom>
                    {book.title}
                  </Typography>
                  <Typography variant="h6" color={theme.palette.text.secondary} sx={{ mb: 2 }}>
                    by {book.author}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton
                    onClick={handleFavoriteToggle}
                    size="small"
                    sx={{
                      color: isFavorite ? '#ef4444' : theme.palette.text.tertiary,
                      '&:hover': { backgroundColor: theme.palette.background.secondary }
                    }}
                  >
                    {isFavorite ? <Favorite /> : <FavoriteBorder />}
                  </IconButton>

                  <IconButton
                    size="small"
                    sx={{
                      color: theme.palette.text.tertiary,
                      '&:hover': { backgroundColor: theme.palette.background.secondary }
                    }}
                  >
                    <Share />
                  </IconButton>

                  {canEdit && (
                    <IconButton
                      onClick={handleMenuOpen}
                      size="small"
                      sx={{
                        color: theme.palette.text.tertiary,
                        '&:hover': { backgroundColor: theme.palette.background.secondary }
                      }}
                    >
                      <MoreVert />
                    </IconButton>
                  )}
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                <Chip
                  label={book.genre}
                  size="small"
                  sx={{
                    backgroundColor: theme.palette.background.secondary,
                    color: theme.palette.text.secondary,
                    fontWeight: 500
                  }}
                />
                <Chip
                  label={book.publishedYear}
                  size="small"
                  variant="outlined"
                  sx={{
                    borderColor: theme.palette.border.main,
                    color: theme.palette.text.secondary
                  }}
                />
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Rating
                  value={book.averageRating}
                  precision={0.1}
                  readOnly
                  size="medium"
                  sx={{ '& .MuiRating-iconFilled': { color: '#f59e0b' } }}
                />
                <Typography variant="h6" fontWeight={600} color={theme.palette.text.primary}>
                  {book.averageRating}
                </Typography>
                <Typography variant="body2" color={theme.palette.text.secondary}>
                  ({book.reviewCount} reviews)
                </Typography>
              </Box>

              <Typography variant="body1" color={theme.palette.text.primary} sx={{ lineHeight: 1.7, mb: 3 }}>
                {book.description}
              </Typography>

              <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', mb: 3 }}>
                <Typography variant="body2" color={theme.palette.text.tertiary}>
                  Added by {book.addedBy.name}
                </Typography>
                <Typography variant="body2" color={theme.palette.text.tertiary}>
                  {formatDate(book.createdAt)}
                </Typography>
              </Box>

              {/* Action Button */}
              {user && (
                <Button
                  component={Link}
                  to={`/books/${id}/review`}
                  variant="contained"
                  startIcon={<RateReview />}
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    backgroundColor: isDarkMode ? '#ffffff' : '#0f172a',
                    color: isDarkMode ? '#000000' : '#ffffff',
                    boxShadow: 'none',
                    px: 3,
                    py: 1.2,
                    '&:hover': {
                      backgroundColor: isDarkMode ? '#f3f4f6' : '#1e293b',
                      boxShadow: isDarkMode ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 4px 12px rgba(15, 23, 42, 0.15)'
                    }
                  }}
                >
                  Write Review
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>

        {/* Reviews Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" fontWeight={700} color={theme.palette.text.primary} sx={{ mb: 3 }}>
            Reviews ({reviews.length})
          </Typography>

          {reviews.length === 0 ? (
            <Box sx={{
              textAlign: 'center',
              py: 8,
              backgroundColor: theme.palette.background.secondary,
              borderRadius: 3,
              border: `1px solid ${theme.palette.border.main}`
            }}>
              <RateReview sx={{ fontSize: 48, color: theme.palette.text.tertiary, mb: 2 }} />
              <Typography variant="h6" color={theme.palette.text.secondary} gutterBottom>
                No reviews yet
              </Typography>
              <Typography variant="body2" color={theme.palette.text.tertiary} sx={{ mb: 3 }}>
                Be the first to share your thoughts about this book
              </Typography>
              {user && (
                <Button
                  component={Link}
                  to={`/books/${id}/review`}
                  variant="contained"
                  size="small"
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    backgroundColor: isDarkMode ? '#ffffff' : '#0f172a',
                    color: isDarkMode ? '#000000' : '#ffffff',
                    boxShadow: 'none'
                  }}
                >
                  Write First Review
                </Button>
              )}
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {reviews.map((review) => (
                <Card
                  key={review._id}
                  sx={{
                    borderRadius: 3,
                    border: `1px solid ${theme.palette.border.main}`,
                    boxShadow: 'none',
                    backgroundColor: theme.palette.background.paper,
                    '&:hover': {
                      borderColor: theme.palette.border.dark
                    }
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Avatar
                          sx={{
                            bgcolor: isDarkMode ? '#ffffff' : '#0f172a',
                            color: isDarkMode ? '#000000' : '#ffffff',
                            fontWeight: 600,
                            width: 40,
                            height: 40
                          }}
                        >
                          {review.user?.name?.charAt(0).toUpperCase() || review.userId?.name?.charAt(0).toUpperCase() || 'U'}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" fontWeight={600} color={theme.palette.text.primary}>
                            {review.user?.name || review.userId?.name || 'Anonymous'}
                          </Typography>
                          <Typography variant="body2" color={theme.palette.text.tertiary}>
                            {formatDate(review.createdAt)}
                          </Typography>
                        </Box>
                      </Box>

                      <Rating
                        value={review.rating}
                        readOnly
                        size="small"
                        sx={{ '& .MuiRating-iconFilled': { color: '#f59e0b' } }}
                      />
                    </Box>

                    <Typography variant="body1" color={theme.palette.text.primary} sx={{ lineHeight: 1.7 }}>
                      {review.reviewText}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
        </Box>

        {/* Book Information Sidebar */}
        {(book.pages || book.publisher || book.isbn) && (
          <Card sx={{
            borderRadius: 3,
            border: `1px solid ${theme.palette.border.main}`,
            boxShadow: 'none',
            backgroundColor: theme.palette.background.paper
          }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" fontWeight={700} color={theme.palette.text.primary} gutterBottom>
                Book Information
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {book.pages && (
                  <Box>
                    <Typography variant="body2" color={theme.palette.text.tertiary} sx={{ mb: 0.5 }}>
                      Pages
                    </Typography>
                    <Typography variant="body1" fontWeight={500} color={theme.palette.text.secondary}>
                      {book.pages}
                    </Typography>
                  </Box>
                )}

                {book.publisher && (
                  <Box>
                    <Typography variant="body2" color={theme.palette.text.tertiary} sx={{ mb: 0.5 }}>
                      Publisher
                    </Typography>
                    <Typography variant="body1" fontWeight={500} color={theme.palette.text.secondary}>
                      {book.publisher}
                    </Typography>
                  </Box>
                )}

                {book.isbn && (
                  <Box>
                    <Typography variant="body2" color={theme.palette.text.tertiary} sx={{ mb: 0.5 }}>
                      ISBN
                    </Typography>
                    <Typography variant="body1" fontWeight={500} color={theme.palette.text.secondary}>
                      {book.isbn}
                    </Typography>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        )}

        {/* Action Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          slotProps={{
            paper: {
              sx: {
                borderRadius: 2,
                minWidth: 160,
                backgroundColor: theme.palette.background.paper,
                boxShadow: isDarkMode
                  ? '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
                  : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                border: `1px solid ${theme.palette.border.main}`
              }
            }
          }}
        >
          <MenuItem
            onClick={handleEdit}
            sx={{
              gap: 2,
              color: theme.palette.text.primary,
              '&:hover': {
                backgroundColor: theme.palette.background.secondary
              }
            }}
          >
            <Edit sx={{ fontSize: 20 }} />
            Edit Book
          </MenuItem>
          <MenuItem
            onClick={handleDeleteClick}
            sx={{
              gap: 2,
              color: '#ef4444',
              '&:hover': {
                backgroundColor: isDarkMode ? 'rgba(239, 68, 68, 0.1)' : '#fef2f2'
              }
            }}
          >
            <Delete sx={{ fontSize: 20 }} />
            Delete Book
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
              Delete Book
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Typography
              variant="body1"
              sx={{ color: theme.palette.text.primary }}
            >
              Are you sure you want to delete "{book?.title}"? This action cannot be undone and will also delete all associated reviews.
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
              sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
            >
              Delete Book
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default BookDetails;
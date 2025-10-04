import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
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
import './BookDetails.scss';

const BookDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // State management
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock data for now
  const mockBook = {
    _id: id,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description: 'Set in the summer of 1922, The Great Gatsby follows narrator Nick Carraway\'s interactions with his mysterious neighbor Jay Gatsby and Gatsby\'s obsession to reunite with his former lover, Daisy Buchanan. The novel explores themes of decadence, idealism, resistance to change, social upheaval, and excess, creating a portrait of the Roaring Twenties that has been described as a cautionary tale regarding the American Dream.',
    genre: 'Fiction',
    publishedYear: 1925,
    averageRating: 4.2,
    reviewCount: 156,
    addedBy: { 
      _id: 'user1',
      name: 'John Doe',
      email: 'john@example.com'
    },
    createdAt: '2024-01-15',
    isbn: '978-0-7432-7356-5',
    pages: 180,
    publisher: 'Scribner'
  };

  const mockReviews = [
    {
      _id: 'review1',
      userId: {
        _id: 'user2',
        name: 'Alice Johnson',
        email: 'alice@example.com'
      },
      rating: 5,
      reviewText: 'An absolute masterpiece! Fitzgerald\'s prose is beautiful and the story is both tragic and compelling. The symbolism and themes are incredibly deep.',
      createdAt: '2024-01-20',
      updatedAt: '2024-01-20'
    },
    {
      _id: 'review2',
      userId: {
        _id: 'user3',
        name: 'Bob Smith',
        email: 'bob@example.com'
      },
      rating: 4,
      reviewText: 'Great book with excellent character development. The ending was quite impactful, though some parts felt a bit slow.',
      createdAt: '2024-01-18',
      updatedAt: '2024-01-18'
    },
    {
      _id: 'review3',
      userId: {
        _id: 'user4',
        name: 'Carol Davis',
        email: 'carol@example.com'
      },
      rating: 4,
      reviewText: 'A classic for a reason. The writing style is captivating and the themes are still relevant today.',
      createdAt: '2024-01-16',
      updatedAt: '2024-01-16'
    }
  ];

  useEffect(() => {
    fetchBookDetails();
    fetchReviews();
  }, [id]);

  const fetchBookDetails = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      setBook(mockBook);
      setError('');
    } catch (err) {
      setError('Failed to fetch book details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setReviews(mockReviews);
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
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
      // API call to delete book
      console.log('Deleting book:', id);
      navigate('/books');
    } catch (err) {
      setError('Failed to delete book. Please try again.');
    }
    setDeleteDialogOpen(false);
  };

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    // API call to toggle favorite
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
      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
        {/* Back button skeleton */}
        <Skeleton variant="text" width={120} height={32} sx={{ mb: 3 }} />
        
        {/* Book header skeleton */}
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
                border: '1px solid #e2e8f0',
                boxShadow: 'none'
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
          border: '1px solid #e2e8f0',
          boxShadow: 'none'
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
    );
  }

  if (error && !book) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ borderRadius: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  const ratingDistribution = getRatingDistribution();
  const canEdit = user && book && user.id === book.addedBy._id;

  return (
    <div className="book-details-page">
      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
        {/* Clean Back Button */}
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/books')}
          sx={{
            mb: 3,
            textTransform: 'none',
            fontWeight: 500,
            color: '#64748b',
            fontSize: '0.9rem',
            '&:hover': {
              backgroundColor: '#f8fafc',
              color: '#475569'
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
                  backgroundColor: '#f8fafc',
                  borderRadius: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: { xs: 'auto', md: 0 },
                  border: '1px solid #e2e8f0',
                  mb: { xs: 3, md: 0 }
                }}
              >
                <MenuBook sx={{ fontSize: 60, color: '#94a3b8' }} />
              </Box>
            </Grid>

            <Grid item xs={12} md={9}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 3 }}>
                <Box sx={{ flex: 1, mr: 2 }}>
                  <Typography variant="h4" fontWeight={700} color="#1a1a1a" gutterBottom>
                    {book.title}
                  </Typography>
                  <Typography variant="h6" color="#64748b" sx={{ mb: 2 }}>
                    by {book.author}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton
                    onClick={handleFavoriteToggle}
                    size="small"
                    sx={{ 
                      color: isFavorite ? '#ef4444' : '#94a3b8',
                      '&:hover': { backgroundColor: '#f8fafc' }
                    }}
                  >
                    {isFavorite ? <Favorite /> : <FavoriteBorder />}
                  </IconButton>
                  
                  <IconButton 
                    size="small"
                    sx={{ 
                      color: '#94a3b8',
                      '&:hover': { backgroundColor: '#f8fafc' }
                    }}
                  >
                    <Share />
                  </IconButton>

                  {canEdit && (
                    <IconButton
                      onClick={handleMenuOpen}
                      size="small"
                      sx={{ 
                        color: '#94a3b8',
                        '&:hover': { backgroundColor: '#f8fafc' }
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
                    backgroundColor: '#f1f5f9',
                    color: '#475569',
                    fontWeight: 500
                  }} 
                />
                <Chip 
                  label={book.publishedYear} 
                  size="small"
                  variant="outlined"
                  sx={{ 
                    borderColor: '#e2e8f0',
                    color: '#64748b'
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
                <Typography variant="h6" fontWeight={600} color="#1a1a1a">
                  {book.averageRating}
                </Typography>
                <Typography variant="body2" color="#64748b">
                  ({book.reviewCount} reviews)
                </Typography>
              </Box>

              <Typography variant="body1" color="#475569" sx={{ lineHeight: 1.7, mb: 3 }}>
                {book.description}
              </Typography>

              <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', mb: 3 }}>
                <Typography variant="body2" color="#94a3b8">
                  Added by {book.addedBy.name}
                </Typography>
                <Typography variant="body2" color="#94a3b8">
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
                    backgroundColor: '#0f172a',
                    boxShadow: 'none',
                    px: 3,
                    py: 1.2,
                    '&:hover': {
                      backgroundColor: '#1e293b',
                      boxShadow: '0 4px 12px rgba(15, 23, 42, 0.15)'
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
          <Typography variant="h5" fontWeight={700} color="#1a1a1a" sx={{ mb: 3 }}>
            Reviews ({reviews.length})
          </Typography>

          {reviews.length === 0 ? (
            <Box sx={{ 
              textAlign: 'center', 
              py: 8, 
              backgroundColor: '#f8fafc', 
              borderRadius: 3,
              border: '1px solid #e2e8f0'
            }}>
              <RateReview sx={{ fontSize: 48, color: '#cbd5e1', mb: 2 }} />
              <Typography variant="h6" color="#64748b" gutterBottom>
                No reviews yet
              </Typography>
              <Typography variant="body2" color="#94a3b8" sx={{ mb: 3 }}>
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
                    backgroundColor: '#0f172a',
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
                    border: '1px solid #e2e8f0',
                    boxShadow: 'none',
                    '&:hover': {
                      borderColor: '#cbd5e1'
                    }
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Avatar 
                          sx={{ 
                            bgcolor: '#0f172a', 
                            fontWeight: 600,
                            width: 40,
                            height: 40
                          }}
                        >
                          {review.userId.name.charAt(0).toUpperCase()}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" fontWeight={600} color="#1a1a1a">
                            {review.userId.name}
                          </Typography>
                          <Typography variant="body2" color="#94a3b8">
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
                    
                    <Typography variant="body1" color="#475569" sx={{ lineHeight: 1.7 }}>
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
            border: '1px solid #e2e8f0',
            boxShadow: 'none'
          }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" fontWeight={700} color="#1a1a1a" gutterBottom>
                Book Information
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {book.pages && (
                  <Box>
                    <Typography variant="body2" color="#94a3b8" sx={{ mb: 0.5 }}>
                      Pages
                    </Typography>
                    <Typography variant="body1" fontWeight={500} color="#475569">
                      {book.pages}
                    </Typography>
                  </Box>
                )}
                
                {book.publisher && (
                  <Box>
                    <Typography variant="body2" color="#94a3b8" sx={{ mb: 0.5 }}>
                      Publisher
                    </Typography>
                    <Typography variant="body1" fontWeight={500} color="#475569">
                      {book.publisher}
                    </Typography>
                  </Box>
                )}
                
                {book.isbn && (
                  <Box>
                    <Typography variant="body2" color="#94a3b8" sx={{ mb: 0.5 }}>
                      ISBN
                    </Typography>
                    <Typography variant="body1" fontWeight={500} color="#475569">
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
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }
            }
          }}
        >
          <MenuItem onClick={handleEdit} sx={{ gap: 2 }}>
            <Edit sx={{ fontSize: 20 }} />
            Edit Book
          </MenuItem>
          <MenuItem onClick={handleDeleteClick} sx={{ gap: 2, color: '#ef4444' }}>
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
        >
          <DialogTitle>
            <Typography variant="h6" fontWeight={700}>
              Delete Book
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              Are you sure you want to delete "{book?.title}"? This action cannot be undone and will also delete all associated reviews.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ p: 3, gap: 2 }}>
            <Button
              onClick={() => setDeleteDialogOpen(false)}
              variant="outlined"
              sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
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
    </div>
  );
};

export default BookDetails;
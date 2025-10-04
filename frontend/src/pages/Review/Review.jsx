import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useTheme } from '@mui/material/styles';
import { useTheme as useCustomTheme } from '../../context/ThemeContext';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Rating,
  Alert,
  CircularProgress,
  Breadcrumbs,
  Skeleton,
  Chip
} from '@mui/material';
import {
  ArrowBack,
  Save,
  Star,
  NavigateNext,
  MenuBook
} from '@mui/icons-material';

const Review = () => {
  const { id } = useParams(); // book id
  const [searchParams] = useSearchParams();
  const editReviewId = searchParams.get('edit');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const { isDarkMode } = useCustomTheme();

  // State management
  const [book, setBook] = useState(null);
  const [formData, setFormData] = useState({
    rating: 0,
    reviewText: ''
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const isEditing = Boolean(editReviewId);

  // Mock data
  const mockBook = {
    _id: id,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    publishedYear: 1925,
    averageRating: 4.2,
    reviewCount: 156
  };

  const mockExistingReview = {
    _id: editReviewId,
    rating: 4,
    reviewText: 'This is an existing review that I want to edit. The book was quite good with excellent character development.'
  };

  // Redirect if not logged in
  if (!user) {
    navigate('/login');
    return null;
  }

  useEffect(() => {
    fetchBookAndReview();
  }, [id, editReviewId]);

  const fetchBookAndReview = async () => {
    setFetchLoading(true);
    try {
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setBook(mockBook);
      
      if (isEditing) {
        // Fetch existing review for editing
        setFormData({
          rating: mockExistingReview.rating,
          reviewText: mockExistingReview.reviewText
        });
      }
      
    } catch (err) {
      setError('Failed to fetch book details. Please try again.');
    } finally {
      setFetchLoading(false);
    }
  };

  const handleRatingChange = (event, newValue) => {
    setFormData(prev => ({
      ...prev,
      rating: newValue
    }));
    
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleTextChange = (e) => {
    setFormData(prev => ({
      ...prev,
      reviewText: e.target.value
    }));
    
    if (error) setError('');
    if (success) setSuccess('');
  };

  const validateForm = () => {
    const errors = [];
    
    if (formData.rating === 0) {
      errors.push('Please select a rating');
    }
    
    if (!formData.reviewText.trim()) {
      errors.push('Please write a review');
    }
    
    if (formData.reviewText.trim().length < 10) {
      errors.push('Review must be at least 10 characters long');
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setError(validationErrors.join(', '));
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const reviewData = {
        ...formData,
        bookId: id,
        userId: user.id,
        createdAt: isEditing ? mockExistingReview.createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      console.log(isEditing ? 'Review updated:' : 'Review created:', reviewData);
      setSuccess(isEditing ? 'Review updated successfully!' : 'Review submitted successfully!');
      
      // Redirect to book details after a short delay
      setTimeout(() => {
        navigate(`/books/${id}`);
      }, 1500);
      
    } catch (err) {
      setError(isEditing ? 'Failed to update review. Please try again.' : 'Failed to submit review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(`/books/${id}`);
  };

  if (fetchLoading) {
    return (
      <Box 
        sx={{
          backgroundColor: theme.palette.background.default,
          minHeight: '100vh'
        }}
      >
        <Container maxWidth="md" sx={{ py: 4 }}>
        {/* Breadcrumbs skeleton */}
        <Skeleton variant="text" width="30%" height={20} sx={{ mb: 3 }} />
        
        {/* Header skeleton */}
        <Skeleton variant="text" width={120} height={32} sx={{ mb: 3 }} />
        <Skeleton variant="text" width="50%" height={40} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="40%" height={24} sx={{ mb: 4 }} />
        
        {/* Book info card skeleton */}
        <Card sx={{ borderRadius: 3, mb: 4, border: '1px solid #e2e8f0', boxShadow: 'none' }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
              <Skeleton variant="rectangular" width={80} height={100} sx={{ borderRadius: 2, flexShrink: 0 }} />
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width="70%" height={28} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="50%" height={24} sx={{ mb: 2 }} />
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Skeleton variant="rectangular" width={60} height={20} sx={{ borderRadius: 1 }} />
                  <Skeleton variant="rectangular" width={50} height={20} sx={{ borderRadius: 1 }} />
                  <Skeleton variant="text" width={100} height={20} />
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
        
        {/* Review form skeleton */}
        <Card sx={{ borderRadius: 3, border: '1px solid #e2e8f0', boxShadow: 'none' }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
              <Skeleton variant="rectangular" width={48} height={48} sx={{ borderRadius: 2 }} />
              <Skeleton variant="text" width={150} height={28} />
            </Box>
            
            {/* Rating section skeleton */}
            <Box sx={{ mb: 4 }}>
              <Skeleton variant="text" width={80} height={24} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="60%" height={16} sx={{ mb: 2 }} />
              <Skeleton variant="rectangular" width={200} height={32} sx={{ borderRadius: 1 }} />
            </Box>
            
            {/* Review text section skeleton */}
            <Box sx={{ mb: 4 }}>
              <Skeleton variant="text" width={80} height={24} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="70%" height={16} sx={{ mb: 2 }} />
              <Skeleton variant="rectangular" width="100%" height={120} sx={{ borderRadius: 2, mb: 1 }} />
              <Skeleton variant="text" width={200} height={16} />
            </Box>
            
            {/* Buttons skeleton */}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Skeleton variant="rectangular" width={80} height={40} sx={{ borderRadius: 2 }} />
              <Skeleton variant="rectangular" width={120} height={40} sx={{ borderRadius: 2 }} />
            </Box>
          </CardContent>
        </Card>
      </Container>
      </Box>
    );
  }

  return (
    <Box 
      className="review-page"
      sx={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        minHeight: '100vh'
      }}
    >
      <Container maxWidth="md" sx={{ py: 4 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs
          separator={<NavigateNext fontSize="small" />}
          sx={{ mb: 3 }}
        >
          <Link to="/books" style={{ textDecoration: 'none', color: theme.palette.text.secondary }}>
            Books
          </Link>
          <Link to={`/books/${id}`} style={{ textDecoration: 'none', color: theme.palette.text.secondary }}>
            {book?.title || 'Book Details'}
          </Link>
          <Typography color="text.primary" fontWeight={600}>
            {isEditing ? 'Edit Review' : 'Write Review'}
          </Typography>
        </Breadcrumbs>

        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate(`/books/${id}`)}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              color: theme.palette.text.secondary,
              '&:hover': {
                backgroundColor: theme.palette.background.secondary
              }
            }}
          >
            Back
          </Button>
          
          <Box sx={{ flex: 1 }}>
            <Typography variant="h3" fontWeight={800} color="text.primary" gutterBottom>
              {isEditing ? 'Edit Review' : 'Write Review'}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Share your thoughts about this book
            </Typography>
          </Box>
        </Box>

        {/* Success/Error Messages */}
        {success && (
          <Alert 
            severity="success" 
            sx={{ mb: 3, borderRadius: 2 }}
            onClose={() => setSuccess('')}
          >
            {success}
          </Alert>
        )}

        {error && (
          <Alert 
            severity="error" 
            sx={{ mb: 3, borderRadius: 2 }}
            onClose={() => setError('')}
          >
            {error}
          </Alert>
        )}

        {/* Book Info Card */}
        <Card sx={{ borderRadius: 3, mb: 4, border: '1px solid #e5e7eb' }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
              <Box
                sx={{
                  width: 80,
                  height: 100,
                  backgroundColor: '#f3f4f6',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  border: '1px solid #e5e7eb'
                }}
              >
                <MenuBook sx={{ fontSize: 32, color: '#9ca3af' }} />
              </Box>
              
              <Box sx={{ flex: 1 }}>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  {book?.title}
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                  by {book?.author}
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Chip label={book?.genre} size="small" />
                  <Chip label={book?.publishedYear} size="small" variant="outlined" />
                  <Typography variant="body2" color="text.secondary">
                    {book?.averageRating} ★ ({book?.reviewCount} reviews)
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Review Form */}
        <Card sx={{ borderRadius: 3, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  backgroundColor: '#f3f4f6',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Star sx={{ fontSize: 24, color: '#fbbf24' }} />
              </Box>
              <Typography variant="h5" fontWeight={700}>
                Your Review
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit}>
              {/* Rating Section */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Rating *
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  How would you rate this book?
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Rating
                    value={formData.rating}
                    onChange={handleRatingChange}
                    size="large"
                    sx={{
                      '& .MuiRating-iconFilled': {
                        color: '#fbbf24'
                      },
                      '& .MuiRating-iconHover': {
                        color: '#f59e0b'
                      }
                    }}
                  />
                  {formData.rating > 0 && (
                    <Typography variant="body1" fontWeight={600} color="text.secondary">
                      {formData.rating} star{formData.rating !== 1 ? 's' : ''}
                    </Typography>
                  )}
                </Box>
              </Box>

              {/* Review Text Section */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Review *
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Share your detailed thoughts about the book
                </Typography>
                
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  placeholder="What did you think about this book? Share your thoughts on the plot, characters, writing style, or anything else that stood out to you..."
                  value={formData.reviewText}
                  onChange={handleTextChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2
                    }
                  }}
                />
                
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {formData.reviewText.length} characters (minimum 10 required)
                </Typography>
              </Box>

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  type="button"
                  variant="outlined"
                  onClick={handleCancel}
                  disabled={loading}
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
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
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Save />}
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
                    },
                    '&:disabled': {
                      backgroundColor: theme.palette.action.disabledBackground,
                      color: theme.palette.action.disabled
                    }
                  }}
                >
                  {loading ? (isEditing ? 'Updating...' : 'Submitting...') : (isEditing ? 'Update Review' : 'Submit Review')}
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Guidelines */}
        <Box sx={{ 
          mt: 4, 
          p: 3, 
          backgroundColor: theme.palette.background.secondary, 
          borderRadius: 2,
          border: `1px solid ${theme.palette.border.light}`
        }}>
          <Typography 
            variant="h6" 
            fontWeight={600} 
            gutterBottom
            sx={{ color: theme.palette.text.primary }}
          >
            Review Guidelines:
          </Typography>
          <Typography 
            variant="body2" 
            color={theme.palette.text.secondary} 
            component="ul" 
            sx={{ pl: 2 }}
          >
            <li>Be honest and constructive in your feedback</li>
            <li>Focus on the book's content, not personal attacks on the author</li>
            <li>Avoid major spoilers - use spoiler warnings if necessary</li>
            <li>Keep your review relevant to the book being reviewed</li>
            <li>Respect other readers' opinions and experiences</li>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Review;
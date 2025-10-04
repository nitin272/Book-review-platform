import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  Alert,
  CircularProgress,
  Breadcrumbs,
  Skeleton
} from '@mui/material';
import {
  ArrowBack,
  Save,
  MenuBook,
  NavigateNext
} from '@mui/icons-material';
import './EditBook.scss';

const EditBook = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // State management
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    genre: '',
    publishedYear: '',
    isbn: '',
    pages: '',
    publisher: ''
  });

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Genre options
  const genres = [
    'Fiction',
    'Non-Fiction',
    'Science Fiction',
    'Fantasy',
    'Mystery',
    'Thriller',
    'Romance',
    'Horror',
    'Biography',
    'History',
    'Science',
    'Technology',
    'Self-Help',
    'Business',
    'Philosophy',
    'Poetry',
    'Drama',
    'Adventure',
    'Crime',
    'Dystopian',
    'Young Adult',
    'Children',
    'Other'
  ];

  // Mock book data
  const mockBook = {
    _id: id,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description: 'Set in the summer of 1922, The Great Gatsby follows narrator Nick Carraway\'s interactions with his mysterious neighbor Jay Gatsby and Gatsby\'s obsession to reunite with his former lover, Daisy Buchanan.',
    genre: 'Fiction',
    publishedYear: 1925,
    isbn: '978-0-7432-7356-5',
    pages: 180,
    publisher: 'Scribner',
    addedBy: {
      _id: 'user1',
      name: 'John Doe'
    }
  };

  useEffect(() => {
    fetchBookDetails();
  }, [id]);

  const fetchBookDetails = async () => {
    setFetchLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Check if user can edit this book
      if (user?.id !== mockBook.addedBy._id) {
        setError('You are not authorized to edit this book.');
        return;
      }
      
      // Populate form with existing data
      setFormData({
        title: mockBook.title,
        author: mockBook.author,
        description: mockBook.description,
        genre: mockBook.genre,
        publishedYear: mockBook.publishedYear.toString(),
        isbn: mockBook.isbn || '',
        pages: mockBook.pages?.toString() || '',
        publisher: mockBook.publisher || ''
      });
      
    } catch (err) {
      setError('Failed to fetch book details. Please try again.');
    } finally {
      setFetchLoading(false);
    }
  };

  // Redirect if not logged in
  if (!user) {
    navigate('/login');
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear messages when user starts typing
    if (error) setError('');
    if (success) setSuccess('');
  };

  const validateForm = () => {
    const errors = [];
    
    if (!formData.title.trim()) errors.push('Title is required');
    if (!formData.author.trim()) errors.push('Author is required');
    if (!formData.description.trim()) errors.push('Description is required');
    if (!formData.genre) errors.push('Genre is required');
    if (!formData.publishedYear) errors.push('Published year is required');
    
    if (formData.publishedYear) {
      const year = parseInt(formData.publishedYear);
      const currentYear = new Date().getFullYear();
      if (year < 1000 || year > currentYear) {
        errors.push('Please enter a valid published year');
      }
    }
    
    if (formData.pages && parseInt(formData.pages) <= 0) {
      errors.push('Pages must be a positive number');
    }
    
    if (formData.isbn && !/^[\d-]+$/.test(formData.isbn.replace(/\s/g, ''))) {
      errors.push('ISBN should contain only numbers and hyphens');
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
      
      // Mock successful response
      const updatedBook = {
        ...mockBook,
        ...formData,
        publishedYear: parseInt(formData.publishedYear),
        pages: formData.pages ? parseInt(formData.pages) : null,
        updatedAt: new Date().toISOString()
      };
      
      console.log('Book updated:', updatedBook);
      setSuccess('Book updated successfully!');
      
      // Redirect to book details after a short delay
      setTimeout(() => {
        navigate(`/books/${id}`);
      }, 1500);
      
    } catch (err) {
      setError('Failed to update book. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(`/books/${id}`);
  };

  if (fetchLoading) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Skeleton variant="text" width="30%" height={40} sx={{ mb: 3 }} />
        <Skeleton variant="text" width="50%" height={60} sx={{ mb: 2 }} />
        <Skeleton variant="text" width="40%" height={30} sx={{ mb: 4 }} />
        <Card sx={{ borderRadius: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Skeleton variant="text" width="40%" height={40} sx={{ mb: 4 }} />
            <Grid container spacing={3}>
              {[...Array(8)].map((_, index) => (
                <Grid item xs={12} md={index < 2 ? 12 : 6} key={index}>
                  <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 2 }} />
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <div className="edit-book-page">
      <Container maxWidth="md" sx={{ py: 4 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs
          separator={<NavigateNext fontSize="small" />}
          sx={{ mb: 3 }}
        >
          <Link to="/books" style={{ textDecoration: 'none', color: '#6b7280' }}>
            Books
          </Link>
          <Link to={`/books/${id}`} style={{ textDecoration: 'none', color: '#6b7280' }}>
            {formData.title || 'Book Details'}
          </Link>
          <Typography color="text.primary" fontWeight={600}>
            Edit
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
              color: '#6b7280',
              '&:hover': {
                backgroundColor: '#f9fafb'
              }
            }}
          >
            Back
          </Button>
          
          <Box sx={{ flex: 1 }}>
            <Typography variant="h3" fontWeight={800} color="text.primary" gutterBottom>
              Edit Book
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Update book information
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

        {/* Form Card */}
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
                <MenuBook sx={{ fontSize: 24, color: '#6b7280' }} />
              </Box>
              <Typography variant="h5" fontWeight={700}>
                Book Information
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {/* Title */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Book Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="Enter the book title"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2
                      }
                    }}
                  />
                </Grid>

                {/* Author */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Author"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    required
                    placeholder="Enter the author's name"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2
                      }
                    }}
                  />
                </Grid>

                {/* Genre */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    select
                    label="Genre"
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2
                      }
                    }}
                  >
                    {genres.map((genre) => (
                      <MenuItem key={genre} value={genre}>
                        {genre}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {/* Description */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    placeholder="Enter a brief description of the book"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2
                      }
                    }}
                  />
                </Grid>

                {/* Published Year */}
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Published Year"
                    name="publishedYear"
                    value={formData.publishedYear}
                    onChange={handleChange}
                    required
                    placeholder="e.g., 2023"
                    inputProps={{
                      min: 1000,
                      max: new Date().getFullYear()
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2
                      }
                    }}
                  />
                </Grid>

                {/* Pages */}
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Pages (Optional)"
                    name="pages"
                    value={formData.pages}
                    onChange={handleChange}
                    placeholder="e.g., 350"
                    inputProps={{
                      min: 1
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2
                      }
                    }}
                  />
                </Grid>

                {/* ISBN */}
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="ISBN (Optional)"
                    name="isbn"
                    value={formData.isbn}
                    onChange={handleChange}
                    placeholder="e.g., 978-0-123456-78-9"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2
                      }
                    }}
                  />
                </Grid>

                {/* Publisher */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Publisher (Optional)"
                    name="publisher"
                    value={formData.publisher}
                    onChange={handleChange}
                    placeholder="Enter the publisher's name"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2
                      }
                    }}
                  />
                </Grid>
              </Grid>

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', gap: 2, mt: 4, justifyContent: 'flex-end' }}>
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
                    borderColor: '#e5e7eb',
                    color: '#6b7280',
                    '&:hover': {
                      borderColor: '#d1d5db',
                      backgroundColor: '#f9fafb'
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
                    backgroundColor: '#1f2937',
                    '&:hover': {
                      backgroundColor: '#111827'
                    },
                    '&:disabled': {
                      backgroundColor: '#9ca3af'
                    }
                  }}
                >
                  {loading ? 'Updating...' : 'Update Book'}
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Help Text */}
        <Box sx={{ mt: 4, p: 3, backgroundColor: '#f9fafb', borderRadius: 2 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Editing Guidelines:
          </Typography>
          <Typography variant="body2" color="text.secondary" component="ul" sx={{ pl: 2 }}>
            <li>Make sure all changes are accurate and up-to-date</li>
            <li>Verify the spelling of the title and author name</li>
            <li>Update the description if you have better information</li>
            <li>Changes will be visible to all users immediately</li>
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default EditBook;
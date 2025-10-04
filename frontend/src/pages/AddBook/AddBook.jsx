import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useTheme } from '@mui/material/styles';
import { useTheme as useCustomTheme } from '../../context/ThemeContext';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  MenuItem
} from '@mui/material';
import {
  ArrowBack,
  Save,
  MenuBook,
  Person,
  Category
} from '@mui/icons-material';
import './AddBook.scss';

const AddBook = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const { isDarkMode } = useCustomTheme();

  // Form state
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
    
    // Clear errors when user starts typing
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
      const newBook = {
        ...formData,
        _id: Date.now().toString(),
        addedBy: user,
        createdAt: new Date().toISOString(),
        averageRating: 0,
        reviewCount: 0
      };
      
      console.log('Book added:', newBook);
      setSuccess('Book added successfully!');
      
      // Redirect to books list after a short delay
      setTimeout(() => {
        navigate('/books');
      }, 1500);
      
    } catch (err) {
      setError('Failed to add book. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      title: '',
      author: '',
      description: '',
      genre: '',
      publishedYear: '',
      isbn: '',
      pages: '',
      publisher: ''
    });
    setError('');
    setSuccess('');
  };

  return (
    <Box 
      className="add-book-page"
      sx={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        minHeight: '100vh'
      }}
    >
      <Box 
        className="page-container"
        sx={{
          maxWidth: 600,
          margin: '0 auto',
          p: { xs: 2, md: 4 }
        }}
      >
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/books')}
            sx={{
              textTransform: 'none',
              fontSize: '0.9rem',
              mb: 3,
              color: theme.palette.text.secondary,
              fontWeight: 500,
              '&:hover': {
                backgroundColor: theme.palette.background.secondary,
                color: theme.palette.text.primary
              }
            }}
          >
            Back to Books
          </Button>
          
          <Typography 
            variant="h4"
            sx={{
              fontSize: '2rem',
              fontWeight: 700,
              color: theme.palette.text.primary,
              mb: 1
            }}
          >
            Add New Book
          </Typography>
          <Typography 
            variant="body1"
            sx={{
              color: theme.palette.text.secondary
            }}
          >
            Share a great book with the community
          </Typography>
        </Box>

        {/* Success/Error Messages */}
        {success && (
          <Alert 
            severity="success" 
            sx={{ mb: 2, borderRadius: 2 }}
            onClose={() => setSuccess('')}
          >
            {success}
          </Alert>
        )}

        {error && (
          <Alert 
            severity="error" 
            sx={{ mb: 2, borderRadius: 2 }}
            onClose={() => setError('')}
          >
            {error}
          </Alert>
        )}

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit}>
          <Box 
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: 4,
              border: `1px solid ${theme.palette.border.main}`,
              boxShadow: isDarkMode ? '0 1px 3px 0 rgba(0, 0, 0, 0.3)' : '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
              p: 4,
              mb: 3
            }}
          >
            {/* Basic Information */}
            <Box sx={{ mb: 4 }}>
              <Typography 
                variant="h6"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                  mb: 3
                }}
              >
                <MenuBook sx={{ fontSize: 20 }} />
                Basic Information
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Book Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Enter the book title"
                  sx={{ mb: 3 }}
                />
              </Box>

              <Box sx={{ display: 'flex', gap: 2, mb: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
                <TextField
                  fullWidth
                  label="Author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                  placeholder="Author's name"
                />

                <TextField
                  fullWidth
                  select
                  label="Genre"
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  required
                >
                  {genres.map((genre) => (
                    <MenuItem key={genre} value={genre}>
                      {genre}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Brief description of the book"
                sx={{ mb: 3 }}
              />
            </Box>

            {/* Publication Details */}
            <Box>
              <Typography 
                variant="h6"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                  mb: 3
                }}
              >
                <Category sx={{ fontSize: 20 }} />
                Publication Details
              </Typography>

              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
                gap: 2, 
                mb: 3 
              }}>
                <TextField
                  fullWidth
                  type="number"
                  label="Published Year"
                  name="publishedYear"
                  value={formData.publishedYear}
                  onChange={handleChange}
                  required
                  placeholder="2023"
                  inputProps={{
                    min: 1000,
                    max: new Date().getFullYear()
                  }}
                />

                <TextField
                  fullWidth
                  type="number"
                  label="Pages"
                  name="pages"
                  value={formData.pages}
                  onChange={handleChange}
                  placeholder="350"
                  inputProps={{
                    min: 1
                  }}
                />

                <TextField
                  fullWidth
                  label="ISBN"
                  name="isbn"
                  value={formData.isbn}
                  onChange={handleChange}
                  placeholder="978-0-123456-78-9"
                />
              </Box>

              <TextField
                fullWidth
                label="Publisher"
                name="publisher"
                value={formData.publisher}
                onChange={handleChange}
                placeholder="Publisher name"
              />
            </Box>
          </Box>

          {/* Actions */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              type="button"
              onClick={handleReset}
              disabled={loading}
              variant="outlined"
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
              Reset
            </Button>
            
            <Button
              type="submit"
              disabled={loading}
              variant="contained"
              startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <Save />}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                px: 4,
                py: 1.5,
                backgroundColor: isDarkMode ? '#ffffff' : '#0f172a',
                color: isDarkMode ? '#000000' : '#ffffff',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: isDarkMode ? '#f3f4f6' : '#1e293b',
                  boxShadow: 'none'
                },
                '&:disabled': {
                  backgroundColor: theme.palette.action.disabledBackground,
                  color: theme.palette.action.disabled
                }
              }}
            >
              {loading ? 'Adding...' : 'Add Book'}
            </Button>
          </Box>
        </Box>

        {/* Help Tip */}
        <Box 
          sx={{
            backgroundColor: theme.palette.background.secondary,
            borderRadius: 3,
            p: 3,
            border: `1px solid ${theme.palette.border.light}`
          }}
        >
          <Typography 
            variant="body1"
            sx={{
              fontWeight: 600,
              color: theme.palette.text.primary,
              mb: 1
            }}
          >
            💡 Quick Tip
          </Typography>
          <Typography 
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              lineHeight: 1.6
            }}
          >
            Make sure the title and author are spelled correctly. A good description helps other readers discover your book!
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AddBook;
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useTheme } from '@mui/material/styles';
import { useTheme as useCustomTheme } from '../../context/ThemeContext';
import { bookAPI } from '../../services/api';
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
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const { isDarkMode } = useCustomTheme();

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

  const [submitting, setSubmitting] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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

  const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      '& fieldset': {
        borderColor: theme.palette.border.main,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.border.dark,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
      },
    },
    '& .MuiInputLabel-root': {
      color: theme.palette.text.secondary,
      '&.Mui-focused': {
        color: theme.palette.primary.main,
      },
    },
  };



  useEffect(() => {
    fetchBookDetails();
  }, [id]);

  const fetchBookDetails = async () => {
    setFetchLoading(true);
    try {
      const response = await bookAPI.getBook(id);
      if (response.data.success) {
        const book = response.data.data;


        if (user?.id !== book.addedBy.id && user?.id !== book.addedBy._id) {
          setError('You are not authorized to edit this book.');
          return;
        }

        setFormData({
          title: book.title,
          author: book.author,
          description: book.description,
          genre: book.genre,
          publishedYear: book.publishedYear.toString(),
          isbn: book.isbn || '',
          pages: book.pages?.toString() || '',
          publisher: book.publisher || ''
        });
      } else {
        setError('Book not found.');
      }
    } catch (err) {
      console.error('Error fetching book:', err);
      setError(err.response?.data?.message || 'Failed to fetch book details. Please try again.');
    } finally {
      setFetchLoading(false);
    }
  };

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

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

    setSubmitting(true);
    setError('');

    try {
      const bookData = {
        title: formData.title,
        author: formData.author,
        description: formData.description,
        genre: formData.genre,
        publishedYear: parseInt(formData.publishedYear)
      };

      await bookAPI.updateBook(id, bookData);

      setSuccess('Book updated successfully!');
      setTimeout(() => {
        navigate(`/books/${id}`);
      }, 1500);

    } catch (err) {
      console.error('Error updating book:', err);
      setError(err.response?.data?.message || 'Failed to update book. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(`/books/${id}`);
  };

  if (fetchLoading) {
    return (
      <Box sx={{ backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Skeleton variant="text" width="30%" height={40} sx={{ mb: 3 }} />
          <Skeleton variant="text" width="50%" height={60} sx={{ mb: 2 }} />
          <Skeleton variant="text" width="40%" height={30} sx={{ mb: 4 }} />
          <Card sx={{ 
            borderRadius: 3, 
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.border.main}`
          }}>
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
      </Box>
    );
  }

  return (
    <Box 
      className="edit-book-page"
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
        <Card sx={{ 
          borderRadius: 3, 
          boxShadow: isDarkMode 
            ? '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)'
            : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.border.main}`
        }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  backgroundColor: theme.palette.background.secondary,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <MenuBook sx={{ fontSize: 24, color: theme.palette.text.secondary }} />
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
                    sx={textFieldStyles}
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
                    sx={textFieldStyles}
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
                    sx={textFieldStyles}
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
                    sx={textFieldStyles}
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
                    slotProps={{
                      htmlInput: {
                        min: 1000,
                        max: new Date().getFullYear()
                      }
                    }}
                    sx={textFieldStyles}
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
                    slotProps={{
                      htmlInput: {
                        min: 1
                      }
                    }}
                    sx={textFieldStyles}
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
                    sx={textFieldStyles}
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
                    sx={textFieldStyles}
                  />
                </Grid>
              </Grid>

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', gap: 2, mt: 4, justifyContent: 'flex-end' }}>
                <Button
                  type="button"
                  variant="outlined"
                  onClick={handleCancel}
                  disabled={submitting}
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
                  disabled={submitting}
                  startIcon={submitting ? <CircularProgress size={20} color="inherit" /> : <Save />}
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
                      backgroundColor: theme.palette.text.tertiary
                    }
                  }}
                >
                  {submitting ? 'Updating...' : 'Update Book'}
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Help Text */}
        <Box sx={{ 
          mt: 4, 
          p: 3, 
          backgroundColor: theme.palette.background.secondary, 
          borderRadius: 2,
          border: `1px solid ${theme.palette.border.main}`
        }}>
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
    </Box>
  );
};

export default EditBook;
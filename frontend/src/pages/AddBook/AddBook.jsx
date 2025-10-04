import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
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
    <div className="add-book-page">
      <div className="page-container">
        {/* Header */}
        <div className="page-header">
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/books')}
            className="back-button"
            sx={{
              textTransform: 'none',
              fontSize: '0.9rem'
            }}
          >
            Back to Books
          </Button>
          
          <Typography className="page-title">
            Add New Book
          </Typography>
          <Typography className="page-subtitle">
            Share a great book with the community
          </Typography>
        </div>

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
        <form onSubmit={handleSubmit}>
          <div className="form-card">
            {/* Basic Information */}
            <div className="form-section">
              <Typography className="section-title">
                <MenuBook className="section-icon" />
                Basic Information
              </Typography>
              
              <div className="form-field">
                <TextField
                  fullWidth
                  label="Book Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Enter the book title"
                />
              </div>

              <div className="field-row">
                <div className="form-field">
                  <TextField
                    fullWidth
                    label="Author"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    required
                    placeholder="Author's name"
                  />
                </div>

                <div className="form-field">
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
                </div>
              </div>

              <div className="form-field">
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
                />
              </div>
            </div>

            {/* Publication Details */}
            <div className="form-section">
              <Typography className="section-title">
                <Category className="section-icon" />
                Publication Details
              </Typography>

              <div className="field-row three-cols">
                <div className="form-field">
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
                </div>

                <div className="form-field">
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
                </div>

                <div className="form-field">
                  <TextField
                    fullWidth
                    label="ISBN"
                    name="isbn"
                    value={formData.isbn}
                    onChange={handleChange}
                    placeholder="978-0-123456-78-9"
                  />
                </div>
              </div>

              <div className="form-field">
                <TextField
                  fullWidth
                  label="Publisher"
                  name="publisher"
                  value={formData.publisher}
                  onChange={handleChange}
                  placeholder="Publisher name"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="form-actions">
            <Button
              type="button"
              onClick={handleReset}
              disabled={loading}
              className="action-button secondary"
            >
              Reset
            </Button>
            
            <Button
              type="submit"
              disabled={loading}
              className="action-button primary"
              startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <Save />}
            >
              {loading ? 'Adding...' : 'Add Book'}
            </Button>
          </div>
        </form>

        {/* Help Tip */}
        <div className="help-tip">
          <div className="tip-title">💡 Quick Tip</div>
          <div className="tip-text">
            Make sure the title and author are spelled correctly. A good description helps other readers discover your book!
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
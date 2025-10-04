import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
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
  Skeleton
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
  Analytics
} from '@mui/icons-material';
import ReviewsChart from '../../components/Charts/ReviewsChart';
import './Profile.scss';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // State management
  const [activeTab, setActiveTab] = useState(0);
  const [userBooks, setUserBooks] = useState([]);
  const [userReviews, setUserReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteType, setDeleteType] = useState(''); // 'book' or 'review'

  // Mock data
  const mockUserBooks = [
    {
      _id: '1',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      genre: 'Fiction',
      publishedYear: 1925,
      averageRating: 4.2,
      reviewCount: 156,
      createdAt: '2024-01-15'
    },
    {
      _id: '2',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      genre: 'Fiction',
      publishedYear: 1960,
      averageRating: 4.5,
      reviewCount: 203,
      createdAt: '2024-01-10'
    }
  ];

  const mockUserReviews = [
    {
      _id: 'review1',
      bookId: {
        _id: '3',
        title: 'Dune',
        author: 'Frank Herbert'
      },
      rating: 5,
      reviewText: 'An absolutely incredible science fiction masterpiece! Herbert created such a rich and detailed universe.',
      createdAt: '2024-01-20'
    },
    {
      _id: 'review2',
      bookId: {
        _id: '4',
        title: 'Pride and Prejudice',
        author: 'Jane Austen'
      },
      rating: 4,
      reviewText: 'A timeless classic with wonderful character development and witty dialogue.',
      createdAt: '2024-01-18'
    },
    {
      _id: 'review3',
      bookId: {
        _id: '5',
        title: '1984',
        author: 'George Orwell'
      },
      rating: 5,
      reviewText: 'Chilling and prophetic. More relevant today than ever before.',
      createdAt: '2024-01-16'
    }
  ];

  // Redirect if not logged in
  if (!user) {
    navigate('/login');
    return null;
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 800));
      setUserBooks(mockUserBooks);
      setUserReviews(mockUserReviews);
    } catch (err) {
      console.error('Failed to fetch user data:', err);
    } finally {
      setLoading(false);
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
      navigate(`/books/${selectedItem._id}/edit`);
    } else if (deleteType === 'review') {
      navigate(`/books/${selectedItem.bookId._id}/review?edit=${selectedItem._id}`);
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
        console.log('Deleting book:', selectedItem._id);
        setUserBooks(prev => prev.filter(book => book._id !== selectedItem._id));
      } else if (deleteType === 'review') {
        console.log('Deleting review:', selectedItem._id);
        setUserReviews(prev => prev.filter(review => review._id !== selectedItem._id));
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
    <div className="loading-container">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="loading-card">
          <div className="loading-header">
            <div className="loading-info">
              <Skeleton variant="text" width="60%" height={24} />
              <Skeleton variant="text" width="40%" height={20} />
              <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                <Skeleton variant="rectangular" width={60} height={20} sx={{ borderRadius: 1 }} />
                <Skeleton variant="rectangular" width={50} height={20} sx={{ borderRadius: 1 }} />
              </Box>
              <Skeleton variant="text" width={120} height={16} sx={{ mt: 1 }} />
            </div>
            <div className="loading-actions">
              <Skeleton variant="rectangular" width={60} height={32} sx={{ borderRadius: 1 }} />
              <Skeleton variant="circular" width={32} height={32} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="profile-page">
      <div className="page-container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="header-content">
            <div className="avatar-section">
              <Avatar className="user-avatar">
                {user.name?.charAt(0).toUpperCase()}
              </Avatar>
            </div>

            <div className="user-info">
              <div className="user-details">
                <div className="user-text">
                  <Typography className="user-name">
                    {user.name}
                  </Typography>
                  <Typography className="user-email">
                    {user.email}
                  </Typography>
                </div>

                <IconButton className="settings-button" size="small">
                  <Settings />
                </IconButton>
              </div>

              <div className="stats-grid">
                <div className="stat-item">
                  <Typography className="stat-number">
                    {stats.booksAdded}
                  </Typography>
                  <Typography className="stat-label">
                    Books Added
                  </Typography>
                </div>
                <div className="stat-item">
                  <Typography className="stat-number">
                    {stats.reviewsWritten}
                  </Typography>
                  <Typography className="stat-label">
                    Reviews Written
                  </Typography>
                </div>
                <div className="stat-item">
                  <Typography className="stat-number">
                    {stats.averageRating}
                  </Typography>
                  <Typography className="stat-label">
                    Avg Rating
                  </Typography>
                </div>
                <div className="stat-item">
                  <Typography className="stat-number">
                    {stats.totalReviewsReceived}
                  </Typography>
                  <Typography className="stat-label">
                    Reviews Received
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="content-section">
          <div className="tabs-header">
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
            >
              <Tab 
                icon={<MenuBook />} 
                label={`My Books (${userBooks.length})`} 
                iconPosition="start"
              />
              <Tab 
                icon={<RateReview />} 
                label={`My Reviews (${userReviews.length})`} 
                iconPosition="start"
              />
              <Tab 
                icon={<Analytics />} 
                label="Analytics" 
                iconPosition="start"
              />
            </Tabs>
          </div>

          <div className="tab-content">
            {loading ? (
              renderLoadingSkeleton()
            ) : (
              <>
                {/* My Books Tab */}
                {activeTab === 0 && (
                  <Box>
                    {userBooks.length === 0 ? (
                      <div className="empty-state">
                        <MenuBook className="empty-icon" />
                        <Typography className="empty-title">
                          No books added yet
                        </Typography>
                        <Typography className="empty-subtitle">
                          Start building your library by adding your first book
                        </Typography>
                        <Button
                          component={Link}
                          to="/add-book"
                          className="empty-action"
                          startIcon={<Add />}
                        >
                          Add Your First Book
                        </Button>
                      </div>
                    ) : (
                      <div className="items-grid">
                        {userBooks.map((book) => (
                          <div key={book._id} className="item-card">
                            <div className="item-header">
                              <div className="item-info">
                                <Typography className="item-title">
                                  {book.title}
                                </Typography>
                                <Typography className="item-subtitle">
                                  by {book.author}
                                </Typography>
                                
                                <div className="item-meta">
                                  <span className="meta-chip">{book.genre}</span>
                                  <span className="meta-chip">{book.publishedYear}</span>
                                  
                                  <div className="meta-rating">
                                    <Rating 
                                      value={book.averageRating} 
                                      precision={0.1} 
                                      readOnly 
                                      size="small"
                                    />
                                    <span className="rating-text">
                                      {book.averageRating} ({book.reviewCount})
                                    </span>
                                  </div>
                                  
                                  <span className="meta-date">
                                    Added {formatDate(book.createdAt)}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="item-actions">
                                <Button
                                  component={Link}
                                  to={`/books/${book._id}`}
                                  className="action-button view-button"
                                  startIcon={<Visibility />}
                                >
                                  View
                                </Button>
                                <IconButton
                                  className="more-button"
                                  onClick={(e) => handleMenuOpen(e, book, 'book')}
                                >
                                  <MoreVert />
                                </IconButton>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </Box>
                )}

                {/* My Reviews Tab */}
                {activeTab === 1 && (
                  <Box>
                    {userReviews.length === 0 ? (
                      <div className="empty-state">
                        <RateReview className="empty-icon" />
                        <Typography className="empty-title">
                          No reviews written yet
                        </Typography>
                        <Typography className="empty-subtitle">
                          Share your thoughts by writing your first book review
                        </Typography>
                        <Button
                          component={Link}
                          to="/books"
                          className="empty-action"
                          startIcon={<RateReview />}
                        >
                          Browse Books to Review
                        </Button>
                      </div>
                    ) : (
                      <div className="items-grid">
                        {userReviews.map((review) => (
                          <div key={review._id} className="item-card">
                            <div className="item-header">
                              <div className="item-info">
                                <Typography className="item-title">
                                  {review.bookId.title}
                                </Typography>
                                <Typography className="item-subtitle">
                                  by {review.bookId.author}
                                </Typography>
                                
                                <div className="item-meta">
                                  <div className="meta-rating">
                                    <Rating 
                                      value={review.rating} 
                                      readOnly 
                                      size="small"
                                    />
                                  </div>
                                  
                                  <span className="meta-date">
                                    Reviewed {formatDate(review.createdAt)}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="item-actions">
                                <Button
                                  component={Link}
                                  to={`/books/${review.bookId._id}`}
                                  className="action-button view-button"
                                  startIcon={<Visibility />}
                                >
                                  View Book
                                </Button>
                                <IconButton
                                  className="more-button"
                                  onClick={(e) => handleMenuOpen(e, review, 'review')}
                                >
                                  <MoreVert />
                                </IconButton>
                              </div>
                            </div>
                            
                            <div className="item-content">
                              <Typography className="review-text">
                                "{review.reviewText}"
                              </Typography>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </Box>
                )}

                {/* Analytics Tab */}
                {activeTab === 2 && (
                  <Box>
                    <ReviewsChart reviews={userReviews} books={userBooks} />
                  </Box>
                )}
              </>
            )}
          </div>
        </div>

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
            Edit
          </MenuItem>
          <MenuItem onClick={handleDeleteClick} sx={{ gap: 2, color: '#ef4444' }}>
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
        >
          <DialogTitle>
            <Typography variant="h6" fontWeight={700}>
              Delete {deleteType === 'book' ? 'Book' : 'Review'}
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              Are you sure you want to delete this {deleteType}? This action cannot be undone.
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
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Profile;
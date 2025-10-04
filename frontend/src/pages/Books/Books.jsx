import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useTheme } from '@mui/material/styles';
import { useTheme as useCustomTheme } from '../../context/ThemeContext';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Rating,
  Pagination,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Skeleton,
  Alert
} from '@mui/material';
import {
  Search,
  Add,
  FilterList,
  Sort,
  Star,
  Person,
  CalendarToday,
  MenuBook
} from '@mui/icons-material';
import './Books.scss';

const Books = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const { isDarkMode } = useCustomTheme();

  // State management
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [yearFilter, setYearFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');

  // Mock data for now (will be replaced with API calls)
  const mockBooks = [
    {
      _id: '1',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      description: 'A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream.',
      genre: 'Fiction',
      publishedYear: 1925,
      averageRating: 4.2,
      reviewCount: 156,
      addedBy: { name: 'John Doe' },
      createdAt: '2024-01-15'
    },
    {
      _id: '2',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      description: 'A gripping tale of racial injustice and childhood innocence in the American South.',
      genre: 'Fiction',
      publishedYear: 1960,
      averageRating: 4.5,
      reviewCount: 203,
      addedBy: { name: 'Jane Smith' },
      createdAt: '2024-01-10'
    },
    {
      _id: '3',
      title: 'Dune',
      author: 'Frank Herbert',
      description: 'An epic science fiction novel set on the desert planet Arrakis.',
      genre: 'Science Fiction',
      publishedYear: 1965,
      averageRating: 4.3,
      reviewCount: 89,
      addedBy: { name: 'Mike Johnson' },
      createdAt: '2024-01-08'
    },
    {
      _id: '4',
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      description: 'A romantic novel that critiques the British landed gentry at the end of the 18th century.',
      genre: 'Romance',
      publishedYear: 1813,
      averageRating: 4.4,
      reviewCount: 178,
      addedBy: { name: 'Sarah Wilson' },
      createdAt: '2024-01-05'
    },
    {
      _id: '5',
      title: '1984',
      author: 'George Orwell',
      description: 'A dystopian social science fiction novel about totalitarian control.',
      genre: 'Dystopian',
      publishedYear: 1949,
      averageRating: 4.6,
      reviewCount: 234,
      addedBy: { name: 'David Brown' },
      createdAt: '2024-01-03'
    }
  ];

  const genres = ['Fiction', 'Science Fiction', 'Romance', 'Mystery', 'Thriller', 'Fantasy', 'Biography', 'History', 'Dystopian'];

  useEffect(() => {
    fetchBooks();
  }, [currentPage, searchTerm, selectedGenre, sortBy, yearFilter, ratingFilter]);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock filtering and pagination logic
      let filteredBooks = mockBooks;
      
      if (searchTerm) {
        filteredBooks = filteredBooks.filter(book => 
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      if (selectedGenre) {
        filteredBooks = filteredBooks.filter(book => book.genre === selectedGenre);
      }
      
      if (yearFilter) {
        filteredBooks = filteredBooks.filter(book => {
          const year = book.publishedYear;
          switch (yearFilter) {
            case '2020s': return year >= 2020;
            case '2010s': return year >= 2010 && year < 2020;
            case '2000s': return year >= 2000 && year < 2010;
            case '1990s': return year >= 1990 && year < 2000;
            case 'classic': return year < 1990;
            default: return true;
          }
        });
      }
      
      if (ratingFilter) {
        filteredBooks = filteredBooks.filter(book => {
          const rating = book.averageRating;
          switch (ratingFilter) {
            case '4.5+': return rating >= 4.5;
            case '4.0+': return rating >= 4.0;
            case '3.5+': return rating >= 3.5;
            case '3.0+': return rating >= 3.0;
            default: return true;
          }
        });
      }
      
      // Sort books
      switch (sortBy) {
        case 'newest':
          filteredBooks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        case 'oldest':
          filteredBooks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
          break;
        case 'rating':
          filteredBooks.sort((a, b) => b.averageRating - a.averageRating);
          break;
        case 'title':
          filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'author':
          filteredBooks.sort((a, b) => a.author.localeCompare(b.author));
          break;
        case 'year':
          filteredBooks.sort((a, b) => b.publishedYear - a.publishedYear);
          break;
        case 'reviews':
          filteredBooks.sort((a, b) => b.reviewCount - a.reviewCount);
          break;
        default:
          break;
      }
      
      // Pagination (5 books per page as per requirements)
      const booksPerPage = 5;
      const startIndex = (currentPage - 1) * booksPerPage;
      const paginatedBooks = filteredBooks.slice(startIndex, startIndex + booksPerPage);
      
      setBooks(paginatedBooks);
      setTotalPages(Math.ceil(filteredBooks.length / booksPerPage));
      setError('');
    } catch (err) {
      setError('Failed to fetch books. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setCurrentPage(1);
  };

  const handleYearFilterChange = (event) => {
    setYearFilter(event.target.value);
    setCurrentPage(1);
  };

  const handleRatingFilterChange = (event) => {
    setRatingFilter(event.target.value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedGenre('');
    setSortBy('newest');
    setYearFilter('');
    setRatingFilter('');
    setCurrentPage(1);
  };

  return (
    <Box 
      className="books-page"
      sx={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        minHeight: '100vh'
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
        {/* Clean Header */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
            <Box>
              <Typography variant="h4" fontWeight={700} color={theme.palette.text.primary} gutterBottom>
                Books
              </Typography>
              <Typography variant="body1" color={theme.palette.text.secondary}>
                Discover and explore our collection
              </Typography>
            </Box>
            
            {user && (
              <Button
                component={Link}
                to="/add-book"
                variant="contained"
                startIcon={<Add />}
                sx={{
                  py: 1.2,
                  px: 3,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  backgroundColor: isDarkMode ? '#ffffff' : '#0f172a',
                  color: isDarkMode ? '#000000' : '#ffffff',
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: isDarkMode ? '#f3f4f6' : '#1e293b',
                    boxShadow: isDarkMode ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 4px 12px rgba(15, 23, 42, 0.15)'
                  }
                }}
              >
                Add Book
              </Button>
            )}
          </Box>

          {/* Enhanced Search and Filter Bar */}
          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            flexWrap: 'wrap',
            alignItems: 'center',
            mb: 3,
            p: 3,
            backgroundColor: theme.palette.background.paper,
            borderRadius: 3,
            border: `1px solid ${theme.palette.border.main}`,
            boxShadow: isDarkMode ? '0 1px 3px 0 rgba(0, 0, 0, 0.3)' : '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
          }}>
            <TextField
              placeholder="Search books, authors, or descriptions..."
              value={searchTerm}
              onChange={handleSearchChange}
              size="small"
              sx={{ 
                minWidth: 320, 
                flex: 1,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: theme.palette.background.secondary,
                  border: `1px solid ${theme.palette.border.main}`,
                  '&:hover': {
                    borderColor: theme.palette.border.dark
                  },
                  '&.Mui-focused': {
                    backgroundColor: theme.palette.background.paper,
                    borderColor: theme.palette.text.primary
                  }
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: theme.palette.text.tertiary, fontSize: 20 }} />
                  </InputAdornment>
                )
              }}
            />
            
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel>Genre</InputLabel>
              <Select
                value={selectedGenre}
                onChange={handleGenreChange}
                label="Genre"
                sx={{ 
                  borderRadius: 2,
                  backgroundColor: theme.palette.background.secondary,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.border.main
                  }
                }}
              >
                <MenuItem value="">All Genres</MenuItem>
                {genres.map((genre) => (
                  <MenuItem key={genre} value={genre}>{genre}</MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                onChange={handleSortChange}
                label="Sort By"
                sx={{ 
                  borderRadius: 2,
                  backgroundColor: theme.palette.background.secondary,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.border.main
                  }
                }}
              >
                <MenuItem value="newest">Newest First</MenuItem>
                <MenuItem value="oldest">Oldest First</MenuItem>
                <MenuItem value="rating">Highest Rated</MenuItem>
                <MenuItem value="title">Title A-Z</MenuItem>
                <MenuItem value="author">Author A-Z</MenuItem>
                <MenuItem value="year">Publication Year</MenuItem>
                <MenuItem value="reviews">Most Reviewed</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Year Range</InputLabel>
              <Select
                value={yearFilter}
                onChange={handleYearFilterChange}
                label="Year Range"
                sx={{ 
                  borderRadius: 2,
                  backgroundColor: theme.palette.background.secondary,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.border.main
                  }
                }}
              >
                <MenuItem value="">All Years</MenuItem>
                <MenuItem value="2020s">2020s</MenuItem>
                <MenuItem value="2010s">2010s</MenuItem>
                <MenuItem value="2000s">2000s</MenuItem>
                <MenuItem value="1990s">1990s</MenuItem>
                <MenuItem value="classic">Before 1990</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Rating</InputLabel>
              <Select
                value={ratingFilter}
                onChange={handleRatingFilterChange}
                label="Rating"
                sx={{ 
                  borderRadius: 2,
                  backgroundColor: theme.palette.background.secondary,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.border.main
                  }
                }}
              >
                <MenuItem value="">All Ratings</MenuItem>
                <MenuItem value="4.5+">4.5+ Stars</MenuItem>
                <MenuItem value="4.0+">4.0+ Stars</MenuItem>
                <MenuItem value="3.5+">3.5+ Stars</MenuItem>
                <MenuItem value="3.0+">3.0+ Stars</MenuItem>
              </Select>
            </FormControl>
            
            {(searchTerm || selectedGenre || yearFilter || ratingFilter) && (
              <Button
                onClick={clearFilters}
                size="small"
                startIcon={<FilterList />}
                sx={{
                  color: theme.palette.text.secondary,
                  textTransform: 'none',
                  fontWeight: 500,
                  borderRadius: 2,
                  px: 2,
                  '&:hover': {
                    backgroundColor: theme.palette.background.secondary
                  }
                }}
              >
                Clear All
              </Button>
            )}
          </Box>
        </Box>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        {/* Books Grid */}
        {loading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[...Array(5)].map((_, index) => (
              <Card 
                key={index}
                sx={{
                  borderRadius: 3,
                  border: `1px solid ${theme.palette.border.main}`,
                  boxShadow: 'none',
                  backgroundColor: theme.palette.background.paper
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', gap: 3, alignItems: 'start' }}>
                    {/* Book Cover Skeleton */}
                    <Skeleton 
                      variant="rectangular" 
                      width={80} 
                      height={110} 
                      sx={{ 
                        borderRadius: 2,
                        flexShrink: 0
                      }} 
                    />

                    {/* Content Skeleton */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                        <Box sx={{ flex: 1, mr: 2 }}>
                          <Skeleton variant="text" width="70%" height={28} sx={{ mb: 1 }} />
                          <Skeleton variant="text" width="45%" height={20} />
                        </Box>
                        <Skeleton variant="rectangular" width={60} height={24} sx={{ borderRadius: 1 }} />
                      </Box>

                      <Skeleton variant="text" width="100%" height={16} sx={{ mb: 0.5 }} />
                      <Skeleton variant="text" width="85%" height={16} sx={{ mb: 3 }} />

                      {/* Meta info skeleton */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Skeleton variant="rectangular" width={80} height={16} sx={{ borderRadius: 1 }} />
                          <Skeleton variant="text" width={30} height={16} />
                          <Skeleton variant="text" width={40} height={16} />
                        </Box>
                        <Skeleton variant="text" width={40} height={16} />
                      </Box>

                      {/* Buttons skeleton */}
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <Skeleton variant="rectangular" width={100} height={32} sx={{ borderRadius: 2 }} />
                        <Skeleton variant="rectangular" width={80} height={32} sx={{ borderRadius: 2 }} />
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        ) : books.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <MenuBook sx={{ fontSize: 80, color: theme.palette.border.main, mb: 2 }} />
            <Typography variant="h5" fontWeight={600} color="text.secondary" gutterBottom>
              No books found
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {searchTerm || selectedGenre ? 'Try adjusting your search or filters' : 'Be the first to add a book!'}
            </Typography>
            {user && (
              <Button
                component={Link}
                to="/add-book"
                variant="contained"
                startIcon={<Add />}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  backgroundColor: isDarkMode ? '#ffffff' : '#1f2937',
                  color: isDarkMode ? '#000000' : '#ffffff'
                }}
              >
                Add First Book
              </Button>
            )}
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {books.map((book) => (
              <Card 
                key={book._id}
                className="book-card"
                sx={{
                  borderRadius: 3,
                  border: `1px solid ${theme.palette.border.main}`,
                  boxShadow: 'none',
                  backgroundColor: theme.palette.background.paper,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: theme.palette.border.dark,
                    boxShadow: isDarkMode ? '0 4px 6px -1px rgba(0, 0, 0, 0.3)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', gap: 3, alignItems: 'start' }}>
                    {/* Minimalist Book Cover */}
                    <Box
                      sx={{
                        width: 80,
                        height: 110,
                        backgroundColor: theme.palette.background.secondary,
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        border: `1px solid ${theme.palette.border.main}`
                      }}
                    >
                      <MenuBook sx={{ fontSize: 28, color: theme.palette.text.tertiary }} />
                    </Box>

                    {/* Book Content */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                        <Box sx={{ flex: 1, minWidth: 0, mr: 2 }}>
                          <Typography 
                            variant="h6" 
                            fontWeight={600} 
                            color={theme.palette.text.primary} 
                            gutterBottom
                            sx={{ 
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            {book.title}
                          </Typography>
                          <Typography variant="body2" color={theme.palette.text.secondary} sx={{ mb: 1 }}>
                            by {book.author}
                          </Typography>
                        </Box>
                        
                        <Chip 
                          label={book.genre} 
                          size="small"
                          sx={{ 
                            backgroundColor: theme.palette.background.secondary,
                            color: theme.palette.text.secondary,
                            fontWeight: 500,
                            fontSize: '0.75rem'
                          }} 
                        />
                      </Box>

                      <Typography 
                        variant="body2" 
                        color={theme.palette.text.secondary}
                        sx={{ 
                          mb: 3, 
                          lineHeight: 1.5,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {book.description}
                      </Typography>

                      {/* Simplified Meta Info */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3, flexWrap: 'wrap' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Rating 
                            value={book.averageRating} 
                            precision={0.1} 
                            readOnly 
                            size="small"
                            sx={{ '& .MuiRating-iconFilled': { color: '#f59e0b' } }}
                          />
                          <Typography variant="body2" color={theme.palette.text.secondary} fontWeight={500}>
                            {book.averageRating}
                          </Typography>
                          <Typography variant="body2" color={theme.palette.text.tertiary}>
                            ({book.reviewCount})
                          </Typography>
                        </Box>
                        
                        <Typography variant="body2" color={theme.palette.text.tertiary}>
                          {book.publishedYear}
                        </Typography>
                      </Box>

                      {/* Clean Action Buttons */}
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                          component={Link}
                          to={`/books/${book._id}`}
                          variant="contained"
                          size="small"
                          sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                            backgroundColor: isDarkMode ? '#ffffff' : '#0f172a',
                            color: isDarkMode ? '#000000' : '#ffffff',
                            boxShadow: 'none',
                            px: 3,
                            py: 1,
                            '&:hover': {
                              backgroundColor: isDarkMode ? '#f3f4f6' : '#1e293b',
                              boxShadow: 'none'
                            }
                          }}
                        >
                          View Details
                        </Button>
                        
                        {user && (
                          <Button
                            component={Link}
                            to={`/books/${book._id}/review`}
                            variant="outlined"
                            size="small"
                            sx={{
                              borderRadius: 2,
                              textTransform: 'none',
                              fontWeight: 500,
                              fontSize: '0.875rem',
                              borderColor: theme.palette.border.main,
                              color: theme.palette.text.secondary,
                              px: 3,
                              py: 1,
                              '&:hover': {
                                borderColor: theme.palette.border.dark,
                                backgroundColor: theme.palette.background.secondary
                              }
                            }}
                          >
                            Review
                          </Button>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}

        {/* Pagination */}
        {!loading && books.length > 0 && totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              size="large"
              sx={{
                '& .MuiPaginationItem-root': {
                  borderRadius: 2,
                  fontWeight: 600,
                  '&.Mui-selected': {
                    backgroundColor: isDarkMode ? '#ffffff' : '#1f2937',
                    color: isDarkMode ? '#000000' : 'white',
                    '&:hover': {
                      backgroundColor: isDarkMode ? '#f3f4f6' : '#111827'
                    }
                  }
                }
              }}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Books;
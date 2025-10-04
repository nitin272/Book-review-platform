import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import {
    Box,
    Container,
    Typography,
    Button,
    Grid,
    Chip,
    Stack,
    useTheme
} from '@mui/material';
import {
    MenuBook,
    ArrowForward,
    Star,
    People,
    AutoStories
} from '@mui/icons-material';

const HeroSection = () => {
    const { user } = useContext(AuthContext);
    const theme = useTheme();

    return (
        <Box
            sx={{
                background: '#fafafa',
                minHeight: { xs: '85vh', md: '90vh' },
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Background Pattern */}
            <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `radial-gradient(circle at 20% 20%, rgba(103, 126, 234, 0.1) 0%, transparent 50%),
                                 radial-gradient(circle at 80% 80%, rgba(118, 75, 162, 0.1) 0%, transparent 50%)`,
            }} />

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <Grid container spacing={6} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Box sx={{ maxWidth: 600 }}>
                            <Typography
                                variant="h1"
                                sx={{
                                    fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                                    fontWeight: 800,
                                    mb: 3,
                                    lineHeight: 1.1,
                                    color: '#1a1a1a'
                                }}
                            >
                                Discover Your Next{' '}
                                <Box
                                    component="span"
                                    sx={{
                                        color: theme.palette.primary.main,
                                        position: 'relative'
                                    }}
                                >
                                    Great Read
                                </Box>
                            </Typography>

                            <Typography
                                variant="h6"
                                sx={{
                                    mb: 4,
                                    color: '#6b7280',
                                    lineHeight: 1.6,
                                    fontSize: { xs: '1.1rem', md: '1.25rem' },
                                    fontWeight: 400
                                }}
                            >
                                Join thousands of book lovers sharing reviews, discovering new authors,
                                and building their personal libraries in our vibrant reading community.
                            </Typography>

                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
                                <Button
                                    component={Link}
                                    to={user ? '/add-book' : '/signup'}
                                    variant="contained"
                                    size="large"
                                    endIcon={<ArrowForward />}
                                    sx={{
                                        py: 1.5,
                                        px: 4,
                                        fontSize: '1rem',
                                        fontWeight: 600,
                                        textTransform: 'none',
                                        borderRadius: 2,
                                        backgroundColor: '#1f2937',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                                        '&:hover': {
                                            backgroundColor: '#111827',
                                            transform: 'translateY(-1px)',
                                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                                        }
                                    }}
                                >
                                    {user ? 'Add a Book' : 'Start Reading'}
                                </Button>

                                <Button
                                    variant="outlined"
                                    size="large"
                                    sx={{
                                        py: 1.5,
                                        px: 4,
                                        fontSize: '1rem',
                                        fontWeight: 600,
                                        textTransform: 'none',
                                        borderRadius: 2,
                                        borderColor: '#e5e7eb',
                                        color: '#374151',
                                        '&:hover': {
                                            borderColor: '#d1d5db',
                                            backgroundColor: '#f9fafb'
                                        }
                                    }}
                                >
                                    Browse Books
                                </Button>
                            </Stack>

                            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                                <Chip
                                    icon={<Star sx={{ fontSize: 16 }} />}
                                    label="Free Forever"
                                    variant="outlined"
                                    sx={{
                                        borderColor: '#e5e7eb',
                                        color: '#6b7280',
                                        fontWeight: 500,
                                        '& .MuiChip-icon': { color: '#6b7280' }
                                    }}
                                />
                                <Chip
                                    icon={<People sx={{ fontSize: 16 }} />}
                                    label="10K+ Readers"
                                    variant="outlined"
                                    sx={{
                                        borderColor: '#e5e7eb',
                                        color: '#6b7280',
                                        fontWeight: 500,
                                        '& .MuiChip-icon': { color: '#6b7280' }
                                    }}
                                />
                                <Chip
                                    icon={<AutoStories sx={{ fontSize: 16 }} />}
                                    label="Active Community"
                                    variant="outlined"
                                    sx={{
                                        borderColor: '#e5e7eb',
                                        color: '#6b7280',
                                        fontWeight: 500,
                                        '& .MuiChip-icon': { color: '#6b7280' }
                                    }}
                                />
                            </Stack>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: { xs: 400, md: 500 },
                                position: 'relative'
                            }}
                        >
                            {/* Professional illustration container */}
                            <Box
                                sx={{
                                    width: { xs: 300, md: 400 },
                                    height: { xs: 300, md: 400 },
                                    background: 'white',
                                    borderRadius: 3,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                                    border: '1px solid #e5e7eb',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                {/* Subtle background pattern */}
                                <Box sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundImage: `radial-gradient(circle at 30% 30%, rgba(103, 126, 234, 0.05) 0%, transparent 50%),
                                                     radial-gradient(circle at 70% 70%, rgba(118, 75, 162, 0.05) 0%, transparent 50%)`,
                                }} />

                                {/* Main book icon with professional styling */}
                                <Box
                                    sx={{
                                        width: { xs: 120, md: 140 },
                                        height: { xs: 120, md: 140 },
                                        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                                        borderRadius: 3,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'relative',
                                        zIndex: 2,
                                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                                    }}
                                >
                                    <MenuBook sx={{
                                        fontSize: { xs: 60, md: 70 },
                                        color: 'white'
                                    }} />
                                </Box>

                                {/* Decorative elements */}
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 20,
                                        right: 20,
                                        width: 40,
                                        height: 40,
                                        background: theme.palette.primary.main,
                                        borderRadius: '50%',
                                        opacity: 0.1
                                    }}
                                />
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        bottom: 30,
                                        left: 30,
                                        width: 60,
                                        height: 60,
                                        background: theme.palette.primary.main,
                                        borderRadius: '50%',
                                        opacity: 0.05
                                    }}
                                />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default HeroSection;
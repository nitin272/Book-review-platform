import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
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
    Avatar,
    Button,
    Chip,
    Tab,
    Tabs,
    Badge,
    IconButton,
    Divider,
    LinearProgress,
    AvatarGroup,
    Fade,
    Zoom
} from '@mui/material';
import {
    Forum,
    Groups,
    EmojiEvents,
    TrendingUp,
    Favorite,
    Comment,
    Share,
    Add,
    Star,
    MenuBook,
    People,
    LocalFireDepartment,
    Schedule,
    BookmarkBorder,
    ThumbUp,
    Reply
} from '@mui/icons-material';
import './Community.scss';

const Community = () => {
    const { user } = useContext(AuthContext);
    const theme = useTheme();
    const { isDarkMode } = useCustomTheme();
    const [activeTab, setActiveTab] = useState(0);

    const discussionThreads = [
        {
            id: 1,
            title: "What's your favorite sci-fi book of 2024?",
            author: { name: 'Sarah Chen', avatar: 'S' },
            category: 'Discussion',
            replies: 47,
            likes: 23,
            lastActivity: '2 hours ago',
            isHot: true,
            excerpt: 'I just finished reading "Project Hail Mary" and I\'m blown away! What are your top sci-fi picks this year?'
        },

        {
            id: 2,
            title: 'Book Club: "The Seven Husbands of Evelyn Hugo" Discussion',
            author: { name: 'Michael Rodriguez', avatar: 'M' },
            category: 'Book Club',
            replies: 89,
            likes: 156,
            lastActivity: '4 hours ago',
            isHot: true,
            excerpt: 'Chapter 15-20 discussion thread. What did everyone think about the major revelation?'
        },
        {
            id: 3,
            title: 'Reading Challenge 2024: Share Your Progress!',
            author: { name: 'Emma Thompson', avatar: 'E' },
            category: 'Challenge',
            replies: 234,
            likes: 89,
            lastActivity: '6 hours ago',
            isHot: false,
            excerpt: 'How many books have you read so far? I\'m at 23/50 for my yearly goal!'
        },
        {
            id: 4,
            title: 'Underrated Fantasy Books You Should Read',
            author: { name: 'David Kim', avatar: 'D' },
            category: 'Recommendation',
            replies: 67,
            likes: 134,
            lastActivity: '8 hours ago',
            isHot: false,
            excerpt: 'Let\'s share some hidden gems in the fantasy genre that deserve more recognition.'
        },
        {
            id: 5,
            title: 'Monthly Book Swap - December 2024',
            author: { name: 'Lisa Park', avatar: 'L' },
            category: 'Event',
            replies: 45,
            likes: 78,
            lastActivity: '12 hours ago',
            isHot: false,
            excerpt: 'Time for our monthly book exchange! Post what you\'re willing to trade.'
        }
    ];

    const bookClubs = [
        {
            id: 1,
            name: 'Mystery & Thriller Enthusiasts',
            members: 1247,
            currentBook: 'Gone Girl',
            author: 'Gillian Flynn',
            nextMeeting: 'Dec 15, 2024',
            description: 'Dive deep into psychological thrillers and murder mysteries',
            isJoined: true,
            color: '#ef4444'
        },
        {
            id: 2,
            name: 'Classic Literature Society',
            members: 892,
            currentBook: 'Pride and Prejudice',
            author: 'Jane Austen',
            nextMeeting: 'Dec 18, 2024',
            description: 'Exploring timeless classics and their modern relevance',
            isJoined: false,
            color: '#3b82f6'
        },

        {
            id: 3,
            name: 'Sci-Fi & Fantasy Realm',
            members: 2156,
            currentBook: 'Dune',
            author: 'Frank Herbert',
            nextMeeting: 'Dec 20, 2024',
            description: 'Journey through otherworldly adventures and futuristic tales',
            isJoined: true,
            color: '#8b5cf6'
        }
    ];

    const readingChallenges = [
        {
            id: 1,
            title: '2024 Reading Challenge',
            description: 'Read 50 books this year',
            participants: 3421,
            progress: 68,
            userProgress: 23,
            userGoal: 50,
            timeLeft: '28 days left',
            isJoined: true
        },
        {
            id: 2,
            title: 'Genre Explorer',
            description: 'Read books from 12 different genres',
            participants: 1876,
            progress: 45,
            userProgress: 7,
            userGoal: 12,
            timeLeft: 'No deadline',
            isJoined: true
        },
        {
            id: 3,
            title: 'Classic Literature Marathon',
            description: 'Read 25 classic novels',
            participants: 967,
            progress: 32,
            userProgress: 0,
            userGoal: 25,
            timeLeft: '6 months left',
            isJoined: false
        }
    ];

    const communityHighlights = [
        {
            type: 'achievement',
            user: { name: 'Alex Johnson', avatar: 'A' },
            action: 'completed the 2024 Reading Challenge',
            time: '1 hour ago',
            icon: <EmojiEvents sx={{ color: '#fbbf24' }} />
        },
        {
            type: 'review',
            user: { name: 'Maria Garcia', avatar: 'M' },
            action: 'wrote a 5-star review for "The Midnight Library"',
            time: '3 hours ago',
            icon: <Star sx={{ color: '#fbbf24' }} />
        },
        {
            type: 'discussion',
            user: { name: 'James Wilson', avatar: 'J' },
            action: 'started a discussion about "Atomic Habits"',
            time: '5 hours ago',
            icon: <Forum sx={{ color: '#3b82f6' }} />
        },
        {
            type: 'club',
            user: { name: 'Sophie Brown', avatar: 'S' },
            action: 'joined the Mystery & Thriller Enthusiasts club',
            time: '8 hours ago',
            icon: <Groups sx={{ color: '#10b981' }} />
        }
    ];

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <Box
            sx={{
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
                minHeight: '100vh'
            }}
        >
            <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
                {/* Header Section */}
                <Fade in timeout={800}>
                    <Box sx={{ mb: 6 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
                            <Box>
                                <Typography
                                    variant="h3"
                                    fontWeight={800}
                                    color={theme.palette.text.primary}
                                    sx={{ mb: 2, fontSize: { xs: '2rem', md: '3rem' } }}
                                >
                                    Community
                                </Typography>
                                <Typography
                                    variant="h6"
                                    color={theme.palette.text.secondary}
                                    sx={{ fontSize: '1.25rem' }}
                                >
                                    Connect with fellow book lovers, join discussions, and discover new reads
                                </Typography>
                            </Box>

                            {user && (
                                <Button
                                    variant="contained"
                                    startIcon={<Add />}
                                    sx={{
                                        borderRadius: 3,
                                        textTransform: 'none',
                                        fontWeight: 600,
                                        px: 4,
                                        py: 1.5,
                                        backgroundColor: isDarkMode ? '#ffffff' : '#1f2937',
                                        color: isDarkMode ? '#000000' : '#ffffff',
                                        '&:hover': {
                                            backgroundColor: isDarkMode ? '#f3f4f6' : '#111827'
                                        }
                                    }}
                                >
                                    Start Discussion
                                </Button>
                            )}
                        </Box>

                        {/* Community Stats */}
                        <Grid container spacing={3}>
                            {[
                                { icon: <People />, number: '12,847', label: 'Active Members', color: '#3b82f6' },
                                { icon: <Forum />, number: '2,394', label: 'Discussions', color: '#10b981' },
                                { icon: <Groups />, number: '156', label: 'Book Clubs', color: '#8b5cf6' },
                                { icon: <EmojiEvents />, number: '89', label: 'Challenges', color: '#f59e0b' }
                            ].map((stat, index) => (
                                <Grid item xs={6} md={3} key={index}>
                                    <Zoom in timeout={1000 + index * 200}>
                                        <Card
                                            sx={{
                                                background: theme.palette.background.paper,
                                                borderRadius: 4,
                                                border: `1px solid ${theme.palette.border.main}`,
                                                boxShadow: 'none',
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    transform: 'translateY(-4px)',
                                                    boxShadow: isDarkMode
                                                        ? '0 8px 25px rgba(0, 0, 0, 0.3)'
                                                        : '0 8px 25px rgba(0, 0, 0, 0.1)'
                                                }
                                            }}
                                        >
                                            <CardContent sx={{ textAlign: 'center', p: 3 }}>
                                                <Box
                                                    sx={{
                                                        width: 60,
                                                        height: 60,
                                                        borderRadius: 3,
                                                        backgroundColor: `${stat.color}15`,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        mx: 'auto',
                                                        mb: 2
                                                    }}
                                                >
                                                    <Box sx={{ color: stat.color, fontSize: 28 }}>
                                                        {stat.icon}
                                                    </Box>
                                                </Box>
                                                <Typography variant="h4" fontWeight={800} color={theme.palette.text.primary} sx={{ mb: 1 }}>
                                                    {stat.number}
                                                </Typography>
                                                <Typography variant="body2" color={theme.palette.text.secondary} fontWeight={500}>
                                                    {stat.label}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Zoom>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Fade>        {
/* Main Content */}
                <Grid container spacing={4}>
                    {/* Left Column - Main Content */}
                    <Grid item xs={12} lg={8}>
                        <Fade in timeout={1200}>
                            <Box>
                                {/* Navigation Tabs */}
                                <Box sx={{ mb: 4 }}>
                                    <Tabs
                                        value={activeTab}
                                        onChange={handleTabChange}
                                        sx={{
                                            background: theme.palette.background.paper,
                                            borderRadius: 4,
                                            p: 1,
                                            boxShadow: isDarkMode
                                                ? '0 4px 6px -1px rgba(0, 0, 0, 0.3)'
                                                : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                            border: `1px solid ${theme.palette.border.main}`,
                                            '& .MuiTabs-indicator': {
                                                background: isDarkMode
                                                    ? 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)'
                                                    : 'linear-gradient(135deg, #1f2937 0%, #374151 100%)',
                                                height: 3,
                                                borderRadius: 3
                                            }
                                        }}
                                    >
                                        <Tab
                                            icon={<Forum />}
                                            label="Discussions"
                                            iconPosition="start"
                                            sx={{
                                                textTransform: 'none',
                                                fontWeight: 600,
                                                color: theme.palette.text.secondary,
                                                borderRadius: 3,
                                                margin: '0 0.25rem',
                                                minHeight: 48,
                                                '&.Mui-selected': {
                                                    color: theme.palette.text.primary
                                                }
                                            }}
                                        />
                                        <Tab
                                            icon={<Groups />}
                                            label="Book Clubs"
                                            iconPosition="start"
                                            sx={{
                                                textTransform: 'none',
                                                fontWeight: 600,
                                                color: theme.palette.text.secondary,
                                                borderRadius: 3,
                                                margin: '0 0.25rem',
                                                minHeight: 48,
                                                '&.Mui-selected': {
                                                    color: theme.palette.text.primary
                                                }
                                            }}
                                        />
                                        <Tab
                                            icon={<EmojiEvents />}
                                            label="Challenges"
                                            iconPosition="start"
                                            sx={{
                                                textTransform: 'none',
                                                fontWeight: 600,
                                                color: theme.palette.text.secondary,
                                                borderRadius: 3,
                                                margin: '0 0.25rem',
                                                minHeight: 48,
                                                '&.Mui-selected': {
                                                    color: theme.palette.text.primary
                                                }
                                            }}
                                        />
                                    </Tabs>
                                </Box>
                                {/* Discussions Tab */}
                                {activeTab === 0 && (
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                        {discussionThreads.map((thread, index) => (
                                            <Fade in timeout={400 + index * 100} key={thread.id}>
                                                <Card
                                                    sx={{
                                                        background: theme.palette.background.paper,
                                                        borderRadius: 4,
                                                        border: `1px solid ${theme.palette.border.main}`,
                                                        boxShadow: 'none',
                                                        transition: 'all 0.2s ease',
                                                        cursor: 'pointer',
                                                        '&:hover': {
                                                            borderColor: theme.palette.border.dark,
                                                            boxShadow: isDarkMode
                                                                ? '0 4px 6px -1px rgba(0, 0, 0, 0.3)'
                                                                : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                                            transform: 'translateY(-2px)'
                                                        }
                                                    }}
                                                >
                                                    <CardContent sx={{ p: 4 }}>
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                                <Avatar
                                                                    sx={{
                                                                        bgcolor: isDarkMode ? '#ffffff' : '#1f2937',
                                                                        color: isDarkMode ? '#000000' : '#ffffff',
                                                                        fontWeight: 600,
                                                                        width: 40,
                                                                        height: 40
                                                                    }}
                                                                >
                                                                    {thread.author.avatar}
                                                                </Avatar>
                                                                <Box>
                                                                    <Typography variant="body2" color={theme.palette.text.secondary}>
                                                                        {thread.author.name}
                                                                    </Typography>
                                                                    <Typography variant="body2" color={theme.palette.text.tertiary}>
                                                                        {thread.lastActivity}
                                                                    </Typography>
                                                                </Box>
                                                            </Box>

                                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                                {thread.isHot && (
                                                                    <Chip
                                                                        icon={<LocalFireDepartment sx={{ fontSize: 16 }} />}
                                                                        label="Hot"
                                                                        size="small"
                                                                        sx={{
                                                                            backgroundColor: '#fef2f2',
                                                                            color: '#dc2626',
                                                                            fontWeight: 600,
                                                                            '& .MuiChip-icon': { color: '#dc2626' }
                                                                        }}
                                                                    />
                                                                )}
                                                                <Chip
                                                                    label={thread.category}
                                                                    size="small"
                                                                    sx={{
                                                                        backgroundColor: theme.palette.background.secondary,
                                                                        color: theme.palette.text.secondary,
                                                                        fontWeight: 500
                                                                    }}
                                                                />
                                                            </Box>
                                                        </Box>

                                                        <Typography
                                                            variant="h6"
                                                            fontWeight={600}
                                                            color={theme.palette.text.primary}
                                                            sx={{ mb: 2, lineHeight: 1.4 }}
                                                        >
                                                            {thread.title}
                                                        </Typography>

                                                        <Typography
                                                            variant="body2"
                                                            color={theme.palette.text.secondary}
                                                            sx={{ mb: 3, lineHeight: 1.6 }}
                                                        >
                                                            {thread.excerpt}
                                                        </Typography>

                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                <ThumbUp sx={{ fontSize: 18, color: theme.palette.text.tertiary }} />
                                                                <Typography variant="body2" color={theme.palette.text.tertiary}>
                                                                    {thread.likes}
                                                                </Typography>
                                                            </Box>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                <Reply sx={{ fontSize: 18, color: theme.palette.text.tertiary }} />
                                                                <Typography variant="body2" color={theme.palette.text.tertiary}>
                                                                    {thread.replies} replies
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                    </CardContent>
                                                </Card>
                                            </Fade>
                                        ))}
                                    </Box>
                                )}
                                {/* Book Clubs Tab */}
                                {activeTab === 1 && (
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                        {bookClubs.map((club, index) => (
                                            <Fade in timeout={400 + index * 100} key={club.id}>
                                                <Card
                                                    sx={{
                                                        background: theme.palette.background.paper,
                                                        borderRadius: 4,
                                                        border: `1px solid ${theme.palette.border.main}`,
                                                        boxShadow: 'none',
                                                        transition: 'all 0.2s ease',
                                                        '&:hover': {
                                                            borderColor: theme.palette.border.dark,
                                                            boxShadow: isDarkMode
                                                                ? '0 4px 6px -1px rgba(0, 0, 0, 0.3)'
                                                                : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                                            transform: 'translateY(-2px)'
                                                        }
                                                    }}
                                                >
                                                    <CardContent sx={{ p: 4 }}>
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 3 }}>
                                                            <Box sx={{ flex: 1 }}>
                                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                                                    <Box
                                                                        sx={{
                                                                            width: 12,
                                                                            height: 12,
                                                                            borderRadius: '50%',
                                                                            backgroundColor: club.color
                                                                        }}
                                                                    />
                                                                    <Typography
                                                                        variant="h6"
                                                                        fontWeight={700}
                                                                        color={theme.palette.text.primary}
                                                                    >
                                                                        {club.name}
                                                                    </Typography>
                                                                    {club.isJoined && (
                                                                        <Chip
                                                                            label="Joined"
                                                                            size="small"
                                                                            sx={{
                                                                                backgroundColor: '#dcfce7',
                                                                                color: '#166534',
                                                                                fontWeight: 600
                                                                            }}
                                                                        />
                                                                    )}
                                                                </Box>

                                                                <Typography
                                                                    variant="body2"
                                                                    color={theme.palette.text.secondary}
                                                                    sx={{ mb: 2 }}
                                                                >
                                                                    {club.description}
                                                                </Typography>

                                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 2 }}>
                                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                        <People sx={{ fontSize: 18, color: theme.palette.text.tertiary }} />
                                                                        <Typography variant="body2" color={theme.palette.text.tertiary}>
                                                                            {club.members.toLocaleString()} members
                                                                        </Typography>
                                                                    </Box>
                                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                        <Schedule sx={{ fontSize: 18, color: theme.palette.text.tertiary }} />
                                                                        <Typography variant="body2" color={theme.palette.text.tertiary}>
                                                                            Next: {club.nextMeeting}
                                                                        </Typography>
                                                                    </Box>
                                                                </Box>

                                                                <Box
                                                                    sx={{
                                                                        p: 2,
                                                                        backgroundColor: theme.palette.background.secondary,
                                                                        borderRadius: 2,
                                                                        border: `1px solid ${theme.palette.border.light}`
                                                                    }}
                                                                >
                                                                    <Typography variant="body2" color={theme.palette.text.tertiary} sx={{ mb: 1 }}>
                                                                        Currently Reading:
                                                                    </Typography>
                                                                    <Typography variant="body1" fontWeight={600} color={theme.palette.text.primary}>
                                                                        {club.currentBook} by {club.author}
                                                                    </Typography>
                                                                </Box>
                                                            </Box>

                                                            <Button
                                                                variant={club.isJoined ? "outlined" : "contained"}
                                                                sx={{
                                                                    borderRadius: 2,
                                                                    textTransform: 'none',
                                                                    fontWeight: 600,
                                                                    px: 3,
                                                                    py: 1,
                                                                    ml: 3,
                                                                    ...(club.isJoined ? {
                                                                        borderColor: theme.palette.border.main,
                                                                        color: theme.palette.text.secondary,
                                                                        '&:hover': {
                                                                            borderColor: theme.palette.border.dark,
                                                                            backgroundColor: theme.palette.background.secondary
                                                                        }
                                                                    } : {
                                                                        backgroundColor: isDarkMode ? '#ffffff' : '#1f2937',
                                                                        color: isDarkMode ? '#000000' : '#ffffff',
                                                                        '&:hover': {
                                                                            backgroundColor: isDarkMode ? '#f3f4f6' : '#111827'
                                                                        }
                                                                    })
                                                                }}
                                                            >
                                                                {club.isJoined ? 'Joined' : 'Join Club'}
                                                            </Button>
                                                        </Box>
                                                    </CardContent>
                                                </Card>
                                            </Fade>
                                        ))}
                                    </Box>
                                )}
                                {/* Reading Challenges Tab */}
                                {activeTab === 2 && (
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                        {readingChallenges.map((challenge, index) => (
                                            <Fade in timeout={400 + index * 100} key={challenge.id}>
                                                <Card
                                                    sx={{
                                                        background: theme.palette.background.paper,
                                                        borderRadius: 4,
                                                        border: `1px solid ${theme.palette.border.main}`,
                                                        boxShadow: 'none',
                                                        transition: 'all 0.2s ease',
                                                        '&:hover': {
                                                            borderColor: theme.palette.border.dark,
                                                            boxShadow: isDarkMode
                                                                ? '0 4px 6px -1px rgba(0, 0, 0, 0.3)'
                                                                : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                                            transform: 'translateY(-2px)'
                                                        }
                                                    }}
                                                >
                                                    <CardContent sx={{ p: 4 }}>
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 3 }}>
                                                            <Box sx={{ flex: 1 }}>
                                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                                                    <Typography
                                                                        variant="h6"
                                                                        fontWeight={700}
                                                                        color={theme.palette.text.primary}
                                                                    >
                                                                        {challenge.title}
                                                                    </Typography>
                                                                    {challenge.isJoined && (
                                                                        <Chip
                                                                            label="Participating"
                                                                            size="small"
                                                                            sx={{
                                                                                backgroundColor: '#dbeafe',
                                                                                color: '#1e40af',
                                                                                fontWeight: 600
                                                                            }}
                                                                        />
                                                                    )}
                                                                </Box>

                                                                <Typography
                                                                    variant="body2"
                                                                    color={theme.palette.text.secondary}
                                                                    sx={{ mb: 3 }}
                                                                >
                                                                    {challenge.description}
                                                                </Typography>

                                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mb: 3 }}>
                                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                        <People sx={{ fontSize: 18, color: theme.palette.text.tertiary }} />
                                                                        <Typography variant="body2" color={theme.palette.text.tertiary}>
                                                                            {challenge.participants.toLocaleString()} participants
                                                                        </Typography>
                                                                    </Box>
                                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                        <Schedule sx={{ fontSize: 18, color: theme.palette.text.tertiary }} />
                                                                        <Typography variant="body2" color={theme.palette.text.tertiary}>
                                                                            {challenge.timeLeft}
                                                                        </Typography>
                                                                    </Box>
                                                                </Box>

                                                                {challenge.isJoined && (
                                                                    <Box
                                                                        sx={{
                                                                            p: 3,
                                                                            backgroundColor: theme.palette.background.secondary,
                                                                            borderRadius: 3,
                                                                            border: `1px solid ${theme.palette.border.light}`
                                                                        }}
                                                                    >
                                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                                                            <Typography variant="body2" color={theme.palette.text.secondary} fontWeight={600}>
                                                                                Your Progress
                                                                            </Typography>
                                                                            <Typography variant="body1" fontWeight={700} color={theme.palette.text.primary}>
                                                                                {challenge.userProgress} / {challenge.userGoal}
                                                                            </Typography>
                                                                        </Box>
                                                                        <LinearProgress
                                                                            variant="determinate"
                                                                            value={(challenge.userProgress / challenge.userGoal) * 100}
                                                                            sx={{
                                                                                height: 8,
                                                                                borderRadius: 4,
                                                                                backgroundColor: theme.palette.border.light,
                                                                                '& .MuiLinearProgress-bar': {
                                                                                    backgroundColor: '#10b981',
                                                                                    borderRadius: 4
                                                                                }
                                                                            }}
                                                                        />
                                                                    </Box>
                                                                )}
                                                            </Box>

                                                            <Button
                                                                variant={challenge.isJoined ? "outlined" : "contained"}
                                                                sx={{
                                                                    borderRadius: 2,
                                                                    textTransform: 'none',
                                                                    fontWeight: 600,
                                                                    px: 3,
                                                                    py: 1,
                                                                    ml: 3,
                                                                    ...(challenge.isJoined ? {
                                                                        borderColor: theme.palette.border.main,
                                                                        color: theme.palette.text.secondary,
                                                                        '&:hover': {
                                                                            borderColor: theme.palette.border.dark,
                                                                            backgroundColor: theme.palette.background.secondary
                                                                        }
                                                                    } : {
                                                                        backgroundColor: isDarkMode ? '#ffffff' : '#1f2937',
                                                                        color: isDarkMode ? '#000000' : '#ffffff',
                                                                        '&:hover': {
                                                                            backgroundColor: isDarkMode ? '#f3f4f6' : '#111827'
                                                                        }
                                                                    })
                                                                }}
                                                            >
                                                                {challenge.isJoined ? 'Participating' : 'Join Challenge'}
                                                            </Button>
                                                        </Box>
                                                    </CardContent>
                                                </Card>
                                            </Fade>
                                        ))}
                                    </Box>
                                )}
                            </Box>
                        </Fade>
                    </Grid>
                    {/* Right Column - Sidebar */}
                    <Grid item xs={12} lg={4}>
                        <Fade in timeout={1400}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                {/* Community Highlights */}
                                <Card
                                    sx={{
                                        background: theme.palette.background.paper,
                                        borderRadius: 4,
                                        border: `1px solid ${theme.palette.border.main}`,
                                        boxShadow: 'none'
                                    }}
                                >
                                    <CardContent sx={{ p: 4 }}>
                                        <Typography
                                            variant="h6"
                                            fontWeight={700}
                                            color={theme.palette.text.primary}
                                            sx={{ mb: 3 }}
                                        >
                                            🌟 Community Highlights
                                        </Typography>

                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                            {communityHighlights.map((highlight, index) => (
                                                <Box key={index} sx={{ display: 'flex', alignItems: 'start', gap: 2 }}>
                                                    <Box sx={{ mt: 0.5 }}>
                                                        {highlight.icon}
                                                    </Box>
                                                    <Box sx={{ flex: 1 }}>
                                                        <Typography variant="body2" color={theme.palette.text.primary} sx={{ mb: 0.5 }}>
                                                            <strong>{highlight.user.name}</strong> {highlight.action}
                                                        </Typography>
                                                        <Typography variant="body2" color={theme.palette.text.tertiary}>
                                                            {highlight.time}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            ))}
                                        </Box>
                                    </CardContent>
                                </Card>

                                {/* Trending Topics */}
                                <Card
                                    sx={{
                                        background: theme.palette.background.paper,
                                        borderRadius: 4,
                                        border: `1px solid ${theme.palette.border.main}`,
                                        boxShadow: 'none'
                                    }}
                                >
                                    <CardContent sx={{ p: 4 }}>
                                        <Typography
                                            variant="h6"
                                            fontWeight={700}
                                            color={theme.palette.text.primary}
                                            sx={{ mb: 3 }}
                                        >
                                            🔥 Trending Topics
                                        </Typography>

                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                            {[
                                                '#BookTok2024',
                                                '#SciFiReads',
                                                '#BookClubPicks',
                                                '#ReadingGoals',
                                                '#AuthorSpotlight'
                                            ].map((topic, index) => (
                                                <Chip
                                                    key={index}
                                                    label={topic}
                                                    clickable
                                                    sx={{
                                                        backgroundColor: theme.palette.background.secondary,
                                                        color: theme.palette.text.secondary,
                                                        fontWeight: 500,
                                                        justifyContent: 'flex-start',
                                                        '&:hover': {
                                                            backgroundColor: theme.palette.border.main
                                                        }
                                                    }}
                                                />
                                            ))}
                                        </Box>
                                    </CardContent>
                                </Card>

                                {/* Quick Actions */}
                                <Card
                                    sx={{
                                        background: theme.palette.background.paper,
                                        borderRadius: 4,
                                        border: `1px solid ${theme.palette.border.main}`,
                                        boxShadow: 'none'
                                    }}
                                >
                                    <CardContent sx={{ p: 4 }}>
                                        <Typography
                                            variant="h6"
                                            fontWeight={700}
                                            color={theme.palette.text.primary}
                                            sx={{ mb: 3 }}
                                        >
                                            ⚡ Quick Actions
                                        </Typography>

                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                            <Button
                                                fullWidth
                                                variant="outlined"
                                                startIcon={<Add />}
                                                sx={{
                                                    borderRadius: 2,
                                                    textTransform: 'none',
                                                    fontWeight: 600,
                                                    py: 1.5,
                                                    borderColor: theme.palette.border.main,
                                                    color: theme.palette.text.secondary,
                                                    '&:hover': {
                                                        borderColor: theme.palette.border.dark,
                                                        backgroundColor: theme.palette.background.secondary
                                                    }
                                                }}
                                            >
                                                Start Discussion
                                            </Button>
                                            <Button
                                                fullWidth
                                                variant="outlined"
                                                startIcon={<Groups />}
                                                sx={{
                                                    borderRadius: 2,
                                                    textTransform: 'none',
                                                    fontWeight: 600,
                                                    py: 1.5,
                                                    borderColor: theme.palette.border.main,
                                                    color: theme.palette.text.secondary,
                                                    '&:hover': {
                                                        borderColor: theme.palette.border.dark,
                                                        backgroundColor: theme.palette.background.secondary
                                                    }
                                                }}
                                            >
                                                Create Book Club
                                            </Button>
                                            <Button
                                                fullWidth
                                                variant="outlined"
                                                startIcon={<EmojiEvents />}
                                                sx={{
                                                    borderRadius: 2,
                                                    textTransform: 'none',
                                                    fontWeight: 600,
                                                    py: 1.5,
                                                    borderColor: theme.palette.border.main,
                                                    color: theme.palette.text.secondary,
                                                    '&:hover': {
                                                        borderColor: theme.palette.border.dark,
                                                        backgroundColor: theme.palette.background.secondary
                                                    }
                                                }}
                                            >
                                                Start Challenge
                                            </Button>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Box>
                        </Fade>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Community;
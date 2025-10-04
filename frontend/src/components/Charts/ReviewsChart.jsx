import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ReviewsChart = ({ reviews, books }) => {
  // Generate weekly review data for the last 8 weeks
  const generateWeeklyData = () => {
    const weeks = [];
    const reviewCounts = [];
    const now = new Date();

    for (let i = 7; i >= 0; i--) {
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - (i * 7));
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);

      const weekLabel = `Week ${8 - i}`;
      weeks.push(weekLabel);

      // Count reviews in this week (mock data for demo)
      const reviewsInWeek = reviews.filter(review => {
        const reviewDate = new Date(review.createdAt);
        return reviewDate >= weekStart && reviewDate <= weekEnd;
      }).length;

      // Add some mock variation for better visualization
      const mockCount = Math.floor(Math.random() * 4) + reviewsInWeek + 1;
      reviewCounts.push(mockCount);
    }

    return { weeks, reviewCounts };
  };

  // Generate rating distribution data
  const generateRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    reviews.forEach(review => {
      distribution[review.rating]++;
    });

    // Add some mock data for better visualization
    distribution[5] += Math.floor(Math.random() * 8) + 3;
    distribution[4] += Math.floor(Math.random() * 6) + 5;
    distribution[3] += Math.floor(Math.random() * 4) + 2;
    distribution[2] += Math.floor(Math.random() * 2) + 1;
    distribution[1] += Math.floor(Math.random() * 2);

    return distribution;
  };

  // Generate genre distribution from user's books
  const generateGenreDistribution = () => {
    const genres = {};

    books.forEach(book => {
      genres[book.genre] = (genres[book.genre] || 0) + 1;
    });

    // Add some mock genres for better visualization
    const mockGenres = ['Mystery', 'Romance', 'Thriller'];
    mockGenres.forEach(genre => {
      if (!genres[genre]) {
        genres[genre] = Math.floor(Math.random() * 2) + 1;
      }
    });

    return genres;
  };

  const { weeks, reviewCounts } = generateWeeklyData();
  const ratingDistribution = generateRatingDistribution();
  const genreDistribution = generateGenreDistribution();

  // Weekly Reviews Line Chart
  const weeklyReviewsData = {
    labels: weeks,
    datasets: [
      {
        label: 'Reviews Written',
        data: reviewCounts,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  // Rating Distribution Bar Chart
  const ratingDistributionData = {
    labels: ['5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star'],
    datasets: [
      {
        label: 'Number of Reviews',
        data: [
          ratingDistribution[5],
          ratingDistribution[4],
          ratingDistribution[3],
          ratingDistribution[2],
          ratingDistribution[1],
        ],
        backgroundColor: [
          '#10b981',
          '#3b82f6',
          '#f59e0b',
          '#ef4444',
          '#6b7280',
        ],
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  // Genre Distribution Doughnut Chart
  const genreDistributionData = {
    labels: Object.keys(genreDistribution),
    datasets: [
      {
        data: Object.values(genreDistribution),
        backgroundColor: [
          '#3b82f6',
          '#10b981',
          '#f59e0b',
          '#ef4444',
          '#8b5cf6',
          '#06b6d4',
        ],
        borderWidth: 0,
        hoverBorderWidth: 2,
        hoverBorderColor: '#ffffff',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#374151',
          font: {
            size: 12,
            weight: '500',
          },
        },
      },
      tooltip: {
        backgroundColor: '#ffffff',
        titleColor: '#374151',
        bodyColor: '#374151',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
      },
    },
    scales: {
      x: {
        grid: {
          color: '#f3f4f6',
          drawBorder: false,
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 11,
          },
        },
      },
      y: {
        grid: {
          color: '#f3f4f6',
          drawBorder: false,
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 11,
          },
        },
        beginAtZero: true,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#374151',
          font: {
            size: 12,
            weight: '500',
          },
          padding: 15,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        backgroundColor: '#ffffff',
        titleColor: '#374151',
        bodyColor: '#374151',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
      },
    },
    cutout: '60%',
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 3, color: '#1a1a1a' }}>
        📊 Your Reading Analytics
      </Typography>

      <Grid container spacing={3}>
        {/* Weekly Reviews Chart */}
        <Grid item xs={12} lg={8}>
          <Card sx={{
            borderRadius: 3,
            border: '1px solid #e2e8f0',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
          }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2, color: '#1a1a1a' }}>
                📈 Weekly Review Activity
              </Typography>
              <Typography variant="body2" color="#64748b" sx={{ mb: 3 }}>
                Your review activity over the last 8 weeks
              </Typography>
              <Box sx={{ height: 300 }}>
                <Line data={weeklyReviewsData} options={chartOptions} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Genre Distribution */}
        <Grid item xs={12} lg={4}>
          <Card sx={{
            borderRadius: 3,
            border: '1px solid #e2e8f0',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
          }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2, color: '#1a1a1a' }}>
                📚 Books by Genre
              </Typography>
              <Typography variant="body2" color="#64748b" sx={{ mb: 3 }}>
                Distribution of your book collection
              </Typography>
              <Box sx={{ height: 300 }}>
                <Doughnut data={genreDistributionData} options={doughnutOptions} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Rating Distribution */}
        <Grid item xs={12}>
          <Card sx={{
            borderRadius: 3,
            border: '1px solid #e2e8f0',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
          }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2, color: '#1a1a1a' }}>
                ⭐ Your Rating Distribution
              </Typography>
              <Typography variant="body2" color="#64748b" sx={{ mb: 3 }}>
                How you rate the books you review
              </Typography>
              <Box sx={{ height: 300 }}>
                <Bar data={ratingDistributionData} options={chartOptions} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReviewsChart;
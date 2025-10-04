import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Box, useTheme } from '@mui/material';
import { useTheme as useCustomTheme } from '../../context/ThemeContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ReviewsChart = ({ reviews }) => {
  const theme = useTheme();
  const { isDarkMode } = useCustomTheme();
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

  const { weeks, reviewCounts } = generateWeeklyData();

  // Weekly Reviews Line Chart
  const weeklyReviewsData = {
    labels: weeks,
    datasets: [
      {
        label: 'Reviews Written',
        data: reviewCounts,
        borderColor: isDarkMode ? '#60a5fa' : '#3b82f6', // Blue color that works well in both themes
        backgroundColor: isDarkMode ? 'rgba(96, 165, 250, 0.1)' : 'rgba(59, 130, 246, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: isDarkMode ? '#60a5fa' : '#3b82f6',
        pointBorderColor: theme.palette.background.paper,
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: theme.palette.background.paper,
        titleColor: theme.palette.text.primary,
        bodyColor: theme.palette.text.primary,
        borderColor: theme.palette.border.main,
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
      },
    },
    scales: {
      x: {
        grid: {
          color: theme.palette.border.light,
          drawBorder: false,
        },
        ticks: {
          color: theme.palette.text.secondary,
          font: {
            size: 10,
          },
        },
      },
      y: {
        grid: {
          color: theme.palette.border.light,
          drawBorder: false,
        },
        ticks: {
          color: theme.palette.text.secondary,
          font: {
            size: 10,
          },
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <Box sx={{ height: '100%' }}>
      <Line 
        key={isDarkMode ? 'dark' : 'light'} // Force re-render when theme changes
        data={weeklyReviewsData} 
        options={chartOptions} 
      />
    </Box>
  );
};

export default ReviewsChart;
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Box, useTheme, Typography } from '@mui/material';
import { useTheme as useCustomTheme } from '../../context/ThemeContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RatingDistributionChart = ({ reviews = [] }) => {
  const theme = useTheme();
  const { isDarkMode } = useCustomTheme();

  const generateRatingData = () => {
    const ratingCounts = [0, 0, 0, 0, 0]; 
    
    reviews.forEach(review => {
      if (review.rating >= 1 && review.rating <= 5) {
        ratingCounts[review.rating - 1]++;
      }
    });

    return ratingCounts;
  };

  const ratingCounts = generateRatingData();
  const hasData = ratingCounts.some(count => count > 0);

  const chartData = {
    labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
    datasets: [
      {
        label: 'Number of Reviews',
        data: ratingCounts,
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',   
          'rgba(245, 158, 11, 0.8)',  
          'rgba(251, 191, 36, 0.8)',  
          'rgba(34, 197, 94, 0.8)',   
          'rgba(16, 185, 129, 0.8)', 
        ],
        borderColor: [
          'rgba(239, 68, 68, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(251, 191, 36, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(16, 185, 129, 1)',
        ],
        borderWidth: 2,
        borderRadius: 4,
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
        callbacks: {
          label: function(context) {
            const total = ratingCounts.reduce((a, b) => a + b, 0);
            const percentage = total > 0 ? ((context.parsed.y / total) * 100).toFixed(1) : 0;
            return `${context.parsed.y} reviews (${percentage}%)`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: theme.palette.text.secondary,
          font: {
            size: 11,
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
          stepSize: 1,
        },
        beginAtZero: true,
      },
    },
  };

  if (!hasData) {
    return (
      <Box sx={{ 
        height: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 1
      }}>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          No rating data available
        </Typography>
        <Typography variant="caption" color="text.tertiary" textAlign="center">
          Start writing reviews to see your rating distribution
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100%', position: 'relative' }}>
      <Bar 
        key={`rating-chart-${reviews.length}`}
        data={chartData} 
        options={chartOptions} 
      />
    </Box>
  );
};

export default RatingDistributionChart;
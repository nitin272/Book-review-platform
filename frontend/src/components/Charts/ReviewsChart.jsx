import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
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
  Legend,
  Filler
);

const ReviewsChart = ({ reviews = [] }) => {
  const theme = useTheme();
  const { isDarkMode } = useCustomTheme();
  
  const generateWeeklyData = () => {
    const weeks = [];
    const reviewCounts = [];
    const now = new Date();



    for (let i = 7; i >= 0; i--) {
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - (i * 7));
      weekStart.setHours(0, 0, 0, 0); 
      
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      weekEnd.setHours(23, 59, 59, 999); 

  
      const weekLabel = `${(weekStart.getMonth() + 1).toString().padStart(2, '0')}/${weekStart.getDate().toString().padStart(2, '0')}`;
      weeks.push(weekLabel);
      
      const reviewsInWeek = reviews.filter(review => {
        if (!review.createdAt) return false;
        
        const reviewDate = new Date(review.createdAt);
        const isInRange = reviewDate >= weekStart && reviewDate <= weekEnd;
        

        if (isInRange) {
          console.log(`Review from ${reviewDate.toLocaleDateString()} falls in week ${weekLabel}`);
        }
        
        return isInRange;
      }).length;
      
      reviewCounts.push(reviewsInWeek);
    }

    return { weeks, reviewCounts };
  };

  const { weeks, reviewCounts } = generateWeeklyData();

  const weeklyReviewsData = {
    labels: weeks,
    datasets: [
      {
        label: 'Reviews Written',
        data: reviewCounts,
        borderColor: isDarkMode ? '#60a5fa' : '#3b82f6', 
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
          stepSize: 1,
        },
        beginAtZero: true,
        max: Math.max(...reviewCounts) + 1 || 5,
      },
    },
  };

  return (
    <Box sx={{ height: '100%', position: 'relative' }}>
      <Line 
        key={`${isDarkMode ? 'dark' : 'light'}-${reviews.length}`}
        data={weeklyReviewsData} 
        options={chartOptions} 
      />
      {reviews.length === 0 && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: theme.palette.text.secondary,
            fontSize: '0.875rem',
            pointerEvents: 'none'
          }}
        >
          No review data yet
        </Box>
      )}
    </Box>
  );
};

export default ReviewsChart;
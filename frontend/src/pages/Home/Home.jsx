import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import HeroSection from '../../components/Home/HeroSection';
import StatsSection from '../../components/Home/StatsSection';
import FeaturesSection from '../../components/Home/FeaturesSection';
import TestimonialsSection from '../../components/Home/TestimonialsSection';
import CTASection from '../../components/Home/CTASection';
import './Home.scss';

const Home = () => {
  const theme = useTheme();

  return (
    <Box
      className="home-page"
      sx={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        minHeight: '100vh'
      }}
    >
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
    </Box>
  );
};

export default Home;
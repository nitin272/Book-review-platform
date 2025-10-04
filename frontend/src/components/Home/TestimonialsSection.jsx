
import { Container, Box, Typography } from '@mui/material';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Avid Reader',
      avatar: 'S',
      text: 'Readly has completely transformed how I discover new books. The community recommendations are spot-on and I\'ve found so many hidden gems!'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Book Blogger',
      avatar: 'M',
      text: 'The review system is fantastic. I love how detailed and helpful the community reviews are. It\'s like having a personal book advisor.'
    },
    {
      name: 'Emma Thompson',
      role: 'Literature Student',
      avatar: 'E',
      text: 'Perfect platform for book discussions. The community is so welcoming and I\'ve learned so much from other readers\' perspectives.'
    }
  ];

  return (
    <section className="testimonials-section" style={{ padding: '6rem 0' }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={6}>
          <Typography
            variant="overline"
            sx={{
              color: 'primary.main',
              fontWeight: 700,
              letterSpacing: 2,
              fontSize: '0.875rem'
            }}
          >
            TESTIMONIALS
          </Typography>
          <Typography
            variant="h3"
            fontWeight={700}
            color="text.primary"
            sx={{ mt: 1, fontSize: { xs: '1.75rem', md: '2.25rem' } }}
          >
            Loved by Readers Worldwide
          </Typography>
        </Box>
        
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div className="testimonial-author">
                <div className="author-avatar">{testimonial.avatar}</div>
                <div className="author-info">
                  <div className="author-name">{testimonial.name}</div>
                  <div className="author-role">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default TestimonialsSection;
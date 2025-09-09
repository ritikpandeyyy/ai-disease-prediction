import React from 'react';
import { Box, Typography, Link, Container } from '@mui/material';

const Footer = () => (
  <Box sx={{ background: 'linear-gradient(90deg, #6dd5ed 0%, #2193b0 100%)', py: 3, mt: 6 }} component="footer">
    <Container maxWidth="lg">
      <Typography variant="body2" color="white" align="center">
        © {new Date().getFullYear()} AI Health. All rights reserved. &nbsp;|&nbsp;
        <Link href="/" color="inherit" underline="hover">Home</Link> &nbsp;|&nbsp;
        <Link href="/predict" color="inherit" underline="hover">Predict</Link> &nbsp;|&nbsp;
        <Link href="/diet" color="inherit" underline="hover">Diet</Link>
      </Typography>
    </Container>
  </Box>
);

export default Footer;

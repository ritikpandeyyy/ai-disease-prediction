import React from 'react';
import { Box, Typography, Link, Container, Stack, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ScienceIcon from '@mui/icons-material/Science';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const Footer = () => {
  return (
    <Box 
      component="footer"
      sx={{
        background: "linear-gradient(90deg, #1CB5E0 0%, #000851 100%)",
        py: 4,
        mt: 8,
        color: "white",
      }}
    >
      <Container maxWidth="lg">

        {/* Navigation Links */}
        <Stack 
          direction="row"
          spacing={4}
          justifyContent="center"
          alignItems="center"
          sx={{ mb: 1 }}
        >
          <Link 
            href="/" 
            color="inherit"
            underline="hover"
            sx={{ display: "flex", alignItems: "center", gap: 0.5, fontSize: "16px" }}
          >
            <HomeIcon sx={{ fontSize: 20 }} /> Home
          </Link>

          <Link 
            href="/predict" 
            color="inherit"
            underline="hover"
            sx={{ display: "flex", alignItems: "center", gap: 0.5, fontSize: "16px" }}
          >
            <ScienceIcon sx={{ fontSize: 20 }} /> Predict
          </Link>

          <Link 
            href="/diet" 
            color="inherit"
            underline="hover"
            sx={{ display: "flex", alignItems: "center", gap: 0.5, fontSize: "16px" }}
          >
            <RestaurantIcon sx={{ fontSize: 20 }} /> Diet
          </Link>
        </Stack>

        {/* Line */}
        <Box 
          sx={{ 
            width: "100px", 
            height: "2px", 
            backgroundColor: "rgba(255,255,255,0.6)", 
            mx: "auto", 
            mb: 2 
          }} 
        />

        {/* Copyright */}
        <Typography variant="body2" align="center" sx={{ opacity: 0.9, fontSize: "14px" }}>
          © {new Date().getFullYear()} <strong>AI Health</strong>. All rights reserved.
        </Typography>

      </Container>
    </Box>
  );
};

export default Footer;

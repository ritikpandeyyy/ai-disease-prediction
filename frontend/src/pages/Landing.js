import React from 'react';
import { Container, Typography, Button, Box, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import { motion } from 'framer-motion';

const Landing = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)', display: 'flex', flexDirection: 'column' }}>
      <Container maxWidth="lg" sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={6}>
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <Typography variant="h2" component="h1" gutterBottom fontWeight={700}>
                <LocalHospitalIcon fontSize="inherit" color="primary" sx={{ fontSize: 60, verticalAlign: 'middle', mr: 2 }} />
                AI Disease Prediction
              </Typography>
              <Typography variant="h5" color="text.secondary" paragraph>
                Empower your health journey with AI-powered disease prediction and personalized diet recommendations. Secure, fast, and easy to use.
              </Typography>
              <Button variant="contained" size="large" color="primary" sx={{ mt: 3, mr: 2 }} onClick={() => navigate('/register')}>
                Get Started
              </Button>
              <Button variant="outlined" size="large" color="primary" sx={{ mt: 3 }} onClick={() => navigate('/login')}>
                Login
              </Button>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <Paper elevation={6} sx={{ p: 4, background: 'rgba(255,255,255,0.9)', borderRadius: 4 }}>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <EmojiFoodBeverageIcon color="secondary" sx={{ fontSize: 80, mb: 2 }} />
                  <Typography variant="h4" fontWeight={600} gutterBottom>
                    Personalized Diet Plans
                  </Typography>
                  <Typography color="text.secondary" align="center">
                    Get diet recommendations tailored to your predicted condition. Stay healthy with expert-backed advice.
                  </Typography>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Landing;

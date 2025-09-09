import React from 'react';
import { Container, Typography, Box, Button, Stack, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import RestaurantIcon from '@mui/icons-material/Restaurant';

export default function Home() {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '80vh', background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)', py: 8 }}>
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Paper elevation={4} sx={{ borderRadius: 4, p: 5, textAlign: 'center', background: 'rgba(255,255,255,0.95)' }}>
            <motion.div initial={{ scale: 0.7 }} animate={{ scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}>
              <LocalHospitalIcon sx={{ fontSize: 60, color: '#2193b0', mb: 1 }} />
              <RestaurantIcon sx={{ fontSize: 60, color: '#6dd5ed', mb: 1, ml: 2 }} />
            </motion.div>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, color: '#2193b0' }}>AI Disease Prediction & Diet Recommendation</Typography>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              Get instant health insights and personalized diet plans powered by AI.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" mt={4}>
              <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.97 }}>
                <Button startIcon={<LocalHospitalIcon />} variant="contained" size="large" sx={{ background: 'linear-gradient(90deg, #6dd5ed 0%, #2193b0 100%)', fontWeight: 600 }} onClick={() => navigate('/predict')}>Predict Disease</Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.97 }}>
                <Button startIcon={<RestaurantIcon />} variant="outlined" size="large" sx={{ borderColor: '#2193b0', color: '#2193b0', fontWeight: 600 }} onClick={() => navigate('/diet')}>Get Diet Plan</Button>
              </motion.div>
            </Stack>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}


import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button, Alert, Card, CardContent, Grid, Stack, Divider } from '@mui/material';
import axios from 'axios';
import { motion } from 'framer-motion';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

export default function Predict() {
  const [form, setForm] = useState({ age: '', gender: '', symptoms: '' });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setResult(null);
    try {
      const res = await axios.post('http://localhost:5001/api/predict', form);
      setResult(res.data);
    } catch (err) {
      setError('Prediction failed');
    }
  };

  return (
    <Box sx={{ minHeight: '80vh', background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)', py: 8 }}>
      <Container maxWidth="md">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <Card elevation={6} sx={{ borderRadius: 5, p: 0, overflow: 'hidden', display: 'flex', minHeight: 420 }}>
            <Grid container>
              <Grid item xs={12} md={6} sx={{ background: 'linear-gradient(135deg, #6dd5ed 0%, #2193b0 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 4 }}>
                <HealthAndSafetyIcon sx={{ fontSize: 90, color: 'white', mb: 2 }} />
                <Typography variant="h4" fontWeight={700} color="white" gutterBottom>Disease Prediction</Typography>
                <Typography variant="body1" color="white" align="center">
                  Enter your details and symptoms to get an instant AI-powered prediction.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <CardContent sx={{ p: { xs: 3, md: 5 }, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <form onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                      <TextField label="Age" name="age" fullWidth value={form.age} onChange={handleChange} helperText="Enter your age" variant="outlined" />
                      <TextField label="Gender" name="gender" fullWidth value={form.gender} onChange={handleChange} helperText="e.g. Male, Female, Other" variant="outlined" />
                      <TextField label="Symptoms (comma separated)" name="symptoms" fullWidth value={form.symptoms} onChange={handleChange} helperText="e.g. fever, cough, headache" variant="outlined" />
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                        <Button type="submit" variant="contained" size="large" sx={{ background: 'linear-gradient(90deg, #6dd5ed 0%, #2193b0 100%)', fontWeight: 600, borderRadius: 3 }}>Predict</Button>
                      </motion.div>
                    </Stack>
                  </form>
                  {result && (
                    <Alert severity="success" sx={{ mt: 3 }}>
                      Prediction: <b>{result.prediction}</b> <br />
                      Confidence: <b>{(result.confidence * 100).toFixed(1)}%</b>
                    </Alert>
                  )}
                  {error && <Alert severity="error" sx={{ mt: 3 }}>{error}</Alert>}
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
}

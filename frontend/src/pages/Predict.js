import React, { useState } from 'react';
import {
  Container, Typography, Box, TextField, Button, Alert, Card,
  CardContent, Grid, Stack, LinearProgress, Chip
} from '@mui/material';
import axios from 'axios';
import { motion } from 'framer-motion';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

export default function Predict() {
  const [form, setForm] = useState({ age: '', gender: '', symptoms: '' });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setResult(null);
    try {
      const res = await axios.post('http://localhost:5001/api/predict', form);
      setResult(res.data);
    } catch {
      setError('Prediction failed');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: 8,
        background: 'linear-gradient(135deg, #d7e9f7 0%, #ecf2ff 100%)',
      }}
    >
      <Container maxWidth="md">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h3"
            fontWeight={800}
            align="center"
            color="#1f4b77"
            mb={2}
          >
            AI Disease Prediction
          </Typography>

          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            mb={5}
          >
            Enter your symptoms and details to get an instant prediction.
          </Typography>
        </motion.div>

        {/* MAIN CARD */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card
            elevation={5}
            sx={{
              borderRadius: 5,
              overflow: 'hidden',
              backdropFilter: 'blur(10px)',
              background: 'rgba(255,255,255,0.85)',
            }}
          >
            <Grid container>

              {/* LEFT SIDE */}
              <Grid
                item
                xs={12}
                md={5}
                sx={{
                  background: 'linear-gradient(135deg, #5fb2ff 0%, #2196f3 100%)',
                  p: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  textAlign: 'center',
                }}
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  <HealthAndSafetyIcon sx={{ fontSize: 95, opacity: 0.95 }} />
                </motion.div>

                <Typography variant="h4" fontWeight={700} mt={2}>
                  Smart Health Analysis
                </Typography>

                <Typography variant="body1" sx={{ mt: 1, opacity: 0.9 }}>
                  Get quick and reliable AI-powered disease predictions.
                </Typography>
              </Grid>

              {/* RIGHT SIDE (FORM) */}
              <Grid item xs={12} md={7}>
                <CardContent sx={{ p: 4 }}>

                  <form onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                      <TextField
                        label="Age"
                        name="age"
                        value={form.age}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                      />

                      <TextField
                        label="Gender"
                        name="gender"
                        value={form.gender}
                        onChange={handleChange}
                        fullWidth
                        helperText="e.g. Male, Female, Other"
                        variant="outlined"
                      />

                      <TextField
                        label="Symptoms (comma separated)"
                        name="symptoms"
                        value={form.symptoms}
                        onChange={handleChange}
                        fullWidth
                        helperText="e.g. fever, cough, headache"
                        multiline
                        rows={2}
                        variant="outlined"
                      />

                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          fullWidth
                          sx={{
                            py: 1.5,
                            borderRadius: 3,
                            background: 'linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)',
                            fontWeight: 700,
                          }}
                        >
                          Predict
                        </Button>
                      </motion.div>
                    </Stack>
                  </form>

                  {/* ERROR */}
                  {error && (
                    <Alert severity="error" sx={{ mt: 3 }}>
                      {error}
                    </Alert>
                  )}

                  {/* RESULT */}
                  {result && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Card
                        elevation={3}
                        sx={{
                          mt: 4,
                          p: 3,
                          borderRadius: 4,
                          background: '#e8f4ff',
                        }}
                      >
                        <Stack spacing={2}>
                          <Typography variant="h6" fontWeight={700}>
                            Prediction Result:
                          </Typography>

                          <Chip
                            label={result.prediction}
                            color="primary"
                            sx={{
                              fontSize: '15px',
                              fontWeight: 700,
                              py: 1.2,
                              background: '#2196f3',
                              color: 'white',
                            }}
                          />

                          <Typography variant="body2" fontWeight={600}>
                            Confidence Level:
                          </Typography>

                          <LinearProgress
                            variant="determinate"
                            value={result.confidence * 100}
                            sx={{
                              height: 10,
                              borderRadius: 5,
                            }}
                          />

                          <Typography fontWeight={600} align="right">
                            {(result.confidence * 100).toFixed(1)}%
                          </Typography>
                        </Stack>
                      </Card>
                    </motion.div>
                  )}

                </CardContent>
              </Grid>

            </Grid>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
}

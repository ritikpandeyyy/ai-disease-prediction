import React, { useState } from 'react';
import {
  Container, Typography, Box, TextField, Button, Alert, List, ListItem,
  Card, CardContent, Grid, Stack, Chip
} from '@mui/material';
import axios from 'axios';
import { motion } from 'framer-motion';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

export default function Diet() {
  const [form, setForm] = useState({ age: '', gender: '', healthGoal: '' });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setResult(null);
    try {
      const res = await axios.post('http://localhost:5001/api/diet', form);
      setResult(res.data);
    } catch {
      setError('Failed to fetch recommendations');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: 8,
        background: 'linear-gradient(135deg, #d7e9f7 0%, #f0f7ff 100%)',
      }}
    >
      <Container maxWidth="md">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h3" fontWeight={800} align="center" color="#1f4b77" mb={2}>
            Personalized Diet Plan
          </Typography>
          <Typography variant="subtitle1" align="center" color="text.secondary" mb={5}>
            Enter your details to generate an AI-powered healthy diet recommendation.
          </Typography>
        </motion.div>

        {/* MAIN CARD */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card
            elevation={5}
            sx={{
              borderRadius: 5,
              overflow: 'hidden',
              backdropFilter: 'blur(10px)',
              background: 'rgba(255,255,255,0.8)',
            }}
          >
            <Grid container>

              {/* LEFT SIDE */}
              <Grid
                item
                xs={12}
                md={5}
                sx={{
                  background: 'linear-gradient(135deg, #84d8f6 0%, #6db3f2 100%)',
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
                  <EmojiFoodBeverageIcon sx={{ fontSize: 90, opacity: 0.9 }} />
                </motion.div>

                <Typography variant="h4" fontWeight={700} mt={2}>
                  Eat Smart, Live Better
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, opacity: 0.9 }}>
                  AI crafts your perfect diet based on habits and goals.
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
                        variant="outlined"
                        helperText="e.g. Male, Female, Other"
                      />
                      <TextField
                        label="Health Goal"
                        name="healthGoal"
                        value={form.healthGoal}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        helperText="e.g. weight loss, muscle gain, diabetes"
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
                            letterSpacing: 0.5,
                          }}
                        >
                          Get My Diet Plan
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
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Alert
                        severity="success"
                        sx={{ mt: 4, borderRadius: 3, background: '#e8fdf1' }}
                        icon={<RestaurantMenuIcon />}
                      >
                        <Typography variant="h6" fontWeight={600} mb={1}>
                          Your Recommendations:
                        </Typography>
                        <List>
                          {result.recommendations.map((rec, idx) => (
                            <ListItem key={idx}>
                              <Chip
                                label={rec}
                                color="primary"
                                sx={{ background: '#6dd5ed', color: 'white', fontWeight: 600 }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Alert>
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


import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button, Alert, List, ListItem, Card, CardContent, Grid, Stack } from '@mui/material';
import axios from 'axios';
import { motion } from 'framer-motion';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';

export default function Diet() {
  const [form, setForm] = useState({ age: '', gender: '', healthGoal: '' });
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
      const res = await axios.post('http://localhost:5001/api/diet', form);
      setResult(res.data);
    } catch (err) {
      setError('Recommendation failed');
    }
  };

  return (
    <Box sx={{ minHeight: '80vh', background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)', py: 8 }}>
      <Container maxWidth="md">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <Card elevation={6} sx={{ borderRadius: 5, p: 0, overflow: 'hidden', display: 'flex', minHeight: 420 }}>
            <Grid container>
              <Grid item xs={12} md={6} sx={{ background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 4 }}>
                <EmojiFoodBeverageIcon sx={{ fontSize: 90, color: '#6dd5ed', mb: 2 }} />
                <Typography variant="h4" fontWeight={700} color="#2193b0" gutterBottom>Diet Recommendation</Typography>
                <Typography variant="body1" color="textSecondary" align="center">
                  Get a personalized diet plan based on your health goals and profile.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <CardContent sx={{ p: { xs: 3, md: 5 }, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <form onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                      <TextField label="Age" name="age" fullWidth value={form.age} onChange={handleChange} helperText="Enter your age" variant="outlined" />
                      <TextField label="Gender" name="gender" fullWidth value={form.gender} onChange={handleChange} helperText="e.g. Male, Female, Other" variant="outlined" />
                      <TextField label="Health Goal" name="healthGoal" fullWidth value={form.healthGoal} onChange={handleChange} helperText="e.g. weight loss, muscle gain, diabetes" variant="outlined" />
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                        <Button type="submit" variant="contained" size="large" sx={{ background: 'linear-gradient(90deg, #6dd5ed 0%, #2193b0 100%)', fontWeight: 600, borderRadius: 3 }}>Get Recommendation</Button>
                      </motion.div>
                    </Stack>
                  </form>
                  {result && (
                    <Alert severity="success" sx={{ mt: 3 }}>
                      <Typography variant="subtitle1">Recommendations:</Typography>
                      <List>
                        {result.recommendations.map((rec, idx) => (
                          <ListItem key={idx}>{rec}</ListItem>
                        ))}
                      </List>
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

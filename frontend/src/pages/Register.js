
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Card, CardContent, Grid, InputAdornment, Alert } from '@mui/material';
import axios from 'axios';
import { motion } from 'framer-motion';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EmailIcon from '@mui/icons-material/Email';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import HowToRegIcon from '@mui/icons-material/HowToReg';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/api/auth/register', { name, email, password });
      localStorage.setItem('token', res.data.token);
      window.location = '/';
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <Box sx={{ minHeight: '80vh', background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)', py: 8 }}>
      <Container maxWidth="md">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <Card elevation={6} sx={{ borderRadius: 5, p: 0, overflow: 'hidden', display: 'flex', minHeight: 400 }}>
            <Grid container>
              <Grid item xs={12} md={6} sx={{ background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 4 }}>
                <HowToRegIcon sx={{ fontSize: 80, color: '#2193b0', mb: 2 }} />
                <Typography variant="h4" fontWeight={700} color="#2193b0" gutterBottom>Join Us</Typography>
                <Typography variant="body1" color="textSecondary" align="center">
                  Register to start your AI-powered health journey.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <CardContent sx={{ p: { xs: 3, md: 5 }, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <form onSubmit={handleSubmit}>
                    <TextField
                      label="Name"
                      fullWidth
                      margin="normal"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      InputProps={{ startAdornment: <InputAdornment position="start"><PersonAddIcon /></InputAdornment> }}
                    />
                    <TextField
                      label="Email"
                      fullWidth
                      margin="normal"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment> }}
                    />
                    <TextField
                      label="Password"
                      type="password"
                      fullWidth
                      margin="normal"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      InputProps={{ startAdornment: <InputAdornment position="start"><LockOpenIcon /></InputAdornment> }}
                    />
                    {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
                    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                      <Button type="submit" variant="contained" size="large" fullWidth sx={{ mt: 3, background: 'linear-gradient(90deg, #6dd5ed 0%, #2193b0 100%)', fontWeight: 600, borderRadius: 3 }}>Register</Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
}

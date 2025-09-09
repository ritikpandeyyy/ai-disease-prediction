
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Card, CardContent, Grid, InputAdornment, Alert } from '@mui/material';
import axios from 'axios';
import { motion } from 'framer-motion';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import EmailIcon from '@mui/icons-material/Email';
import LoginIcon from '@mui/icons-material/Login';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      window.location = '/';
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <Box sx={{ minHeight: '80vh', background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)', py: 8 }}>
      <Container maxWidth="md">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <Card elevation={6} sx={{ borderRadius: 5, p: 0, overflow: 'hidden', display: 'flex', minHeight: 400 }}>
            <Grid container>
              <Grid item xs={12} md={6} sx={{ background: 'linear-gradient(135deg, #6dd5ed 0%, #2193b0 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 4 }}>
                <LoginIcon sx={{ fontSize: 80, color: 'white', mb: 2 }} />
                <Typography variant="h4" fontWeight={700} color="white" gutterBottom>Welcome Back</Typography>
                <Typography variant="body1" color="white" align="center">
                  Login to access your AI-powered health dashboard.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <CardContent sx={{ p: { xs: 3, md: 5 }, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <form onSubmit={handleSubmit}>
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
                      <Button type="submit" variant="contained" size="large" fullWidth sx={{ mt: 3, background: 'linear-gradient(90deg, #6dd5ed 0%, #2193b0 100%)', fontWeight: 600, borderRadius: 3 }}>Login</Button>
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

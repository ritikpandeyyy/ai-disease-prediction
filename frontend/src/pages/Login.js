import React, { useState } from 'react';
import {
  TextField, Button, Container, Typography, Box, Card, CardContent,
  Grid, InputAdornment, Alert, IconButton, Divider, Link
} from '@mui/material';
import axios from 'axios';
import { motion } from 'framer-motion';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import EmailIcon from '@mui/icons-material/Email';
import LoginIcon from '@mui/icons-material/Login';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async e => {
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
    <Box
      sx={{
        minHeight: '100vh',
        py: 10,
        background: 'linear-gradient(135deg, #c3dafe 0%, #e0e7ff 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >

      {/* Floating Background Elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
        style={{
          width: 220,
          height: 220,
          background: 'rgba(255,255,255,0.25)',
          borderRadius: '50%',
          position: 'absolute',
          top: 40,
          right: -50,
          filter: 'blur(25px)',
        }}
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
        style={{
          width: 150,
          height: 150,
          background: 'rgba(255,255,255,0.25)',
          borderRadius: '50%',
          position: 'absolute',
          bottom: 60,
          left: -40,
          filter: 'blur(20px)',
        }}
      />

      <Container maxWidth="sm">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>

          <Card
            elevation={8}
            sx={{
              borderRadius: 5,
              backdropFilter: 'blur(12px)',
              background: 'rgba(255,255,255,0.75)',
              overflow: 'hidden',
              p: 1
            }}
          >
            <Grid container>
              {/* Left Section */}
              <Grid
                item
                xs={12}
                sx={{
                  textAlign: 'center',
                  py: 4,
                  background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                  color: 'white',
                }}
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  <LoginIcon sx={{ fontSize: 80, opacity: 0.9 }} />
                </motion.div>

                <Typography variant="h4" fontWeight={700} mt={2}>
                  Welcome Back
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Log in to your AI-powered health dashboard.
                </Typography>
              </Grid>

              {/* Right Section */}
              <Grid item xs={12}>
                <CardContent sx={{ p: 4 }}>
                  <form onSubmit={handleSubmit}>

                    {/* EMAIL */}
                    <TextField
                      label="Email Address"
                      fullWidth
                      margin="normal"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon color="primary" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root:hover fieldset': { borderColor: '#2193b0' },
                        '& .Mui-focused fieldset': { borderColor: '#2193b0' },
                      }}
                    />

                    {/* PASSWORD */}
                    <TextField
                      label="Password"
                      type={showPass ? 'text' : 'password'}
                      fullWidth
                      margin="normal"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockOpenIcon color="primary" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowPass(!showPass)}>
                              {showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root:hover fieldset': { borderColor: '#2193b0' },
                        '& .Mui-focused fieldset': { borderColor: '#2193b0' },
                      }}
                    />

                    {/* Error Message */}
                    {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

                    {/* Forgot password */}
                    <Box mt={1} textAlign="right">
                      <Link href="#" underline="hover" sx={{ fontSize: 14, color: '#1e88e5' }}>
                        Forgot Password?
                      </Link>
                    </Box>

                    {/* Login Button */}
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        sx={{
                          mt: 3,
                          py: 1.5,
                          borderRadius: 3,
                          fontWeight: 700,
                          background: 'linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)',
                        }}
                      >
                        Login
                      </Button>
                    </motion.div>

                    {/* Divider */}
                    <Divider sx={{ my: 3 }} />

                    {/* Extra actions */}
                    <Typography variant="body2" align="center">
                      Don’t have an account?{' '}
                      <Link href="/register" sx={{ color: '#2193b0', fontWeight: 600 }}>
                        Register Now
                      </Link>
                    </Typography>

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

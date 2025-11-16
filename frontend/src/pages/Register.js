import React, { useState } from 'react';
import {
  TextField, Button, Container, Typography, Box, Card, CardContent,
  Grid, InputAdornment, Alert, IconButton, Divider, Link
} from '@mui/material';
import axios from 'axios';
import { motion } from 'framer-motion';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EmailIcon from '@mui/icons-material/Email';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import HowToRegIcon from '@mui/icons-material/HowToReg';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/api/auth/register', {
        name, email, password
      });
      localStorage.setItem('token', res.data.token);
      window.location = '/';
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: 10,
        background: 'linear-gradient(135deg, #d0e2ff 0%, #e8f0ff 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >

      {/* Floating background shapes */}
      <motion.div
        animate={{ y: [0, -25, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
        style={{
          width: 220,
          height: 220,
          background: 'rgba(255,255,255,0.25)',
          borderRadius: '50%',
          position: 'absolute',
          top: -40,
          right: -40,
          filter: 'blur(25px)',
        }}
      />

      <motion.div
        animate={{ y: [0, 25, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
        style={{
          width: 150,
          height: 150,
          background: 'rgba(255,255,255,0.25)',
          borderRadius: '50%',
          position: 'absolute',
          bottom: 10,
          left: -40,
          filter: 'blur(20px)',
        }}
      />

      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >

          <Card
            elevation={8}
            sx={{
              borderRadius: 5,
              backdropFilter: 'blur(14px)',
              background: 'rgba(255,255,255,0.75)',
              overflow: 'hidden',
              p: 1
            }}
          >
            <Grid container>
              {/* LEFT HERO SECTION */}
              <Grid
                item
                xs={12}
                sx={{
                  textAlign: 'center',
                  py: 4,
                  background: 'linear-gradient(135deg, #6dd5ed 0%, #2193b0 100%)',
                  color: 'white'
                }}
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  <HowToRegIcon sx={{ fontSize: 80, opacity: 0.9 }} />
                </motion.div>

                <Typography variant="h4" fontWeight={700} mt={2}>
                  Create an Account
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Join us and start your AI-powered health journey.
                </Typography>
              </Grid>

              {/* RIGHT SIDE (FORM) */}
              <Grid item xs={12}>
                <CardContent sx={{ p: 4 }}>
                  <form onSubmit={handleSubmit}>

                    {/* NAME */}
                    <TextField
                      label="Full Name"
                      fullWidth
                      margin="normal"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonAddIcon color="primary" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root:hover fieldset': { borderColor: '#2193b0' },
                        '& .Mui-focused fieldset': { borderColor: '#2193b0' },
                      }}
                    />

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
                      fullWidth
                      type={showPass ? 'text' : 'password'}
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
                        )
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root:hover fieldset': { borderColor: '#2193b0' },
                        '& .Mui-focused fieldset': { borderColor: '#2193b0' },
                      }}
                    />

                    {/* ERROR */}
                    {error && (
                      <Alert severity="error" sx={{ mt: 2 }}>
                        {error}
                      </Alert>
                    )}

                    {/* REGISTER BUTTON */}
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
                        Register
                      </Button>
                    </motion.div>

                    {/* LINE */}
                    <Divider sx={{ my: 3 }} />

                    <Typography variant="body2" align="center">
                      Already have an account?{' '}
                      <Link href="/login" sx={{ color: '#2193b0', fontWeight: 600 }}>
                        Login
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

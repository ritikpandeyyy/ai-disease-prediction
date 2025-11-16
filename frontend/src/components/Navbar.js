import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, useTheme, Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Paper elevation={3} sx={{ borderRadius: 3, m: 2, mb: 4, background: 'rgba(255,255,255,0.85)' }}>
      <AppBar position="static" elevation={0} sx={{ background: 'linear-gradient(90deg, #6dd5ed 0%, #2193b0 100%)', borderRadius: 3 }}>
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: 1 }} component={Link} to="/" color="inherit" style={{ textDecoration: 'none' }}>
            AI Health
          </Typography>
          <Box>
            <Button color="inherit" component={Link} to="/dashboard" sx={{ mx: 1, fontWeight: 500 }}>Dashboard</Button>
            <Button color="inherit" component={Link} to="/predict" sx={{ mx: 1, fontWeight: 500 }}>Predict</Button>
            <Button color="inherit" component={Link} to="/diet" sx={{ mx: 1, fontWeight: 500 }}>Diet</Button>
            {isLoggedIn ? (
              <>
                <Button color="inherit" component={Link} to="/profile" sx={{ mx: 1, fontWeight: 500 }}>Profile</Button>
                <Button color="inherit" onClick={handleLogout} sx={{ mx: 1, fontWeight: 500 }}>Logout</Button>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/login" sx={{ mx: 1, fontWeight: 500 }}>Login</Button>
                <Button color="inherit" component={Link} to="/register" sx={{ mx: 1, fontWeight: 500 }}>Register</Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Paper>
  );
}

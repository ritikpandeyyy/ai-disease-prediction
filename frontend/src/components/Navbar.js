import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Paper, useTheme, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

export default function Navbar() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Paper
      elevation={6}
      sx={{
        borderRadius: 4,
        mx: 3,
        mt: 2,
        mb: 4,
        backdropFilter: "blur(15px)",
        background: "rgba(255,255,255,0.55)",
      }}
    >
      <AppBar
        position="static"
        elevation={0}
        sx={{
          borderRadius: 4,
          background: "linear-gradient(120deg, #1CB5E0 0%, #000851 100%)",
        }}
      >
        <Toolbar sx={{ py: 1 }}>

          {/* Branding */}
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "0.5px",
              textDecoration: "none",
              transition: "0.3s",
              "&:hover": { opacity: 0.8 },
            }}
          >
            AI Health
          </Typography>

          {/* Navigation Links */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <NavItem to="/dashboard">Dashboard</NavItem>
            <NavItem to="/predict">Predict</NavItem>
            <NavItem to="/diet">Diet</NavItem>

            {isLoggedIn ? (
              <>
                <NavItem to="/profile">Profile</NavItem>
                <Button
                  onClick={handleLogout}
                  sx={logoutButtonStyle}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <NavItem to="/login">Login</NavItem>
                <NavItem to="/register">Register</NavItem>
              </>
            )}
          </Box>

        </Toolbar>
      </AppBar>
    </Paper>
  );
}

/* --- Reusable Navigation Button Style --- */
const NavItem = ({ to, children }) => (
  <Button
    component={Link}
    to={to}
    sx={{
      color: "white",
      fontWeight: 500,
      textTransform: "none",
      px: 2,
      py: 0.8,
      borderRadius: 2,
      transition: "0.3s ease",
      "&:hover": {
        background: "rgba(255,255,255,0.2)",
      },
    }}
  >
    {children}
  </Button>
);

/* --- Logout Button --- */
const logoutButtonStyle = {
  color: "#ffdddd",
  fontWeight: 600,
  borderRadius: 2,
  px: 2,
  py: 0.8,
  textTransform: "none",
  transition: "0.3s ease",
  "&:hover": {
    background: "rgba(255, 80, 80, 0.3)",
  },
};

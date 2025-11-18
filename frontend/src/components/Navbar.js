import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Paper,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Navigation items
  const navLinks = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Predict", path: "/predict" },
    { label: "Diet", path: "/diet" },
  ];

  const authLinks = isLoggedIn
    ? [{ label: "Profile", path: "/profile" }]
    : [
        { label: "Login", path: "/login" },
        { label: "Register", path: "/register" },
      ];

  return (
    <>
      <Paper
        elevation={6}
        sx={{
          borderRadius: 4,
          mx: 3,
          mt: 2,
          mb: 4,
          backdropFilter: "blur(20px)",
          background: "rgba(255,255,255,0.4)",
          overflow: "hidden",
        }}
      >
        <AppBar
          elevation={0}
          position="static"
          sx={{
            borderRadius: 4,
            background: "linear-gradient(135deg, #1CB5E0 0%, #000851 100%)",
            boxShadow: "0px 4px 25px rgba(0,0,0,0.2)",
          }}
        >
          <Toolbar
            sx={{
              py: 1,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {/* Brand */}
            <Typography
              variant="h5"
              component={Link}
              to="/"
              sx={{
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "0.8px",
                textDecoration: "none",
                transition: "0.3s",
                "&:hover": { opacity: 0.9, transform: "scale(1.03)" },
              }}
            >
              AI Health
            </Typography>

            {/* Desktop Navigation */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 1,
              }}
            >
              {navLinks.map((item) => (
                <NavItem
                  key={item.path}
                  to={item.path}
                  active={location.pathname === item.path}
                >
                  {item.label}
                </NavItem>
              ))}

              {authLinks.map((item) => (
                <NavItem
                  key={item.path}
                  to={item.path}
                  active={location.pathname === item.path}
                >
                  {item.label}
                </NavItem>
              ))}

              {isLoggedIn && (
                <Button
                  onClick={handleLogout}
                  sx={logoutButtonStyle}
                >
                  Logout
                </Button>
              )}
            </Box>

            {/* Mobile Menu Icon */}
            <IconButton
              sx={{ color: "white", display: { xs: "block", md: "none" } }}
              onClick={() => setOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Paper>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 250, p: 2 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", mb: 2, color: theme.palette.primary.main }}
          >
            Menu
          </Typography>

          <List>
            {[...navLinks, ...authLinks].map((item) => (
              <ListItem key={item.path} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  onClick={() => setOpen(false)}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}

            {isLoggedIn && (
              <ListItem disablePadding>
                <ListItemButton onClick={handleLogout}>
                  <ListItemText
                    primary="Logout"
                    sx={{ color: "red", fontWeight: 700 }}
                  />
                </ListItemButton>
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

/* --- Navigation Button --- */
const NavItem = ({ to, children, active }) => (
  <Button
    component={Link}
    to={to}
    sx={{
      color: "white",
      fontWeight: 550,
      textTransform: "none",
      px: 2,
      py: 0.8,
      borderRadius: 2,
      transition: "0.3s ease",
      background: active ? "rgba(255,255,255,0.25)" : "transparent",
      "&:hover": {
        background: "rgba(255,255,255,0.25)",
        transform: "scale(1.05)",
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
    transform: "scale(1.05)",
  },
};

import React from 'react';
import { Container, Typography, Box, Button, Stack, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import RestaurantIcon from '@mui/icons-material/Restaurant';

export default function Home() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "85vh",
        background: "linear-gradient(135deg, #c9d6ff 0%, #e2e2e2 100%)",
        py: 10,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="md">
        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7 }}
        >
          <Paper
            elevation={6}
            sx={{
              borderRadius: 6,
              p: { xs: 4, md: 6 },
              textAlign: "center",
              background: "rgba(255, 255, 255, 0.75)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.4)",
              position: "relative",
              overflow: "hidden",
            }}
          >

            {/* Floating Animated Icons */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "10px" }}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <LocalHospitalIcon sx={{ fontSize: 70, color: "#2193b0" }} />
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <RestaurantIcon sx={{ fontSize: 70, color: "#6dd5ed" }} />
              </motion.div>
            </motion.div>

            {/* Headings */}
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: "#1c4e80",
                mb: 2,
                textShadow: "0 2px 10px rgba(0,0,0,0.1)",
              }}
            >
              AI Health Assistant
            </Typography>

            <Typography
              variant="h5"
              color="textSecondary"
              sx={{
                maxWidth: 600,
                mx: "auto",
                mb: 4,
                fontWeight: 500,
              }}
            >
              Smart disease predictions and personalized diet plans powered by AI.
            </Typography>

            {/* CTA Buttons */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={3}
              justifyContent="center"
              sx={{ mt: 4 }}
            >
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.94 }}>
                <Button
                  startIcon={<LocalHospitalIcon />}
                  variant="contained"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontWeight: 700,
                    background: "linear-gradient(90deg, #6dd5ed 0%, #2193b0 100%)",
                    borderRadius: 4,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                  }}
                  onClick={() => navigate("/predict")}
                >
                  Predict Disease
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.94 }}>
                <Button
                  startIcon={<RestaurantIcon />}
                  variant="outlined"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontWeight: 700,
                    borderRadius: 4,
                    color: "#1c4e80",
                    borderColor: "#1c4e80",
                    "&:hover": {
                      borderColor: "#2193b0",
                      background: "rgba(33,147,176,0.08)",
                    },
                  }}
                  onClick={() => navigate("/diet")}
                >
                  Get Diet Plan
                </Button>
              </motion.div>
            </Stack>

          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}

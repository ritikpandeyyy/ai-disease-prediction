import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Box, Grid, Card, CardContent, Avatar,
  Button, Stack, Divider, Chip, Paper
} from '@mui/material';
import { motion } from 'framer-motion';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import TimelineIcon from '@mui/icons-material/Timeline';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { StatsPie, StatsBar } from '../components/StatsCharts';
import CountUp from 'react-countup';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  // Fetch user + history
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    axios.get('http://localhost:5001/api/user', { headers: { 'x-auth-token': token } })
      .then(res => setUser(res.data))
      .catch(() => setUser(null));

    axios.get('http://localhost:5001/api/history', { headers: { 'x-auth-token': token } })
      .then(res => setHistory(res.data))
      .catch(() => setHistory([]));
  }, []);

  const recent = history.slice(0, 4);
  const predCount = history.filter(h => h.type === 'prediction').length;
  const dietCount = history.filter(h => h.type === 'diet').length;

  const pieData = [
    { name: 'Predictions', value: predCount },
    { name: 'Diet Plans', value: dietCount }
  ];

  const barData = [
    { name: 'Predictions', count: predCount },
    { name: 'Diet Plans', count: dietCount }
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: 6,
        background: 'linear-gradient(135deg, #dce5ff 0%, #eef3ff 100%)',
      }}
    >
      <Container maxWidth="xl">

        {/* HEADER TITLE */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <Typography
            variant="h3"
            fontWeight={800}
            mb={4}
            sx={{
              background: "linear-gradient(90deg,#2193b0,#6dd5ed)",
              WebkitBackgroundClip: "text",
              color: "transparent"
            }}
          >
            Dashboard Overview
          </Typography>
        </motion.div>

        <Grid container spacing={4}>

          {/* LEFT SIDEBAR */}
          <Grid item xs={12} md={4}>
            {/* USER PROFILE CARD */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <Card
                sx={{
                  borderRadius: 4,
                  p: 2,
                  backdropFilter: "blur(10px)",
                  background: "rgba(255,255,255,0.8)",
                }}
              >
                <CardContent>
                  <Stack alignItems="center" spacing={2}>
                    <Avatar
                      sx={{
                        width: 90,
                        height: 90,
                        bgcolor: "#2193b0",
                        fontSize: 40,
                        boxShadow: 3
                      }}
                    >
                      {user?.name ? user.name[0].toUpperCase() : <AssessmentIcon fontSize="large" />}
                    </Avatar>

                    <Typography variant="h5" fontWeight={700}>
                      {user?.name || "Guest User"}
                    </Typography>
                    <Typography color="textSecondary">{user?.email || "Not Logged In"}</Typography>

                    <Divider sx={{ width: "100%", my: 2 }} />

                    <Button
                      variant="outlined"
                      sx={{ borderRadius: 3 }}
                      fullWidth
                      onClick={() => navigate("/profile")}
                    >
                      View Profile
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </motion.div>

            {/* PIE + BAR CHARTS */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <StatsPie data={pieData} title="Prediction vs Diet Plans" />
              <StatsBar data={barData} title="Usage Overview" xKey="name" yKey="count" />
            </motion.div>
          </Grid>

          {/* RIGHT MAIN DASHBOARD */}
          <Grid item xs={12} md={8}>

            {/* TOP STAT CARDS */}
            <Grid container spacing={3}>
              {/* Predictions Card */}
              <Grid item xs={12} sm={6}>
                <motion.div whileHover={{ scale: 1.03 }}>
                  <Card
                    sx={{
                      borderRadius: 4,
                      p: 2,
                      color: "white",
                      background: "linear-gradient(135deg,#36D1DC 0%,#5B86E5 100%)",
                      boxShadow: 4
                    }}
                  >
                    <CardContent>
                      <Stack alignItems="center" spacing={1}>
                        <LocalHospitalIcon sx={{ fontSize: 45 }} />
                        <Typography variant="h6">Total Predictions</Typography>
                        <Typography variant="h3" fontWeight={700}>
                          <CountUp end={predCount} duration={1.5} />
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>

              {/* Diet Card */}
              <Grid item xs={12} sm={6}>
                <motion.div whileHover={{ scale: 1.03 }}>
                  <Card
                    sx={{
                      borderRadius: 4,
                      p: 2,
                      color: "#333",
                      background: "linear-gradient(135deg,#FAD961 0%,#F76B1C 100%)",
                      boxShadow: 4
                    }}
                  >
                    <CardContent>
                      <Stack alignItems="center" spacing={1}>
                        <RestaurantIcon sx={{ fontSize: 45 }} />
                        <Typography variant="h6">Total Diet Plans</Typography>
                        <Typography variant="h3" fontWeight={700}>
                          <CountUp end={dietCount} duration={1.5} />
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            </Grid>

            {/* RECENT ACTIVITY */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card sx={{ borderRadius: 4, mt: 4 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={700} mb={2}>
                    <TimelineIcon sx={{ mr: 1 }} /> Recent Activity
                  </Typography>

                  {recent.length === 0 && (
                    <Typography color="textSecondary">No recent activity.</Typography>
                  )}

                  {/* Activity Timeline Style */}
                  <Stack spacing={2}>
                    {recent.map((item, idx) => (
                      <Paper
                        key={idx}
                        elevation={0}
                        sx={{
                          p: 2,
                          borderRadius: 3,
                          borderLeft: "4px solid #2193b0",
                          background: "rgba(255,255,255,0.85)"
                        }}
                      >
                        <Stack direction="row" justifyContent="space-between">
                          <Chip
                            label={item.type === "prediction" ? "Prediction" : "Diet Plan"}
                            color="primary"
                            size="small"
                            sx={{ fontWeight: 600 }}
                          />
                          <Typography variant="body2" color="textSecondary">
                            {new Date(item.createdAt).toLocaleString()}
                          </Typography>
                        </Stack>

                        <Typography variant="body2" mt={1}>
                          <b>Input:</b> {JSON.stringify(item.input)}
                        </Typography>
                        <Typography variant="body2">
                          <b>Result:</b> {JSON.stringify(item.result)}
                        </Typography>
                      </Paper>
                    ))}
                  </Stack>

                  <Button sx={{ mt: 2 }} onClick={() => navigate("/profile")}>
                    View Full History
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* QUICK ACTIONS */}
            <Grid container spacing={3} mt={2}>
              <Grid item xs={12} sm={6}>
                <motion.div whileHover={{ scale: 1.03 }}>
                  <Card
                    sx={{
                      borderRadius: 4,
                      p: 2,
                      background: "linear-gradient(135deg,#43cea2,#185a9d)",
                      color: "white"
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" fontWeight={700}>
                        Quick Predict
                      </Typography>
                      <Typography variant="body2" mb={2}>
                        Jump to disease prediction
                      </Typography>
                      <Button variant="contained" color="secondary" onClick={() => navigate('/predict')}>
                        Predict Now
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>

              <Grid item xs={12} sm={6}>
                <motion.div whileHover={{ scale: 1.03 }}>
                  <Card
                    sx={{
                      borderRadius: 4,
                      p: 2,
                      background: "linear-gradient(135deg,#FBD786,#f7797d)",
                      color: "#222"
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" fontWeight={700}>
                        Quick Diet Plan
                      </Typography>
                      <Typography variant="body2" mb={2}>
                        Jump to diet recommendation
                      </Typography>
                      <Button variant="contained" color="primary" onClick={() => navigate('/diet')}>
                        Get Diet Plan
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            </Grid>

          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;


import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Avatar, Button, Stack, Divider } from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { StatsPie, StatsBar } from '../components/StatsCharts';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:5001/api/user', { headers: { 'x-auth-token': token } })
        .then(res => setUser(res.data))
        .catch(() => setUser(null));
      axios.get('http://localhost:5001/api/history', { headers: { 'x-auth-token': token } })
        .then(res => setHistory(res.data))
        .catch(() => setHistory([]));
    }
  }, []);

  const recent = history.slice(0, 3);
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
    <Box sx={{ minHeight: '80vh', background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)', py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" fontWeight={700} mb={4} color="#2193b0">Dashboard</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 4, p: 2 }}>
              <CardContent>
                <Stack alignItems="center" spacing={2}>
                  <Avatar sx={{ width: 80, height: 80, bgcolor: '#2193b0', fontSize: 36 }}>
                    {user?.name ? user.name[0].toUpperCase() : <AssessmentIcon fontSize="large" />}
                  </Avatar>
                  <Typography variant="h5" fontWeight={600}>{user?.name || 'Guest User'}</Typography>
                  <Typography color="textSecondary">{user?.email || 'Not logged in'}</Typography>
                  <Divider sx={{ width: '100%', my: 2 }} />
                  <Button variant="outlined" onClick={() => navigate('/profile')}>View Profile</Button>
                </Stack>
              </CardContent>
            </Card>
            <StatsPie data={pieData} title="Prediction vs Diet Plans" />
            <StatsBar data={barData} title="Usage Overview" xKey="name" yKey="count" />
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Card sx={{ borderRadius: 4, p: 2, background: 'linear-gradient(90deg, #6dd5ed 0%, #2193b0 100%)', color: 'white' }}>
                  <CardContent>
                    <Stack alignItems="center" spacing={1}>
                      <LocalHospitalIcon sx={{ fontSize: 40 }} />
                      <Typography variant="h6">Total Predictions</Typography>
                      <Typography variant="h4" fontWeight={700}>{predCount}</Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card sx={{ borderRadius: 4, p: 2, background: 'linear-gradient(90deg, #f7971e 0%, #ffd200 100%)', color: '#333' }}>
                  <CardContent>
                    <Stack alignItems="center" spacing={1}>
                      <RestaurantIcon sx={{ fontSize: 40 }} />
                      <Typography variant="h6">Total Diet Plans</Typography>
                      <Typography variant="h4" fontWeight={700}>{dietCount}</Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Card sx={{ borderRadius: 4, mt: 4 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} mb={2}>Recent Activity</Typography>
                {recent.length === 0 && <Typography color="textSecondary">No recent activity.</Typography>}
                <Stack spacing={2}>
                  {recent.map((item, idx) => (
                    <Box key={item._id || idx} sx={{ p: 2, border: '1px solid #eee', borderRadius: 2, background: '#f9f9f9' }}>
                      <Typography fontWeight={600}>{item.type === 'prediction' ? 'Prediction' : 'Diet Plan'}</Typography>
                      <Typography variant="body2" color="textSecondary">{new Date(item.createdAt).toLocaleString()}</Typography>
                      <Typography variant="body2">Input: {JSON.stringify(item.input)}</Typography>
                      <Typography variant="body2">Result: {JSON.stringify(item.result)}</Typography>
                    </Box>
                  ))}
                </Stack>
                <Button sx={{ mt: 2 }} onClick={() => navigate('/profile')}>View Full History</Button>
              </CardContent>
            </Card>
            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} sm={6}>
                <Card sx={{ borderRadius: 4, p: 2, background: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)', color: 'white' }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={600}>Quick Predict</Typography>
                    <Typography variant="body2" mb={2}>Jump to disease prediction form</Typography>
                    <Button variant="contained" color="secondary" onClick={() => navigate('/predict')}>Predict Now</Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card sx={{ borderRadius: 4, p: 2, background: 'linear-gradient(90deg, #f7971e 0%, #ffd200 100%)', color: '#333' }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={600}>Quick Diet Plan</Typography>
                    <Typography variant="body2" mb={2}>Jump to diet recommendation form</Typography>
                    <Button variant="contained" color="primary" onClick={() => navigate('/diet')}>Get Diet Plan</Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;

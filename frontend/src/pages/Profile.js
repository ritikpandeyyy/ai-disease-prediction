import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Paper, List, ListItem, ListItemText, Divider, CircularProgress, Button, TextField, Stack, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

export default function Profile() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', email: '' });
  const [editLoading, setEditLoading] = useState(false);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5001/api/history', {
        headers: { 'x-auth-token': token }
      });
      setHistory(res.data);
    } catch (err) {
      setError('Failed to load history');
    }
  };

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5001/api/user', {
        headers: { 'x-auth-token': token }
      });
      setUser(res.data);
    } catch (err) {
      setError('Failed to load user');
    }
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchHistory(), fetchUser()]).finally(() => setLoading(false));
  }, []);

  const handleEditOpen = () => {
    setEditForm({ name: user?.name || '', email: user?.email || '' });
    setEditOpen(true);
  };
  const handleEditClose = () => setEditOpen(false);
  const handleEditChange = e => setEditForm({ ...editForm, [e.target.name]: e.target.value });
  const handleEditSubmit = async () => {
    setEditLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put('http://localhost:5001/api/user', editForm, {
        headers: { 'x-auth-token': token }
      });
      setUser(res.data);
      setEditOpen(false);
    } catch (err) {
      setError('Failed to update profile');
    } finally {
      setEditLoading(false);
    }
  };

  const handleDeleteHistory = async id => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5001/api/history/${id}`, {
        headers: { 'x-auth-token': token }
      });
      setHistory(history.filter(h => h._id !== id));
    } catch (err) {
      setError('Failed to delete history item');
    }
  };
  const handleDeleteAll = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete('http://localhost:5001/api/history', {
        headers: { 'x-auth-token': token }
      });
      setHistory([]);
    } catch (err) {
      setError('Failed to delete all history');
    }
  };

  return (
    <Box sx={{ minHeight: '80vh', background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)', py: 8 }}>
      <Container maxWidth="md">
        <Paper elevation={4} sx={{ borderRadius: 4, p: 5, background: 'rgba(255,255,255,0.97)' }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#2193b0' }} gutterBottom>User Profile & History</Typography>
          {user && (
            <Box mb={4}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
                <Typography variant="h6">Name: {user.name}</Typography>
                <Typography variant="h6">Email: {user.email}</Typography>
                <Button variant="outlined" startIcon={<EditIcon />} onClick={handleEditOpen}>Edit Profile</Button>
              </Stack>
            </Box>
          )}
          <Dialog open={editOpen} onClose={handleEditClose}>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogContent>
              <TextField label="Name" name="name" value={editForm.name} onChange={handleEditChange} fullWidth margin="normal" />
              <TextField label="Email" name="email" value={editForm.email} onChange={handleEditChange} fullWidth margin="normal" />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEditClose}>Cancel</Button>
              <Button onClick={handleEditSubmit} disabled={editLoading} variant="contained">Save</Button>
            </DialogActions>
          </Dialog>
          {loading ? <CircularProgress /> : error ? <Typography color="error">{error}</Typography> : (
            <>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5">History</Typography>
                {history.length > 0 && <Button color="error" onClick={handleDeleteAll}>Delete All</Button>}
              </Stack>
              <List>
                {history.length === 0 && <Typography>No history found.</Typography>}
                {history.map((item, idx) => (
                  <React.Fragment key={item._id}>
                    <ListItem alignItems="flex-start" secondaryAction={
                      <IconButton edge="end" color="error" onClick={() => handleDeleteHistory(item._id)}>
                        <DeleteIcon />
                      </IconButton>
                    }>
                      <ListItemText
                        primary={item.type === 'prediction' ? 'Disease Prediction' : 'Diet Recommendation'}
                        secondary={
                          <>
                            <Typography variant="body2" color="textSecondary">{new Date(item.createdAt).toLocaleString()}</Typography>
                            <Typography variant="body2">Input: {JSON.stringify(item.input)}</Typography>
                            <Typography variant="body2">Result: {JSON.stringify(item.result)}</Typography>
                          </>
                        }
                      />
                    </ListItem>
                    {idx < history.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
}

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Legend } from 'recharts';
import { Card, CardContent, Typography, Box, Stack } from '@mui/material';

const COLORS = ['#2193b0', '#6dd5ed', '#f7971e', '#ffd200'];

export function StatsPie({ data, title }) {
  return (
    <Card sx={{ borderRadius: 4, mb: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={2}>{title}</Typography>
        <Box sx={{ width: '100%', height: 220 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                {data.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}

export function StatsBar({ data, title, xKey, yKey }) {
  return (
    <Card sx={{ borderRadius: 4, mb: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={2}>{title}</Typography>
        <Box sx={{ width: '100%', height: 220 }}>
          <ResponsiveContainer>
            <BarChart data={data}>
              <XAxis dataKey={xKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey={yKey} fill="#2193b0" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}

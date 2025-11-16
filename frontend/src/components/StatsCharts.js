import React from 'react';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Legend, CartesianGrid
} from 'recharts';
import { Card, CardContent, Typography, Box } from '@mui/material';

// Modern Colors
const COLORS = ['#1CB5E0', '#2193b0', '#f7971e', '#ffcc00', '#3a7bd5', '#43cea2'];

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;

  return (
    <Box
      sx={{
        p: 1.2,
        borderRadius: 2,
        backgroundColor: "rgba(0,0,0,0.8)",
        color: "white",
        boxShadow: 2,
      }}
    >
      <Typography variant="body2" fontWeight={600}>
        {payload[0].name}: {payload[0].value}
      </Typography>
    </Box>
  );
};

// -------- PIE CHART --------
export function StatsPie({ data, title }) {
  return (
    <Card
      sx={{
        borderRadius: 4,
        mb: 3,
        p: 1,
        backdropFilter: "blur(8px)",
        background: "rgba(255,255,255,0.85)",
        boxShadow: "0px 4px 20px rgba(0,0,0,0.08)",
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight={700} mb={2}>
          {title}
        </Typography>

        <Box sx={{ width: "100%", height: 260 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={85}
                innerRadius={45}
                paddingAngle={4}
                label
              >
                {data.map((entry, idx) => (
                  <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>

              {/* Smooth tooltip */}
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}

// -------- BAR CHART --------
export function StatsBar({ data, title, xKey, yKey }) {
  return (
    <Card
      sx={{
        borderRadius: 4,
        mb: 3,
        p: 1,
        backdropFilter: "blur(8px)",
        background: "rgba(255,255,255,0.85)",
        boxShadow: "0px 4px 20px rgba(0,0,0,0.08)",
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight={700} mb={2}>
          {title}
        </Typography>

        <Box sx={{ width: "100%", height: 260 }}>
          <ResponsiveContainer>
            <BarChart data={data} barCategoryGap="25%">
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey={xKey} />
              <YAxis />

              {/* Modern styled tooltip */}
              <Tooltip content={<CustomTooltip />} />

              <Legend verticalAlign="top" height={30} />

              {/* Gradient bar fill */}
              <defs>
                <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1CB5E0" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#2193b0" stopOpacity={0.9} />
                </linearGradient>
              </defs>

              <Bar dataKey={yKey} fill="url(#colorBar)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}

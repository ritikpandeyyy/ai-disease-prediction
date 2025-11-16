
import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Alert,
  List,
  ListItem,
  Card,
  CardContent,
  Grid,
  Stack,
  Chip,
  Divider,
} from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";
import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";

export default function Diet() {
  const [form, setForm] = useState({
    age: "",
    gender: "",
    healthGoal: "",
    dietPreference: "",
    weight: "",
    height: "",
    disease: "",
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    try {
      const res = await axios.post("http://localhost:5001/api/diet", form);
      setResult(res.data);
    } catch (err) {
      setError("Failed to fetch diet plan");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 8,
        background: "linear-gradient(135deg, #d7e9f7 0%, #f0f7ff 100%)",
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h3"
          align="center"
          fontWeight={800}
          mb={4}
          color="#1f4b77"
        >
          Advanced Diet Recommendation System
        </Typography>

        {/* Main Card */}
        <Card elevation={6} sx={{ borderRadius: 5 }}>
          <Grid container>
            {/* LEFT PANEL */}
            <Grid
              item
              xs={12}
              md={5}
              sx={{
                background: "linear-gradient(135deg, #84d8f6 0%, #6db3f2 100%)",
                p: 4,
                color: "white",
              }}
            >
              <EmojiFoodBeverageIcon sx={{ fontSize: 90 }} />
              <Typography variant="h5" fontWeight={700} mt={2}>
                Smart, Healthy, AI-Based Diet!
              </Typography>
              <Typography variant="body1" mt={1}>
                Get weekly diet plans, calorie & macro breakdowns, and
                disease-safe food alerts.
              </Typography>
            </Grid>

            {/* RIGHT PANEL */}
            <Grid item xs={12} md={7}>
              <CardContent sx={{ p: 4 }}>
                <form onSubmit={handleSubmit}>
                  <Stack spacing={2}>
                    <TextField
                      label="Age"
                      name="age"
                      value={form.age}
                      onChange={handleChange}
                      fullWidth
                    />

                    <TextField
                      label="Gender"
                      name="gender"
                      value={form.gender}
                      onChange={handleChange}
                      fullWidth
                    />

                    <TextField
                      label="Height (cm)"
                      name="height"
                      value={form.height}
                      onChange={handleChange}
                      fullWidth
                    />

                    <TextField
                      label="Weight (kg)"
                      name="weight"
                      value={form.weight}
                      onChange={handleChange}
                      fullWidth
                    />

                    <TextField
                      label="Disease (Optional)"
                      name="disease"
                      value={form.disease}
                      onChange={handleChange}
                      helperText="e.g. diabetes, hypertension"
                      fullWidth
                    />

                    <TextField
                      label="Health Goal"
                      name="healthGoal"
                      value={form.healthGoal}
                      onChange={handleChange}
                      helperText="weight loss, gain, maintenance"
                      fullWidth
                    />

                    <TextField
                      label="Diet Preference"
                      name="dietPreference"
                      value={form.dietPreference}
                      onChange={handleChange}
                      helperText="veg / non-veg / vegan"
                      fullWidth
                    />

                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      sx={{
                        py: 1.5,
                        borderRadius: 3,
                        background:
                          "linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)",
                      }}
                    >
                      Generate Diet Plan
                    </Button>
                  </Stack>
                </form>

                {error && (
                  <Alert severity="error" sx={{ mt: 3 }}>
                    {error}
                  </Alert>
                )}

                {/* SHOW RESULT */}
                {result && (
                  <Box mt={4}>
                    <Alert severity="success">
                      <Typography variant="h6" fontWeight={700}>
                        Daily Calorie Target: {result.tdee} kcal
                      </Typography>

                      <Typography variant="h6" mt={2}>
                        Macros:
                      </Typography>
                      <List>
                        <ListItem>Protein: {result.macros.protein_g}g</ListItem>
                        <ListItem>Carbs: {result.macros.carbs_g}g</ListItem>
                        <ListItem>Fat: {result.macros.fat_g}g</ListItem>
                      </List>

                      <Divider sx={{ my: 2 }} />

                      <Typography variant="h6">Weekly Meal Plan:</Typography>
                      {result.week.map((day) => (
                        <Box
                          key={day.day}
                          sx={{
                            p: 2,
                            mt: 2,
                            borderRadius: 2,
                            background: "#e8fdf1",
                          }}
                        >
                          <Typography fontWeight={700}>Day {day.day}</Typography>
                          {Object.entries(day.plan).map(([meal, d]) => (
                            <Box key={meal} sx={{ mt: 1 }}>
                              <Typography fontWeight={600}>{meal}:</Typography>
                              {d.items.map((food, i) => (
                                <Chip
                                  key={i}
                                  label={food.name}
                                  sx={{ mr: 1, mt: 1, background: "#6dd5ed", color: "white" }}
                                />
                              ))}
                            </Box>
                          ))}

                          {/* Alerts */}
                          {day.alerts.length > 0 && (
                            <Alert severity="warning" sx={{ mt: 2 }}>
                              <Typography fontWeight={700}>
                                Food Restrictions:
                              </Typography>
                              {day.alerts.map((a, idx) => (
                                <Typography key={idx}>
                                  ⚠ {a.item} — {a.reason || a.disease}
                                </Typography>
                              ))}
                            </Alert>
                          )}
                        </Box>
                      ))}
                    </Alert>
                  </Box>
                )}
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Box>
  );
}

import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Alert,
  Card,
  CardContent,
  Grid,
  Stack,
  LinearProgress,
  Chip,
  Divider,
  List,
  ListItem,
} from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import MicIcon from "@mui/icons-material/Mic";

export default function Predict() {
  const [form, setForm] = useState({ age: "", gender: "", symptoms: "" });
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // --------- VOICE TO TEXT ----------
  const handleVoiceInput = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = function (event) {
      const text = event.results[0][0].transcript;
      setForm({ ...form, symptoms: text });
    };
  };

  // --------- SUBMIT FORM ----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    try {
      const res = await axios.post("http://localhost:5001/api/predict", form);
      setResult(res.data);
    } catch {
      setError("Prediction failed");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 8,
        background: "linear-gradient(135deg, #d7e9f7 0%, #ecf2ff 100%)",
      }}
    >
      <Container maxWidth="md">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h3"
            fontWeight={800}
            align="center"
            color="#1f4b77"
            mb={2}
          >
            AI Disease Prediction
          </Typography>

          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            mb={5}
          >
            Enter your symptoms and get multi-disease prediction, confidence,
            next steps, and doctor recommendations.
          </Typography>
        </motion.div>

        {/* MAIN CARD */}
        <Card elevation={5} sx={{ borderRadius: 5 }}>
          <Grid container>
            {/* LEFT SECTION */}
            <Grid
              item
              xs={12}
              md={5}
              sx={{
                background: "linear-gradient(135deg, #5fb2ff 0%, #2196f3 100%)",
                p: 4,
                color: "white",
                textAlign: "center",
              }}
            >
              <HealthAndSafetyIcon sx={{ fontSize: 90 }} />
              <Typography variant="h4" fontWeight={700} mt={2}>
                Smart Health Analysis
              </Typography>
              <Typography variant="body2" mt={1} sx={{ opacity: 0.9 }}>
                Accurate AI predictions based on medical datasets.
              </Typography>
            </Grid>

            {/* RIGHT SECTION */}
            <Grid item xs={12} md={7}>
              <CardContent sx={{ p: 4 }}>
                <form onSubmit={handleSubmit}>
                  <Stack spacing={3}>
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

                    <Box sx={{ position: "relative" }}>
                      <TextField
                        label="Symptoms"
                        name="symptoms"
                        value={form.symptoms}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={2}
                      />

                      {/* VOICE BUTTON */}
                      <Button
                        variant="contained"
                        onClick={handleVoiceInput}
                        sx={{
                          position: "absolute",
                          right: 10,
                          bottom: 10,
                          borderRadius: "50%",
                          minWidth: 50,
                          background: "#2196f3",
                        }}
                      >
                        <MicIcon />
                      </Button>
                    </Box>

                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        sx={{
                          py: 1.5,
                          borderRadius: 3,
                          background:
                            "linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)",
                        }}
                      >
                        Predict
                      </Button>
                    </motion.div>
                  </Stack>
                </form>

                {/* ERROR */}
                {error && (
                  <Alert severity="error" sx={{ mt: 3 }}>
                    {error}
                  </Alert>
                )}

                {/* RESULT */}
                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Card sx={{ p: 3, mt: 4, borderRadius: 4 }}>
                      <Typography variant="h6" fontWeight={700}>
                        Top Predictions:
                      </Typography>

                      {/* TOP 3 Diseases */}
                      {result.diseases.map((d, idx) => (
                        <Box key={idx} sx={{ mt: 2 }}>
                          <Chip
                            label={`${d.name} — ${(d.confidence * 100).toFixed(
                              1
                            )}%`}
                            color="primary"
                            sx={{
                              fontSize: 16,
                              fontWeight: 700,
                              p: 1,
                              background: "#2196f3",
                              color: "white",
                            }}
                          />

                          <LinearProgress
                            variant="determinate"
                            value={d.confidence * 100}
                            sx={{ mt: 1, borderRadius: 5 }}
                          />

                          <Typography
                            variant="body2"
                            mt={1}
                            sx={{ fontStyle: "italic" }}
                          >
                            {d.reason}
                          </Typography>
                        </Box>
                      ))}

                      <Divider sx={{ my: 3 }} />

                      {/* DOCTOR SPECIALTY */}
                      <Typography variant="h6" fontWeight={700}>
                        Recommended Doctor:
                      </Typography>
                      <Chip
                        label={result.doctor}
                        color="success"
                        sx={{ mt: 1, fontWeight: 700 }}
                      />

                      <Divider sx={{ my: 3 }} />

                      {/* NEXT STEPS */}
                      <Typography variant="h6" fontWeight={700}>
                        Next Steps:
                      </Typography>
                      <List>
                        {result.nextSteps.map((s, i) => (
                          <ListItem key={i}>• {s}</ListItem>
                        ))}
                      </List>

                      {/* Tests */}
                      <Typography variant="h6" fontWeight={700}>
                        Suggested Tests:
                      </Typography>
                      <List>
                        {result.tests.map((t, i) => (
                          <ListItem key={i}>• {t}</ListItem>
                        ))}
                      </List>
                    </Card>
                  </motion.div>
                )}
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Box>
  );
}

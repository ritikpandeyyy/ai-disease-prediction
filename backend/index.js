
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors(
    {
        origin: true
    }
));
app.use(express.json());

// User profile route
app.use('/api/user', require('./routes/user'));
// History edit/delete route
app.use('/api/history', require('./routes/history_edit'));
// User history route
app.use('/api/history', require('./routes/history'));
// Diet recommendation route
app.use('/api/diet', require('./routes/diet'));

// Auth routes
app.use('/api/auth', require('./routes/auth'));
// Prediction route
app.use('/api/predict', require('./routes/predict'));

// Placeholder for routes
app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5001;

mongoose.connect('mongodb+srv://ritikpandey9536_db:ubgareUgDPpWKTTq@cluster0.qkdhapp.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
})
.catch(err => console.error(err));

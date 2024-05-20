const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'https://localhost:3000',
}));
app.use(express.static('public'));

// routes
app.use('/users', userRoutes);

app.listen(5000);
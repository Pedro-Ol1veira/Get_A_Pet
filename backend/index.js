const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const petRoutes = require('./routes/petsRoutes');
const { listenerCount } = require('./models/Pet');

const app = express();

app.use(express.json());

let allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

app.use(allowCrossDomain);
app.use(cors());



app.use(express.static('public'));

// routes
app.use('/users', userRoutes);
app.use('/pets', petRoutes);

app.listen(5000);
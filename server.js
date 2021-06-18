const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');
const authRoutes = require('./routes/authRoutes');
const trainingRoutes = require('./routes/trainingRoutes');
const userRoutes = require('./routes/userRoutes');


const app = express();
const db = config.get('MONGO_URI');
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/training', trainingRoutes);
app.use('/user', userRoutes);

mongoose
    .connect(db, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    })
    .then(() => {
        app.listen(8080);
    })
    .catch((err) => {
        console.log(err);
    });
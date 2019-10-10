const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');


const app = express();
dotenv.config();

// connect mongodb
const DB_OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(process.env.DB_CONNECT, DB_OPTIONS)
.then(() => console.log('DB connected'))
.catch(console.error.bind('DB connection error'));

// middleware
app.use('/api/user', authRoute);

app.listen(process.env.PORT, () => {
   console.log(`Running on the port ${process.env.PORT}`) 
});
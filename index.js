const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoute = require('./routes/auth');
require('dotenv').config();


const app = express();

// connect mongodb
const DB_OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(process.env.DB_CONNECT, DB_OPTIONS)
.then(() => console.log('DB connected'))
.catch(console.error.bind('DB connection error'));

// middleware
app.use(bodyParser.json());


// route middleware
app.use('/api/user', authRoute);


// handle errors
app.use((err, req, res, next) => {
   if (err.headerSent) {
      next(err);
   }
   
   const statusCode = err.statusCode || 500;
   res.status(statusCode).json({
      error: {
         message: err.message,
         statusCode
      }
   });
});


app.listen(process.env.PORT, () => {
   console.log(`Running on the port ${process.env.PORT}`) 
});
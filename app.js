const express = require('express');
const bodyParser = require('body-parser');
const authRoute = require('./routes/auth');
const handleErrors = require('./middleware/app/handle-errors');
require('dotenv').config();
require('./utils/connect-db');

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(bodyParser.json());

// routes
app.use('/api/user', authRoute);

// handle errors
app.use(handleErrors);


app.listen(PORT, () => {
   console.log(`Running on the port ${PORT}`) 
});
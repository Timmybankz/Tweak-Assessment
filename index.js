const express = require('express');
require('dotenv').config();

const app = express();
require('dotenv').config();

const router = require('./startup/routes');
const dbConnection = require('./startup/dbConnection');

// Cross Header for Browser
app.use((req, res, next) => {
    console.log('Browser access');
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
      );
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    next();
});

dbConnection();
router(app);

const port = process.env.PORT || 2500;

const server = app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}/`);
    }
);

module.exports = server;

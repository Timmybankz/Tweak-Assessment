const express = require('express');
const { login, signUp, uploadImage } = require('../controllers/user');
const checkAuth = require('../services/auth');


module.exports = function(app) {
    
    app.post('/user/upload', checkAuth, uploadImage);

    app.use(express.json());
    app.post('/auth/login', login);
    app.post('/auth/register', signUp);

    app.use((err, req, res, next) => {
        console.log(err);
        return res.status(404).json('Invalid API route provided');
    });
}

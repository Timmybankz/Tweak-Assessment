const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { uploadFile } = require('../services/upload');
const { validateUser, User } = require('../models/user');


exports.login = async (req, res) => {

    const { error: validationError } = validateUser(req.body);
    if (validationError)
        return res.status(400).json(validationError.details[0].message);

    await User.findOne({ email: req.body.email })
      .lean()
      .then(user => {

        if (!user) return res.status(401).json('Invalid Username/Password');

        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (err) 
            return res.status(401).json('Invalid Username/Password');

          if (result) {
                const token = jwt.sign(
                    {
                        email: req.body.email
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: '1h'
                    }
                );
                return res.status(200).json({
                    message: 'Authencation Successful',
                    accessToken: token
                });
            }
            return res.status(401).json('Invalid Username/Password');
        });
    })
    .catch(err => {
        return res.status(500).json('Server Error, Please Retry Again');
    });
}

exports.signUp = async (req, res) => {

    const { error: validationError } = validateUser(req.body);
    if (validationError)
        return res.status(400).json(validationError.details[0].message);

    await User.findOne({ email: req.body.email })
      .exec()
      .then(user => {
        if (user) {
          return res.status(409).json('This Email Is Already In Use');

        } else {
          bcrypt.hash(req.body.password, 10, async (err, hash) => {
            if (err)
                return res.status(500).json('An Error Occured, Please Try Again');

                const newUser = new User({
                    _id: new mongoose.Types.ObjectId(),
                    email: req.body.email,
                    password: hash
                });
                await newUser
                    .save()
                    .then(() => {
                        return res.status(201).json('User Created Successfully');
                    })
                    .catch((err) => {
                        return res.status(500).json(err);
                    })
            });
        }
    })
}

exports.uploadImage = (req, res) => {

    uploadFile(req, res, (err) => {
        if (err)
            return res.status(200).json('An error occured while uploading your image, please retry again.');

        return res.json('Successfully uploaded files!');
    });
}

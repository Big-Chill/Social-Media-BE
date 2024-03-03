const path = require('path');
const bcrypt = require('bcrypt');
const passport = require('passport');
const express = require('express');
const jwt = require('jsonwebtoken');
const userModel = require(path.join(__dirname, '..', 'model', 'user'));
const { isValidEmail } = require(path.join(__dirname, '..', 'util', 'helperFunction'));

// POST /api/v1/user/register
const registerUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            throw new Error('Email and password required');
        }

        if (!isValidEmail(email)) {
            throw new Error('Invalid email');
        }

        let existingUser = await userModel.findOne({ email });
        if (existingUser) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new userModel({
            email,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(200).json({ statusCode:200, message: 'Signup successful', user: newUser });
        } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// POST /api/v1/user/login
const loginUser = async (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.status(401).json({ statusCode: 401, message: 'You are already logged in' });
    }

    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ statusCode: 500, message: err.message });
        }

        if (!user) {
            return res.status(401).json({ statusCode: 401, message: info.message });
        }

        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }

            const token = jwt.sign({ user: user }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.setHeader('Authorization-JWT', token);

            return res.json({ statusCode: 200, message: info.message, user: user });
        });
    })(req, res, next);
};

// GET /api/v1/user/logout
const logoutUser = (req, res) => {
    if (req.isAuthenticated()) {
        req.logout((err) => {
            if (err) {
                return res.json({ statusCode: 500, message: err.message });
            }

            req.session.destroy();
            res.clearCookie('connect.sid');

            return res.json({ statusCode: 200, message: 'Logged out successfully' });
        });
    } else {
        return res.json({ statusCode: 401, message: 'No session found' });
    }
};


module.exports = {
    registerUser,
    loginUser,
    logoutUser
};
const { corsOptions, db, initPassport, sessionObj, isAuthenticated, initJwt } = require('./config/main.js');
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT;
initPassport(passport);
initJwt(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(session(sessionObj));
app.use(passport.initialize());
app.use(passport.session());

const userRouter = require(path.join(__dirname, 'route', 'userRouter'));
const postRouter = require(path.join(__dirname, 'route', 'postRouter'));

app.use('/api/v1/user', userRouter);
app.use('/api/v1/post', isAuthenticated, postRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
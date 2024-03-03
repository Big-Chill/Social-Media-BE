const path = require('path');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const postController = require(path.join(__dirname, '..', 'controller', 'postController'));

const authenticateJwt = passport.authenticate('jwt', { session: false });

router.use(authenticateJwt);

router.get('/', postController.getPosts);
router.get('/generateRandomPost', postController.generateRandomPost);

module.exports = router;
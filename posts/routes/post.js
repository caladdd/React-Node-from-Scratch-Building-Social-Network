const express = require('express');
const {getPosts, createPosts} = require('../controllers/post');
const {requireSignIn} = require('../../authentication/controllers/auth');
const {createPostValidator} = require('../validator/validator');


const router = express.Router();

router.get('/', getPosts);
router.post('/post',requireSignIn, createPostValidator, createPosts);

module.exports = router;
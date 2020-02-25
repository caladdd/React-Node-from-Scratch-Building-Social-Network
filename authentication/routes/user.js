const express = require('express');
const { signUp, signIn } = require('../controllers/user');
const { userSignUpValidator } = require('../validator/validator');

const router = express.Router();

router.post("/signup", userSignUpValidator, signUp);
router.post("/signin", signIn);

module.exports = router;
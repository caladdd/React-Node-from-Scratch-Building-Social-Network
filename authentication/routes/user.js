const express = require('express');
const { signUp, signIn, signOut } = require('../controllers/user');
const { userSignUpValidator } = require('../validator/validator');

const router = express.Router();

router.post("/signup", userSignUpValidator, signUp);
router.post("/signin", signIn);
// signOut
router.get("/signout", signOut);

module.exports = router;
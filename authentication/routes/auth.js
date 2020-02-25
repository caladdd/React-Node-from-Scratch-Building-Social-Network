const express = require('express');
const {signUp, signIn, signOut} = require('../controllers/auth');
const {userById} = require('../controllers/user');
const {userSignUpValidator} = require('../validator/validator');

const router = express.Router();

router.post("/signup", userSignUpValidator, signUp);
router.post("/signin", signIn);
// signOut
router.get("/signout", signOut);

// any route containing :userId, our app will first execute userById()
router.param("userId", userById);

module.exports = router;
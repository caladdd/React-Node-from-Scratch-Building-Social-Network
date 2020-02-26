const express = require('express');
const {userById, allUsers, getUser, updateUser} = require('../controllers/user');
const {requireSignIn} = require('../controllers/auth');

const router = express.Router();

router.get("/users", allUsers);
router.get("/user/:userId", requireSignIn, getUser);
router.put("/user/:userId", requireSignIn, updateUser);

// any route containing :userId, our app will first execute userById()
router.param("userId", userById);

module.exports = router;
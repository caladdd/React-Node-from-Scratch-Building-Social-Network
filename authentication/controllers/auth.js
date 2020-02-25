const jwt = require('jsonwebtoken');
require('dotenv').config();
const expressJwt = require('express-jwt');
const Auth = require('../models/user');


exports.signUp = async (req, res) => {
    const userExists = await Auth.findOne({email: req.body.email});
    if (userExists) return res.status(403).json({
        error: "Email is taken!"
    });

    const user = await new Auth(req.body);
    await user.save();
    res.status(201).json({
        message: "Signup success!, Please login."
    });
};

exports.signIn = (req, res) => {
    // find the user based on email
    const {email, password} = req.body;
    Auth.findOne({email}, (err, user) => {
        // id err or not user
        if (err || !user) {
            return res.status(401).json({
                error: "Auth with that email does not exist. Please signUp."
            });
        }
        // if user is found make sure the email and password match
        // create authenticate method in model and use here
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and password do not match."
            });
        }
        // generate a token with user id and secret
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
        // persist the token as 't'  in the cookie with expiry date
        res.cookie("t", token, {expire: new Date() + 9999});
        // return response with user and token to front end client
        const {_id, name, email} = user;
        res.json({token, user: {_id, name, email}});
    })

};

exports.signOut = (req, res) => {
    res.clearCookie("t");
    return res.status(200).json({message: "Sign out success!"});
};

exports.requireSignIn = expressJwt({
    // if token is valid, express jwt appends the verified user id
    // in an auth key to the object
    secret: process.env.JWT_SECRET,
    userProperty: "auth"
});

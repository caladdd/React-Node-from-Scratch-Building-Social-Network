exports.userSignUpValidator = (req, res, next) => {
    // name is not null and between 4-10 characters
    req.check("name", "Name is required").notEmpty();
    // email is not null, valid and normalize
    req.check("email", "Email must be between 3 and 32 characters")
        .matches(/.+@.+\..+/)
        .withMessage("Email must be contain @")
        .isLength({
            min: 3,
            max: 32
        });
    // check password
    req.check("password", "Password is required").notEmpty();
    req.check("password").isLength({min: 6})
        .withMessage("Password must contain a least 6 characters")
        .matches(/\d/)
        .withMessage("Password must contain a number")
    // check errors
    const errors = req.validationErrors();
    // if error show the first one as  they happen
    if(errors){
        const firstError = errors.map((error) => error.msg)[0];
        return res.status(400).json({error: firstError})
    }
    // proceed to next middleware
    next();
}
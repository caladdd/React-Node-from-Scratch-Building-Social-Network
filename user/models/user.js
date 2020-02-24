const mongoose = require('mongoose');
const uuidv1 = require('uuid/v1');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: String,
    created: {
        type: Date,
        default: Date.now()
    },
    updated: Date
});

// virtual field
userSchema
    .virtual("password")
    .set(function (ps) {
        // create temporary variable call _password
        // const _password = password;
        // generate timestamp
        const salt = uuidv1();
        // encryptPassword()
        const hashed_password = this.encryptPassword(ps);
        this.set({salt, hashed_password});
    })
    .get(function () {
        return this.email;
    });

// methods
userSchema.methods = {
    encryptPassword: function () {
        if (!password) return "";
        try {
            return crypto.createHmac('sha256', this.salt)
                .update(password)
                .digest('hex');
        } catch (e) {
            return "";
        }
    }
};

module.exports = mongoose.model("User", userSchema);
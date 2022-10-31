const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    Id: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minlength: 5
    },
    name: {
        type: String,
        maxlength: 100
    },
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
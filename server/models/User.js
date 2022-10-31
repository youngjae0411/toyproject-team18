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

const bcrypt = require("bcrypt");

userSchema.pre("save", function (next) {
  var user = this;

  // 비밀번호 암호화 과정
  if (user.isModified("password")) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
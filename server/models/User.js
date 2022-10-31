const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    Id: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minlength: 5,
        required: true
    },
    name: {
        type: String,
        maxlength: 100,
        required: true
    },
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
});

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

userSchema.methods.comparePassword = function (plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};


userSchema.methods.generateToken = function (cb) {
  var user = this;
  var token = jwt.sign(user._id.toHexString(), "createToken");

  user.token = token;
  user.save(function (err, user) {
    if (err) return cb();
    cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  var user = this;

  jwt.verify(token, "createToken", function (err, decoded) {
    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };

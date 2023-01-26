const express = require("express");
const AuthRouter = express.Router();
const { UserModel } = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// require("dotenv").config();

AuthRouter.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const emailfind = await UserModel.find({ email: email });
    if (emailfind.length > 0) {
      res.send("user exist please login");
    } else {
      bcrypt.hash(password, 3, async (err, secure_password) => {
        if (err) {
          res.send("some err is there");
          console.log(err);
        } else {
          const user = new UserModel({
            email,
            password: secure_password,
          });
          await user.save();
          res.send("user registered");
        }
      });
    }
  } catch (err) {
    res.send("error in registering the user");
    console.log(err);
  }
});

AuthRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email: email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (result) {
          var token = jwt.sign({ course: "backend" }, "masai");
          res.send({ msg: "login success", token: token });
        } else {
          res.send({ msg: "wrong credential" });
        }
      });
    } else {
      res.send({ msg: "user not found" });
    }
  } catch (err) {
    res.send({ msg: "user not exist" });
  }
});

module.exports = {
  AuthRouter,
};

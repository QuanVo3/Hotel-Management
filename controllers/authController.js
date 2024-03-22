const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config();
const authController = {
  //Login
  signIn: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res.status(404).json("Wrong username!");
      }
      const isValid = await bcrypt.compare(req.body.password, user.password)
      if (isValid === false) {
        return res.status(404).json("Wrong password!");
      }
      if (user && isValid) {
        const key = jwt.sign({ _id: user._id }, process.env.authKey, {
          expiresIn: "30s",
        });
        return res.status(200).json({user,key});
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  //Register
  signUp: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.password, salt);
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        const newUser = await new User({
          username: req.body.username,
          password: hash,
        });
        const user = await newUser.save();
        res.status(200).json(user);
      } else {
        res.status(404).json("username already existed!");
      }
    } catch (error) {
      res.status(500).json("error");
    }
  },
};
module.exports = authController;

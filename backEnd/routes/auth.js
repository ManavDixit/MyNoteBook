const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
//importing middleware getUser
const getUser = require("../middlewares/getUser");
require("dotenv").config();
// Route 1: create a user using post request on route '/api/auth/createuser'
router.post("/createuser", async (req, res) => {
  //creating variable for success
  let success=false;
  //checking if user with same userName id exists
  let user = await User.findOne({ userName: req.body.userName });
  console.log(user);
  if (user) {
    success=false;
    return res.status(400).json({success, error: "User with this userName already exists" });
  }
  //creating salt for password--> salt is added in end of every password to make common password more secure
  const salt = await bcrypt.genSalt(15); //creating a random string of 15 char to use as salt
  //creating hash of password
  const hashedPassword = await bcrypt.hash(req.body.password, salt); //creating hash of password by user+salt
  //changing req.body.password to hashedPassword
  req.body.password = hashedPassword;
  //adding data to database
  user = new User(req.body);
  //saving data to database
  const savedUser=await user.save().catch((err) => {
    success=false;
    res.json({success,'error':err.message});
    console.warn(err);
  });
  //creating jwt token
  const jwtSecretKey = process.env.JWT_SECRET_KEY;
  const jwtToken = jwt.sign({ userId: savedUser.id}, jwtSecretKey);
  //setting success to true and sending auth token and success
  success=true;
  res.json({success,authToken:jwtToken})
});

//Route 3:authenticating user using post request on route /api/auth/login
router.post("/login", async (req, res) => {
  //getting userName,password from req.body using destructuring
  let { userName, password } = req.body;
  //getting user from database
  let user = await User.findOne({ userName: userName });
  //variable for success
  let success=false;
  if (!user) {
    success=false;
    return res.status(400).json({success, error: "invaild userName or password" });
  }
  let passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    success=false;
    return res.status(400).json({ success,error: "invalid userName or password" });
  }
  //generating jwt auth token
  const secretKey=process.env.JWT_SECRET_KEY;
  const authToken=jwt.sign({userId:user.id},secretKey);
  success=true;
  res.json({success,authToken});
});

//getting user data after authentication using post on /api/post/getUser
router.post("/getuser", getUser,async (req, res) => {
  try {
    //geting value of req.user setted by middleware fetchUser
    const userId = req.user.userId;
    const user = await User.findOne({userId}).select("-password");
    res.send(user);
  } catch (error) {
    return res.status(404).json({ error: "internal system error" });
    console.log(error);
  }
});

module.exports = router;

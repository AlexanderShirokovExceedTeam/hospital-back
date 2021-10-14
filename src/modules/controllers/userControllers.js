const User = require('../../db/models/user');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const key = require('../keys/keys');

module.exports.getAllUsers = async (req, res, next) => {
  User.find().then(result => {
		res.send({data: result});
	});
};

module.exports.userRegistration = async (req, res, next) => {
  const { username, password } = req.body;
  const usernameIsUsed = await User.findOne({ username });
  if (usernameIsUsed) {
    return res.status(300).json({message: "Username is already taken, please try another."});
  }
  
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Invalid registration data'
      });
    }
    const salt = bcrypt.genSaltSync(10);
    const user = new User({
      username,
      password: bcrypt.hashSync(password, salt)
    });

    await user.save();
    const { _id } = user;
    const token = generateToken(username, _id);

    res.status(201).json({
      message: "New user is created.",
      user: user,
      token: token
    });    
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Registration error'});
  }
};

module.exports.userAuthentification = async (req, res, next) => {
  try {
    const { _id, username, password } = req.body;
    const usernameIsUsed = await User.findOne({ username });
    
    if (!usernameIsUsed) {
      return res.status(400).json({message: "Username is not entered or invalid."});
    }
    const { password: passwordOfUsed } = usernameIsUsed;
    const passwordsMatched = bcrypt.compareSync(password, passwordOfUsed);
  
    if (!passwordsMatched) {
      return res.status(401).json({message: "Invalid password!"});
    }
    const token = generateToken(username, _id);
    
    res.status(201).json({
      message: "Authentication was successful.",
      username: username,
      token: token
    });    
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Login error'});
  }
};

const generateToken = (user, id) => {
  return jwt.sign(
    { user, id },
    key.jwt,
    { expiresIn: "1h" }
  );
}

const User = require('../../db/models/user');
const { validationResult } = require('express-validator');

module.exports.getAllUsers = (req, res, next) => {
  User.find().then(result => {
		res.send({data: result});
	});
};

//  

module.exports.userRegistration = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Invalid registration data'
      });
    }
    const { username, password } = req.body;
    const isUsed = await User.findOne({ username });

    if (isUsed) {
      return res.status(300).json({message: "Username is already taken, please try another."});
    }

    const user = new User({
      username, password
    });

    await user.save();
    res.status(201).json({message: "User is created."});

  } catch (err) {
    console.log(error);
  }

  // const user = new User(req.body);

  // user.save().then(result => {
  //   User.find().then(result => {
  //     res.send({data: result});
  //   });
  // });
};

module.exports.userAuthentification = (req, res, next) => {
  User.find().then(result => {
		res.send({data: result});
	});
};
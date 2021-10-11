const express = require('express');
const routerUser = express.Router();
const { check } = require('express-validator');

const {
  getAllUsers,
  userRegistration,
  userAuthentification
} = require('../controllers/userControllers');

routerUser.get('/getAllUsers', getAllUsers);
routerUser.post('/userRegistration',
  [
    check('username', 'Invalid username!').isLength({ min: 6 }),
    check('password', 'Invalid password!').isLength({ min: 6 })
  ],
  userRegistration);
routerUser.post('/userAuthentification', userAuthentification);

module.exports = routerUser;

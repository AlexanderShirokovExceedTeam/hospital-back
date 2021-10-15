const express = require('express');
const routerUser = express.Router();
const { check } = require('express-validator');
const middleware = require('../middleware/middleware');

const {
  getAllUsers,
  userRegistration,
  userAuthentification
} = require('../controllers/userControllers');

routerUser.get('/getAllUsers', middleware, getAllUsers);
routerUser.post('/userRegistration',
  [
    check('username', 'Invalid username!').isLength({ min: 6 }),
    check('password', 'Invalid password!').isLength({ min: 6 })
  ],
  userRegistration);
routerUser.post('/userAuthentification', userAuthentification);

module.exports = routerUser;

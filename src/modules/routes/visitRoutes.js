const express = require('express');
const routerVisit = express.Router();

const {
  getAllVisits,
  createNewVisit,
  changeVisitInfo,
  deleteVisit
} = require('../controllers/visitControllers');

//  Visit routes

routerVisit.get('/allVisits', getAllVisits);
routerVisit.post('/createVisit', createNewVisit);

module.exports = routerVisit;

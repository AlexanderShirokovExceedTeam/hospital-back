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

module.exports = routerVisit;

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
routerVisit.patch('/updateVisit', changeVisitInfo);
routerVisit.delete('/deleteVisit', deleteVisit);

module.exports = routerVisit;

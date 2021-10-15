const express = require('express');
const routerVisit = express.Router();
const middleware = require('../middleware/middleware');

const {
  getAllVisits,
  createNewVisit,
  changeVisitInfo,
  deleteVisit
} = require('../controllers/visitControllers');

//  Visit routes

routerVisit.get('/allVisits', middleware, getAllVisits);
routerVisit.post('/createVisit', middleware, createNewVisit);
routerVisit.patch('/updateVisit', middleware, changeVisitInfo);
routerVisit.delete('/deleteVisit', middleware, deleteVisit);

module.exports = routerVisit;

const express = require('express');
const db = require('../db/db');
const tripController = require('../controllers/trip.controller')(db);

const routes = () => {
  const tripRouter = express.Router();
  const { postTrip, getTrips } = tripController;
  tripRouter.route('/')
    .post(postTrip);

  tripRouter.route('/')
    .get(getTrips);

  return tripRouter;
};

module.exports = routes;

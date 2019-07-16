const express = require('express');
const bookingController = require('../controllers/booking.controller');

const routes = (db) => {
  const bookingRouter = express.Router();
  const { bookSeat } = bookingController(db);
  bookingRouter.route('/')
    .post(bookSeat);

  return bookingRouter;
};

module.exports = routes;

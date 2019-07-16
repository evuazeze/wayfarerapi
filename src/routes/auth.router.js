const express = require('express');

const authController = require('../controllers/auth.controller');

const routes = (db, jwt, bcrypt) => {
  const authRouter = express.Router();
  const controller = authController(db, jwt, bcrypt);
  authRouter.route('/signup')
    .post(controller.signup);

  authRouter.route('/signin')
    .post(controller.signin);

  return authRouter;
};

module.exports = routes;

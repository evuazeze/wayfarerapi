// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jwt-simple');

const app = express();
const swaggerDocument = require('.././swagger.json');

const db = require('./db/db');

const auth = require('./routes/auth.router')(db, jwt, bcrypt);

app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true, useNewUrlParser: true }));
app.use(bodyParser.json());

app.get('/', async (req, res) => {
  // res.status(200).send('Welcome to Way Farer API');
  const { rows } = await db.query('SELECT * FROM "user"', []);

  if (!rows) res.status(400).send({ message: 'Error getting buses' });

  res.status(200).send(rows);
});

app.use('/api/v1/auth', auth);

app.server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Running on port: ${port}`);
});

module.exports = app;

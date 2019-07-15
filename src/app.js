const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');

const app = express();
const swaggerDocument = require('.././swagger.json');

app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true, useNewUrlParser: true }));
app.use(bodyParser.json());

app.get('/', async (req, res) => {
  res.status(200).send('Welcome to Way Farer API');
});

app.server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Running on port: ${port}`);
});

module.exports = app;

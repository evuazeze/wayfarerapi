const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

pool.connect();

module.exports = {
  query: (text, params) => pool.query(text, params),
};

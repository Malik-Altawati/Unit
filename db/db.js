const { Pool } = require("pg");

const pool = new Pool({
  connectionString: "postgres://postgres:zied@localhost:5432/zieddb"
});

module.exports = pool;

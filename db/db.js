const { Pool } = require('pg');


const pool = new Pool({
    connectionString: 'postgres://bifekdyy:ft8HcwOXofltHIqgJjZ4tEzfTiVy5rY1@balarama.db.elephantsql.com:5432/bifekdyy'
});



module.exports = pool;
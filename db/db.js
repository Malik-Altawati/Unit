const { Pool } = require('pg');


const pool = new Pool({
    //  connectionString: 'postgres://bifekdyy:ft8HcwOXofltHIqgJjZ4tEzfTiVy5rY1@balarama.db.elephantsql.com:5432/bifekdyy'
    // connectionString: 'postgres://postgres:1234@127.0.0.1:56763//postgres'
    connectionString : "postgres://postgres:1234@localhost:3000/postgres"

});



module.exports = pool;
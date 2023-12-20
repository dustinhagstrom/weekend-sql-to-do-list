const pg = require('pg');
require('dotenv').config();

let databaseName = 'weekend-to-do-app'

if (process.env.NODE_ENV === 'test') {
  databaseName = 'prime_testing'
}

const pool = new pg.Pool({
    connectionString: `${process.env.CONNECTION_STRING}${databaseName}`,
    allowExitOnIdle: true 
})

module.exports = pool

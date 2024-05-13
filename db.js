// db.js
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'poster',
    password: 'postergres',
    port: 5432, // default PostgreSQL port
});

module.exports = pool;

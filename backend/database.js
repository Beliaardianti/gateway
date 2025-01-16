require('dotenv').config(); 
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});

pool.connect()
    .then(client => {
        console.log("Connected to the database");
        client.release();
    })
    .catch(err => {
        console.error("Failed to connect to the database", err.stack);
    });

module.exports = pool;

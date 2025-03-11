const mysql = require('mysql2');

// Set up MySQL connection
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',         // Replace with your MySQL username
  password: '',         // Replace with your MySQL password
  database: 'hackthon',
});

// Use the promise-based pool
const promisePool = pool.promise();

module.exports = promisePool;

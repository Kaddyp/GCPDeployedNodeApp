 const mysql = require('mysql2');
//const mysql = require('mysql2/promise');
require('dotenv').config()

const connection = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.SERVER_PORT || '3307',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit : 10,
});
connection.getConnection(function (err) {
  if (err) throw err;
  console.log('Connected to the MySQL server.');
});
module.exports = connection;
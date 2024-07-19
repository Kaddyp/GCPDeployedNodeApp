// const User = require('../models/User');
// const jwt = require('jsonwebtoken');
const connection = require('../config/db');

exports.login = (data, callback) => {
  const { email, password } = data;
  const sqlQuery1 = `Select * from users where email= ?`;
  const values1 = [email];
 
  connection.query(sqlQuery1,values1, function (error, results, fields) {
      if (error) return callback(error, null);
      if (results.length > 0) {
        callback(null, results[0]);
      } else {
        callback(null, null);
      }
  });
};

exports.register = async (data) => {
  const { name, email, password } = data.user;
  // const existingUser = await User.findOne({ email });
  // if (existingUser) {
  //   throw new Error('Email already in use');
  // }
  const hashedPassword = await bcrypt.hash(password, 10);
  //const user = await User.create({ name, email, password: hashedPassword });

  const sql = `INSERT INTO Users (Name, Email, Password, Tokens) VALUES (?, ?, ?, ?)`;
  const values = [name, email, hashedPassword, ''];

  pool.getConnection(function (err, connection) {
      if (err) throw err; // not connected!
      connection.query(sql,values, function (error, results, fields) {
          console.log(results);
          return results.insertId;
      });
      connection.release();
  });
    
  //return user;
};

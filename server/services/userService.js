const connection = require('../config/db');

exports.getUserProfile = async (userId, callback) => {
  //const user = await User.findById(userId);
  const sqlQuery1 = `Select * from users where id= ?`;
  const values1 = [userId];

  if (!userId) {
    throw new Error('User not found');
  }
  connection.query(sqlQuery1,values1, function (error, results, fields) {
    if (error) return callback(error, null);
    if (results.length > 0) {
      callback(null, results[0]);
    } else {
      callback(null, null);
    }
});
};


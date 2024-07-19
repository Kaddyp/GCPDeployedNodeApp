const authService = require('../services/authService.js');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  const inputUser = req.body.user;
  authService.login(inputUser,(error, record)=>{
    if (error) {
      res.status(400).send({ message: error.message });
      return;
    }

    if (record) {
      // Compare the record with input data
        const userResponse = record;      
        if (!userResponse || !(bcrypt.compare(inputUser.password, userResponse.Password))) {
          throw new Error('Invalid email or password');
        }
        req.session.isLoggedUser = userResponse;
        res.status(200).send({userResponse, message: 'Logged in successfully'});
    } else {
      res.status(404).json({ message: 'No record found with the given ID.' });
    }

  })
};

exports.register = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

exports.logout = (req, res) => {
  //req.logout();
  req.session.destroy(err => {
      if (err) {
      return res.status(500).send('Could not log out');
      }
      res.send('User logged out');
  });
  res.status(200).send({ message: 'Logged out successfully' });
};

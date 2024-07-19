const userService = require('../services/userService');

exports.getUserProfile = async (req, res) => {
  const userId = req.body.user.Id;
  try {
    userService.getUserProfile(userId, (error, record)=>{
      if (error) {
        res.status(400).send({ message: error.message });
        return;
      }

      if (record) {
        const userResponse = record;        
        try{
            console.log("you r authorize user so now you can access our page. protected route is working..");
            res.status(200).send({userResponse, message: 'This is protcted route, your authorize user so now you can access our page.'});
        } catch (error) {
          res.status(404).json({ message: 'No record found with the given ID.' });
        } 
      }
    });
    
  } catch (error) {
    res.status(404).send({ message: 'User not found' });
  }
};
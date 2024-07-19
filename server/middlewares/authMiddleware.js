const session = require('express-session');

const sessionMiddleware = session({
  secret: 'server_scripting', // It holds the secret key for session, Replace with a strong secret key
  resave: false, // Forces the session to be saved, Do not save the session if it was not modified 
  saveUninitialized: true, // Forces a session that is "uninitialized", Do not create a session until something is stored 
  cookie: {
      secure: false // serve secure cookies // Set to true if using HTTPS
  }
});

const verifyUser = (req, res, next) =>{
  const id = req.header("Authorization"); //req.body.user.Id;
  console.log('User Id: ', id);
  if(!id) return res.status(401).send("Access denied");

  try {
    if(req.session.isLoggedUser.Id === id)
      req.user= req.session.isLoggedUser;
      next();
  } catch (error) {
      res.status(400).send("Invalid User")
  }
}

module.exports = {sessionMiddleware, verifyUser};
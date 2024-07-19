
const express = require('express');
const app = express();
const session = require('express-session');
const cors = require('cors');
const routes = require('./routes');
const db = require('./config/db');
const {sessionMiddleware} = require('./middlewares/authMiddleware');
// Port Number Setup 
var PORT = process.env.port || 5555; 
// Middleware setup
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // Adjust to your frontend's URL
  credentials: true
}));

// Set up the session middleware
app.use(sessionMiddleware);

// Example route to set a session variable
app.post('/api/login', (req, res) => {
    console.log('login', req.body.user);
    req.session.user = { id: 1, username: 'john.doe' };
    res.send('User logged in and session set');
});
// Example route to access session data
app.get('/api/profile', (req, res) => {
    if (req.session.user) {
      res.send(`Welcome ${req.session.user.username}`);
    } else {
      res.send('You need to log in first');
    }
});
app.get('/api/dashboard', (req, res) => {
   console.log(req.session);
   if(!req.session.user){
    res.status(200).send('User is need to log in first');
   }
   else{
    res.status(200).send(req.session.user.username + ' is logged In with Id: ' + req.session.user.id);
   }
});
// Example route to destroy the session
app.get('/api/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
        return res.status(500).send('Could not log out');
        }
        res.send('User logged out');
    });
});
app.post('/api/signUp', (req, res) => {
    console.log('SignUp', req.body.user);
    req.session.user = { id: 1, username: 'john.doe' };
    res.send('User logged in and session set');
});


// app.get('/', (req, res) => {
//     if (req.session.views) {
//         req.session.views++;
//         res.send(`Number of views: ${req.session.views}`);
//     } else {
//         req.session.views = 1;
//         res.send('Welcome to the session demo. Refresh!');
//     }
// });









app.use("/ap", routes);
app.listen(PORT, (error) => {
    if(error) throw error 
    console.log("Server created Successfully on PORT :", PORT) 
});
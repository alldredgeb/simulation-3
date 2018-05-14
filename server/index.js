//IMPORTS / REQUIRES
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const session = require('express-session');
require('dotenv').config();

//VARIABLES
const app = express();
const port = 3007;

//TOP LEVEL MIDDLEWARE
app.use(bodyParser.json());
app.use(express.static(__dirname + './../public/build'));
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new Auth0Strategy(
  {
    domain: process.env.DOMAIN,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    scope: 'openid profile email'
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    console.log('profile', profile);
    done(null, profile);
  }
))

massive(process.env.DATABASE).then(function(db) {
  app.set('db', db);
});

//ENDPOINTS
//Endpoints for "Auth.js"
app.get('/api/auth', passport.authenticate('auth0', {
  successRedirect: 'http://localhost:3000/#/dashboard',
  failureRedirect: 'http://localhost:3000/#/'
}))
      passport.serializeUser((user, done) => {
        console.log('serialize', user);
        done(null, user);
      });
      passport.deserializeUser((user, done) => {
        console.log('deserialize', user);
        done(null, user);
      });

//Endpoints for "Dashboard.js"
app.get('/api/userinfo', (req, res) => {
  console.log('session', req.user);
  res.status(200).send(req.user);
})

//Endpoints for "Profile.js"
//Endpoints for "Search.js"

//LISTEN
app.listen(port, () => console.log(`listening on port ${port}!`));
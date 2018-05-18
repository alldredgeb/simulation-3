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

massive(process.env.DATABASE).then(function(db) {
  app.set('db', db);
});

passport.use(new Auth0Strategy(
  {
    domain: process.env.DOMAIN,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    scope: 'openid profile email'
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    // console.log('profile', profile);
    app.get('db').check_user(profile.id).then( checkUserResults => {
      // console.log('check_user', checkUserResults);
      if(checkUserResults[0]) {
        done(null, checkUserResults[0].id);
      } else {
        app.get('db').create_user(`https://robohash.org/${profile.id}.png?set=set3`, profile.name.givenName, profile.name.familyName, profile.id).then( createUserResults => {
          done(null, createUserResults[0].id);
        })
      }
    })
    //if user does exist, pass their id into into "done": done(null, id)
    //if user does NOT exist, create the user in the database, then pass their id into "done": done(null, id)
    //EXAMPLES OF THE ABOVE CAN BE FOUND IN THE FULL-STACK EXAMPLE.
  }
))
//serializeUser sets the cookie that will be stored in the front end
passport.serializeUser((id, done) => {
  // console.log('serialize', id);
  done(null, id);
});
//deserializeUser takes the cookie from the front end and decides what will be accessible on sessions
passport.deserializeUser((id, done) => {
  // console.log('deserialize', id);
  //database query to get all the user's information using their id, and then pass that information into "done":
  app.get('db').get_user_info(id).then( getUserResults => {
    done(null, getUserResults[0]);
  })
});


//ENDPOINTS
//Endpoint for "Auth.js"
app.get('/api/auth', passport.authenticate('auth0', {
  successRedirect: 'http://localhost:3000/#/dashboard',
  failureRedirect: 'http://localhost:3000/#/'
}))

//Endpoint for "Auth.js" and "Dashboard.js"
app.get('/api/checklogin', (req, res) => {
  if(req.user) {
    res.status(200).send(req.user)
  } else {
    return res.status(403).send("User not logged in. Access denied.");
  }
})

//Endpoint for "Dashboard.js"
app.get('/api/recommended_friends', (req, res) => {
  app.get('db').get_recommended_friends(+req.user.id).then( reommendedFriendsResults => {
    res.status(200).send(reommendedFriendsResults)
  }).catch( error => {
    console.log('recommened friends query error', error);
    res.status(500).send(error);
  });
})

app.post('/api/add_friend', (req, res) => {
  app.get('db').add_friend(req.user.id, req.body.friend_id).then( response => {
    res.status(200).send("Friend added successfully!")
  }).catch ( error => {
    console.log('add friend query error', error);
    res.status(500).send(error);
  })
})

//Endpoint for "Dashboard.js", "Profile.js", and "Search.js"
app.get('/api/auth/logout', (req, res) => {
  req.logOut();
  res.redirect(`https://leroy-jones.auth0.com/v2/logout?returnTo=http%3A%2F%2Flocalhost:3000&client_id=${process.env.CLIENT_ID}`)
})

//Endpoints for "Profile.js"
//Endpoints for "Search.js"

//LISTEN
app.listen(port, () => console.log(`listening on port ${port}!`));
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
    app.get('db').check_user(profile.id).then( checkUserResults => {
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
  done(null, id);
});
//deserializeUser takes the cookie from the front end and decides what will be accessible on sessions
passport.deserializeUser((id, done) => {
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
    return res.status(401).send("User not logged in. Access denied.");
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

//Endpoint for "Dashboard.js" and "Search.js"
app.post('/api/add_friend', (req, res) => {
  app.get('db').add_friend(req.user.id, req.body.friend_id).then( response => {
    res.status(200).send("Friend added successfully!")
  }).catch ( error => {
    console.log('add friend query error', req.user.id);
    res.status(500).send(error);
  })
})

app.delete('/api/remove_friend/:friend_id', (req, res) => {
  app.get('db').remove_friend(req.user.id, req.params.friend_id).then( response => {
    res.status(200).send("Friend removed!")
  }).catch ( error => {
    console.log('remove friend query error', error);
    res.status(500).send(error);
  })
})

//Endpoint for "Profile.js"
app.put('/api/updateuser', (req, res) => {
  app.get('db').update_user(
    req.user.id, req.body.u_first_name, req.body.u_last_name, req.body.u_gender, req.body.u_hair_color, req.body.u_eye_color, req.body.u_hobby, req.body.u_birth_day, req.body.u_birth_month, req.body.u_birth_year
  ).then( response => {
    res.status(200).send(response)
  }).catch ( error => {
    console.log('update user query error', error);
    res.status(500).send(error);
  })
})

//Endpoint for "Dashboard.js", "Profile.js", and "Search.js"
app.get('/api/auth/logout', (req, res) => {
  req.logOut();
  res.redirect(`https://leroy-jones.auth0.com/v2/logout?returnTo=http%3A%2F%2Flocalhost:3000&client_id=${process.env.CLIENT_ID}`)
})

//Endpoint for "Search.js"
app.get('/api/check_number_of_pages', (req, res) => {
  app.get('db').check_number_of_pages(req.user.id).then( response => {
    res.status(200).send(response)
  }).catch ( error => {
    res.status(500).send(error);
  })
})

//Endpoint for "Search.js"
app.get('/api/check_number_of_filtered_pages', (req, res) => {
  if(req.query.search_criteria === 'u_first_name') {
    app.get('db').check_number_of_filtered_pages_by_first_name(req.user.id, req.query.search_text).then( response => {
      res.status(200).send(response)
    }).catch ( error => {
      res.status(500).send(error);
    })
  } else {
    app.get('db').check_number_of_filtered_pages_by_last_name(req.user.id, req.query.search_text).then( response => {
      onsole.log('pages by last name', response);
      res.status(200).send(response)
    }).catch ( error => {
      res.status(500).send(error);
    })
  }
  
})

//Endpoint for "Search.js"
app.get('/api/get_friend_ids', (req, res) => {
  app.get('db').get_friend_ids(req.user.id).then( response => {
    res.status(200).send(response)
  }).catch ( error => {
    console.log('get friend ids query error', error);
    res.status(500).send(error);
  })
})

//Endpoint for "Search.js"
app.get('/api/get_other_users/:offset', (req, res) => {
  app.get('db').get_ten(req.user.id, req.params.offset).then( response => {
    res.status(200).send(response)
  }).catch ( error => {
    console.log('get 10 query error', error);
    res.status(500).send(error);
  })
})

//Endpoint for "Search.js"
app.get(`/api/get_other_filtered_users/:offset`, (req, res) => {
  if(req.query.search_criteria === 'u_first_name') {
    app.get('db').get_ten_by_first_name(req.user.id, req.query.search_text, req.params.offset).then( response => {
      res.status(200).send(response);
    }).catch( error => {
      console.log('get ten by first name error', error);
      res.status(500).send(error);
    })
  } else {
    app.get('db').get_ten_by_last_name(req.user.id, req.query.search_text, req.params.offset).then( response => {
      res.status(200).send(response)
    }).catch( error => {
      console.log('get ten by last name error', error);
      res.status(500).send(error);
    })
  }

})

//LISTEN
app.listen(port, () => console.log(`listening on port ${port}!`));
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models').User

module.exports = async (passport) => {
  
  passport.use( new LocalStrategy({ // or whatever you want to use
    usernameField: 'userName',    // define the parameter in req.body that passport can use as username and password
    passwordField: 'userPassword'
  },

  async (userName, userPassword, done) => {
    //match user
    var user = await User.findOne( {where: {userName} }).catch(err => console.log(err));
    if(! user) {
      return done(null,false,{message : 'that user name is not registered'});
    }

    //match pass
    var correctPassword = await bcrypt.compare(userPassword, user.userHash);
    if(correctPassword) {
      return done(null,user);
    } else {
      return done(null,false,{message : 'password is incorrect'});
    }
  }))

  passport.serializeUser( (user, done) => {
    done(null, user.userId);
  });
    
  passport.deserializeUser( async (userId, done) => {
    const user = await User.findByPk(userId).catch(err => console.log(err));
    done(null, user);
    console.log("user id has inserted to the session");
  });
}; 
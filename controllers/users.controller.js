const User = require('../models').User
const bcrypt = require('bcrypt');
const passport = require('passport');


// create the routing
exports.getForLogin = async (req, res) => {
    res.render('login')
}

exports.postLogin = async (req, res, next) => {
    passport.authenticate('local',{
        successRedirect : '/',
        failureRedirect: '/users/login',
        failureFlash : true
    })
    (req,res,next)
}


exports.getForRegister = async (req, res) => {
    res.render('register')
}

exports.postRegister = async (req, res) => {
    var {userName, userPassword, userPasswordCheck} = req.body;
    console.log(req.body);

    // validate the input
    if (!(userName && userPassword && userPasswordCheck)){
        req.flash('error_msg','Enter User Name, Password and check the Password!');
        return res.redirect('/users/register');
    }
    if (userPassword != userPasswordCheck) {
        req.flash('error_msg','You Need to Match Passwords!');
        return res.redirect('/users/register');
    }

    // check if the user name exits
    userName = userName.trim().toLowerCase();
    var user = await User.findOne( {where: {userName}}).catch(err => console.log(err));
    if ( user ) {
        req.flash('error_msg','User Name Already Exits!');
        return res.redirect('/users/register');
    }
    
    // after validation, create the hash of the password
    var userHash = await bcrypt.hash(userPassword, 10);

    // create the user
    console.log(userName, userHash);
    var newUser = await User.create({userName, userHash}).catch(err => console.log(err));
    console.log(newUser);
    
    req.flash('success_msg','You have now registered!');
    res.redirect('/users/login');
}


exports.getLogout = async (req, res) => {
    req.logout();
    req.flash('success_msg','Now logged out!');
    res.redirect('/users/login');
}
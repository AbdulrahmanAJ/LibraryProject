let mysql = require("mysql");
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');


// set up the view engines
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// set up the public path
app.use(express.static("public"))

// set up the Middleware
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//passport config:
require('./config/passport')(passport)

//express session
app.use(session({
  secret : 'secret',
  resave : true,
  saveUninitialized : true
}));
app.use(passport.initialize());
app.use(passport.session());



//use flash
app.use(flash());
app.use((req,res,next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error  = req.flash('error');
  next();
})

// create the routing
const {ensureAuthenticated} = require("./config/auth.js")

app.use('/users', require('./routes/users.router'))
app.use('/', ensureAuthenticated, require('./routes/pages.router'))
app.use('/modify', require('./routes/modify.router'))


// create a 404 status and page
app.use((req, res) => {
    res.status(404).render('404')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })



if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
};
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const expressLayouts = require ('express-ejs-layouts')
const indexRouter =require('./routes/index')
const bcrypt = require('bcrypt');
const initlalizePassport = require('./passport-config');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(error => {
  console.error('MongoDB connection error:', error);
});

const db = mongoose.connection;
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

// Initialize Passport
initlalizePassport(
  passport ,
   email => users.find(user => user.email == email),
   id => users.find(user => user.id == id)
)

// Users array
const users = []

// View engine setup 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layouts/layout');
app.use(expressLayouts);

// Static files
app.use(express.static('public'));

// Express middlewares
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false , 
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

// Routes
app.use('/', indexRouter);

// Authentication middleware
function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
      return next();
  }
  res.redirect('/login');
}

function checkNotAuth(req, res, next) {
  if (req.isAuthenticated()) {
      return res.redirect('/');
  }
  next();
}

// Start the server
app.listen(process.env.PORT || 3000);

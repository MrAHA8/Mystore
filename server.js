if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
};
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const expressLayouts = require ('express-ejs-layouts')
const indexRouter =require('./routes/index')

//connect to db
// ...

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('MongoDB connection error:', error);
  });

// ...



const db = mongoose.connection;
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))



//view engine setup 
app.set ('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set ('layout','layouts/layout')
app.use (expressLayouts)

//set public foldesr
app.use (express.static('public'));
app.use ('/', indexRouter)

//start the server
app.listen(process.env.PORT || 3000)
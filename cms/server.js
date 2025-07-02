// Get dependencies
var express = require('express');
var path = require('path');
var http = require('http');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose'); 

// Routes files
const index = require("./server/routes/app");
const messageRoute = require("./server/routes/messages");
const contactRoute = require("./server/routes/contacts");
const documentRoutes = require("./server/routes/documents");

// establish a connection to the mongo database
mongoose.connect('mongodb://localhost:27017/cms', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to database!');
  })
  .catch((err) => {
    console.log('Connection failed: ' + err);
  });

var app = express(); // create an instance of express

// Tell express to use the following parsers for POST data
// Express 5 has body-parser built in
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(logger('dev')); // Tell express to use the Morgan logger

// Add support for CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

// Tell express to use the specified director as the
// root directory for your web site
app.use(express.static(path.join(__dirname, 'dist/cms/browser')));

// URL Routes
app.use('/messages', messageRoute);
app.use('/contacts', contactRoute);
app.use('/documents', documentRoutes);

// Tell express to map the default route ('/') to the index route
app.use('/', index);

// Tell express to map all other non-defined routes back to the index page
app.use((req, res, next) => {
  console.log('No route matched, serving Angular app for:', req.originalUrl);
  res.sendFile(path.join(__dirname, 'dist/cms/browser/index.html'));
});

// Define the port address and tell express to use this port
const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Tell the server to start listening on the provided port
server.listen(port, function() {
  console.log('API running on localhost: ' + port);
});
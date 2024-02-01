// import the routes
const express = require('express');
const path = require('path');


// const routes = require('./routes/index'); // this works too
const routes = require('./routes'); // defaults to index

// Helper functions for reading and writing to the JSON file
// const { readFromFile, readAndAppend } = require('./helpers/fsUtils');

// Helper method for generating unique ids
const uuid = require('./helpers/uuid');

const PORT = 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// apply middleware to use /api
app.use('/api', routes);

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for feedback page
app.get('/feedback', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/feedback.html'))
);



app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
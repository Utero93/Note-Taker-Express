// Import express
const express = require('express');

// Import routes
const htmlRoutes = require('./routes/htmlRoutes');
const apiRoutes = require('./routes/apiRoutes');

// Setting the PORT
const PORT = process.env.PORT || 3001; 

// Create an instance of express app
const app = express();

// Parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // parse incoming requests w/URL-encoded payloads to handle form data. 
// Configuring middleware
app.use(express.static("public")); // Serves static files from "public" directory

// Using modularized html and Api routes
app.use(htmlRoutes);
app.use(apiRoutes); 

// Starting the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`); // cb function executed once the server successfully starts.
});
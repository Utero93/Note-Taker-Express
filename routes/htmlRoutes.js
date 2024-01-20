// Import Dependencies 
const express = require('express');
const router = express.Router();
const path = require('path');

// Defines the route that serves 'index.html' the root path ('/)
router.get('/', (req, res) => {

    const indexPath = path.join(__dirname, '../public/index.html');
    // this will serve the index.html "public" directory
    res.sendFile(indexPath);

});

// Defining route to serve 'notes.html' from the '/notes' path
router.get('/notes', (req, res) => {

    const notesPath = path.join(__dirname, '../public/notes.html');
    // serves notes.html from "public" directory
    res.sendFile(notesPath); 


});

// Exporting the router
module.exports = router;

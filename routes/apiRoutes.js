// the following was written with the assistance of TA's and classmates

const express = require('express');
const router = express.Router();
// this line of code is needed to generate unique id's 
const { v4: uuidv4 } = require('uuid'); 
// for interacting with the file system
const fs = require('fs'); 
// stores the path to the JSON data file
const dbPath = 'db/db.json'; 

// write json helper function 
const readJson = () => {

    const data = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);


};

const writeJSON = (data) => {

    // function takes data as an argument, converts to json string, and writes it to the json file.
    fs.writeFileSync(dbPath, JSON.stringify(data));

};

    // defining a route for GET requests to '/api/notes' and calls read helper function
    router.get('api/notes', (req, res) => {

    // read JSON data from file and send it as a JSON response
    const dbJson = readJson();
    res.json(dbJson);

});

// defining a route to handle POST requests to 'api/notes'
router.post('/api/notes', (req, res) => {
    // reads existing JSON data
    const dbJson = readJson(); 
    // create new note object using request body and generated UUID
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4(),
    };

    dbJson.push(newNote) // pushes new note to existing db.json file
    writeJSON(dbJson);   // writes updated data to the file
    res.json(dbJson);    // sends updated data as a JSON response 
   
});


// Handle delete functionality for HTTP DELETE requests to '/api/notes/:id'

router.delete('api/notes/:id', (req, res) => {

    const dbJson = readJson();
    // this variable reads existing JSON data, filters out the note with a speciofied ID from the reqest parameters
    const newNotes = dbJson.filter((note) => note.id !== req.params.id);
    // writes filtered data back tot the file 
    writeJson(newNotes); 
    // sends json message of the notes deletion
    res.json({message: 'The Note was deleted'});
  
});

// export router instance
module.exports = router;



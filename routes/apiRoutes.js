// imported modules and packages
const apiRoute = require("express").Router();
const path = require("path");
// middleware for generating unique ids
const { v4: uuidv4 } = require("uuid");

const fs = require("fs");

//  stores the path to the JSON data file 
const dbPath = 'db/db.json';

const readJson = () => {

  const data = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(data);
};

const writeJson = (data) => {
fs.writeFileSync(dbPath, JSON.stringify(data));

};

// sends the db.json to the path /api/notes
apiRoute.get("/notes", (req, res) => {
const data = readJson();
res.json(data);
});

// apiRoute.get("/notes", (req, res) => {
//   res.sendFile(path.join(__dirname, "..", "./db/db.json"));
// });


// adds user notes to the db.json
apiRoute.post("/notes", (req, res) => {
  // read db.json and parses the JSON object // use readFileSynce because it runs synchronously instead of async (prevents promise errors)
  let data = readJson();
  //   creates an object based on user notes and title, then gives it a unique id
  let newNote = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4(),
  };
  //   adds the new note to the data array of objects in db.json
  data.push(newNote);
  //   writes the file all over with pre-existing and new data
  writeJson(data);
  //   res.json is sending the array of objects with the new data(notes)
  res.json(data);
});



// deletes user notes by unique id values
apiRoute.delete("/notes/:id", (req, res) => {
  // reads the database and stores the array into the 'data' variable
  let data = readJson();
  // filters out all the notes that dont equal the specified id
  const deleteNote = data.filter((note) => note.id !== req.params.id);
  // writes the array to the db.json
 writeJson(deleteNote);
  //   res.json is sending the array of objects with the new data(notes)
  res.json({message: 'Note has been deleted!'});
});

module.exports = apiRoute;
// imported modules and packages
const apiRoute = require("express").Router();
const path = require("path");
const fs = require("fs");

// middleware for generating unique ids
const { v4: uuidv4 } = require("uuid");

// sends the db.json to the path /api/notes
apiRoute.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "./db/db.json"));
});

// adds user notes to the db.json
apiRoute.post("/notes", (req, res) => {
  // read db.json and parses the JSON object // use readFileSynce because it runs synchronously instead of async (prevents promise errors)
  let data = JSON.parse(fs.readFileSync("db/db.json"));
  //   creates an object based on user notes and title, then gives it a unique id
  let newNote = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4(),
  };
  //   adds the new note to the data array of objects in db.json
  data.push(newNote);
  //   writes the file all over with pre-existing and new data
  fs.writeFileSync("db/db.json", JSON.stringify(data));
  //   res.json is sending the array of objects with the new data(notes)
  res.json(data);
});

// deletes user notes by unique id values
apiRoute.delete("/notes/:id", (req, res) => {
  // reads the database and stores the array into the 'data' variable
  let data = JSON.parse(fs.readFileSync("db/db.json"));
  // filters out all the notes that dont equal the specified id
  data = data.filter((note) => note.id !== req.params.id);
  // writes the array to the db.json
  fs.writeFileSync("db/db.json", JSON.stringify(data));
  //   res.json is sending the array of objects with the new data(notes)
  res.json(data);
});

module.exports = apiRoute;
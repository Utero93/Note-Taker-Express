// imported modules and packages
const express = require("express");
const path = require("path");
const htmlRoute = express.Router();

console.log(__dirname)
// routes the notes.html in the public folder to the /notes path
htmlRoute.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "notes.html"));
});

// routes the index.html as the default page
htmlRoute.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

module.exports = htmlRoute;

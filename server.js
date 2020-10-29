// dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
// array to save notes
const notesArray = require("./db/db.json")

// express
const app = express();
// dynamic port
const PORT = process.env.PORT || 5000;

// set up the express app to handle data parsing 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//   start the server and begin listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
// routes
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

//   API Gets from db.json
app.get("/api/notes", function (req, res){
    return res.json(JSON.parse(fs.readFileSync("./db/db.json")))
})


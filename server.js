// dependencies
var express = require("express");
var path = require("path");

// express
var app = express();
// dynamic port
var PORT = process.env.PORT || 5000;

// set up the express app to handle data parsing 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// array to save notes
var notes = []

// routes
    
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

//   start the server and begin listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
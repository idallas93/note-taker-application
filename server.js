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
app.use(express.static(path.join(__dirname, 'public')));

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
// Returns all notes from notesArray when getNotes() is called in index.js
app.get("/api/notes", function (req, res) {
    return res.json(JSON.parse(fs.readFileSync("./db/db.json")));
});


// POSTs

// Route for saving a note to db.json
app.post("/api/notes", function (req, res) {
    // req.body is JSON post sent from UI
    let newNoteRequest = req.body;
    console.log("New request: ", newNoteRequest);

    notesArray.push(newNoteRequest);
    // Set id property of newNoteRequest to its index in notesArray
    newNoteRequest.id = notesArray.indexOf(newNoteRequest);

    fs.writeFileSync("./db/db.json", JSON.stringify(notesArray));
    
    res.json({
        isError: false,
        message: "Note successfully saved",
        port: PORT,
        status: 200,
        success: true
    });

});


// DELETEs

app.delete("/api/notes/:id", function (req, res) {
    // id is index of note in notesArray
    let id = parseInt(req.params.id);
    // Use id index to remove item from notesArray
    let removeItemArray = notesArray.filter(item => item.id != id);

    removeItemArray.forEach(element => element.id = removeItemArray.indexOf(element));

    fs.writeFileSync("./db/db.json", JSON.stringify(removeItemArray));

    res.json({
        isError: false,
        message: "Note successfully deleted",
        port: PORT,
        status: 200,
        success: true
    });
});


// Redirect to root if no routes match
app.get("*", function (req, res) {
    res.redirect('/');
});
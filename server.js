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
// routes for express app
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

// Returns all notes 
app.get("/api/notes", function (req, res) {
    return res.json(JSON.parse(fs.readFileSync("./db/db.json")));
});

// Route for saving a note to db.json
app.post("/api/notes", function (req, res) {
    // req.body 
    let newNote = req.body;
    console.log("New request: ", newNote);

    notesArray.push(newNote);
    // Set id property of newNote
    newNote.id = notesArray.indexOf(newNote);

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
    let id = parseInt(req.params.id);
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


// Redirect to root 
app.get("*", function (req, res) {
    res.redirect('/');
});

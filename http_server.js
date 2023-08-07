// add http server
// -----------------------
const express = require("express");
const app = express();

var low = require("lowdb");
var fs = require("lowdb/adapters/FileSync");
var adapter = new fs("db.json");
var db = low(adapter);

// This line is connected with the index.html and the form.html page which is configured to Express to serve static files from the public directory ----------
app.use(express.static("public"));

// init the data store
db.defaults({ posts: [] }).write();

// list posts
app.get("/data", function (req, res) {
  res.send(db.get("posts").value());
});

// ----------------------------------------------------
// add post - test using:
//      curl http://localhost:3000/posts/ping/1/false
//  This bit of code ensures that the value returns a number not a string:   var id = parseInt(req.params.id);----------------------------------------------------
app.get("/posts/:title/:id/:published", function (req, res) {
  var id = parseInt(req.params.id);
  var post = {
    id: id,
    title: req.params.title,
    published: req.params.published,
  };
  db.get("posts").push(post).write();
  console.log(db.get("posts").value());
  res.send(db.get("posts").value());
});

// ----------------------------------------------------
// THis code block filters by published state - test using:
//      curl http://localhost:3000/published/true
// ----------------------------------------------------
app.get("/published/:boolean", function (req, res) {
  var publishedValue = req.params.boolean === "true" ? true : false;
  var filteredPosts = db
    .get("posts")
    .filter({ published: publishedValue })
    .value();
  res.send(filteredPosts);
});

// ----------------------------------------------------
// This code block updates the published value - test using:
//      curl http://localhost:3000/published/1/true
// ----------------------------------------------------
app.get("/published/:id/:boolean", function (req, res) {
  var id = req.params.id;
  var newPublishedValue = req.params.boolean === "true ? true : false";

  db.get("posts")
    .find({ id: id })
    .assign({ published: newPublishedValue })
    .write();
  res.send(db.get("posts").value());
});

// ----------------------------------------------------
// Allows users to delete entry by id - test using:
//      curl http://localhost:3000/delete/5
// ----------------------------------------------------
app.get("/delete/:id/", function (req, res) {
  var id = req.params.id;

  db.get("posts").remove({ id: id }).write();
  res.send(db.get("posts").value());
});

//---------------------------------------------------
// Allows users to delete All entries connected to the form.html file - test using:
//      curl http://localhost:3001/deleteAll
// ----------------------------------------------------
app.get("/deleteAll", function (req, res) {
  db.get("posts").remove().write();
  res.send({ message: "All records have been deleted successfully" });
});

// Server Runs on Port 3000
// -----------------------
app.listen(3000, function () {
  console.log("Running on port 3000");
});

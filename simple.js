var low = require("lowdb");
var fs = require("lowdb/adapters/FileSync");
var adapter = new fs("db.json");
var db = low(adapter);

// init the data store
// ---------------------------
// YOUR CODE
db.defaults({ posts: [] }).write();

// add post
// ----------------------------
//

// * Remember to remove the posts you've already kicked up otherwise you will get two entries with id.
// db.get("posts")
//   .push({ id: 1, title: "lowdb is awesome", published: true })
//   .write();
// *************************

// db.get("posts")
//   .push({ id: 2, title: "lowdb is great", published: true })
//   .write();

// db.get("posts")
//   .push({ id: 3, title: "lowdb is fantastic", published: false })
//   .write();

// db.get("posts")
//   .push({ id: 1, title: "lowdb is wicked cool", published: true })
//   .write();

// * posts the values in db.json in the console.
// console.log(db.get("posts").value());
// ****************************************************************

// * count posts
// In the console it will post the console message: "Number of posts: 4"
const count = db.get("posts").value().length;
console.log("Number of posts: ", count);
// ****************************************************************

// * find all posts ids
// In the console it will post the array: Post ID:  [ 1, 2, 3, 1 ] which is accurate.
const postID = db.get("posts").map("id").value();
console.log("Post ID: ", postID);
// ****************************************************************

// * all matches of published false
// In the console it will post: unplublished posts:  [ { id: 3, title: 'lowdb is fantastic', published: false } }
const unpublished = db.get("posts").filter({ published: false }).value();
console.log("unplublished posts: ", unpublished);
// ****************************************************************

// * find post with published false
// This will post in the console: Unpublished post:  { id: 3, title: 'lowdb is fantastic', published: false }
const unpublishedPost = db.get("posts").find({ published: false }).value();
console.log("Unpublished post: ", unpublishedPost);
// ****************************************************************

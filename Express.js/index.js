// aim: To understand express
// The myhandler function which we have written will now be written by express to create a web server

const express = require("express");

// This app basically is the handler function which we used to write before express
const app = express();

app.get("/", (req, res) => {
  return res.send("Its a Home Page");
});

app.get("/about", (req, res) => {
  return res.send(
    `Its an about page, And ${req.query.name} is ${req.query.age} years old, He is a ${req.query.profession}`
  );
});

app.listen(8000, () => {
  console.log("All is well, Server started");
});

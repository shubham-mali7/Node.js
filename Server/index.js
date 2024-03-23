// aim : create a web server using http module in node.js

const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {
  const log = `${Date.now()}: ${req.url} New Request Received\n`;
  fs.appendFile("./log.txt", log, (err) => {
    if (err) {
      console.error("Error appending to log file:", err);
    }
  });

  switch (req.url) {
    case "/":
      res.end("Welcome Home Beta!");
      break;
    case "/about":
      res.end("Ram Ram Bhai Sareaane, Shubham here");
      break;
    case "/contact":
      res.end("Shubham-837363556");
      break;
    default:
      res.end("404 NOT FOUND");
  }
});

myServer.listen(8000, () => {
  console.log("All is well, Server started!");
});





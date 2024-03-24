// Aim: Understand queryparameters, path, url, domain

const fs = require("fs");
const http = require("http");
const url = require("url");

const myServer = http.createServer((req, res) => {
  // ignore favicon
  if (req.url === "/favicon.ico") {
    return res.end();
  }
  //   log url in the text file
  const log = `${Date.now()}: ${req.url} New request received\n`;
  const myUrl = url.parse(req.url, true);
  console.log(myUrl);
  fs.appendFile("./log.txt", log, (err) => {
    if (err) {
      console.log("Error while appending log file", err);
    }
  });

  switch (myUrl.pathname) {
    case "/":
      res.end("Welcome Home Shubham");
      break;
    case "/about":
      const username = myUrl.query.myname;
      res.end(`Hi I am ${username}`);
      break;

    case "/search":
      const search = myUrl.query.search_query;
      res.end(`Here is the results for your search of ${search}`);
      break;
    case "/service":
      res.end("All Web services provided");
      break;
    default:
      res.end("404 NOT FOUND");
  }
});

myServer.listen(8000, () => {
  console.log("All is well, Server started!!");
});

// aim: To understand query parameter
// This is how we have to deal while making simple web server, when express was not there
// The myhandler function which we have written will now be written by express to create a web server

const fs = require("fs");
const http = require("http");
const url = require("url");

function myHandler(req, res) {
  if (req.url === "/favicon.ico") {
    return res.end();
  }

  const log = `${Date.now()}: ${req.url},  Succesfully Received\n`;
  const myUrl = url.parse(req.url, true);
  console.log(myUrl);
  fs.appendFile("./log.txt", log, (err) => {
    if (err) {
      console.error("Error while logging", err);
    }
  });

  switch (myUrl.pathname) {
    case "/":
      res.end("All is well, Welcome home!!");
      break;
    case "/about":
      var username = myUrl.query.user_name;
      var profession = myUrl.query.user_profession;

      if (username == "Rohan Singh") {
        profession = "Node.js Developer";
      } else if (username == "Shubham Mali") {
        profession = "React.js Developer";
      } else if (username == "Bhaskar Vankala") {
        profession = "Electronics Engineer";
      }
      res.end(`${username} - ${profession}`);

      break;
    case "/service":
      res.end(
        "Business consulting, Craeer Consulting, Life and wellness coach"
      );
      break;

    case "/search":
      const search = myUrl.query.search_query;
      res.end(`Here is the result for your search of ${search}`);
      break;

    default:
      res.end("Unknown page, Couldn't find: 404 ");
  }
}

const myServer = http.createServer(myHandler);

myServer.listen(8000, () => {
  console.log("All is well");
});

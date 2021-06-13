const http = require("http");
const url = require("url");

// intialize the server
const server = http.createServer((req, res) => {
  console.log("hello from server");
  res.end("lets end the request");
});

server.listen(8000);

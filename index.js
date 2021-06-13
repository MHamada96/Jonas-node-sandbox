const http = require("http");
const url = require("url");
const fs = require("fs");

// prepare data
let data = fs.readFileSync(`${__dirname}/dataBase/db.json`, "utf-8");

const handleGET = (req, res) => {
  console.log(req.method);
  const { pathname } = new URL(req.url, "http://" + req.headers.host);
  const compURL = new URL(req.url, "http://" + req.headers.host);

  if (pathname == "/" || pathname == "/home") {
    res.writeHead(200, { "content-type": "text/json" });
    let id = compURL.searchParams.get("id");
    if (compURL.searchParams.has("id")) {
      if (id == "") {
        res.end(data);
      } else if (id >= 0 && id < data.length) {
        let arr = JSON.parse(data);
        res.end(JSON.stringify(arr[id]));
      } else {
        console.log("unkown");
        res.end(JSON.stringify(`unkown id value  (${id})`));
      }
    } else {
      res.end(data);
    }
  } else {
    res.writeHead(404);
    res.end(`404 - ${pathname} no such page!`);
  }
};
// intialize the server
const server = http.createServer((req, res) => {
  if (req.method == "GET") {
    handleGET(req, res);
  }
  // handle other Methods
});

server.listen(8000);

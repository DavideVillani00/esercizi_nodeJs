const fs = require("fs");
const http = require("http");

http
  .createServer((req, res) => {
    fs.readFile("file.txt", "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  })
  .listen(3000, console.log("server avviato"));

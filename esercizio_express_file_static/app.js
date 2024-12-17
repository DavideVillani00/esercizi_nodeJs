const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile("/home.html", { root: __dirname + "/public" });
});

app.get("/contatti", (req, res) => {
  res.sendFile("/contatti.html", { root: __dirname + "/public" });
});

app.all("*", (req, res) => {
  res.sendFile("/errorPage.html", { root: __dirname + "/public" });
});

app.listen(3000);

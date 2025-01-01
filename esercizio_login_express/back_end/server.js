const express = require("express");
const cors = require("cors");
const port = 3000;
const apiRouter = require("./routes/apiRoutes.js");
const authMid = require("./middlewere/authMiddlewere.js");
const morgan = require("morgan");

// impostazioni app
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// utilizzo api
app.use("/api", apiRouter);

app.get("/auth", authMid, (req, res) => {
  res.status(200).json({
    nome: req.user.nome,
    ruolo: req.user.ruolo,
  });
});

// avvio
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const port = 3000;
const utenti = [];

// impostazioni app
const app = express();
app.use(cors());
app.use(express.json());

// signup
app.post("/signup", async (req, res) => {
  const { nome, password } = req.body;

  //   controllo se l'utente esiste
  const utenteEsiste = utenti.find((utente) => utente.nome === nome);
  if (utenteEsiste) {
    return res.status(400).json({ msg: "utente già esistente" });
  }

  const passHash = await bcrypt.hash(password, 10);
  utenti.push({ nome, password: passHash });
  res.status(201).json({ msg: "utente creato" });
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

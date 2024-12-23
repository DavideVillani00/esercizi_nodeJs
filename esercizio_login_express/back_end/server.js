const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const port = 3000;
const utenti = [];
const SECRET_KEY = "chiavesegreta";

// impostazioni app
const app = express();
app.use(cors());
app.use(express.json());

// per generare l'admin
(async function () {
  const nome = "admin";
  const password = "admin";
  const passHash = await bcrypt.hash(password, 10);
  utenti.push({ nome, password: passHash });
})();

// per controllare gli utenti (debug)
app.get("/utenti", (req, res) => {
  res.status(200).json(utenti);
});

// signup
app.post("/signup", async (req, res) => {
  try {
    const { nome, password } = req.body;

    //   controllo se l'utente esiste
    const utenteEsiste = utenti.find((utente) => utente.nome === nome);
    if (utenteEsiste) {
      return res.status(400).json({ msg: "utente già esistente" });
    }
    // hasha la password
    const passHash = await bcrypt.hash(password, 10);
    utenti.push({ nome, password: passHash });
    res.status(201).json({ msg: "utente creato" });
  } catch (err) {
    console.error("errore nel signup" + err);
    throw res.status(500).json({ msg: "Errore del server, riprova più tardi" });
  }
});

// login
app.post("/login", async (req, res) => {
  try {
    const { nome, password } = req.body;

    // prendi l'utente
    const utente = utenti.find((u) => {
      return u.nome === nome;
    });
    // controlli
    if (!utente) return res.status(404).json({ msg: "utente non trovato" });

    const login = await bcrypt.compare(password, utente.password);
    if (!login)
      return res.status(400).json({ msg: "la password non è corretta" });
    // admin
    if (nome === "admin") {
      const token = jwt.sign({ nome }, SECRET_KEY, { expiresIn: "1h" });
      return res.status(200).json({ msg: "benvenuto admin", token });
    }
    res.status(200).json({ msg: "accesso consentito" });
  } catch (err) {
    console.error("errore nel login" + err);
    throw res.status(500).json({ msg: "Errore del server, riprova più tardi" });
  }
});

// avvio
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

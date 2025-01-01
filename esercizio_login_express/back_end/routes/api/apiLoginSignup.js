const express = require("express");
const router = express.Router();
const utenti = require("../../dbUtenti");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;

// signup
router.post("/signup", async (req, res) => {
  try {
    const { nome, password } = req.body;

    //   controllo se l'utente esiste
    const utenteEsiste = utenti.find((utente) => utente.nome === nome);
    if (utenteEsiste) {
      return res.status(400).json({ msg: "utente già esistente" });
    }
    // hasha la password
    const passHash = await bcrypt.hash(password, 10);
    utenti.push({ nome, password: passHash, ruolo: "user" });
    res.status(201).json({ msg: "utente creato" });
  } catch (err) {
    console.error("errore nel signup" + err);
    throw res.status(500).json({ msg: "Errore del server, riprova più tardi" });
  }
});

// login
router.post("/login", async (req, res) => {
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
    const token = jwt.sign(
      { nome: utente.nome, ruolo: utente.ruolo },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.status(200).json({ msg: "accesso consentito", token });
  } catch (err) {
    console.error("errore nel login" + err);
    throw res.status(500).json({ msg: "Errore del server, riprova più tardi" });
  }
});

module.exports = router;

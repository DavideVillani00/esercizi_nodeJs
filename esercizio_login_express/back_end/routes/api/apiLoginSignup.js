const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const conn = require("../../database/dbConnection");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;

// signup
router.post("/signup", async (req, res) => {
  try {
    const { nome, password } = req.body;
    // fetch per ricevere i dati dell'utente se esiste
    const response = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome }),
    });
    const dataUser = await response.json();
    //   controllo se l'utente esiste
    if (dataUser.length > 0) {
      return res.status(400).json({ msg: "utente già esistente" });
    }
    // hasha la password
    const passHash = await bcrypt.hash(password, 10);
    // salva user in database
    conn.query(
      "INSERT INTO subscribed_users (user_name, user_pass) VALUES (?, ?)",
      [nome, password],
      (err) => {
        if (err) throw err;
      }
    );
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
    const response = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome }),
    });
    const dataUser = await response.json();

    // controlli
    if (!dataUser.length > 0)
      return res.status(404).json({ msg: "utente non trovato" });

    const { user_name, user_pass, user_role } = await dataUser[0];

    const login = await bcrypt.compare(password, user_pass);
    if (!login)
      return res.status(400).json({ msg: "la password non è corretta" });
    // admin
    const token = jwt.sign({ nome: user_name, ruolo: user_role }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json({ msg: "accesso consentito", token });
  } catch (err) {
    console.error("errore nel login" + err);
    throw res.status(500).json({ msg: "Errore del server, riprova più tardi" });
  }
});

module.exports = router;

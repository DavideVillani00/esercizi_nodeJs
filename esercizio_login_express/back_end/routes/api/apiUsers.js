const express = require("express");
const router = express.Router();
const conn = require("../../database/dbConnection");

// per controllare gli utenti
router.get("/", (req, res) => {
  conn.query("SELECT * FROM subscribed_users", (err, result) => {
    if (err) {
      console.error(err);
      throw res.status(400).json({ msg: "errore nella ricerca degli utenti" });
    }
    res.status(200).json(result);
  });
});

// controllo utente in base al nome (signup)
router.post("/", (req, res) => {
  const { nome } = req.body;
  conn.query(
    "SELECT * FROM subscribed_users WHERE user_name = ?",
    [nome],
    (err, result) => {
      if (err) {
        console.error(err);
        throw res.status(400).json({ msg: "errore nella ricerca dell'utente" });
      }
      res.status(200).json(result);
    }
  );
});

module.exports = router;

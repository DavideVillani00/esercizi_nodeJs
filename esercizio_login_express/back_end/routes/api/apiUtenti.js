const express = require("express");
const router = express.Router();
const utenti = require("../../dbUtenti");

// per controllare gli utenti (debug)
router.get("/", (req, res) => {
  res.status(200).json(utenti);
});

module.exports = router;

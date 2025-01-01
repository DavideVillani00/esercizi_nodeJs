const express = require("express");
const router = express.Router();

// routes
const loginSignupRouter = require("./api/apiLoginSignup.js");
const utentiRouter = require("./api/apiUtenti.js");

// utilizzo dei ruoutes
router.use(loginSignupRouter);
router.use("/utenti", utentiRouter);

module.exports = router;

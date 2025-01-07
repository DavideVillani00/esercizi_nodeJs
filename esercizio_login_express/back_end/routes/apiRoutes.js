const express = require("express");
const router = express.Router();

// routes
const loginSignupRouter = require("./api/apiLoginSignup.js");
const utentiRouter = require("./api/apiUsers.js");

// utilizzo dei ruoutes
router.use(loginSignupRouter);
router.use("/users", utentiRouter);

module.exports = router;

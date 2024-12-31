const bcrypt = require("bcrypt");
const utenti = [];

// per generare l'admin
(async function () {
  const nome = "admin";
  const password = "admin";
  const passHash = await bcrypt.hash(password, 10);
  utenti.push({ nome, password: passHash, ruolo: "admin" });
})();

module.exports = utenti;

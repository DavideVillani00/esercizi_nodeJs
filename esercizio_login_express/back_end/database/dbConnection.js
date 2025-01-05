const mysql = require("mysql2");
require("dotenv").config();

const DB_PASS = process.env.DB_PASS;
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: DB_PASS,
  database: "exercise_login_express",
});

conn.connect((err) => {
  if (err) throw err;
  console.log("connessione con il database avvenuta con successo");
});

module.exports = conn;

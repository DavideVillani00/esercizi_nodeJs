document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("esegui il login");
    return window.location.assign("./login.html");
  }

  try {
    const response = await fetch("http://localhost:3000/auth", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    const nomeUtente = data.nome;
    const ruoloUtente = data.ruolo;
  } catch (err) {
    alert(err);
    window.location.assign("./login.html");
  }
});

// non funziona
module.exports = nomeUtente;

document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("esegui il login");
    return window.location.assign("../src/login.html");
  }

  try {
    const response = await fetch("http://localhost:3000/auth", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    sessionStorage.setItem("nomeUtente", data.nome);
    sessionStorage.setItem("ruoloUtente", data.ruolo);
    document.dispatchEvent(new Event("authReady"));
  } catch (err) {
    alert(err);
    window.location.assign("../src/login.html");
  }
});

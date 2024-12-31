document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("esegui il login");
    return window.location.assign("./login.html");
  }

  try {
    const response = fetch("http://localhost/3000/admin");
  } catch (err) {
    alert(err);
    window.location.assign("./login.html");
  }
});

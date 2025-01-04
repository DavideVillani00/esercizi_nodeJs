const update = document.querySelector("#update");
update.addEventListener("click", async () => {
  const usersList = document.querySelector("#usersList");
  usersList.innerHTML = "";
  try {
    // manda dati
    const response = await fetch("http://localhost:3000/api/utenti", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    // creazione di un nuovo array con i nomi degli utenti
    const users = await data.map(({ nome }) => {
      return nome;
    });
    // creazione lista togliendo l'admin
    users.forEach((user) => {
      if (user !== "admin") {
        const li = document.createElement("li");
        li.textContent = user;
        usersList.appendChild(li);
      }
    });
  } catch (err) {
    throw err;
  }
});

const update = document.querySelector("#update");
update.addEventListener("click", async () => {
  const usersList = document.querySelector("#usersList");
  try {
    // manda dati
    const response = await fetch("http://localhost:3000/utenti", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    console.log(data);
    const users = await data.map(({ nome }) => {
      return nome;
    });
    users.forEach((user) => {
      if (user !== "admin") {
        const li = document.createElement("li");
        li.textContent = user;
        usersList.appendChild(li);
      }
    });
    console.log(users);
  } catch (err) {
    throw err;
  }
});

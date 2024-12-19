const signUpForm = document.querySelector("#signUpForm");
const logIn = document.querySelector("#logIn");
const signUp = document.querySelector("#signUp");
const logInUp = document.querySelector("#logInUp");

// signUp
signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const password = document.querySelector("#signUpPass").value;
  const ripPassword = document.querySelector("#signUpRepPass").value;
  const nome = document.querySelector("#signUpName").value;

  //   check password
  if (password !== ripPassword || password === "") {
    // reset input
    throw (signUp.textContent = "Le password non coincidono");
  }

  //   fetch dati
  try {
    // manda dati
    const response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, password }),
    });
    // recupera dati
    const data = await response.json();
    signUp.textContent = data.msg;
  } catch (err) {
    signUp.textContent = "Errore nella creazione del profilo";
    throw err;
  }
});

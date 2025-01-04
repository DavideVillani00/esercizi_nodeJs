const signUpForm = document.querySelector("#signUpForm");
const logInForm = document.querySelector("#logInForm");
const signUp = document.querySelector("#signUp");
const logIn = document.querySelector("#logIn");
const logInDiv = document.querySelector("#logInDiv");
const signUpDiv = document.querySelector("#signUpDiv");
const logInTransfer = document.querySelector("#logInTransfer");
const signUpTransfer = document.querySelector("#signUpTransfer");
let sub;
// da sistemare

signUpTransfer.addEventListener("click", () => {
  sub = false;
});
logInTransfer.addEventListener("click", () => {
  sub = true;
});

if (sub === true) {
  signUpDiv.style.display = "none";
  logInDiv.style.display = "inline-block";
} else if (sub === false) {
  signUpDiv.style.display = "inline-block";
  logInDiv.style.display = "none";
}

// signUp
signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const password = document.querySelector("#signUpPass").value;
  const ripPassword = document.querySelector("#signUpRepPass").value;
  const nome = document.querySelector("#signUpName").value;

  // check nome
  if (!nome) return (signUp.textContent = "Il nome non è valido");
  //   check password
  if (password !== ripPassword || !password)
    return (signUp.textContent = "Le password non coincidono");

  //   fetch dati
  try {
    // manda dati
    const response = await fetch("http://localhost:3000/api/signup", {
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

// login
logInForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nome = document.querySelector("#logInName").value;
  const password = document.querySelector("#logInPass").value;

  // fetch dati
  try {
    // manda dati
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, password }),
    });
    const data = await response.json();
    logIn.textContent = data.msg;

    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    return window.location.assign("./home.html");
  } catch (err) {
    logIn.textContent = "C'è stato un errore riprova più tardi";
    throw err;
  }
});

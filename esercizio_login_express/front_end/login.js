const signUpForm = document.querySelector("#signUpForm");
const logInForm = document.querySelector("#logInForm");
const signUp = document.querySelector("#signUp");
const logIn = document.querySelector("#logIn");

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

// login
logInForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nome = document.querySelector("#logInName").value;
  const password = document.querySelector("#logInPass").value;

  // fetch dati
  try {
    // manda dati
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, password }),
    });
    const data = await response.json();
    logIn.textContent = data.msg;

    if (data.token) {
      console.log(data.token);
      localStorage.setItem("token", data.token);
    }
    return window.location.assign("./home.html");
  } catch (err) {
    logIn.textContent = "C'è stato un errore riprova più tardi";
    throw err;
  }
});

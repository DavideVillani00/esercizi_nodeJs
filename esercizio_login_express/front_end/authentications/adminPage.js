document.addEventListener("authReady", () => {
  const ruoloUtente = sessionStorage.getItem("ruoloUtente");
  if (ruoloUtente === "admin") {
    const adminObj = document.querySelectorAll(".adminObj");
    console.log(adminObj);
    adminObj.forEach((el) => {
      el.style.display = "inline-block";
    });
  }
});

// Récupération de la saisie login
let login = document.querySelector("#email");
let password = document.querySelector("#password");
let loginForm = document.querySelector(".form-login");

loginForm.addEventListener("submit", (event) => {

    event.preventDefault(); // Empêche le rechargement de la page
    login = document.querySelector("#email");
    password = document.querySelector("#password");

    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email: login.value, password: password.value})
    })
    .then(reponse => {
        if (reponse.ok) {
            return reponse.json();
        } else {
            throw new Error("Erreur dans l’identifiant ou le mot de passe");
        }
    })
    .then(data => {
        sessionStorage.setItem("token", data.token);
        window.location.href = "index.html";
    })
    .catch(error => {
        // Afficher un message d'erreur à l'utilisateur
        const errorMessage = document.querySelector("#error-message");
        if (errorMessage) {
            errorMessage.textContent = error.message;
            errorMessage.style.display = "block";
        }
        console.error("Erreur:", error);
    })
});
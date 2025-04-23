// Appelle l'API pour récupérer les travaux
const reponse = await fetch('http://localhost:5678/api/works');

// Convertit la réponse en objet JavaScript
const travaux = await reponse.json();

// Lecture du token en localStorage
const valToken = sessionStorage.getItem("token");
console.log(valToken);

// Passage en mode edition si le token est présent
if (valToken) {
    console.log("mode edition activé");
    document.querySelector('.bandeau-edition').classList.add('edition');
    document.querySelector('.bandeau-normal').classList.add('edition');
    document.querySelector('.nav-login').classList.add('edition');
    document.querySelector('.nav-logout').classList.add('edition');
    document.querySelector('.modif-portfolio').classList.add('edition');
    document.querySelector('.categories').classList.add('edition');
}

// Deconnexion de l'utilisateur
document.querySelector(".nav-logout").addEventListener("click", () => {
    sessionStorage.removeItem("token");
    window.location.href = "index.html";
});

// Récupération de la section "gallery"
const sectionGallery = document.querySelector(".gallery");

// Récupération des catégories
const categories = travaux.map(travaux => travaux.category.name);

// Suppression des doublons
const categoriesSet = [...new Set(categories)];

// Affichage des filtres catégories en dynamique
for (let c = 0; c < categoriesSet.length; c++) {

    const sectionCategories = document.querySelector(".categories");
    const categoriesElement = document.createElement("label");
    const categoriesInput = document.createElement("input");
    categoriesInput.type = "radio";
    categoriesInput.name = "cat";
    categoriesInput.id = categoriesSet[c];
    categoriesInput.hidden = true;

    const span = document.createElement("span");
    span.className = "btn";
    span.textContent = categoriesSet[c];

    categoriesElement.appendChild(categoriesInput);
    categoriesElement.appendChild(span);
    sectionCategories.appendChild(categoriesElement);
}

// Récupération des boutons de filtre en dynamique
const boutonFiltrer = document.querySelectorAll("input[name='cat']");

// Afficher les travaux en dynamique
for (let i = 0; i < travaux.length; i++) {
    const travauxElement = travaux[i];
    
    // Création d’une balise dédiée à un travaux
    const travauxFigure = document.createElement("figure");
    travauxFigure.dataset.id = travaux[i].id;
    travauxFigure.dataset.cat = travaux[i].category.name;
    
    // Création des images
    const travauxImage = document.createElement("img");
    travauxImage.src = travauxElement.imageUrl;

    // Ajout de l'attribut alt
    const travauxAlt = document.createElement("figcaption");
    travauxAlt.innerText = travauxElement.title;

    // Ajout du code dans la section "gallery"
    sectionGallery.appendChild(travauxFigure);
    travauxFigure.appendChild(travauxImage);
    travauxFigure.appendChild(travauxAlt);
}

boutonFiltrer.forEach((bouton) => {
    bouton.addEventListener("change", () =>{
        if (bouton.id !== "tous") {
            for (let i = 0; i < travaux.length; i++) {
                const travauxElement = travaux[i];
                const travauxFigure = document.querySelector(`figure[data-id="${travauxElement.id}"]`);
                if (travauxElement.category.name === bouton.id) {
                    travauxFigure.style.display = "block";
                } else {
                    travauxFigure.style.display = "none";
                }
            }
        }   else {
            for (let i = 0; i < travaux.length; i++) {
                const travauxElement = travaux[i];
                const travauxFigure = document.querySelector(`figure[data-id="${travauxElement.id}"]`);
                travauxFigure.style.display = "block";
            }
        }
    }
    );
})
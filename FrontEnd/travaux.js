// Appelle l'API pour récupérer les travaux
const reponse = await fetch('http://localhost:5678/api/works');

// Convertit la réponse en objet JavaScript
const travaux = await reponse.json();

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

// Fonction de filtrage
let travauxFiltres = travaux;

boutonFiltrer.forEach((bouton) => {
    bouton.addEventListener("change", () =>{
        if (bouton.id !== "tous") {
            travauxFiltres = travaux.filter((travaux) => {
                return travaux.category.name === bouton.id;
            });
        } else {
            travauxFiltres = travaux;
            };
        console.log(travauxFiltres);
        
        // Réinitialiser la galerie
        sectionGallery.innerHTML = "";

        // Afficher les travaux en dynamique
        for (let i = 0; i < travauxFiltres.length; i++) {
            const travauxElement = travauxFiltres[i];
            
            // Création d’une balise dédiée à un travaux
            const travauxFigure = document.createElement("figure");
            travauxFigure.dataset.id = travauxFiltres[i].id;
            
            // Création des images
            const travauxImage = document.createElement("img");
            travauxImage.src = travauxElement.imageUrl;

            // Ajout de l'attribut alt
            const travauxAlt = document.createElement("figcaption");
            travauxAlt.innerText = travauxElement.title;

            // Mise à jour du code dans la section "gallery"
            sectionGallery.appendChild(travauxFigure);
            travauxFigure.appendChild(travauxImage);
            travauxFigure.appendChild(travauxAlt);
        }
        }
    )}
);


// Afficher les travaux en dynamique
for (let i = 0; i < travauxFiltres.length; i++) {
    const travauxElement = travauxFiltres[i];
    
    // Création d’une balise dédiée à un travaux
    const travauxFigure = document.createElement("figure");
    travauxFigure.dataset.id = travauxFiltres[i].id;
    
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


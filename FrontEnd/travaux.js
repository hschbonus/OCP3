// Appelle l'API pour récupérer les travaux
const reponse = await fetch('http://localhost:5678/api/works');

// Convertit la réponse en objet JavaScript
const travaux = await reponse.json();

// Récupération de la section "gallery"
const sectionGallery = document.querySelector(".gallery");

// Afficher les travaux provenant de l'API
for (let i = 0; i < travaux.length; i++) {
    const travauxElement = travaux[i];
    
    // Création d’une balise dédiée à un travaux
    const travauxFigure = document.createElement("figure");
    travauxFigure.dataset.id = travaux[i].id;
    
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


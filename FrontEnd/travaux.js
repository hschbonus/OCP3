// Appelle l'API pour récupérer les travaux
async function fetchTravaux() {
const reponse = await fetch('http://localhost:5678/api/works');

// Convertit la réponse en objet JavaScript
const travaux = await reponse.json();
console.log(travaux);

// Lecture du token en localStorage
const valToken = sessionStorage.getItem("token");

// Passage en mode edition si le token est présent
if (valToken) {
    console.log("mode edition activé");
    document.querySelector('.bandeau-edition').classList.add('edition');
    document.querySelector('.bandeau-normal').classList.add('edition');
    document.querySelector('.nav-login').classList.add('edition');
    document.querySelector('.nav-logout').classList.add('edition');
    document.querySelector('.open-modal').classList.add('edition');
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

// Récupération des Ids des catégories
const categoriesId = travaux.map(travaux => travaux.category.id);

// Suppression des doublons
const categoriesSet = [...new Set(categories)];
const categoriesIdSet = [...new Set(categoriesId)];

// Affichage des catégories en dynamique
for (let c = 0; c < categoriesSet.length; c++) {
    // Partie filtres
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

    // Partie ajout modale
    const categoriesModale = document.querySelector("#categorie");
    const optionCat = document.createElement("option");
    optionCat.value = categoriesIdSet[c];
    optionCat.textContent = categoriesSet[c];

    categoriesModale.appendChild(optionCat);

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

// Affichange des travaux dans la modale-galerie
for (let i = 0; i < travaux.length; i++) {
    const travauxElement = travaux[i];
    
    const modalFigure = document.createElement("figure");
    modalFigure.dataset.id = travaux[i].id;

    const btnFigure = document.createElement("button");
    btnFigure.className = "btn-supprimer";

    const modalImage = document.createElement("img");
    modalImage.src = travauxElement.imageUrl;

    // Ajout du code dans la modale
    const modalGalery = document.querySelector(".modale-travaux");
    modalGalery.appendChild(modalFigure);
    modalFigure.appendChild(modalImage);
    modalFigure.appendChild(btnFigure);
    btnFigure.innerHTML = `<i class="fa-solid fa-trash-can fa-2xs" style="color: #ffffff;"></i>`;
}

// Suppression d'une image
const supprimerTravaux = (e) => {
    e.preventDefault()
    const id = e.currentTarget.closest('figure').dataset.id
    fetch(`http://localhost:5678/api/works/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    })
    .then((response) => {
        console.log(response)

        if (response.ok) {
            const figure = e.currentTarget.closest('figure')
            figure.remove()
        } else {
            console.error('Erreur lors de la suppression du travail')
        }
    })
    .catch((error) => {
        console.error('Erreur lors de la suppression du travail:', error)
    })
}

document.querySelectorAll('.btn-supprimer').forEach(btn => {
    btn.addEventListener('click', supprimerTravaux)
})

// Valider l'ajout
const formAjout = document.querySelector(".ajout-photo");
const validerAJout = document.querySelector("#valider-ajout");
validerAJout.addEventListener("click", (e) => {
    
    console.log("Validation du formulaire ok")
    e.preventDefault();
    
    const form = document.querySelector(".ajout-photo");
    const formData = new FormData(form);
    
    for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
    }
    
    fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${sessionStorage.getItem('token')}`
        },
        body: formData
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Erreur lors de l'ajout du travail");
        }
    })
    .then(data => {
        console.log("Travail ajouté avec succès:", data);
    })
    .catch(error => {
        console.error("Erreur lors de l'ajout du travail:", error);
    })
})

} // } async function fetchTravaux() NE PAS SUPPRIMER

fetchTravaux().catch(error => {
    console.error("Erreur lors du chargement des travaux:", error);
  });



// Changement couleur du bouton "Valider"
const champs = document.querySelectorAll('.input-photo-zone img, #titre, #categorie');

champs.forEach(champ => {
    champ.addEventListener('change', () => {
        if (document.querySelector('.input-photo-zone img') &&
            document.querySelector('#titre').value.trim() !== '' &&
            document.querySelector('#categorie').value !== '0') {
            document.getElementById('valider-ajout').classList.add('validok');
            console.log("ok");
        } else {
            document.getElementById('valider-ajout').classList.remove('validok');
            console.log("pas ok");
        }
    });
})

let modal = null;

let input = document.querySelector('#image');

input.addEventListener('change', (e) => {
    console.log(e.target.files[0]);
    
    // Cacher le contenu de input zone
    const inputZoneImage = document.querySelector('#input_icon');
    const inputZoneLabel = document.querySelector('.custom-label');
    // const inputZoneInput = document.querySelector('.hidden-input');
    const inputZoneP = document.querySelector('#input_p');
    inputZoneImage.style.display = 'none';
    inputZoneLabel.style.display = 'none';
    // inputZoneInput.style.display = 'none';
    inputZoneP.style.display = 'none';
    
    const inputZone = document.querySelector('.input-photo-zone');
    const img = document.createElement('img');
    img.setAttribute('src', URL.createObjectURL(e.target.files[0]));
    img.setAttribute('alt', 'Aperçu de l\'image');
    inputZone.appendChild(img);
});

const openModal = (e) => {
    e.preventDefault();

    if (modal !== null) {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        modal.removeAttribute('aria-modal');
        modal.removeEventListener('click', closeModal);
        modal.querySelector('.btn-fermer').removeEventListener('click', closeModal);
        modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation);
    }
    const target = document.querySelector(e.currentTarget.getAttribute('href'));
    target.style.display = null;
    target.removeAttribute('aria-hidden');
    target.setAttribute('aria-modal', 'true');
    modal = target;
    modal.addEventListener('click', closeModal);
    modal.querySelector('.btn-fermer').addEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);
    document.getElementById('valider-ajout').classList.remove('validok');

};

const closeModal = (e) => {
    if (modal === null) return;
    e.preventDefault();

    if (modal.contains(document.activeElement)) {
        document.activeElement.blur();
    }

    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
    modal.removeEventListener('click', closeModal);
    modal.querySelector('.btn-fermer').removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation);
    modal = null;

    // Réinitialiser la zone input si une image est présente SAVE
    
    const img = document.querySelector('.input-photo-zone img');
    if (img) {
        const inputZone = document.querySelector('.input-photo-zone');
        inputZone.innerHTML = `
            <i class="fa-regular fa-image fa-sm"></i>
            <label for="image" class="custom-label">
                + Ajouter photo
            </label>
            <input type="file" name="image" id="image" class="hidden-input">
            <p>jpg, png : 4mo max</p>
        `;

        input = document.querySelector('#image');
        input.value = "";

        input.addEventListener('change', (e) => {
            const inputZone = document.querySelector('.input-photo-zone');
            inputZone.innerHTML = '';
            const img = document.createElement('img');
            img.setAttribute('src', URL.createObjectURL(e.target.files[0]));
            img.setAttribute('alt', 'Aperçu de l\'image');
            inputZone.appendChild(img);
        });
    }

    const inputZoneImage = document.querySelector('#image');
    const formTitle = document.querySelector('#titre');
    const formCategory = document.querySelector('#categorie');
    inputZoneImage.value = "";
    formTitle.value = "";
    formCategory.value = "0";


};

const stopPropagation = (e) => {
    e.stopPropagation();
};

document.querySelectorAll('.open-modal').forEach(a => {
    a.addEventListener('click', openModal);
});


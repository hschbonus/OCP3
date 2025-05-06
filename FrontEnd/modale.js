
let modal = null;

let input = document.querySelector('#image');

const inputZoneImage = document.querySelector('#input_icon');
const inputZoneLabel = document.querySelector('.custom-label');
const inputZoneP = document.querySelector('#input_p');
const form = document.querySelector(".ajout-photo");


const resetInputZone = () => {
    inputZoneImage.style.display = 'block';
    inputZoneLabel.style.display = 'flex';
    inputZoneP.style.display = 'block';

    input = document.querySelector('#image');
    input.value = "";

    const img = document.querySelector('.input-photo-zone img');
    if (img) {
        img.remove();
    }
};

const afficherPreview = () => {
    input.addEventListener('change', (e) => {
        console.log(e.target.files[0]);
        
        // Cacher le contenu de input zone
        inputZoneImage.style.display = 'none';
        inputZoneLabel.style.display = 'none';
        inputZoneP.style.display = 'none';
        
        const inputZone = document.querySelector('.input-photo-zone');
        const img = document.createElement('img');
        img.setAttribute('src', URL.createObjectURL(e.target.files[0]));
        img.setAttribute('alt', 'Aperçu de l\'image');
        inputZone.appendChild(img);
    });
};

// INITIALISATION
afficherPreview();

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
    document.getElementById("ok-message-ajout").classList.remove('block');
    document.getElementById("error-message-ajout").classList.remove('block');
    resetInputZone();
    form.reset();

};

const stopPropagation = (e) => {
    e.stopPropagation();
};

document.querySelectorAll('.open-modal').forEach(a => {
    a.addEventListener('click', openModal);
});

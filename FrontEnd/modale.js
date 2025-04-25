let modal = null;

const openModal = (e) => {
    e.preventDefault();
    if (modal !== null) {
        modal.style.display = 'none'
        modal.setAttribute('aria-hidden', 'true')
        modal.removeAttribute('aria-modal')
        modal.removeEventListener('click', closeModal)
        modal.querySelector('.btn-fermer').removeEventListener('click', closeModal)
        modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
    }
    const target = document.querySelector(e.currentTarget.getAttribute('href'));
    target.style.display = null
    target.removeAttribute('aria-hidden')
    target.setAttribute('aria-modal', 'true')
    modal = target
    modal.addEventListener('click', closeModal)
    modal.querySelector('.btn-fermer').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
    console.log(modal)
}

const closeModal = (e) => {
    if (modal === null ) return
    e.preventDefault();
    modal.style.display = 'none'
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.btn-fermer').removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
    modal = null
    console.log(modal)
}

const stopPropagation = (e) => {
    e.stopPropagation()
}

document.querySelectorAll('.open-modal').forEach(a => {
    a.addEventListener('click', openModal)

})

// let modal = null;

// const openModal = (e) => {
//     e.preventDefault();
//     modal.style.display = 'none'
//     modal.setAttribute('aria-hidden', 'true')
//     modal.removeAttribute('aria-modal')
//     modal.removeEventListener('click', closeModal)
//     modal.querySelector('.btn-fermer').removeEventListener('click', closeModal)
//     modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
//     const target = document.querySelector(e.currentTarget.getAttribute('href'));
//     target.style.display = null
//     target.removeAttribute('aria-hidden')
//     target.setAttribute('aria-modal', 'true')
//     modal = target
//     modal.addEventListener('click', closeModal)
//     modal.querySelector('.btn-fermer').addEventListener('click', closeModal)
//     modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
//     console.log(modal)
// }

// const closeModal = (e) => {
//     if (modal === null ) return
//     e.preventDefault();
//     modal.style.display = 'none'
//     modal.setAttribute('aria-hidden', 'true')
//     modal.removeAttribute('aria-modal')
//     modal.removeEventListener('click', closeModal)
//     modal.querySelector('.btn-fermer').removeEventListener('click', closeModal)
//     modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
//     modal = null
//     console.log(modal)
// }

// const stopPropagation = (e) => {
//     e.stopPropagation()
// }

// document.querySelectorAll('.open-modal .open-modal').forEach(a => {
//     a.addEventListener('click', openModal)

// })
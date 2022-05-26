
// --------------------------------------------------------------------------------------------------------------------------
/* Переключающиеся блоки */

const fondButton = document.querySelector('.fond-button');
const mass_mediaButton = document.querySelector('.mass_media-button');

const blockFond = document.querySelector('.block-fond');
const blockMass_media = document.querySelector('.block-mass_media');

// Вешаем обработчик
fondButton.addEventListener("click", showInstruction);
mass_mediaButton.addEventListener("click", showApplication);

window.showInstruction();

function showInstruction() {
    console.log('Hello_1');
    blockMass_media.classList.add('inactive');
    blockFond.classList.remove('inactive');
    fondButton.classList.add('active-button');
    mass_mediaButton.classList.remove('active-button');
    // отключаем прослушку, чтобы не напрягать браузер тем, что несколько кликов будет по кнопке
    fondButton.removeEventListener("click", showInstruction);
    mass_mediaButton.addEventListener("click", showApplication);
}

function showApplication() {
    console.log('Hello_2');
    blockFond.classList.add('inactive');
    blockMass_media.classList.remove('inactive');
    mass_mediaButton.classList.add('active-button');
    fondButton.classList.remove('active-button');
    // отключаем прослушку, чтобы не напрягать браузер тем, что несколько кликов будет по кнопке
    mass_mediaButton.removeEventListener("click", showApplication);
    fondButton.addEventListener("click", showInstruction);
}




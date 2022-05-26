
// --------------------------------------------------------------------------------------------------------------------------
/* Вывод картинки в ячейку без отправки на сервер */
/*FReader_1 = new FileReader();
FReader_2 = new FileReader();
FReader_3 = new FileReader();

// событие, когда файл загрузится
FReader_1.onload = function(e) {
    document.querySelector("#result_1").src = e.target.result;
};
FReader_2.onload = function(e) {
    document.querySelector("#result_2").src = e.target.result;
};
FReader_3.onload = function(e) {
    document.querySelector("#result_3").src = e.target.result;
};

// выполнение функции при выборки файла
document.querySelector(".child-frame-1").addEventListener("change", loadImageFile_1);
document.querySelector(".child-frame-2").addEventListener("change", loadImageFile_2);
document.querySelector(".child-frame-3").addEventListener("change", loadImageFile_3);

// функция выборки файла
function loadImageFile_1() {
    var file = document.querySelector(".child-frame-1").files[0];
    FReader_1.readAsDataURL(file);
}
function loadImageFile_2() {
    var file = document.querySelector(".child-frame-2").files[0];
    FReader_2.readAsDataURL(file);
}
function loadImageFile_3() {
    var file = document.querySelector(".child-frame-3").files[0];
    FReader_3.readAsDataURL(file);
}*/
// --------------------------------------------------------------------------------------------------------------------------
/* Переключающиеся блоки */

const instructionButton = document.querySelector('.instruction-button');
const applicationButton = document.querySelector('.application-button');

const blockInstruction = document.querySelector('.block-instruction');
const blockApplication = document.querySelector('.form-application');

// Вешаем обработчик
instructionButton.addEventListener("click", showInstruction);
applicationButton.addEventListener("click", showApplication);

window.showInstruction();

function showInstruction() {
    // console.log('Hello_1');
    blockApplication.classList.add('inactive');
    blockInstruction.classList.remove('inactive');
    instructionButton.classList.add('active-button');
    applicationButton.classList.remove('active-button');
    // отключаем прослушку, чтобы не напрягать браузер тем, что несколько кликов будет по кнопке
    instructionButton.removeEventListener("click", showInstruction);
    applicationButton.addEventListener("click", showApplication);
}

function showApplication() {
    // console.log('Hello_2');
    blockInstruction.classList.add('inactive');
    blockApplication.classList.remove('inactive');
    applicationButton.classList.add('active-button');
    instructionButton.classList.remove('active-button');
    // отключаем прослушку, чтобы не напрягать браузер тем, что несколько кликов будет по кнопке
    applicationButton.removeEventListener("click", showApplication);
    instructionButton.addEventListener("click", showInstruction);
}

// ---------------------------------------------------------------------------------------------
/* Для вывода/удаления добавленных файлов */
// $(function(){
//     let inputFile = $('#child_bill');
//     let button = $('#result_1');
//     let filesContainer = $('#result-files_1');
//     let files = [];

//     inputFile.change(function() {
//         let newFiles = []; 
//         for(let index = 0; index < inputFile[0].files.length; index++) {
//             let file = inputFile[0].files[index];
//             newFiles.push(file);
//             files.push(file);
//         }

//         newFiles.forEach(file => {
//             let fileElement = $(`<b>${file.name}</b>`);
//             fileElement.data('fileData', file);
//             filesContainer.append(fileElement);

//             fileElement.click(function(event) {
//                 let fileElement = $(event.target);
//                 let indexToRemove = files.indexOf(fileElement.data('fileData'));
//                 fileElement.remove();
//                 files.splice(indexToRemove, 1);
//                 // чтобы при клике на файл не вызывалось добавление нового файла
//                 event.preventDefault();
//             });
//         });
//     });

//     button.click(function() {
//         inputFile.click();
//     });
// });

// Files for child_bill
let childFilesInput_1 = document.getElementById('child_bill');
let childResultInput_1 = document.getElementById('result-files_1');

let allInputFiles_1 = [];

childFilesInput_1.addEventListener('change', addLogoInput_1);

function addLogoInput_1() {
    let chosenFiles = [];
    for(let index = 0; index < childFilesInput_1.files.length; index++) {
        let file = childFilesInput_1.files[index];
        chosenFiles.push(file);
        allInputFiles_1.push(file);
    }
    for(let index = 0; index < chosenFiles.length; index++) {
        let fileElement = `<b class="result-file-1">${chosenFiles[index].name}</b>`;
        childResultInput_1.insertAdjacentHTML(
            'beforeend',
            fileElement
        );
    }

    let newCollection = document.querySelectorAll('.result-file-1');
    for (node of newCollection) {
        node.addEventListener('click', function(event) {
            let clickFile = event.target;
            clickFile.remove();
            event.preventDefault();
        })
    }
}

// Files for child_illness-histor
let childFilesInput_2 = document.getElementById('child_illness-history');
let childResultInput_2 = document.getElementById('result-files_2');

let allInputFiles_2 = [];

childFilesInput_2.addEventListener('change', addLogoInput_2);

function addLogoInput_2() {
    let chosenFiles = [];
    for(let index = 0; index < childFilesInput_2.files.length; index++) {
        let file = childFilesInput_2.files[index];
        chosenFiles.push(file);
        allInputFiles_2.push(file);
    }
    for(let index = 0; index < chosenFiles.length; index++) {
        let fileElement = `<b class="result-file-2">${chosenFiles[index].name}</b>`;
        childResultInput_2.insertAdjacentHTML(
            'beforeend',
            fileElement
        );
    }

    let newCollection = document.querySelectorAll('.result-file-2');
    for (node of newCollection) {
        node.addEventListener('click', function(event) {
            let clickFile = event.target;
            clickFile.remove();
            event.preventDefault();
        })
    }
}

// Files for child_fotos
let childFilesInput_3 = document.getElementById('child_fotos');
let childResultInput_3 = document.getElementById('result-files_3');

let allInputFiles_3 = [];

childFilesInput_3.addEventListener('change', addLogoInput_3);

function addLogoInput_3() {
    let chosenFiles = [];
    for(let index = 0; index < childFilesInput_3.files.length; index++) {
        let file = childFilesInput_3.files[index];
        chosenFiles.push(file);
        allInputFiles_3.push(file);
    }
    for(let index = 0; index < chosenFiles.length; index++) {
        let fileElement = `<b class="result-file-3">${chosenFiles[index].name}</b>`;
        childResultInput_3.insertAdjacentHTML(
            'beforeend',
            fileElement
        );
    }

    let newCollection = document.querySelectorAll('.result-file-3');
    for (node of newCollection) {
        node.addEventListener('click', function(event) {
            let clickFile = event.target;
            clickFile.remove();
            event.preventDefault();
        })
    }
}

// Files for child_appointment
let childFilesInput_4 = document.getElementById('child_appointment');
let childResultInput_4 = document.getElementById('result-files_4');

let allInputFiles_4 = [];

childFilesInput_4.addEventListener('change', addLogoInput_4);

function addLogoInput_4() {
    let chosenFiles = [];
    for(let index = 0; index < childFilesInput_4.files.length; index++) {
        let file = childFilesInput_4.files[index];
        chosenFiles.push(file);
        allInputFiles_4.push(file);
    }
    for(let index = 0; index < chosenFiles.length; index++) {
        let fileElement = `<b class="result-file-4">${chosenFiles[index].name}</b>`;
        childResultInput_4.insertAdjacentHTML(
            'beforeend',
            fileElement
        );
    }

    let newCollection = document.querySelectorAll('.result-file-4');
    for (node of newCollection) {
        node.addEventListener('click', function(event) {
            let clickFile = event.target;
            clickFile.remove();
            event.preventDefault();
        })
    }
}

// продумать как их все свести в одну функцию
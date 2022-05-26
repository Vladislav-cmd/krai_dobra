// --------------------------------------------------------------------------------------------------------------------------
/* Переключающиеся блоки */
// нужно будет продумать, как все делать через цикл (пока времени не было)
// либо навешивать на всех одинаковые теги или класс и включать только тот, на который нажал через проверку closest
const onlineButton = document.querySelector('.online-button');
const smsButton = document.querySelector('.sms-button');
const bankButton = document.querySelector('.bank-button');
const qrButton = document.querySelector('.qr-button');

const block_ONLINE = document.querySelector('.donation__online');
const block_SMS = document.querySelector('.donation__sms');
const block_BANK = document.querySelector('.donation__bank');
const block_QR = document.querySelector('.donation__qr');

onlineButton.addEventListener("click", showBlock_ONLINE);
smsButton.addEventListener("click", showBlock_SMS);
bankButton.addEventListener("click", showBlock_BANK);
qrButton.addEventListener("click", showBlock_QR);

// первоначальное окно
window.showBlock_ONLINE();

function showBlock_ONLINE() {
    // console.log('online');
    block_ONLINE.classList.remove('inactive');
    block_SMS.classList.add('inactive');
    block_BANK.classList.add('inactive');
    block_QR.classList.add('inactive');
    onlineButton.classList.add('active-button');
    smsButton.classList.remove('active-button');
    bankButton.classList.remove('active-button');
    qrButton.classList.remove('active-button');

    // отключаем прослушку, чтобы не напрягать браузер тем, что несколько кликов будет по кнопке
    onlineButton.removeEventListener("click", showBlock_ONLINE);
    smsButton.addEventListener("click", showBlock_SMS);
    bankButton.addEventListener("click", showBlock_BANK);
    qrButton.addEventListener("click", showBlock_QR);
}

function showBlock_SMS() {
    // console.log('sms');
    block_SMS.classList.remove('inactive');
    block_ONLINE.classList.add('inactive');
    block_BANK.classList.add('inactive');
    block_QR.classList.add('inactive');
    smsButton.classList.add('active-button');
    onlineButton.classList.remove('active-button');
    bankButton.classList.remove('active-button');
    qrButton.classList.remove('active-button');

    onlineButton.addEventListener("click", showBlock_ONLINE);
    smsButton.removeEventListener("click", showBlock_SMS);
    bankButton.addEventListener("click", showBlock_BANK);
    qrButton.addEventListener("click", showBlock_QR);
}

function showBlock_BANK() {
    // console.log('bank');
    block_BANK.classList.remove('inactive');
    block_ONLINE.classList.add('inactive');
    block_SMS.classList.add('inactive');
    block_QR.classList.add('inactive');
    bankButton.classList.add('active-button');
    onlineButton.classList.remove('active-button');
    smsButton.classList.remove('active-button');
    qrButton.classList.remove('active-button');

    onlineButton.addEventListener("click", showBlock_ONLINE);
    smsButton.addEventListener("click", showBlock_SMS);
    bankButton.removeEventListener("click", showBlock_BANK);
    qrButton.addEventListener("click", showBlock_QR);
}

function showBlock_QR() {
    // console.log('qr');
    block_QR.classList.remove('inactive');
    block_ONLINE.classList.add('inactive');
    block_SMS.classList.add('inactive');
    block_BANK.classList.add('inactive');
    qrButton.classList.add('active-button');
    onlineButton.classList.remove('active-button');
    smsButton.classList.remove('active-button');
    bankButton.classList.remove('active-button');

    onlineButton.addEventListener("click", showBlock_ONLINE);
    smsButton.addEventListener("click", showBlock_SMS);
    bankButton.addEventListener("click", showBlock_BANK);
    qrButton.removeEventListener("click", showBlock_QR);
}


// нужно через target сделать и через closest
// const testbutton = document.querySelectorAll('.online__method-radio');

// --------------------------------------------------------------------------------------------------------------------------

// Радио кнопки
const summValue = document.querySelectorAll('.online__summ-radio');
// Кнопка ввода другого значения
const anotherValue = document.querySelector('.online__summ-another-value');
// Результат выбора/ввода
const donationSumm = document.querySelector('.online__result-value');


// RADIO VALUE
for (let index = 0; index < summValue.length; index++) {
    const separateButton = summValue[index];
    separateButton.addEventListener('click', function(e) {
        // возвращаем фокус при выборе
        separateButton.classList.add('active-radio');
        // возвращаем тип radio для выбора и отправки именно выбранного значения
        separateButton.setAttribute('type', 'radio');
        const buttonValue = separateButton.value;
        showValue(buttonValue);
        // обнуляем кнопку
        anotherValue.classList.remove('active-another-value');
        anotherValue.value = '';
    });
}

// ANOTHER VALUE
anotherValue.addEventListener('input', function(e) {
    anotherValue.classList.add('active-another-value');
    for (let index = 0; index < summValue.length; index++) {
        const separateButton = summValue[index];
        // убираем фокус со всех кнопок radio
        separateButton.classList.remove('active-radio');
        // чтобы не передавать их значение, когда вводим в "другая сумма" (убираем тип выбора)
        separateButton.setAttribute('type', '');
        // console.log(separateButton.type);
    }
    let currentValue = anotherValue.value;
    // проверка на то, число ли это и не пустое ли значение
    if (isNaN(currentValue) === false && currentValue != '') {
        showValue(anotherValue.value);
    } else {
        donationSumm.value = '';
    }
});

function showValue(summ) {
    if (summ.length >= 10) {
        donationSumm.value = summ + ' ₽';
    } else {
        donationSumm.value = summ + ' рублей';
    }
}  
// --------------------------------------------------------------------------------------------------------------------------
/* Другие варианты оплаты (расширение кнопки) */
const anotherMethodButton = document.querySelector('.online__method-more');
const moreButtons = document.querySelectorAll('.online__method-another');

anotherMethodButton.addEventListener("click", showButtons);

function showButtons() {
    anotherMethodButton.classList.add('inactive');
    for (let i = 0; i < moreButtons.length; i++) {
        moreButtons[i].classList.remove('inactive');
    }
    anotherMethodButton.removeEventListener("click", showButtons);
}
// --------------------------------------------------------------------------------------------------------------------------
/* Scroll To Block */
const srcollButton = document.querySelector('.statistic__result-help-baby');

srcollButton.addEventListener('click', setScrollIntoView);

function setScrollIntoView() {
    const donationBlock = document.querySelector('.donation__navigation');
    donationBlock.scrollIntoView({behavior: "smooth"});
}
// --------------------------------------------------------------------------------------------------------------------------
/* Высчитывание процента сбора средств */

const requiredSumm = document.getElementById('requiredSumm').textContent;
// console.log('1 - ', requiredSumm); // 1 -  1.834 000 ₽
const requiredSummNum = requiredSumm.replace(/[^0-9, ]/g,"").replace(/[ ]/g,"");
// console.log('2 - ', requiredSummNum); // 2 -  1834000

const remainingSumm = document.getElementById('remainingSumm').textContent;
// console.log('1 - ', remainingSumm); // 1 -  434 000 ₽
const remainingSummNum = remainingSumm.replace(/[^0-9, ]/g,"").replace(/[ ]/g,"");
// console.log('2 - ', remainingSummNum); // 2 -  434000

// toFixed(n) возвращает число с указание числа значений после запятой

// Функция подсчета
function calculatePercent(num1, num2) {
    const percentField = document.querySelector('.statistic__result-percent');
    result = 100 - ((num2 * 100) / num1);

    // Обращаемся к функции заполнения круга
    fillCircleColor(result.toFixed());

    // console.log(result);
    if (result >= 0 && result < 1) {
        percentField.innerHTML = result.toFixed(1) + '%';
    } else if (result >= 1 && result <= 99) {
        percentField.innerHTML = result.toFixed() + '%';
    } else if (result > 99 && result <= 99.9) {
        percentField.innerHTML = result.toFixed(1) + '%';
    } else if (result >= 99.9 && result != 100) {
        percentField.innerHTML = 99.9 + '%';
    } else {
        percentField.innerHTML = 100 + '%';
    }
}

// Функция заполнения диаграммы
function fillCircleColor(percent) {
    // console.log(percent);
    const fillDiagramm = document.querySelector('.statistic__result-progress');
    // console.log(fillDiagramm);
    let currentFillValue = fillDiagramm.style.setProperty('--p', percent);
}
// Вызов функции подсчета и передача значений
let percent = calculatePercent(requiredSummNum, remainingSummNum);

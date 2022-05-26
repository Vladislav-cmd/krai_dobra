
var selectField = document.querySelectorAll('.js__selection-field');
var selectItem = document.querySelectorAll('.select__field-item');

var selectArrow_1 = document.querySelectorAll('.current-value__arrow-1');
// var selectArrow_1 = document.querySelector('.current-value__arrow-1');
// var selectArrow_2 = document.querySelector('.current-value__arrow-2');
var selectFieldAll = document.querySelectorAll('.select__field');


document.addEventListener('click', function(event) {
	if (!event.target.closest('.select__field')) {
		selectClose();
	}
})
// Дополнительный обработчик для сброса "select"
document.getElementById('filter_reset').addEventListener('click', function() {
	var currentResetValue = document.querySelectorAll('.value__select-current');
	currentResetValue.forEach(item => {
		item.innerText = 'Не выбрано';
	});
})

selectField.forEach(item => {
	item.addEventListener('click', selectToggle);
});

selectItem.forEach(item => {
	item.addEventListener('click', selectChoose);
});

// Функция сокрытия при клике вне select
function selectClose() {
	selectFieldAll.forEach(item => {
		item.classList.remove('is-active');
	});

	selectArrow_1.forEach(item => {
		item.classList.remove('drop-down');
	});
	// selectArrow_1.classList.remove('drop-down');
	// selectArrow_2.classList.remove('drop-down');
}

function selectToggle(event) {
	// ищем родительский элемент и при клике убираем/добавляем класс
	this.parentElement.classList.toggle('is-active');

	// if (event.target.closest('.select__field-value-1')) {
	// 	selectArrow_1.classList.toggle('drop-down');
	// } if (event.target.closest('.select__field-value-2')) {
	// 	selectArrow_2.classList.toggle('drop-down');
	// }

	let arrowVariable = this.querySelector('.current-value__arrow-1');
	arrowVariable.classList.toggle('drop-down');
}

function selectChoose(event) {
	// Записываем то значение, на которое кликнули
	var text = this.innerText;
	// указываем ближайшего родителя, до которого поднимаемся
	// и потом надо найти класс value__select-current
	var currentText = this.closest('.select__field').querySelector('.value__select-current')
	// Заменяем значение на то, на которое кликнули
	currentText.innerText = text;
	// чтобы при выборе закрывалось выпадающее поле
	let select = this.closest('.select__field');
	// тогда, когда перезаписали значение, то убираем класс
	select.classList.remove('is-active');

	select.querySelector('.current-value__arrow-1').classList.remove('drop-down');
	// if (event.target.closest('.select__field-items-1')) {
	// 	selectArrow_1.classList.remove('drop-down');
	// } if (event.target.closest('.select__field-items-2')) {
	// 	selectArrow_2.classList.remove('drop-down');
	// }
}


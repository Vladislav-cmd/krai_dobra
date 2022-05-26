// --------------------------------------------------------------------------------------------------------------------------

/* Ползунок */
// При запуске сразу запускать функции чтобы запустились и вывели верное значение
window.onload = function() {
	slideOne();
	slideTwo();
}
let currentWidthOnload = window.innerWidth;

let sliderOne = document.getElementById("slider-1");
let sliderTwo = document.getElementById("slider-2");

// Дефолтные value для сброса
let resetSliderOneDefault = document.getElementById("slider-1").value;
let resetSliderTwoDefault = document.getElementById("slider-2").value;

let displayValOne = document.getElementById("range_1");
let displayValTwo = document.getElementById("range_2");

let minGap = 1; // минимальное расстояние между двумя кнопками

let sliderTrack = document.getElementById("slider-track");
var sliderMaxValue = document.getElementById("slider-1").max;
var sliderMinValue = document.getElementById("slider-1").min;


function slideOne() {
	// для того, чтобы один ползунок не пересекал другой
	if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
		sliderOne.value = parseInt(sliderTwo.value) - minGap;
	}
	// Вывод значения сверху для левого
	displayValOne.textContent = sliderOne.value;
	fillColor(); 
}

function slideTwo() {
	// для того, чтобы один ползунок не пересекал другой
	if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
		sliderTwo.value = parseInt(sliderOne.value) + minGap;
	}
	// Вывод значения сверху для правого
	displayValTwo.textContent = sliderTwo.value;
	fillColor();
}
// теперь они при сравнении не двигаются далее

// Величина слайдера при разных min max
var sliderRangeValue = sliderMaxValue - sliderMinValue;
// console.log(sliderRangeValue);
// Коэффициент смещения при разных min max
var biasFactor = 100 * sliderMinValue / sliderRangeValue;
// console.log(biasFactor);


function fillColor() {
	// вычисляем процентную ширину ползунка
	percent1 = (sliderOne.value / sliderRangeValue) * 100 - biasFactor;
	percent2 = (sliderTwo.value / sliderRangeValue) * 100 - biasFactor;
	// выполнять перезапись/определение глобальной переменной при вызове функции
	currentWidthOnload = window.innerWidth;
	if (currentWidthOnload <= 776) {
		sliderTrack.style.background = `linear-gradient(to right, rgba(255, 255, 255, 0.5) ${percent1}%, #ffffff ${percent1}%, #ffffff ${percent2}%, rgba(255, 255, 255, 0.5) ${percent2}%)`;
	} else {
		sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}%, #FF6060 ${percent1}%, #FF689F ${percent2}%, #dadae5 ${percent2}%)`;
	}

	// обработчик вывода текущего значения ширины при изменении ширины дисплея
	window.addEventListener('resize', windowWidth);
	function windowWidth() {
		let currentWidth = window.innerWidth;
		if (currentWidth <= 776) {
			sliderTrack.style.background = `linear-gradient(to right, rgba(255, 255, 255, 0.5) ${percent1}%, #ffffff ${percent1}%, #ffffff ${percent2}%, rgba(255, 255, 255, 0.5) ${percent2}%)`;
		} else {
			sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}%, #FF6060 ${percent1}%, #FF689F ${percent2}%, #dadae5 ${percent2}%)`;
		}	
	}
}

// чтобы при клике по кнопкам также запускалась функция, определяющая ширину экрана и выводила корректное заполнение
sliderOne.addEventListener('mouseup', fillColor());

document.getElementById('filter_reset').addEventListener('click', function() {
    slideOne();
    slideTwo();
})

// Для сброса фильтра нужно дать обработчки для ползунка
const filter = document.getElementById('filter_reset');
filter.addEventListener("click", function() {
	displayValOne.innerHTML = `${resetSliderOneDefault}`;
	displayValTwo.innerHTML = `${resetSliderTwoDefault}`;
	percent1 = (resetSliderOneDefault / sliderRangeValue) * 100 - biasFactor;
	percent2 = (resetSliderTwoDefault / sliderRangeValue) * 100 - biasFactor;
	// выполнять перезапись/определение глобальной переменной при вызове функции
	currentWidthOnload = window.innerWidth;
	if (currentWidthOnload <= 776) {
		sliderTrack.style.background = `linear-gradient(to right, rgba(255, 255, 255, 0.5) ${percent1}%, #ffffff ${percent1}%, #ffffff ${percent2}%, rgba(255, 255, 255, 0.5) ${percent2}%)`;
	} else {
		sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}%, #FF6060 ${percent1}%, #FF689F ${percent2}%, #dadae5 ${percent2}%)`;
	}
});

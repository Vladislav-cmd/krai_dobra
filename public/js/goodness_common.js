// -------------------------------------------------------------------------------------------
// Для меню бургер
// $(document).ready(function() {
// 	$('.header__burger-button').click(function(event) {
// 		// при клике на бургер блокам добавить/удалить класс active
// 		$('.header__burger-button,.header__menu').toggleClass('active');
// 		// два toggle для плашки (когда она изначально не фиксирована)
// 		$('.header').toggleClass('header-active');
// 		$('.main').toggleClass('main-active-burger');
// 		// Убираем прокрутку случайную при активном бургере
// 		$('body').toggleClass('lock');
// 	});
// });

// Для меню бургер (выполнение фиксации, так как на IOS не работает свойство overflow: hidden)
let mainBurgerButton = document.querySelector('.header__burger-button');
let mainBurgerMenu = document.querySelector('.header__menu');
let mainBurgerHeader = document.querySelector('.header');
let mainBurgerMain = document.querySelector('.main');
let mainBody = document.querySelector('body');
	

mainBurgerButton.addEventListener('click', function() {
	var deviceHeight = body.clientHeight;
	var currentCoordValue = coordValuePopup()*(-1) + deviceHeight;

	mainBurgerButton.classList.toggle('active');
	mainBurgerMenu.classList.toggle('active');
	mainBurgerHeader.classList.toggle('header-active');
	mainBurgerMain.classList.toggle('main-active-burger');
	mainBody.classList.toggle('lock');

	mainBody.style.position = 'fixed';
	mainBody.style.top = currentCoordValue + 'px';
	if (!(mainBurgerButton.classList.contains('active'))) {
		mainBody.style.position = '';
		mainBody.style.top = '';
		window.scrollTo(0, (-currentCoordValue));
	}
})
// -------------------------------------------------------------------------------------------
/* Появление/скрытие плашки снизу при скролле */

// Получаем элемент Footer
const elementFooter = document.querySelector('.footer');
const main_bar = document.querySelector('.main__bar');

// Сама функция
var checkVisible = function(target, bar) {
	// Все позиции элемента
	var targetPosition = {
		top: window.pageYOffset + target.getBoundingClientRect().top,
		bottom: window.pageYOffset + target.getBoundingClientRect().bottom
		// при необходимости:
		// left: window.pageXOffset + target.getBoundingClientRect().left
		// right: window.pageXOffset + target.getBoundingClientRect().right 
	},
		// Получаем позиции окна
		windowPosition = {
			top: window.pageYOffset,
			bottom: window.pageYOffset + document.documentElement.clientHeight
			// при необходимости
			// left: window.pageXOffset,
			// right: window.pageXOffset + document.documentElement.clientWidth,
		};
	bar.classList.add('active__bar');

	if (targetPosition.bottom > windowPosition.top && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
		targetPosition.top < windowPosition.bottom) { // Если позиция верхней части элемента меньше позиции нижней чайти окна, то элемент виден снизу
		 // то запускаем следующий код:
		bar.classList.remove('active__bar');
	}
}

// Вызываем функцию при запуске скролла более, чем на 200px
window.addEventListener('scroll', function() {
	// получаем значение координаты прокрутки (функция есть ниже)
	let scrollValue = coordValuePopup() * (-1);
	let currentWidthOnload = window.innerWidth;
	let mainContent = document.querySelector('.main');
	let headerPage = document.querySelector('.header');
	// Для упрощенного меню при скроле
	let scrollMenu = document.querySelector('.header-scroll');

	// если больше 200px проскролили, то запускаем функцию
	if (scrollValue >= 200) {
		// передаем аргумент в функцию (target = elementFooter, который получили ранее)
		checkVisible(elementFooter, main_bar);
	} else {
		main_bar.classList.remove('active__bar');
	}

	// дописываю функционал для фиксации header при начале скролла (только для десктоп разработки)
	if (currentWidthOnload > 1146 && scrollValue >= 55) { // != 0 было раньше
		headerPage.classList.add('header-inactive-scroll');
		scrollMenu.classList.add('header-scroll__active-scroll');
		mainContent.style.margin = "110px 0 0 0";
	} else if (currentWidthOnload <= 1146) {
		scrollMenu.classList.remove('header-scroll__active-scroll');
		headerPage.classList.remove('header-inactive-scroll');
		// ставлю как было изначально для меньших десктопов, так как там проблема с прыгающей высотой
		mainContent.style.margin = "76px 0 0 0";
		headerPage.style.cssText = `
			position: fixed;
			left: 0;
			top: 0;
			z-index: 10000;
		`;
	} else {
		headerPage.classList.remove('header-inactive-scroll');
		scrollMenu.classList.remove('header-scroll__active-scroll');
		mainContent.style.margin = "0";
		headerPage.style.cssText = `
			position: inherit;
			left: inherit;
			top: inherit;
			z-index: inherit;
		`;
	}
});

// чтобы при изменении ширины динамически фиксировать header для бургера (иначе бургер будет работать только после выполнения скрола)
window.addEventListener('resize', windowHeader);
function windowHeader() {
    let currentWidthOnload = window.innerWidth;
    let mainContent = document.querySelector('.main');
    let headerPage = document.querySelector('.header');
    let scrollMenu = document.querySelector('.header-scroll');
    let styleVariable = "110px 0 0 0";
    let headerHeight = "110px";
    if (currentWidthOnload <= 1146) {
    	headerPage.classList.remove('header-inactive-scroll');
    	scrollMenu.classList.remove('header-scroll__active-scroll');
		mainContent.style.margin = "76px 0 0 0";
		headerPage.style.cssText = `
			position: fixed;
			left: 0;
			top: 0;
			z-index: 10000;
		`;
    } 
    if (headerPage.style.height != headerHeight && currentWidthOnload > 1146) {
    	mainContent.style.margin = styleVariable;
		headerPage.style.cssText = `
			position: fixed;
			left: 0;
			top: 0;
			z-index: 10000;
		`;
    } 
}
// --------------------------------------------------------------------------------------------------------------------------

/* ПОПАПЫ */

// Получаю все объекты с классом popup__link
const popupLinks = document.querySelectorAll('.popup__link');
// Получаем тег body, чтобы блокировать скролл внутри него, когда вылезает попап
const body = document.querySelector('body');
// Получаем все объекты (навешиваю класс на теге header)
const lockPadding = document.querySelectorAll('.lock-padding');

// Данная переменная для того, чтобы не было двойных нажатий на попап, когда он ещё не закрылся/открылся
let unlock = true;

// Время анимации
const timeout = 800;

// Функция для определения координаты body при скролле к нужному попапу (для фиксации body на IOS)
function coordValuePopup() {
	const currentWindowCoord = body.getBoundingClientRect().top;
	return currentWindowCoord;
}

// Вешаем события на ссылки popup-link
// сперва делается проверка, есть ли они вообще 
if (popupLinks.length > 0) {
	// с помощью цикла все перебираем 
	for (let index = 0; index < popupLinks.length; index++) {
		// в переменную получаем каждую ссылку
		const popupLink = popupLinks[index];
		// навешиваем функцию при клике на каждую ссылку
		popupLink.addEventListener("click", function (e) {
			// в новую переменную получаем из ссылки атрибут
			// (#popup, например и убираем # и получаем чистое имя popup = название попапа)
			const popupName = popupLink.getAttribute('href').replace('#', '');
			// после получаем в переменную сам объект попапа, id=popup
			const currentPopup = document.getElementById(popupName);
			// полученный объект отправляется в функцию popupOpen (открытие попапа)
			popupOpen(currentPopup);
			// так как это ссылка, то этим свойством запрещаем перезагружать страницу
			e.preventDefault();
		});
	}
}

// Получаем объекты с таким классом
const popupCloseIcon = document.querySelectorAll('.close-popup');
// Проверка на наличие
if (popupCloseIcon.length > 0) {
	// перебор через цикл и выполнение кода ниже для каждого элемента
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		// нашевиваем обработчик и функцию
		el.addEventListener('click', function (e) {
			// в функцию popupClose отправляем объект, который является ближайшим родителем класса .popup
			// то есть скрипт пробежится вверх по дереву пока не найдет класс .popup - найдет и его будет закрывать
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

// Функция открытия попапа (получаем значение, которое передается выше)
function popupOpen(currentPopup) { // popup__partner
	// Проверяем, есть ли такой объект и открыта ли переменная unlock (вверху открыта = true)
	if (currentPopup && unlock) { // && = (и)
		// И после сразу закрываем открытый попап
		// получаем объект popup с классом open
		const popupActive = document.querySelector('.popup.open');
		// и если он существует
		if (popupActive) {
			// то отправляем в функцию и закрываем
			popupClose(popupActive, false);
		} else {
			// если такого нет, то мы блокируем скрол для body (через функцию bodyLock)
			bodyLock(coordValuePopup());
		}
		// После всей процедуры к нашему попапу добавляем класс open и он открывается (так в css сделано)
		currentPopup.classList.add('open');
		// навешиваем событие при клике
		currentPopup.addEventListener("click", function (e) {
			// если нету в родителях popup__content
			// то есть вне белой области, то есть если мы тыкнули куда-то, где нет родителя popup__content
			if (!e.target.closest('.popup__content')) {
				// то мы попап закроем
				popupClose(e.target.closest('.popup'));
			}
		});
	}
}

// Передаем активный объект | вторая переменная для того, если внутри попапа есть ещё попап и чтобы не нужно было опять скрывать скрол, когда уже скрыт
function popupClose(popupActive, doUnlock = true) {
	if (unlock) { // переменная в самом начале true
		// у активного убираем класс open
		popupActive.classList.remove('open');
		if (doUnlock) {
			bodyUnlock(); // вызываем функцию
		}
	}
}

function bodyLock(scrollValue) {
	// для того, чтобы скрывать скролл страницы это делается, чтобы не было небольшого смещения попапа на ширину полосы прокрутки
	// Расчитываем разницу между шириной окна и ширной объекта внутри него (чтобы получить ширину скрола)
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
	if (lockPadding.length > 0) {
		// lockPadding в самом начале получали объекты с классом lock-padding
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			// добавляем каждому отступ справа высчитанный выше
			el.style.paddingRight = lockPaddingValue;
		}
	}
	
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock'); // класс в css прописан

	// для блокировки скролла для IOS 
	body.style.position = 'fixed';
	body.style.top = scrollValue + 'px';
	
	// блокируем переменную
	unlock = false;
	// и через время анимации возвращаем в true, чтобы не было повторных нажатий на попап
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnlock() {
	// для разблокировки скролла для IOS
	let scrollCoord = coordValuePopup() * (-1);

	setTimeout(function () {
		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = '0px';
			}
		}
		
		body.style.paddingRight = '0px';
		body.classList.remove('lock');

		// для разблокировки скролла для IOS
		body.style.position = '';
		body.style.top = '';
		window.scrollTo(0, scrollCoord);
		
	}, timeout); // чтобы скрол появлялся только тогда, когда закончится анимация
	// блокируем переменную
	unlock = false;
	// и через время анимации возвращаем в true, чтобы не было повторных нажатий на попап
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

// Вообще необязательно, но пусть будет
document.addEventListener('keydown', function (e) {
	if (e.which === 27) { // код 27 = коду клавиши Esc
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});

// если будут какие-то проблемы с отображением/работой скрипта в Explorer 11, то надо добавить полифилы из его видео

// --------------------------------------------------------------------------------------------------------------------------
/* Слайдер SEPARATE-GALLERY*/
$(document).ready(function(){
	$('.separate__review-items').length && $('.separate__review-items').not('.slick-initialized').slick({
		arrows:true, // 1-ая опция для стрелок, по умолчанию true, но если нам стрелки не нужны, то ставим false
		dots:false, // 2-ая опция для точек управления, по умолчанию false (их отдельно нужно стилизовать)
		slidesToShow: 1,// 4-ая опция, кол-во слайдов, которое показывается за раз, по умолчанию 1
		slidesToScroll:1, // 5-ая опция, кол-во слайдо, которое будет прокручиваться при нажатии кнопки, по умолчанию 1
		speed:500, // 6-ая опция, скорость прокрутки слайдов, по умолчанию 300мс
		easing:'linear', // 7-ая опция, тип анимации
		infinite:true, // 8-ая опция, когда прокрутка достигает конца слайдов, то кнопка становится неактивна (добавляется класс slick-disabled)
		initialSlide:0, // 9-ая опция, стартовый слайд, по умолчанию 0
		autoplay:false, // 10-ая опция, автоматический проигрыш слайдов, по умолчанию false
		autoplaySpeed:10000, // 11-ая опция, определяет скорость автопроигрыша, по умолчанию 3000мс (хорошо сочетается для большого числа слайдов и когда infinite:true)
		pauseOnFocus:false, // 12-ая опция, пауза автопрокрутки при фокусе на слайдере
		pauseOnHover:false, // 13-ая опция пауза автопрокрутки при наведении на слайдере
		pauseOnDotsHover:true, // 14-ая опция пауза автопрокрутки при наведении на точки управления
		draggable:false, // 15-ая опция, включает свайп слайдов на ПК с помощью мыши (по умолчанию true), но на мобильных устройствах все будет работать
		swipe:false, // 16-ая опция, включает свайп слайдов на моб устройствах (по умолчанию true)
		waitForAnimate:true, // 19-ая опция, по умолчанию true, разрешает перелистывание ещё до того, как прогрузилась анимация прокрутки (ставим false)
		centerMode:true, // 20-ая опция, по умолчанию false (добавляет класс slick-center для главного слайда) ------------------------------------------------------------------------------------------ эти два сочетания и использовать в работе Base (true)
		variableWidth:true, // 21-ая опция, по умолчанию false, впихивает по ширине все слайды, обреза с краю, которые не вместились, хорошо работает с centerMode:true --------------------------------- эти два сочетания и использовать в работе Base (true)
		responsive:[ // 27-опция, которая позволяет при определенном breakpoint изменять свойства слайдера
			{ 
				breakpoint: 1147, // ширина окна
				settings: {
					slidesToShow: 1,
					variableWidth: false,
					centerMode: false,
					draggable: true,
					swipe: true,
					arrows: true,
					dots: true,
					slidesToScroll:1,
					infinite: false,
				}
			},
		],
	});
});
// --------------------------------------------------------------------------------------------------------------------------
/* Слайдер SEPARATE-GALLERY*/
$(document).ready(function(){
	$('.personal-gallery__items').length && $('.personal-gallery__items').not('.slick-initialized').slick({
		arrows:true, // 1-ая опция для стрелок, по умолчанию true, но если нам стрелки не нужны, то ставим false
		dots:false, // 2-ая опция для точек управления, по умолчанию false (их отдельно нужно стилизовать)
		slidesToShow: 2,// 4-ая опция, кол-во слайдов, которое показывается за раз, по умолчанию 1
		slidesToScroll:1, // 5-ая опция, кол-во слайдо, которое будет прокручиваться при нажатии кнопки, по умолчанию 1
		speed:500, // 6-ая опция, скорость прокрутки слайдов, по умолчанию 300мс
		easing:'linear', // 7-ая опция, тип анимации
		infinite:true, // 8-ая опция, когда прокрутка достигает конца слайдов, то кнопка становится неактивна (добавляется класс slick-disabled)
		initialSlide:0, // 9-ая опция, стартовый слайд, по умолчанию 0
		autoplay:false, // 10-ая опция, автоматический проигрыш слайдов, по умолчанию false
		autoplaySpeed:10000, // 11-ая опция, определяет скорость автопроигрыша, по умолчанию 3000мс (хорошо сочетается для большого числа слайдов и когда infinite:true)
		pauseOnFocus:false, // 12-ая опция, пауза автопрокрутки при фокусе на слайдере
		pauseOnHover:false, // 13-ая опция пауза автопрокрутки при наведении на слайдере
		pauseOnDotsHover:true, // 14-ая опция пауза автопрокрутки при наведении на точки управления
		draggable:true, // 15-ая опция, включает свайп слайдов на ПК с помощью мыши (по умолчанию true), но на мобильных устройствах все будет работать
		swipe:true, // 16-ая опция, включает свайп слайдов на моб устройствах (по умолчанию true)
		waitForAnimate:true, // 19-ая опция, по умолчанию true, разрешает перелистывание ещё до того, как прогрузилась анимация прокрутки (ставим false)
		centerMode:false, // 20-ая опция, по умолчанию false (добавляет класс slick-center для главного слайда) ------------------------------------------------------------------------------------------ эти два сочетания и использовать в работе Base (true)
		variableWidth:false, // 21-ая опция, по умолчанию false, впихивает по ширине все слайды, обреза с краю, которые не вместились, хорошо работает с centerMode:true --------------------------------- эти два сочетания и использовать в работе Base (true)
		responsive:[ // 27-опция, которая позволяет при определенном breakpoint изменять свойства слайдера
			{ 
				breakpoint: 977, 
				settings: {
					slidesToShow: 1,
					// На IOS не работают эти свойства, поэтому просто задавать меньший margin нужно
					// variableWidth: true,
					// centerMode: true,
					dots: true,
					slidesToScroll:1,
					infinite: false,
				}
			},
		],	
	});
});
// --------------------------------------------------------------------------------------------------------------------------
/* Слайдер SEPARATE-GALLERY*/
$(document).ready(function(){
	$('.separate__news-bottom-slider').length && $('.separate__news-bottom-slider').not('.slick-initialized').slick({
		arrows:true, // 1-ая опция для стрелок, по умолчанию true, но если нам стрелки не нужны, то ставим false
		dots:false, // 2-ая опция для точек управления, по умолчанию false (их отдельно нужно стилизовать)
		slidesToShow: 3,// 4-ая опция, кол-во слайдов, которое показывается за раз, по умолчанию 1
		slidesToScroll:1, // 5-ая опция, кол-во слайдо, которое будет прокручиваться при нажатии кнопки, по умолчанию 1
		speed:500, // 6-ая опция, скорость прокрутки слайдов, по умолчанию 300мс
		easing:'linear', // 7-ая опция, тип анимации
		infinite:false, // 8-ая опция, когда прокрутка достигает конца слайдов, то кнопка становится неактивна (добавляется класс slick-disabled)
		initialSlide:0, // 9-ая опция, стартовый слайд, по умолчанию 0
		autoplay:false, // 10-ая опция, автоматический проигрыш слайдов, по умолчанию false
		autoplaySpeed:10000, // 11-ая опция, определяет скорость автопроигрыша, по умолчанию 3000мс (хорошо сочетается для большого числа слайдов и когда infinite:true)
		pauseOnFocus:false, // 12-ая опция, пауза автопрокрутки при фокусе на слайдере
		pauseOnHover:false, // 13-ая опция пауза автопрокрутки при наведении на слайдере
		pauseOnDotsHover:true, // 14-ая опция пауза автопрокрутки при наведении на точки управления
		draggable:true, // 15-ая опция, включает свайп слайдов на ПК с помощью мыши (по умолчанию true), но на мобильных устройствах все будет работать
		swipe:true, // 16-ая опция, включает свайп слайдов на моб устройствах (по умолчанию true)
		waitForAnimate:true, // 19-ая опция, по умолчанию true, разрешает перелистывание ещё до того, как прогрузилась анимация прокрутки (ставим false)
		centerMode:false, // 20-ая опция, по умолчанию false (добавляет класс slick-center для главного слайда) ------------------------------------------------------------------------------------------ эти два сочетания и использовать в работе Base (true)
		variableWidth:false, // 21-ая опция, по умолчанию false, впихивает по ширине все слайды, обреза с краю, которые не вместились, хорошо работает с centerMode:true --------------------------------- эти два сочетания и использовать в работе Base (true)
		responsive:[ // 27-опция, которая позволяет при определенном breakpoint изменять свойства слайдера
			{ 
				breakpoint: 1269, 
				settings: {
					slidesToShow: 2,
				}
			},
			{ 
				breakpoint: 777, 
				settings: {
					slidesToShow: 1,
					dots: true,
					slidesToScroll:1,
				}
			},
			{ 
				breakpoint: 371, 
				settings: {
					slidesToShow: 1,
					// На IOS не работают эти свойства, поэтому просто задавать меньший margin нужно
					// variableWidth: true,
					// centerMode: true,
					dots: true,
					slidesToScroll:1,
				}
			},
		],
	});
});

// --------------------------------------------------------------------------------------------------------------------------
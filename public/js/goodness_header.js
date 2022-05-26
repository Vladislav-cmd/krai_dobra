// функция загрузки при запуске для телефонов
window.onload = function() {
    let currentWidthOnload = window.innerWidth;
	let mainContent = document.querySelector('.main');
	let headerPage = document.querySelector('.header');
    if (currentWidthOnload <= 1146) {
		mainContent.style.margin = "76px 0 0 0";
		headerPage.style.cssText = `
			position: fixed;
			left: 0;
			top: 0;
			z-index: 10000;
		`;
    }
}
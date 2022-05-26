// --------------------------------------------------------------------------------------------------------------------------

/* Слайдер блока child (cards)*/
$(document).ready(function () {
   $('.child-cards__items').length && $('.child-cards__items').not('.slick-initialized').slick({
      arrows: false, // 1-ая опция для стрелок, по умолчанию true, но если нам стрелки не нужны, то ставим false
      dots: false, // 2-ая опция для точек управления, по умолчанию false (их отдельно нужно стилизовать)
      slidesToShow: 4,// 4-ая опция, кол-во слайдов, которое показывается за раз, по умолчанию 1
      slidesToScroll: 1, // 5-ая опция, кол-во слайдо, которое будет прокручиваться при нажатии кнопки, по умолчанию 1
      speed: 1000, // 6-ая опция, скорость прокрутки слайдов, по умолчанию 300мс
      easing: 'linear', // 7-ая опция, тип анимации
      initialSlide: 0, // 9-ая опция, стартовый слайд, по умолчанию 0
      autoplay: false, // 10-ая опция, автоматический проигрыш слайдов, по умолчанию false
      autoplaySpeed: 10000, // 11-ая опция, определяет скорость автопроигрыша, по умолчанию 3000мс (хорошо сочетается для большого числа слайдов и когда infinite:true)
      pauseOnFocus: false, // 12-ая опция, пауза автопрокрутки при фокусе на слайдере
      pauseOnHover: false, // 13-ая опция пауза автопрокрутки при наведении на слайдере
      pauseOnDotsHover: true, // 14-ая опция пауза автопрокрутки при наведении на точки управления
      draggable: false, // 15-ая опция, включает свайп слайдов на ПК с помощью мыши (по умолчанию true), но на мобильных устройствах все будет работать
      swipe: false, // 16-ая опция, включает свайп слайдов на моб устройствах (по умолчанию true)
      waitForAnimate: false, // 19-ая опция, по умолчанию true, разрешает перелистывание ещё до того, как прогрузилась анимация прокрутки (ставим false)
      centerMode: false, // 20-ая опция, по умолчанию false (добавляет класс slick-center для главного слайда) ------------------------------------------------------------------------------------------ эти два сочетания и использовать в работе Base (true)
      variableWidth: false, // 21-ая опция, по умолчанию false, впихивает по ширине все слайды, обреза с краю, которые не вместились, хорошо работает с centerMode:true --------------------------------- эти два сочетания и использовать в работе Base (true)
      responsive: [ // 27-опция, которая позволяет при определенном breakpoint изменять свойства слайдера
         {
            breakpoint: 1269,
            settings: {
               slidesToShow: 3,
               variableWidth: false,
               centerMode: false,
               draggable: true,
               swipe: true,
               arrows: true,
               slidesToScroll: 1,
               infinite: false,
            }
         },
         {
            breakpoint: 976,
            settings: {
               slidesToShow: 2,
               variableWidth: false,
               centerMode: false,
               draggable: true,
               swipe: true,
               arrows: true,
               slidesToScroll: 1,
               infinite: false,
            }
         },
         {
            breakpoint: 650,
            settings: {
               slidesToShow: 1,
               variableWidth: false,
               centerMode: false,
               draggable: true,
               swipe: true,
               arrows: true,
               dots: true,
               slidesToScroll: 1,
               infinite: false,
            }
         },
         {
            breakpoint: 390,
            settings: {
               slidesToShow: 1,
               // На IOS не работают эти свойства, поэтому просто задавать меньший margin нужно
               // variableWidth: true,
               // centerMode: true,
               draggable: true,
               swipe: true,
               arrows: true,
               dots: true,
               slidesToScroll: 1,
               infinite: false,
            }
         },
      ],
   });
});
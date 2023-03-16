'use strict';

window.addEventListener("DOMContentLoaded", () => {

                                                        // ЭЛЕМЕНТЫ

const modal = document.querySelector('.modal'); // секция модального окна
const overlay = document.querySelector('.overlay'); // подложка модального окна
const btnCloseModal = document.querySelector('.btn-close-modal'); // кнопка закрытия модального окна
const btnsOpenModal = document.querySelectorAll('.btn-show-modal'); // кнопка открытия модального окна
const btnScrollTo = document.querySelector('.btn-scroll-to'); // кнопка learn more - скроллинг к секции
const section1 = document.querySelector('#section-1'); // первая секция сайта
const tabs = document.querySelectorAll('.operations__tab'); // табы для выбора контента
const tabsContainer = document.querySelector('.operations__tab-container'); // родительский блок для табов
const tabsContent = document.querySelectorAll('.operations__content'); // контент для табов
const nav = document.querySelector('.nav'); // секция навигации

                                                        // МОДАЛЬНОЕ ОКНО

const openModal = function (e) { // функция показа модального окна и подложки через удаление класса скрытия
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () { // функция скрытия модального и подложки окна через добавление класса скрытия
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal)); // вызов функции показа модального окна и подложки по клику на кнопку

btnCloseModal.addEventListener('click', closeModal); // вызов функции скрытия модального окна и подложки по клику на кнопку

overlay.addEventListener('click', closeModal); // вызов функции скрытия модального окна и подложки по клику на подложку

document.addEventListener('keydown', function (e) { // вызов функции скрытия модального окна и подложки по нажатию на клавишу esk
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

                                                    // ПЛАВНЫЙ СКРОЛЛИНГ

btnScrollTo.addEventListener('click', function () { // к нужной секции по клику на кнопку learn more
  section1.scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.nav__links').addEventListener('click', function (e) { // к нужной секции по клику на кнопки навигации, используя делегирование событий - вешая клик на их родительский блок, получаем в переменную id идентификатор секции из их атрибута href

  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

                                                                // ТАБЫ

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab'); // получение в переменную clicked ближайшего элемента с этим классом - имеем ввиду получение таба

  if (!clicked) return; // если кликнули не в таб переменная пустая и функция прекращается

  tabs.forEach(tab => tab.classList.remove('operations__tab-active')); // удаление у всех табов смещения по оси Y через удаление класса активности

  tabsContent.forEach(tabContent => tabContent.classList.remove('operations__content-active')); // удаление контента для всех табов через удаление класса активности - у всех display: none

  clicked.classList.add('operations__tab-active'); // добавление табу на который кликнули смещения по оси Y через добавление класса активности

  console.log(clicked);

  document.querySelector(`.operations__content-${clicked.dataset.tab}`).classList.add('operations__content-active'); // получение активного контента по значению из data атрибута активного таба (от 1 до 3) и показ этого контента через добавление класса активности
});

                                                              // КНОПКИ НАВИГАЦИИ

const handleHover = function (e) { // функция прозрачности для кнопок навигации

  if (e.target.classList.contains('nav__link')) { // определение кнопок навигации по классу

    const link = e.target; // помещение в переменную целевой кнопки навигации

    const siblings = link.closest('.nav').querySelectorAll('.nav__link'); // помещение в переменную всех соседей внутри секции навигации с классом nav__link - то есть кнопок навигации

    const logo = link.closest('.nav').querySelector('img'); // помещение в переменную ближайшего тега img внутри класса навигации - то есть логотип

    siblings.forEach(element => { // перебор всех соседей целевой кнопки навигации

      if (element !== link) element.style.opacity = this; // для каждого элемента из сосодей кто не является целевым добавляем прозрачность из аргумента при вызове этой функции - то есть opacity 0.5 - полупрозрачность

    });

    logo.style.opacity = this; // добавление прозрачности для тега img из аргумента при вызове этой функции, то есть opacity 0.5 - полупрозрачность

  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5)); // прозрачность 0.5 для кнопок навигации при наведении курсора мыши на целевую
nav.addEventListener('mouseout', handleHover.bind(1)); // прозрачность 1 для кнопок навигации при уходе курсора мыши с целевой

                                              // API НАБЛЮДАТЕЛЬ ЗА ПЕРЕСЕЧЕНИЕМ

                                                    // за секцией header

const header = document.querySelector('.header'); // поместили в переменную секцию header
const navHeight = nav.getBoundingClientRect().height; // получили высоту секции header

const stickyNav = function (entries) { // добавление секции header позиции fixed при изменении свойства isIntersecting с false на true и обратно, что происходит при пересечении области видимости экрана наблюдаемым элементом - у нас это секция header
  const [entry] = entries; // поместили в переменную объект со значениями из API, изначально он лежит в массиве

  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  }  else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(stickyNav, { // создаем конструктор асинхронного наблюдения за событиями скролла страницы - передаем ему callback функцию и определяем его настройки
  root: null, // границы пересечения области видимости, наблюдаемым элементом - секцией header, стандартно указываем null - значит следим за всем объектом window
  threshold: 0, // свойство которое отвечает за то, когда сработает callback функция, по умолчанию стоит в 0, при таком значении функция срабатывает, когда наблюдаемый элемент пересекает в первый раз границу наблюдения своим первым пикселем и когда он покидает эту границу последним пикселем - это отслеживается в любую сторону его движения по странцие и вверх и ввниз. Если поставить это значение в 1 - то таже логика будет срабатывать при полном пересечении наблюдаемым элементом границы области видимости - то есть значения этого свойства от 0 до 1 - это от 0% до 100% наблюдаемого элемента, где проценты это какое количество элемента должно пересечь границу видимости для срабатывания callback функции.
  rootMargin: `-${navHeight}px`, // отнимаем от высоты области видимости высоту секции header - это даст возможность добавлять позицию fixed еще на подходе к области видимости, когда элемент приближается к ней сверху и когда он приближается к ней снизу - убираем позицию fixed, когда header заходит в нее на свою высоту
});

headerObserver.observe(header); // запускаем наблюдателя за секцией header

                                                              // за секциями сайта


const allSection = document.querySelectorAll('.section'); // помещаем в переменную все секции

const revealSection = function (entries, observer) {
  
  const [entry] = entries; // поместили в переменную объект со значениями из API, изначально он лежит в массиве

  if (!entry.isIntersecting) return; // если пересечений не будет - останавливаем функцию

  entry.target.classList.remove('section-hidden'); // при пересечении границы наблюдения каждой из секций (это свойство target) - у них будет удаляться класс скрытия

  observer.unobserve(entry.target); // убираем наблюдаемый элемент (текущую секцию) из списка наблюдателя, чтобы наблюдатель не срабатывал на ней второй раз когда она покидает границу наблюдения
};

const sectionObserver = new IntersectionObserver(revealSection, { // создаем конструктор наблюдателя
  root: null, // следим за всем объектом window
  threshold: 0.15, // callback функиця будет вызвана при пересечении границы наблюдаемым элементом на 15% от его размера
});

allSection.forEach(section => { // перебираем все секции в массиве - для каждой каждой добавляем класс скрытия и запускаем наблюдателя
  section.classList.add('section-hidden');
  sectionObserver.observe(section);
});


                                                        // за изображениями


const imgTargets = document.querySelectorAll('img[data-src]'); // помещаем в переменную все изображения с data атрибутом data-src

const loadImg = function (entries, observer) { // callback функция, которую запустит наблюдатель при пересечении наблюдаемыми элементами границы пересечения
  const [entry] = entries; // поместили в переменную объект со значениями значения из API, изначально он лежит в массиве

  if (!entry.isIntersecting) return; // если пересечений не будет - останавливаем функцию

  entry.target.src = entry.target.dataset.src; // заменяем у цели наблюдения путь к изображению (меняем маленькую картинку на большую)

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img'); // при событии загрузки удаляем у цели наблюдения класс lazy-img - эффект размытия
  });

  observer.unobserve(entry.target); // после убираем цель наблюдения
};

const imgObserver = new IntersectionObserver(loadImg, { // создаем конструктор наблюдателя и пишем его настройки
  root: null, // следим за всем объектом window
  threshold: 0, // callback функция сработает при пересечении границы первым пикселем цели (изображением)
  rootMargin: '200px', // задаем отступ для границы в 200px - то есть при приближении к изображению за 200px до него - вызовется callback функция
});

imgTargets.forEach(img => imgObserver.observe(img)); // добавляем наблюдателя всем изображениям

                                                                // СЛАЙДЕР


const slider = function () { // общая функция логики слайдера

  const slides = document.querySelectorAll('.slide'); // переменная со списком элементов слайдов, сейчас их 3
  const btnLeft = document.querySelector('.slider__btn-left'); // кнопка влево
  const btnRight = document.querySelector('.slider__btn-right'); // кнопка вправо
  const dotContainer = document.querySelector('.dots'); // блок кнопок в виде точек под слайдером

  let curSlide = 0; // создаем переменную со значением 0, которая может изменяться - имеем виду текущий слайд

  const maxSlide = slides.length; // переменная постоянная - общее количество слайдов - получаем через длину массива с элементами

  const createDots = function () { // функция создания кнопок-точек для слайдов

    slides.forEach(function (item, i) { // для каждого слайда в отдельности динамически создаем элемент точку с классом и data атрибутом в которую помещаем индекс соответствующего ей слайда - то есть для первого слайда у точки значение data атрибута - 0 и тд и помещаем эти точки в блок под слайдером

      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );

    });

  };

  const activateDot = function (slide) { // функция показа активной точки слайда

    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot-active')); // выбираем список элментов точек и для каждой удаляем класс активности

    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot-active'); // выбираем конкретную точку по дата атрибуду и указанному в нем значению индекса - его передаем в общей функции через атрибут 'slide' и ей добавляем класс активности - в итоге какой слайд показан та точка и будет выделяться на фоне других

  };

  const goToSlide = function (curSlide) { // функция перемещения слайда

    slides.forEach( (slideElement, slideElementIndex) => (slideElement.style.transform = `translateX(${100 * (slideElementIndex - curSlide)}%)`) ); // перебираем все слайды изначально у первого значение transform: translateX() - 0%, у второго 100%, у третьего 200%, затем при вызове функции nextSlide или prevSlide меняем каждому значение translateX(), смещая по оси X - по формуле: 
    // вычитаем из индекса слайда из массива (из 0,1,2) значение из переменной curSlide - в этой переменной находится изначально 0, затем она переписывается на (0,1,2) и умножаем результат на 100. В итоге они постоянно смещаются по горизонтали на +-0,100,200%.
  };

  const nextSlide = function () { // функция перехода к след слайду

    if (curSlide === maxSlide - 1) { // если значение в переменной currSlide равно индексу последнего слайда мы задаем ей значение 0 - то есть показываем первый слайд
      curSlide = 0;
    } else { // в остальных случаях увеличиваем его на единицу
      curSlide++;
    }

    goToSlide(curSlide); // запускаем функцию перемещения слайда со значением переменной currSlide
    activateDot(curSlide); // запускаем функцию показа активной точки по значению переменной currSlide
  };

  const prevSlide = function () { // функция перехода к пред слайду

    if (curSlide === 0) { // если значение переменной currSlide равно 0 мы задаем ей значение равное длина списка слайдов - 1 - то есть показываем последний слайд
      curSlide = maxSlide - 1;
    } else { // в остальных случаях уменьшаем это его на единицу
      curSlide--;
    }

    goToSlide(curSlide); // запускаем функцию перемещения слайда со значением переменной currSlide
    activateDot(curSlide); // запускаем функцию показа активной точки по значению переменной currSlide
  };

  const init = function () { // функция изначальных значений

    goToSlide(0); // ставим значение текущего слайда в 0 - то есть показываем первый слайд
    createDots(); // создаем точки
    activateDot(0); // ставим текущую активную точку для первого слайда - ее индекс 0
  };

  init(); // запускаем функция изначальных значений

  btnRight.addEventListener('click', nextSlide); // по клику на правую кнопку запускаем функцию перехода к след слайду
  btnLeft.addEventListener('click', prevSlide); // по клику на левую кнопку запускаем функцию перехода к пред слайду

  document.addEventListener('keydown', function (e) { // реагируем на события нажатия клавиш клавиатуры

    if (e.key === 'ArrowLeft') { // если нажата клавиша "стрелка влево" запускаем функцию перехода к пред слайду
      prevSlide();
    } else if (e.key === 'ArrowRight') { // если нажата клавиша "стрелка вправо" запускаем функцию перехода к след слайду
      nextSlide();
    }
  });

  dotContainer.addEventListener('click', function (e) { // реагируем на клики по кнопкам-точка

    if (e.target.classList.contains('dots__dot')) { // если целевой элемент содержит класс точек

      const { slide } = e.target.dataset; // в переменную slide помещаем значение из data атрибута - то есть индекс этой точки
      
      goToSlide(slide); // запускаем функцию перехода к слайду по индексу
      activateDot(slide); // показываем активную точку по индексу
    }
  });
};

slider(); // запускаем функцию слайдер
});


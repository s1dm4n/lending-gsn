document.addEventListener('DOMContentLoaded', function () {
  const swiperCustom = new Swiper('.swiper-main', {
    createElements: true,
    slidesPerView: 1,
    spaceBetween: 100,
    speed: 1000, 
    centeredSlides: true,
    slidesPerView: 'auto',
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: '.swiper-main-next',
      prevEl: '.swiper-main-prev',
    },
    pagination: {
      el: ".swiper-main-pagination",
      type: 'bullets',
      clickable: true,
    }
  });

  const swiper = new Swiper('.swiper-custom', {
    slidesPerView: 1,
    spaceBetween: -1,
    freeMode: false,       // Отключаем свободное перетаскивание
    grabCursor: true,      // Курсор "рука" при наведении
    resistance: false,     // Отключаем "упругость" при перетаскивании
    watchSlidesProgress: true,
    touchReleaseOnEdges: true, // Резкое завершение свайпа на границах
    speed: 400,
    slidesPerView: 'auto',
    freeMode: false,
    // followFinger: false,   // Не следует за пальцем при свайпе
    touchRatio: 1.2,       // Чувствительность свайпа
    navigation: {
      nextEl: '.swiper-custom-next',
      prevEl: '.swiper-custom-prev',
    },
    breakpoints: {
      475: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 4,
      },
      1920: {
        slidesPerView: 5,
      }
    },
    on: {
      init: function () {
        updateCardsOpacity(this);
      },
      slideChange: function () {
        updateCardsOpacity(this);
      },
      resize: function () {
        updateCardsOpacity(this);
      }
    }
  });
});
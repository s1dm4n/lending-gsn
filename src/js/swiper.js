document.addEventListener('DOMContentLoaded', function () {
  const swiperCustom = new Swiper('.swiper-main', {
    createElements: true,
    slidesPerView: 1,
    spaceBetween: 100,
    speed: 1000, 
    centeredSlides: true,
    grabCursor: true,
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
    watchSlidesProgress: true,
    grabCursor: true,      // Курсор "рука" при наведении
    resistance: false,     // Отключаем "упругость" при перетаскивании
    touchReleaseOnEdges: true, // Резкое завершение свайпа на границах
    speed: 400,
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
    init: function() {
      initSwiperCards(this);
    },
    slideChange: function() {
      updateSwiperCards(this);
    },
    resize: function() {
      updateSwiperCards(this);
    }
  }
});

// Инициализация
function initSwiperCards(swiper) {
  swiper.el.classList.add('cards-initialized');
  updateSwiperCards(swiper);
}

// Обновление карточек
function updateSwiperCards(swiper) {
  const slides = swiper.slides;
  const activeIndex = swiper.activeIndex;
  
  // Определяем сколько карточек должно быть видно
  const visibleCount = getVisibleCardsCount(swiper);
  
  // Обновляем все карточки
  slides.forEach((slide, index) => {
    const card = slide.querySelector('.card');
    if (!card) return;
    
    // Проверяем, входит ли карточка в диапазон видимых
    const isVisible = index >= activeIndex && index < activeIndex + visibleCount;
    
    // Устанавливаем классы и стили
    card.classList.toggle('card-visible', isVisible);
    card.classList.toggle('card-hidden', !isVisible);
    
    // Для плавности
    requestAnimationFrame(() => {
      card.style.opacity = isVisible ? '1' : '0.2';
    });
  });
}

// Определение количества видимых карточек на основе breakpoints
function getVisibleCardsCount(swiper) {
  const width = window.innerWidth;
  const breakpoints = swiper.params.breakpoints;
  
  // Проверяем breakpoints в обратном порядке (от большего к меньшему)
  if (breakpoints) {
    const sortedBreakpoints = Object.keys(breakpoints)
      .map(bp => parseInt(bp))
      .sort((a, b) => b - a);
    
    for (const bp of sortedBreakpoints) {
      if (width >= bp) {
        return breakpoints[bp].slidesPerView || 1;
      }
    }
  }
  
  return swiper.params.slidesPerView || 1;
}
});
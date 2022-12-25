function openMenu(button) {
  let menuWrapper = document.querySelectorAll('.main-nav__wrapper');
  if (menuWrapper.length === 0) {
    return;
  }
  menuWrapper = menuWrapper[0];

  let menuOpenedClass = 'main-nav__wrapper--opened';
  let menuButtonActiveClass = 'header__nav-toggle--active';
  if(menuWrapper.classList.contains(menuOpenedClass)) {
    menuWrapper.classList.remove(menuOpenedClass);
    button.classList.remove(menuButtonActiveClass);
  } else {
    menuWrapper.classList.add(menuOpenedClass);
    button.classList.add(menuButtonActiveClass);
  }
}

document.addEventListener('DOMContentLoaded', function () {
}, false);

function initCatSlider() {
  const container = document.querySelector('.cat-slider__wrapper');
  document.querySelector('.cat-slider__input')?.addEventListener('input', (e) => {
    container.style.setProperty('--position', `${e.target.value}%`);
  })
}

function initHeadContainer() {
  let headerContainer = document.querySelectorAll('.header__container');
  headerContainer = headerContainer.length === 0 ? false : headerContainer[0];
  let headerContainerNoJsClass = 'header__container--no-js';

  if(headerContainer && headerContainer.classList.contains(headerContainerNoJsClass)) {
    headerContainer.classList.remove(headerContainerNoJsClass);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  initCatSlider();
  initHeadContainer();
});

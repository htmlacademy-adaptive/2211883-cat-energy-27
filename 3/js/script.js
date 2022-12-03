function openMenu(button) {
  let menuWrapper = button.closest('.main-nav')?.querySelectorAll('.main-nav__wrapper');
  if (menuWrapper.length === 0) {
    return;
  }
  menuWrapper = menuWrapper[0];

  let menuOpenedClass = 'main-nav__wrapper--opened';
  let menuButtonActiveClass = 'main-nav__toggle--active';
  if(menuWrapper.classList.contains(menuOpenedClass)) {
    menuWrapper.classList.remove(menuOpenedClass);
    button.classList.remove(menuButtonActiveClass);
  } else {
    menuWrapper.classList.add(menuOpenedClass);
    button.classList.add(menuButtonActiveClass);
  }
}

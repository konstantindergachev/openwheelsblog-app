(() => {
  'use strict';

  const openMenu = (menuItem, sandwich, mobileMenu, content) => {
    const elemenu = [ ...document.querySelectorAll(menuItem) ];
    elemenu.forEach((item) => {
      if (window.location.pathname === '/' && item.textContent === 'Новости') {
        item.classList.add('marker');
      }
      if (
        window.location.pathname === '/about' &&
        item.textContent === 'О формуле 1'
      ) {
        item.classList.add('marker');
      }
      if (
        window.location.pathname === '/history' &&
        item.textContent === 'История гонок'
      ) {
        item.classList.add('marker');
      }
      if (
        window.location.pathname === '/contact' &&
        item.textContent === 'Контакты'
      ) {
        item.classList.add('marker');
      }
    });

    const toggle = document.querySelector(sandwich);
    const mM = document.querySelector(mobileMenu);
    const shiftContentDown = document.querySelector(content);

    toggle.addEventListener('click', () => {
      mM.classList.toggle('active');
      shiftContentDown.classList.toggle('down');
    });
  };
  window.addEventListener(
    'load',
    openMenu(
      '.nav__menu-item',
      '.nav__text',
      '.nav__menu-list',
      '.wrapper__inner'
    )
  );
})();

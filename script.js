document.addEventListener('DOMContentLoaded', () => {
  const openMenu = document.querySelector('#menu-btn');
  const closeMenu = document.querySelector('#close-btn');
  const menu = document.querySelector('#nav-list');

  openMenu.addEventListener('click', () => {
    menu.classList.add('open-nav');
  });

  closeMenu.addEventListener('click', () => {
    menu.classList.remove('open-nav');
  });
});

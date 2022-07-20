const qs = (selector = '*', element = document) => {
  return element.querySelector(selector);
}

const qsa = (selector = '*', element = document) => {
  return [...element.querySelectorAll(selector)];
}

const burgerIcon = qs('#main-header li');
const burgerCloseIcon = qsa('#main-header li')[1];
const container = qs('#main-header ul');
const links = qsa('li.desktop-visible', container);

function toggleBurgerMenu() {
  burgerIcon.classList.toggle('no-display');
  burgerCloseIcon.classList.toggle('no-display');
  container.classList.toggle('enlarged');
  
  for (const link of links) {
    link.classList.toggle('desktop-visible');
  }
}

burgerIcon.addEventListener('click', () => toggleBurgerMenu());
burgerCloseIcon.addEventListener('click', () => toggleBurgerMenu());

container.addEventListener('click', e => {
  const { target } = e;

  if (target.tagName.toLowerCase() !== 'a') return;

  toggleBurgerMenu();
  qs(target.getAttribute('href')).scrollIntoView();
});

// If the burger menu is opened and the screen is resized to desktop
// dimensions, close the menu
window.onresize = () => {
  if (window.innerWidth >= 768 && container.classList.contains('enlarged')) {
    toggleBurgerMenu();
  }
}

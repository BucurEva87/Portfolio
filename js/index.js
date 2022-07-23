import utils from './utils.js';
import projects from './projects.js';
import createModal from './modal.js';

const burgerIcon = utils.qs('#main-header li');
const burgerCloseIcon = utils.qsa('#main-header li')[1];
const container = utils.qs('#main-header ul');
const links = utils.qsa('li.desktop-visible', container);

function toggleBurgerMenu() {
  burgerIcon.classList.toggle('no-display');
  burgerCloseIcon.classList.toggle('no-display');
  container.classList.toggle('enlarged');

  for (let i = 0, l = links.length; i < l; i += 1) {
    links[i].classList.toggle('desktop-visible');
  }
}

burgerIcon.addEventListener('click', () => toggleBurgerMenu());
burgerCloseIcon.addEventListener('click', () => toggleBurgerMenu());

container.addEventListener('click', (e) => {
  if (window.innerWidth >= 768) return;

  const { target } = e;

  if (target.tagName.toLowerCase() !== 'a') return;

  toggleBurgerMenu();
  utils.qs(target.getAttribute('href')).scrollIntoView();
});

// If the burger menu is opened and the screen is resized to desktop
// dimensions, close the menu
window.onresize = () => {
  if (window.innerWidth >= 768 && container.classList.contains('enlarged')) {
    toggleBurgerMenu();
  }
};

// Create and insert articles in the page
function populateProjects() {
  const projectsContainer = utils.qs('#projects .grid-container');

  projects.forEach((project) => {
    const article = utils.createElement({
      tagName: 'article',
      id: `art${project.id}`,
    });

    if (project.invisible) {
      article.classList.add('mobile-visible');
    }

    article.appendChild(
      utils.createElement({
        tagName: 'img',
        src: `img/projects/${project.image}`,
        alt: `Laptop project-${project.id} image`,
      })
    );

    const div = utils.createElement({
      class: 'info',
    });

    div.appendChild(
      utils.createElement({
        tagName: 'h2',
        textContent: project.title,
      })
    );

    const ul = utils.createElement({ tagName: 'ul' });

    project.languages.forEach((language) => {
      const li = utils.createElement({ tagName: 'li' });
      li.appendChild(
        utils.createElement({
          tagName: 'a',
          href: '#',
          class: 'tag',
          textContent: language,
        })
      );
      ul.appendChild(li);
    });
    div.appendChild(ul);

    const a = utils.createElement({
      tagName: 'a',
      href: '#',
      class: ['button', 'secondary-dark'],
      textContent: 'See this project ',
    });
    a.appendChild(
      utils.createElement({
        tagName: 'object',
        data: 'img/svgs/arrow.svg',
        width: '10',
        height: '10',
      })
    );
    div.appendChild(a);

    article.appendChild(div);
    projectsContainer.appendChild(article);
  });

  // Create the design boxes in the grid
  for (let i = 1; i <= 3; i++) {
    projectsContainer.appendChild(utils.createElement({ id: `design${i}` }));
  }
}

populateProjects();

// Listen for the click event fired by the project buttons
utils.qs('#projects').addEventListener('click', (e) => {
  e.preventDefault();

  const { target } = e;

  if (!target.classList.contains('button')) return;

  const article = target.closest('article');
  const articleTitle = utils.qs('h2', article).textContent;
  const project = projects.find((p) => p.title === articleTitle);

  createModal(project);
});

// Check form for improper input (not lowercase)
utils.qs('form').addEventListener('submit', (e) => {
  e.preventDefault();

  const { value } = utils.qs('#user_email');
  const errorField = utils.qs('.emailError');

  if (value !== value.toLowerCase()) {
    errorField.textContent = 'Please type your email address in all lowercase.';
    return;
  }

  errorField.textContent = '';
  utils.qs('form').submit();
});

// Store input data inside an object that facilitates the communication
// with the LocalStorage so that it can be retrieved for pre-filling
// purposes
const store = {
  name: '',
  email: '',
  message: '',
};

utils.qs('#username').addEventListener('input', (e) => {
  store.name = e.target.value;
  localStorage.setItem('data', JSON.stringify(store));
});

utils.qs('#user_email').addEventListener('input', (e) => {
  store.email = e.target.value;
  localStorage.setItem('data', JSON.stringify(store));
});

utils.qs('#message').addEventListener('input', (e) => {
  store.message = e.target.value;
  localStorage.setItem('data', JSON.stringify(store));
});

let data = localStorage.getItem('data');

if (data) {
  data = JSON.parse(data);
  utils.qs('#username').value = data.name;
  utils.qs('#user_email').value = data.email;
  utils.qs('#message').value = data.message;
}

const qs = (selector = '*', element = document) => element.querySelector(selector);

const qsa = (selector = '*', element = document) => [...element.querySelectorAll(selector)];

const burgerIcon = qs('#main-header li');
const burgerCloseIcon = qsa('#main-header li')[1];
const container = qs('#main-header ul');
const links = qsa('li.desktop-visible', container);

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
};

const projects = [
  {
    id: 1,
    title: 'Project 1',
    image: 'project1.png',
    languages: ['HTML/CSS', 'Ruby on Rails', 'JavaScript']
  },
  {
    id: 2,
    title: 'Project 2',
    image: 'project2.png',
    languages: ['HTML/CSS', 'Ruby on Rails', 'JavaScript']
  },
  {
    id: 3,
    title: 'Project 3',
    image: 'project3.png',
    languages: ['HTML/CSS', 'Ruby on Rails', 'JavaScript']
  },
  {
    id: 4,
    title: 'Project 4',
    image: 'project4.png',
    languages: ['HTML/CSS', 'Ruby on Rails', 'JavaScript']
  },
  {
    id: 5,
    title: 'Project 5',
    image: 'project5.png',
    languages: ['HTML/CSS', 'Ruby on Rails', 'JavaScript']
  },
  {
    id: 6,
    title: 'Project 6',
    image: 'project6.png',
    languages: ['HTML/CSS', 'Ruby on Rails', 'JavaScript'],
    invisible: true
  }
];

function createElement(obj) {
  const element = document.createElement(obj.tagName);
  delete obj.tagName;

  // Itterate through each property of the obj and set it as a
  // property of the element
  for (let prop in obj) {
    // Property is a class or a collection of classes
    if (prop === 'class') {
      // Collection (array)
      if (typeof obj[prop] === 'object') {
        element.classList.add(...obj[prop]);
      }
      // Single class
      else {
        element.classList.add(obj[prop]);
      }
    }
    // Property is a data attribute (these are key-value pairs in the obj)
    else if (prop === 'data' && typeof obj[prop] === 'object') {
      for (let d in obj[prop]) {
        element.dataset[d] = obj[prop][d];
      }
    }
    // Any other non-special property can be set directly
    else {
      element[prop] = obj[prop];
    }
  }

  return element;
}

// Create and insert articles in the page
function populateProjects() {
  const projectsContainer = qs('#projects .grid-container');
  
  for (let i = 0, len = projects.length; i < len; i += 1) {
    const article = createElement({
      tagName: 'article',
      id: `art${projects[i].id}`
    });
    if (projects[i].invisible) {
      article.classList.add('mobile-visible');
    }

    article.appendChild(createElement({
      tagName: 'img',
      src: `img/projects/${projects[i].image}`,
      alt: `Laptop project-${projects[i].id} image`
    }));

    const div = createElement({
      tagName: 'div',
      class: 'info'
    });

    div.appendChild(createElement({
      tagName: 'h2',
      textContent: projects[i].title
    }));

    const ul = createElement({ tagName: 'ul' });
    for (const language of projects[i].languages) {
      const li = createElement({ tagName: 'li' });
      li.appendChild(createElement({
        tagName: 'a',
        href: '#',
        class: 'tag'
      }));
      ul.appendChild(li);
    }
    div.appendChild(ul);

    const a = createElement({
      tagName: 'a',
      href: '#',
      class: ['button', 'secondary-dark'],
      textContent: 'See this project '
    });
    a.appendChild(createElement({
      tagName: 'object',
      data: 'img/svgs/arrow.svg',
      width: '10',
      height: '10'
    }));
    div.appendChild(a);

    article.appendChild(div);
    projectsContainer.appendChild(article);
  }
}

populateProjects();

import utils from './utils.js';

export default (project) => {
  // Create the modal itself
  const modal = utils.createElement({
    class: 'modalView',
  });

  const container = utils.createElement({
    class: 'modalContainer',
  });

  container.appendChild(
    utils.createElement({
      tagName: 'img',
      class: 'closeBtn',
      src: 'img/svgs/menu_close.svg',
      alt: 'Close button',
    })
  );
  container.appendChild(
    utils.createElement({
      tagName: 'h2',
      class: 'modalHeading',
      textContent: project.title,
    })
  );

  const ul = utils.createElement({
    tagName: 'ul',
    class: 'modalLanguage',
  });

  project.languages.forEach((language) => {
    ul.appendChild(
      utils.createElement({
        tagName: 'li',
        textContent: language,
      })
    );
  });

  container.appendChild(ul);

  const imageContainer = utils.createElement({
    class: 'imageContainer',
  });

  imageContainer.appendChild(
    utils.createElement({
      tagName: 'img',
      class: 'modal-arrow-left',
      src: 'img/svgs/modal_arrow_left.svg',
      alt: 'Modal arrow left',
    })
  );
  imageContainer.appendChild(
    utils.createElement({
      tagName: 'img',
      class: 'modal-arrow-right',
      src: 'img/svgs/modal_arrow_right.svg',
      alt: 'Modal arrow right',
    })
  );
  imageContainer.appendChild(
    utils.createElement({
      tagName: 'img',
      class: 'modal-img1',
      src: `img/projects/${project.image}`,
      alt: 'Current project image',
    })
  );

  const subImageContainer = utils.createElement({
    class: 'modal-sub-img',
  });

  for (let i = 0; i < 4; i += 1) {
    subImageContainer.appendChild(
      utils.createElement({
        tagName: 'img',
        src: `img/projects/${project.image}`,
        alt: 'Other image for the current project',
      })
    );
  }

  imageContainer.appendChild(subImageContainer);
  container.appendChild(imageContainer);

  const paragraphContainer = utils.createElement({
    class: 'modalParagraph',
  });

  paragraphContainer.appendChild(
    utils.createElement({
      tagName: 'p',
      textContent: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
    veniam, quis nostrud exercitation ullamco laboris nisi Ut aliquip ex ea
    commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing
    elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.`,
    })
  );
  paragraphContainer.appendChild(
    utils.createElement({
      tagName: 'br',
    })
  );
  paragraphContainer.appendChild(
    utils.createElement({
      tagName: 'p',
      textContent: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
    veniam, quis nostrud exercitation ullamco laboris nisi Ut aliquip ex ea
    commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing
    elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.`,
    })
  );

  container.appendChild(paragraphContainer);

  let button = utils.createElement({
    tagName: 'button',
    class: ['modalBtn1', 'navy-button'],
    textContent: 'See live ',
  });
  button.appendChild(
    utils.createElement({
      tagName: 'object',
      data: 'img/svgs/resume.svg',
    })
  );
  container.appendChild(button);

  button = utils.createElement({
    tagName: 'button',
    class: ['modalBtn2', 'navy-button'],
    textContent: 'See source ',
  });
  button.appendChild(
    utils.createElement({
      tagName: 'object',
      data: 'img/socials/github.svg',
    })
  );
  container.appendChild(button);

  const pagination = utils.createElement({
    class: 'pagination',
  });
  pagination.appendChild(
    utils.createElement({
      tagName: 'a',
      href: '#',
      innerHTML: '&larr; Previous Project',
    })
  );
  pagination.appendChild(
    utils.createElement({
      tagName: 'a',
      href: '#',
      innerHTML: 'Next Project &rarr;',
    })
  );
  container.appendChild(pagination);
  modal.appendChild(container);

  // Append some event listeners on the modal
  utils.qs('.closeBtn', modal).addEventListener('click', () => {
    modal.remove();
  });

  utils.qs('body').appendChild(modal);
};

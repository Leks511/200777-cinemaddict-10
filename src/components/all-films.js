import AbstractComponent from './abstract-component';

const createFilmsContentTemplate = () => {
  return `<div class="films-list__container"></div>`;
};

export default class AllFilms extends AbstractComponent {
  getTemplate() {
    return createFilmsContentTemplate();
  }
}

import {createElement} from '../util';

const createFilmsContentTemplate = () => {
  return `<div class="films-list__container"></div>`;
};

export default class AllFilms {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsContentTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

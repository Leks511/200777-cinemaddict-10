import {createElement} from '../util';

const createNoDataTemplate = () => {
  return `<h2 class="films-list__title">There are no movies in our database</h2>`;
};

export default class NoData {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createNoDataTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(createNoDataTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

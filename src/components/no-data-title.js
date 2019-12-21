import {createElement} from '../util';

const createNoDataTitleTemplate = () => {
  return `<h2 class="films-list__title">There are no movies in our database</h2>`;
};

export default class NoData {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createNoDataTitleTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(createNoDataTitleTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

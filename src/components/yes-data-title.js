import {createElement} from '../util';

const createExsistingDataHeaderTemplate = () => {
  return `<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>`;
};

export default class ExsistingDataHeader {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createExsistingDataHeaderTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(createExsistingDataHeaderTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

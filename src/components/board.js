import {createElement} from '../util';

const createFilmsContentTemplate = () => {
  return (
    `<section class="films">
      <section class="films-list">

      </section>
    </section>`
  );
};

export default class Board {
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

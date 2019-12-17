import {createElement} from '../util';

const createFooterStatisticTemplate = (filmsQuantity) => {
  return (
    `<section class="footer__statistics">
      <p>${filmsQuantity} movies inside</p>
    </section>`
  );
};

export default class FooterStatistic {
  constructor(filmsQuantity) {
    this._element = null;
    this._filmsQuantity = filmsQuantity;
  }

  getTemplate() {
    return createFooterStatisticTemplate(this._filmsQuantity);
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

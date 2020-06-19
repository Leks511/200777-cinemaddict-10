import {createElement} from "../utils";

const createStatisticTemplate = (films) => {
  const allFilmsCount = films.length;

  return (
    `<section class="footer__statistics">
      <p>${allFilmsCount} movies inside</p>
    </section>`
  );
};

export default class StatisticComponent {
  constructor(data) {
    this._data = data;
    this._element = null;
  }

  getTemplate() {
    return createStatisticTemplate(this._data);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }
}

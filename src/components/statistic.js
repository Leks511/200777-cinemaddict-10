import AbstractComponent from "./abstract-component.js";

const createStatisticTemplate = (films) => {
  const allFilmsCount = films.length;

  return (
    `<section class="footer__statistics">
      <p>${allFilmsCount} movies inside</p>
    </section>`
  );
};

export default class StatisticComponent extends AbstractComponent {
  constructor(data) {
    super();

    this._data = data;
  }

  getTemplate() {
    return createStatisticTemplate(this._data);
  }
}

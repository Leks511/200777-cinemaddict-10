import {createElement} from "../util";

const createTopRatedFilmsListTemplate = (films) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>

      <div class="films-list__container">
        ${films}
      </div>

    </section>`
  );
};

export default class TopRatedFilmsList {
  constructor(films) {
    this._films = films;
    this._element = null;
  }

  getTemplate() {
    return createTopRatedFilmsListTemplate(this._films);
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

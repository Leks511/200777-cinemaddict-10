import {createElement} from "../util";

const createMostCommentedFilmsList = (morkup) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>

      <div class="films-list__container">
        ${morkup}
      </div>

    </section>`
  );
};

export default class MostCommentedFilmsList {
  constructor(films) {
    this._films = films;
    this._element = null;
  }

  getTemplate() {
    return createMostCommentedFilmsList(this._films);
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

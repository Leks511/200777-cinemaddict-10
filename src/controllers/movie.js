import {RenderPosition, render} from "../utils/render.js";

import FilmComponent from "../components/film.js";
import FilmDetailsComponent from "../components/film-details.js";

const bodyElement = document.body;

export default class MovieController {
  constructor(container) {
    this._container = container;

    this._filmComponent = null;
    this._filmDetailsComponent = null;

    this._onEscKeydown = this._onEscKeydown.bind(this);
    this._removeFilmDetailsElement = this._removeFilmDetailsElement.bind(this);
  }

  render(film) {
    const container = this._container;

    this._filmComponent = new FilmComponent(film);
    this._filmDetailsComponent = new FilmDetailsComponent(film);

    this._filmComponent.setControlClickHandler(() => {
      bodyElement.classList.add(`hide-overflow`);

      render(bodyElement, this._filmDetailsComponent, RenderPosition.BEFOREEND);
      document.addEventListener(`keydown`, this._onEscKeydown);

      this._filmDetailsComponent.setCloseButtonClickHandler(this._removeFilmDetailsElement);
    });

    this._filmComponent.setAddToWachlistButtonClickHandler(() => {});
    this._filmComponent.setMarkAsFavoriteButtonClickHandler(() => {});
    this._filmComponent.setMarkAsFavoriteButtonClickHandler(() => {});

    this._filmDetailsComponent.setAddToWatchListControlChangeHandler(() => {});
    this._filmDetailsComponent.setAlreadyWatchedControlChangeHandler(() => {});
    this._filmDetailsComponent.setAddToFavoritesControlChangeHandler(() => {});

    render(container, this._filmComponent, RenderPosition.BEFOREEND);
  }

  _removeFilmDetailsElement() {
    bodyElement.classList.remove(`hide-overflow`);

    this._filmDetailsComponent.getElement().remove();
  }

  _onEscKeydown(evt) {
    evt.preventDefault();

    if (evt.key === `Escape` || `Esc`) {
      this._removeFilmDetailsElement();
      document.removeEventListener(`keydown`, this._onEscKeydown);
    }
  }
}

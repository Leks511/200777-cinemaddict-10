import {RenderPosition, render, replace} from "../utils/render.js";

import FilmComponent from "../components/film.js";
import FilmDetailsComponent from "../components/film-details.js";

const Mode = {
  DEFAULT: `default`,
  OPENED: `opened`
};

const bodyElement = document.body;

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;

    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._mode = Mode.DEFAULT;

    this._filmComponent = null;
    this._filmDetailsComponent = null;

    this._onEscKeydown = this._onEscKeydown.bind(this);
    this._removeFilmDetailsElement = this._removeFilmDetailsElement.bind(this);
  }

  render(film) {
    const container = this._container;

    const oldFilmComponent = this._filmComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;

    this._filmComponent = new FilmComponent(film);
    this._filmDetailsComponent = new FilmDetailsComponent(film);

    this._filmComponent.setControlClickHandler(() => {
      bodyElement.classList.add(`hide-overflow`);

      this._onViewChange();
      render(bodyElement, this._filmDetailsComponent, RenderPosition.BEFOREEND);
      this._mode = Mode.OPENED;

      document.addEventListener(`keydown`, this._onEscKeydown);

      this._filmDetailsComponent.setCloseButtonClickHandler(this._removeFilmDetailsElement);
    });

    this._filmComponent.setAddToWachlistButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        inWatchlist: !film.inWatchlist
      }));
    });

    this._filmComponent.setMarkAsWatchedButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatched: !film.isWatched
      }));
    });

    this._filmComponent.setMarkAsFavoriteButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isFavorite: !film.isFavorite
      }));
    });

    if (oldFilmComponent && oldFilmDetailsComponent) {
      replace(this._filmComponent, oldFilmComponent);
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);
    } else {
      render(container, this._filmComponent, RenderPosition.BEFOREEND);
    }
  }

  _removeFilmDetailsElement() {
    bodyElement.classList.remove(`hide-overflow`);

    this._filmDetailsComponent.reset();
    this._filmDetailsComponent.getElement().remove();
    this._mode = Mode.DEFAULT;
  }

  _onEscKeydown(evt) {
    evt.preventDefault();
    if (evt.keyCode === 27) {
      this._removeFilmDetailsElement();
      document.removeEventListener(`keydown`, this._onEscKeydown);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._removeFilmDetailsElement();
    }
  }
}

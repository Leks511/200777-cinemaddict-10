import AbstractComponent from "./abstract-component.js";

const Buttons = {
  ADD_TO_WATCHLIST: {
    name: `Add to watchlist`,
    class: `add-to-watchlist`
  },
  MARK_AS_WATCHED: {
    name: `Mark as watched`,
    class: `mark-as-watched`
  },
  MARK_AS_FAVORITE: {
    name: `Mark as favorite`,
    class: `mark-as-favorite`
  }
};

const createButtonMarkup = (name, isActive) => {
  let button;

  switch (name) {
    case Buttons.ADD_TO_WATCHLIST.name:
      button = (
        `<button class="film-card__controls-item button film-card__controls-item--${Buttons.ADD_TO_WATCHLIST.class} ${isActive ? `film-card__controls-item--active` : ``}">${Buttons.ADD_TO_WATCHLIST.name}</button>`
      );
      break;
  }

  return button;
};

const createFilmTemplate = ({
  title,
  rating,
  releaseDate,
  duration,
  genres,
  poster,
  description,
  commentsCount,
  inWatchlist,
  isWatched,
  isFavorite}) => {

  const genre = genres[0];

  const addToWatchlistButton = createButtonMarkup(Buttons.ADD_TO_WATCHLIST.name, inWatchlist);
  const markAsWatchedButton = createButtonMarkup(Buttons.MARK_AS_WATCHED.name, isWatched);
  const markAsFavoriteButton = createButtonMarkup(Buttons.MARK_AS_FAVORITE.name, isFavorite);

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${releaseDate}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${commentsCount} comments</a>
      <form class="film-card__controls">
        ${addToWatchlistButton}
        ${markAsWatchedButton}
        ${markAsFavoriteButton}
      </form>
    </article>`
  );
};

export default class FilmComponent extends AbstractComponent {
  constructor(data) {
    super();

    this._data = data;
  }

  getTemplate() {
    return createFilmTemplate(this._data);
  }

  setControlClickHandler(handler) {
    this.getElement()
      .querySelectorAll(`.film-card__title, .film-card__poster, .film-card__comments`)
      .forEach((control) => control.addEventListener(`click`, handler));
  }

  setAddToWachlistButtonClickHandler(handler) {
    this.getElement()
      .querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);
  }

  setMarkAsWatchedButtonClickHandler(handler) {
    this.getElement()
      .querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, handler);
  }

  setMarkAsFavoriteButtonClickHandler(handler) {
    this.getElement()
      .querySelector(`.film-card__controls-item--mark-as-favorite`)
      .addEventListener(`click`, handler);
  }
}

import AbstractComponent from "./abstract-component.js";

const Buttons = {
  ADD_TO_WATCHLIST: {
    buttonName: `Add to watchlist`,
    className: `add-to-watchlist`
  },
  MARK_AS_WATCHED: {
    buttonName: `Mark as watched`,
    className: `mark-as-watched`
  },
  MARK_AS_FAVORITE: {
    buttonName: `Mark as favorite`,
    className: `favorite`
  }
};

const getNameAndClass = (buttonName) => {
  let dataObject;

  switch (buttonName) {
    case Buttons.ADD_TO_WATCHLIST.buttonName:
      dataObject = Buttons.ADD_TO_WATCHLIST;
      break;
    case Buttons.MARK_AS_WATCHED.buttonName:
      dataObject = Buttons.MARK_AS_WATCHED;
      break;
    case Buttons.MARK_AS_FAVORITE.buttonName:
      dataObject = Buttons.MARK_AS_FAVORITE;
      break;
  }

  return dataObject;
};

const createButtonMarkup = (name, isActive) => {
  const {buttonName, className} = getNameAndClass(name);

  return (
    `<button class="film-card__controls-item button film-card__controls-item--${className} ${isActive ? `film-card__controls-item--active` : ``}">${buttonName}</button>`
  );
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

  const addToWatchlistButton = createButtonMarkup(Buttons.ADD_TO_WATCHLIST.buttonName, inWatchlist);
  const markAsWatchedButton = createButtonMarkup(Buttons.MARK_AS_WATCHED.buttonName, isWatched);
  const markAsFavoriteButton = createButtonMarkup(Buttons.MARK_AS_FAVORITE.buttonName, isFavorite);

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
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
    .addEventListener(`click`, handler);
  }
}

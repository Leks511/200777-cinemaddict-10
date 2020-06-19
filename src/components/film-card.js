import {createElement} from "../utils";

const createFilmCardTemplate = ({
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

  const activeClass = `film-card__controls-item--active`;
  const genre = genres[0];

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
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${inWatchlist ? activeClass : ``}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isWatched ? activeClass : ``}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite  ${isFavorite ? activeClass : ``}">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class FilmCardComponent {
  constructor(data) {
    this._data = data;
    this._element = null;
  }

  getTemplate() {
    return createFilmCardTemplate(this._data);
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

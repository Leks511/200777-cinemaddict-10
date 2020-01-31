import AbstractComponent from './abstract-component';

const createButtonMarkup = (name, isActive) => {
  return (
    `<button
        class="
          button
          film-card__controls-item
          film-card__controls-item--${name}
          ${isActive ? `` : `film-card__controls-item--active`}
          ">
        ${name}
      </button>`
  );
};

const createFilmCardTemplate = (film) => {
  const {filmName, rating, year, duration, genre, poster, description, comments, inWatchlist, isWatched, isFavorite} = film;

  const watchlistButton = createButtonMarkup(`add-to-watchlist`, inWatchlist);
  const watchedButton = createButtonMarkup(`mark-as-watched`, isWatched);
  const favoriteButton = createButtonMarkup(`favorite`, isFavorite);

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${filmName}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${duration}m</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${comments} comments</a>
      <form class="film-card__controls">
        ${watchlistButton}
        ${watchedButton}
        ${favoriteButton}
      </form>
    </article>`
  );
};

export default class FilmCard extends AbstractComponent {
  constructor(film) {
    super();

    this._film = film;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  setLinksClickHandler(handler) {
    const linksToFilmDetails = [
      this.getElement().querySelector(`.film-card__title`),
      this.getElement().querySelector(`.film-card__poster`),
      this.getElement().querySelector(`.film-card__comments`)
    ];

    linksToFilmDetails.forEach((link) => {
      link.addEventListener(`click`, handler);
    });
  }

  setAddToWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);
  }

  setMarkAsWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, handler);
  }

  setMarkAsFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, handler);
  }
}

import AbstractComponent from "./abstract-component.js";

const FILM_PARAMETERS = {
  WATCHLIST: `inWatchlist`,
  HISTORY: `isWatched`,
  FAVORITES: `isFavorite`,
};

const getFilmsWithParameter = (films, parameter) => {
  return films.filter((film) => film[parameter]).length;
};

const createMenuTemplate = (films) => {
  const inWatchlistCount = getFilmsWithParameter(films, FILM_PARAMETERS.WATCHLIST);
  const inHistoryCount = getFilmsWithParameter(films, FILM_PARAMETERS.HISTORY);
  const inFavoritesCount = getFilmsWithParameter(films, FILM_PARAMETERS.FAVORITES);


  return (
    `<nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${inWatchlistCount}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${inHistoryCount}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${inFavoritesCount}</span></a>
      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>`
  );
};

export default class MenuComponent extends AbstractComponent {
  constructor(data) {
    super();

    this._data = data;
  }

  getTemplate() {
    return createMenuTemplate(this._data);
  }
}

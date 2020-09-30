import {FilterType, getFilmsByFilter} from "../utils/filter";

export default class MoviesModel {
  constructor() {
    this._films = [];
    this._activeFilterType = FilterType.ALL;
  }

  setFilms(films) {
    this._films = Array.from(films);
  }

  getFilms() {
    return getFilmsByFilter(this._films, this._activeFilterType);
  }

  getFilmsAll() {
    return this._films;
  }

  updateFilm(id, film) {
    const index = this._films.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._films = [].concat(this._films.slice(0, index), film, this._films.slice(index + 1));

    return true;
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
  }
}

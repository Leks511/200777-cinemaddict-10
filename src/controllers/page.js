import {RenderPosition, render, remove} from "../utils/render.js";

import SortComponent, {SortType} from "../components/sort.js";
import FilmsComponent from "../components/films.js";
import AllMoviesComponent from "../components/all-movies.js";
import TopRatedComponent from "../components/top-rated.js";
import MostCommentedComponent from "../components/most-commented.js";
import ShowMoreButtonComponent from "../components/show-more-button.js";
import NoDataComponent from "../components/no-data.js";

import MovieController from "../controllers/movie.js";

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const FilmParameters = {
  RATING: `rating`,
  COMMENTS_COUNT: `commentsCount`
};


const renderFilms = (container, films, onDataChange, onViewChange) => {
  return films
    .map((film) => {
      const movieController = new MovieController(container, onDataChange, onViewChange);
      movieController.render(film);

      return movieController;
    });
};

const getSortedFilms = (films, sortType, from, to) => {
  let sortedFilms = [];
  const showingFilms = films.slice();

  switch (sortType) {
    case SortType.DATE:
      sortedFilms = showingFilms.sort((a, b) => b.releaseDate - a.releaseDate);
      break;
    case SortType.RATING:
      sortedFilms = showingFilms.sort((a, b) => b.rating - a.rating);
      break;
    case SortType.DEFAULT:
      sortedFilms = showingFilms;
      break;
  }

  return sortedFilms.slice(from, to);
};


export default class PageController {
  constructor(container, moviesModel) {
    this._container = container;

    this._moviesModel = moviesModel;

    this._showedMovieControllers = [];

    this._sortComponent = new SortComponent();
    this._filmsComponent = new FilmsComponent();
    this._noDataComponent = new NoDataComponent();
    this._allMoviesComponent = new AllMoviesComponent();
    this._topRatedComponent = new TopRatedComponent();
    this._mostCommentedComponent = new MostCommentedComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();

    this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onShowMoreButtonClick = this._onShowMoreButtonClick.bind(this);

    this._sortComponent.setSortTypeHandler(this._onSortTypeChange);
  }

  render() {
    const films = this._moviesModel.getFilms();

    const containerElement = this._container.getElement();
    render(containerElement, this._sortComponent, RenderPosition.BEFOREEND);
    render(containerElement, this._filmsComponent, RenderPosition.BEFOREEND);

    const filmsElement = this._filmsComponent.getElement();
    render(filmsElement, this._allMoviesComponent, RenderPosition.BEFOREEND);

    if (!films.length) {
      render(filmsElement, this._noDataComponent, RenderPosition.BEFOREEND);
      return;
    }

    this._renderFilms(films.slice(0, this._showingFilmsCount));
    // this._renderExtra(films.slice(), this._topRatedComponent, FilmParameters.RATING);
    // this._renderExtra(films.slice(), this._mostCommentedComponent, FilmParameters.COMMENTS_COUNT);
    this._renderShowMoreButton();
  }

  _renderFilms(films) {
    const allMoviesListElement = this._allMoviesComponent.getElement().querySelector(`.films-list__container`);

    const newFilms = renderFilms(allMoviesListElement, films, this._onDataChange, this._onViewChange);

    this._showedMovieControllers = this._showedMovieControllers.concat(newFilms);
    this._showingFilmsCount = this._showedMovieControllers.length;
  }

  _removeFilms() {
    this._showedMovieControllers.forEach((movieController) => movieController.destroy());
    this._showedMovieControllers = [];
  }

  _renderExtra(films, component, type) {
    const filmsElement = this._filmsComponent.getElement();

    const sortedFilms = films
      .filter((film) => film[type] > 0)
      .sort((a, b) => b[type] - a[type]);

    if (sortedFilms.length) {
      render(filmsElement, component, RenderPosition.BEFOREEND);

      const extraContainer = component.getElement().querySelector(`.films-list__container`);

      renderFilms(extraContainer, sortedFilms.slice(0, 2), this._onDataChange, this._onViewChange);
    }
  }

  _renderShowMoreButton() {
    remove(this._showMoreButtonComponent);

    if (this._showingFilmsCount >= this._moviesModel.getFilms().length) {
      return;
    }

    const allMoviesSectionElement = this._allMoviesComponent.getElement();

    render(allMoviesSectionElement, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(this._onShowMoreButtonClick);
  }

  _onShowMoreButtonClick() {
    const prevFilmsCount = this._showingFilmsCount;
    this._showingFilmsCount += SHOWING_FILMS_COUNT_BY_BUTTON;

    const films = this._moviesModel.getFilms();

    const sortedFilms = getSortedFilms(films, this._sortComponent.getSortType(), prevFilmsCount, this._showingFilmsCount);

    this._renderFilms(sortedFilms);

    if (this._showingFilmsCount >= this._moviesModel.getFilms().length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _onDataChange(movieController, oldData, newData) {
    const isSuccess = (this._moviesModel.updateFilm(oldData.id, newData));

    if (isSuccess) {
      movieController.render(newData);
    }
  }

  _onViewChange() {
    this._showedMovieControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

    const sortedFilms = getSortedFilms(this._moviesModel.getFilms(), sortType, 0, this._showingFilmsCount);

    this._removeFilms();
    this._renderFilms(sortedFilms);
    this._renderShowMoreButton();
  }
}

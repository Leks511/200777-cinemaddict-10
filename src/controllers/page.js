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

const FilmPatameters = {
  RATING: `rating`,
  COMMENTS_COUNT: `commentsCount`
};


const renderFilms = (films, container) => {
  films
    .forEach((film) => renderFilm(film, container));
};

// Функция сортировки фильмов
const getSortedFilms = (films, sortType, from, to) => {
  let sortedFilms = [];
  const showingFilms = films.slice();

  switch (sortType) {
    case SortType.DATE:
      sortedFilms = showingFilms.sort((a, b) => a.releaseDate - b.releaseDate);
      break;
    case SortType.RATING:
      sortedFilms = showingFilms.sort((a, b) => a.rating - b.rating);
      break;
    case SortType.DEFAULT:
      sortedFilms = showingFilms;
      break;
  }

  return sortedFilms.slice(from, to);
};


export default class PageController {
  constructor(container) {
    this._container = container;

    this._sortComponent = new SortComponent();
    this._filmsComponent = new FilmsComponent();
    this._noDataComponent = new NoDataComponent();
    this._allMoviesComponent = new AllMoviesComponent();
    this._topRatedComponent = new TopRatedComponent();
    this._mostCommentedComponent = new MostCommentedComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
  }

  // Метод наполнения страницы контентом
  renderFilms(films) {
    // Функция рендеринга кнопки
    const renderShowMoreButton = () => {
      // Если число фильмов для показа больше или равно фильмов, то не кнопка не рендерится
      if (showingFilmsCount >= films.length) {
        return;
      }

      // Рендерим кнопку
      render(allMoviesSectionElement, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

      // Вешаем на неё обработчик
      this._showMoreButtonComponent.setClickHandler(() => {
        const prevFilmsCount = showingFilmsCount;
        showingFilmsCount += SHOWING_FILMS_COUNT_BY_BUTTON;

        // Берём отсортированные фильмы по типу
        const sortedFilms = getSortedFilms(films, this._sortComponent.getSortType(), prevFilmsCount, showingFilmsCount);

        // Рендерим их в контейнер
        renderFilms(sortedFilms, allMoviesListElement);

        // Если по итогу кол-во фильмов для показа больше, чем общее кол-во или равно, то убираем кнопку
        if (showingFilmsCount >= films.length) {
          remove(this._showMoreButtonComponent);
        }
      });
    };


    // Найдём контейнер контроллера и наполним его компонентом сортировки и фильм-листа
    const containerElement = this._container.getElement();
    render(containerElement, this._sortComponent, RenderPosition.BEFOREEND);
    render(containerElement, this._filmsComponent, RenderPosition.BEFOREEND);

    // Найдём главную доску фильмов
    const filmsElement = this._filmsComponent.getElement();

    // Если фильмов нет, то скажем, что фильмов нет
    if (!films.length) {
      render(filmsElement, this._noDataComponent, RenderPosition.BEFOREEND);
      return;
    }


    // Иначе - отрендерим секцию для всех фильмов и найдём элемент контейнера
    render(filmsElement, this._allMoviesComponent, RenderPosition.BEFOREEND);

    const allMoviesSectionElement = this._allMoviesComponent.getElement();
    const allMoviesListElement = allMoviesSectionElement.querySelector(`.films-list__container`);


    let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

    // Сразу отрендерим первые имеющиеся фильмы и кнопку
    renderFilms(films.slice(0, showingFilmsCount), allMoviesListElement);
    renderShowMoreButton();

    // Вызовем метод sortComponent для подписки на обработчик: повесим обработчик
    this._sortComponent.setSortTypeHandler((sortType) => {
      showingFilmsCount = SHOWING_FILMS_COUNT_BY_BUTTON;

      const sortedFilms = getSortedFilms(films, sortType, 0, showingFilmsCount);

      allMoviesListElement.innerHTML = ``;

      renderFilms(sortedFilms, allMoviesListElement);
      renderShowMoreButton();
    });


    // Функция для наполнения доп. секций
    const renderExtra = (component, type) => {
      const sortedFilms = films
        .slice()
        .filter((film) => film[type] > 0)
        .sort((a, b) => b[type] - a[type]);

      if (sortedFilms.length) {
        render(filmsElement, component, RenderPosition.BEFOREEND);

        const extraContainer = component.getElement().querySelector(`.films-list__container`);

        renderFilms(sortedFilms.slice(0, 2), extraContainer);
      }
    };


    // Наполним Top Rated и Most Commented
    renderExtra(this._topRatedComponent, FilmPatameters.RATING);
    renderExtra(this._mostCommentedComponent, FilmPatameters.COMMENTS_COUNT);
  }
}

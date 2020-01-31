import SortComponent, {SortType} from '../components/sort';
import NotFoundFilmsComponent from '../components/not-found-films';
import TopRatedFilmsComponent from '../components/top-rated-films';
import MostCommentedFilmsComponent from '../components/most-commented-films';
import ShowMoreButtonComponent from '../components/show-more-button';
import MainFilmsListComponent from '../components/main-films-list';

import MovieController from './movie';

import {render, remove, RenderPosition} from '../utils/render';

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const mainElement = document.querySelector(`.main`);

const FilmParametres = {
  RATING: `rating`,
  COMMENTS: `comments`
};


// Функция рендеринга фильмов
const renderFilmCards = (filmCardsContainer, films, onDataChange) => {
  films.forEach((film) => {
    const movieController = new MovieController(filmCardsContainer, onDataChange);
    movieController.render(film);
  });
};

// Функция для рендеринга фильмов в доп. секциях по определённому параметру
const checkFilmsOnParam = (filmsToCheck, paramToCheck, containerToRender) => {
  const filmsList = filmsToCheck
    .slice()
    .sort((a, b) => {
      return b[paramToCheck] - a[paramToCheck];
    })
    .slice(0, 2);

  renderFilmCards(containerToRender, filmsList);
};

export default class PageController {
  constructor(container) {
    this._container = container;

    this._films = [];

    this._sortComponent = new SortComponent();

    this._mainFilmsListComponent = new MainFilmsListComponent();
    this._notFoundFilmsComponent = new NotFoundFilmsComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();

    this._topRatedFilmsComponent = new TopRatedFilmsComponent();
    this._mostCommentedFilmsComponent = new MostCommentedFilmsComponent();

    this._onDataChange = this._onDataChange.bind(this);
  }

  render(films) {
    this._films = films;

    const container = this._container.getElement();

    // При рендеринге фильмов сразу рендерим сортировку
    render(mainElement, this._sortComponent, RenderPosition.BEFOREEND);

    // Если фильмов - 0 , то отобразим сообщение об отсутствии
    if (!films.length) {
      render(container, this._notFoundFilmsComponent, RenderPosition.BEFOREEND);
    } else {

      // Функция добавления карточек на доску по нажатию
      const showMoreFilms = () => {
        const prevFilmsCount = showingFilmsCount;
        showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

        renderFilmCards(
            mainFilmsContainerElement,
            films.slice(prevFilmsCount, showingFilmsCount),
            this._onDataChange
        );

        if (showingFilmsCount >= films.length) {
          remove(this._showMoreButtonComponent);
        }
      };


      // Функция рендеринга кнопки Show More
      const renderShowMoreButton = () => {
        if (showingFilmsCount >= films.length) {
          return;
        }

        // Отрендерим кнопку
        render(this._mainFilmsListComponent.getElement(), this._showMoreButtonComponent, RenderPosition.BEFOREEND);

        // Добавим функционал для "Show more"
        this._showMoreButtonComponent.setClickHandler(showMoreFilms);
      };


      // Найдём главный контейнер для фильмов
      const mainFilmsContainerElement = this._mainFilmsListComponent.getElement().querySelector(`.films-list__container`);

      // Повесим обработчик клика на сортировку
      this._sortComponent.setChangeSortTypeHandler((sortType) => {
        let sortedFilms = [];

        switch (sortType) {
          case SortType.BY_DATE:
            sortedFilms = films.slice().sort((a, b) => b.year - a.year);
            break;
          case SortType.BY_RATING:
            sortedFilms = films.slice().sort((a, b) => b.rating - a.rating);
            break;
          case SortType.DEFAULT:
            sortedFilms = films.slice(0, showingFilmsCount);
            break;
        }

        mainFilmsContainerElement.innerHTML = ``;

        renderFilmCards(
            mainFilmsContainerElement,
            sortedFilms,
            this._onDataChange);

        // Если сортировка была по дефолту, то отобразим кнопку. Нет - удалим
        if (sortType === SortType.DEFAULT) {
          renderShowMoreButton();
        } else {
          remove(this._showMoreButtonComponent);
        }
      });

      // Отобразим несколько фильмов при старте
      let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
      renderFilmCards(
          mainFilmsContainerElement,
          films.slice(0, showingFilmsCount),
          this._onDataChange);

      // Отображаем основной список и кнопку загрузки
      render(container, this._mainFilmsListComponent, RenderPosition.BEFOREEND);
      renderShowMoreButton();


      // Отобразим доп. секции с фильмами и сразу найдём в них контейнеры для фильмов
      render(container, this._topRatedFilmsComponent, RenderPosition.BEFOREEND);
      const topRatedFilmsContainerElement = this._topRatedFilmsComponent.getElement().querySelector(`.films-list__container`);

      render(container, this._mostCommentedFilmsComponent, RenderPosition.BEFOREEND);
      const mostCommentedFilmsContainerElement = this._mostCommentedFilmsComponent.getElement().querySelector(`.films-list__container`);


      // Отрендерим фильмы в доп. секциях по параметрам
      checkFilmsOnParam(
          films,
          FilmParametres.RATING,
          topRatedFilmsContainerElement);

      checkFilmsOnParam(
          films,
          FilmParametres.COMMENTS,
          mostCommentedFilmsContainerElement);

      // Добавим функционал для "Show more"
      this._showMoreButtonComponent.setClickHandler(showMoreFilms);
    }
  }

  _onDataChange(filmController, oldData, newData) {
    const index = this._films.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._films = [].concat(
        this._films.slice(0, index),
        newData,
        this._films.slice(index + 1));

    filmController.render(this._films[index]);
  }
}

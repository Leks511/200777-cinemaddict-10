import SortComponent, {SortType} from '../components/sort';
import NotFoundFilmsComponent from '../components/not-found-films';
import FilmCardComponent from '../components/film';
import FilmDetailsComponent from '../components/film-details';
import TopRatedFilmsComponent from '../components/top-rated-films';
import MostCommentedFilmsComponent from '../components/most-commented-films';
import ShowMoreButtonComponent from '../components/show-more-button';
import MainFilmsListComponent from '../components/main-films-list';

import {render, remove, RenderPosition} from '../utils/render';

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const mainElement = document.querySelector(`.main`);

const FilmParametres = {
  RATING: `rating`,
  COMMENTS: `comments`
};

const footerElement = document.querySelector(`.footer`);

// Функция рендеринга фильма
const renderFilmCard = (filmCardsContainer, film) => {
  const filmCardComponent = new FilmCardComponent(film);
  const filmDetailsComponent = new FilmDetailsComponent(film);

  // Функция закрытия попапа
  const closePopup = () => {
    remove(filmDetailsComponent);
  };

  // Закрытие попапа по нажатию Esc
  const onPopupEscPress = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      closePopup();
      document.removeEventListener(`keydown`, onPopupEscPress);
    }
  };

  // Функция показа попапа
  const showPopup = () => {
    render(footerElement, filmDetailsComponent, RenderPosition.AFTEREND);

    filmDetailsComponent.setCloseButtonClickHandler(closePopup);
    document.addEventListener(`keydown`, onPopupEscPress);
  };

  // Привязка функционала к каждому попапу фильма
  filmCardComponent.setLinksClickHandler(() => showPopup());

  // Рендер карточек фильмов и привязка функционала
  render(filmCardsContainer, filmCardComponent, RenderPosition.BEFOREEND);
};

// Функция рендеринга фильмов
const renderFilmCards = (filmCardsContainer, films) => {
  films.forEach((film) => {
    renderFilmCard(filmCardsContainer, film);
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

    this._sortComponent = new SortComponent();

    this._mainFilmsListComponent = new MainFilmsListComponent();
    this._notFoundFilmsComponent = new NotFoundFilmsComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();

    this._topRatedFilmsComponent = new TopRatedFilmsComponent();
    this._mostCommentedFilmsComponent = new MostCommentedFilmsComponent();
  }

  render(films) {
    const container = this._container.getElement();

    // При рендеринге фильмов сразу рендерим сортировку
    render(mainElement, this._sortComponent, RenderPosition.BEFOREEND);

    // Если фильмов - 0 , то отобразим сообщение об отсутствии
    if (!films.length) {
      render(container, this._notFoundFilmsComponent, RenderPosition.BEFOREEND);
    } else {

      // Найдём главный контейнер для фильмов
      const mainFilmsContainerElement = this._mainFilmsListComponent.getElement().querySelector(`.films-list__container`);

      // Повесим обработчик клика на сортировку
      this._sortComponent.setChangeSortTypeHandler((sortType) => {
        let sortedFilms = [];

        switch (sortType) {
          case SortType.BY_DATE:
            sortedFilms = films.slice().sort((a, b) => a.year - b.year);
            break;
          case SortType.BY_RATING:
            sortedFilms = films.slice().sort((a, b) => a.rating - b.rating);
            break;
          case SortType.DEFAULT:
            sortedFilms = films.slice(0, showingFilmsCount);
            break;
        }

        mainFilmsContainerElement.innerHTML = ``;

        console.log(sortedFilms);
      });

      // Отображаем основной список и кнопку загрузки
      render(container, this._mainFilmsListComponent, RenderPosition.BEFOREEND);
      render(this._mainFilmsListComponent.getElement(), this._showMoreButtonComponent, RenderPosition.BEFOREEND);


      // Отобразим доп. секции с фильмами и сразу найдём в них контейнеры для фильмов
      render(container, this._topRatedFilmsComponent, RenderPosition.BEFOREEND);
      const topRatedFilmsContainerElement = this._topRatedFilmsComponent.getElement().querySelector(`.films-list__container`);

      render(container, this._mostCommentedFilmsComponent, RenderPosition.BEFOREEND);
      const mostCommentedFilmsContainerElement = this._mostCommentedFilmsComponent.getElement().querySelector(`.films-list__container`);

      // Отобразим несколько фильмов при старте
      let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
      renderFilmCards(mainFilmsContainerElement, films.slice(0, showingFilmsCount));

      // Отрендерим фильмы в доп. секциях по параметрам
      checkFilmsOnParam(
          films,
          FilmParametres.RATING,
          topRatedFilmsContainerElement);

      checkFilmsOnParam(
          films,
          FilmParametres.COMMENTS,
          mostCommentedFilmsContainerElement);


      // Функция добавления карточек на доску по нажатию
      const showMoreFilms = () => {
        const prevFilmsCount = showingFilmsCount;
        showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

        renderFilmCards(
            mainFilmsContainerElement,
            films.slice(prevFilmsCount, showingFilmsCount)
        );

        if (showingFilmsCount >= films.length) {
          remove(this._showMoreButtonComponent);
        }
      };

      // Добавим функционал для "Show more"
      this._showMoreButtonComponent.setClickHandler(showMoreFilms);
    }
  }
}

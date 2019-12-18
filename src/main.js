import NoDataComponent from './components/no-data';
import FilmComponent from './components/film';
import FilmDetailsComponent from './components/film-details';
import MenuComponent from './components/menu';
import FilmsBoardComponent from './components/films-content';
import ShowMoreButtonComponent from './components/show-more-button';
import UserRankComponent from './components/user-rank';
import TopRatedFilmsComponent from './components/top-rated-films';
import MostCommentedFilmsComponent from './components/most-commented-films';
import FooterStatisticComponent from './components/footer-statistic';

// Получим данные для их отображения в компонентах
import {createFilmCardMocks} from './mock/film';
import {createFilterMock} from './mock/filter';

import {render, RenderPosition} from './util';

const FILMS_QUANTITY = 20;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const showMoreButton = new ShowMoreButtonComponent();

const bindClosingToPopup = (popupComponent) => {
  const closePopupButtonElement = popupComponent.getElement().querySelector(`.film-details__close-btn`);

  closePopupButtonElement.addEventListener(`click`, () => {
    popupComponent.getElement().remove();
    popupComponent.removeElement();
  });
};

const getFilm = (film) => {
  const filmComponent = new FilmComponent(film);
  const filmDetailsComponent = new FilmDetailsComponent(film);

  const linksToFilmDetails = [
    filmComponent.getElement().querySelector(`.film-card__title`),
    filmComponent.getElement().querySelector(`.film-card__poster`),
    filmComponent.getElement().querySelector(`.film-card__comments`)
  ];

  linksToFilmDetails.forEach((link) => link.addEventListener(`click`, () => {
    render(footerElement, filmDetailsComponent.getElement(), RenderPosition.AFTEREND);

    bindClosingToPopup(filmDetailsComponent);
  }));

  return filmComponent.getElement();
};

// Найдём элемент header и отрендерим туда рейтинг пользователя
const headerElement = document.querySelector(`.header`);
render(headerElement, new UserRankComponent(FILMS_QUANTITY).getElement(), RenderPosition.BEFOREEND);

// Найдём элемент main
const mainElement = document.querySelector(`.main`);

// Получим данные фильтров и отрендерим в main меню с фильтрами
const filters = createFilterMock();
render(mainElement, new MenuComponent(filters).getElement(), RenderPosition.BEFOREEND);

// Отобразим секцию с фильмами
render(mainElement, new FilmsBoardComponent().getElement(), RenderPosition.BEFOREEND);

// Найдём секцию с фильмами и отобразим туда все фильмы
const filmsContentElement = document.querySelector(`.films`);
const mainFilmsContainerElement = filmsContentElement.querySelector(`.films-list .films-list__container`);
render(mainFilmsContainerElement, showMoreButton.getElement(), RenderPosition.BEFOREEND);

// Получим данные фильмов и отобразим карточки определённое кол-во раз
const films = createFilmCardMocks(FILMS_QUANTITY);

let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
films.slice(0, showingFilmsCount)
  .forEach((film) => {
    render(showMoreButton.getElement(), getFilm(film), RenderPosition.BEFOREBEGIN);
  });

// Добавим функционал для "Show more"
showMoreButton.getElement().addEventListener(`click`, () => {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

  films.slice(prevFilmsCount, showingFilmsCount)
    .forEach((film) => {
      render(showMoreButton.getElement(), getFilm(film), RenderPosition.BEFOREBEGIN);
    });

  if (showingFilmsCount >= films.length) {
    showMoreButton.getElement().remove();
    showMoreButton.removeElement();
  }
});

const footerElement = document.querySelector(`.footer`);
render(footerElement, new FooterStatisticComponent(FILMS_QUANTITY).getElement(), RenderPosition.BEFOREEND);

// Функция для проверки фильмов с топовым рейтингом
const checkTopRatedFilms = (filmsToCheck) => {
  const topFilms = filmsToCheck
    .slice()
    .sort((a, b) => {
      return b.rating - a.rating;
    })
    .slice(0, 2);

  if (topFilms.length > 0) {
    const filmCards = topFilms
      .map((film) => getFilm(film));

    const topRatedFilmsComponent = new TopRatedFilmsComponent();

    render(filmsContentElement, topRatedFilmsComponent.getElement(), RenderPosition.BEFOREEND);

    const filmContainer = topRatedFilmsComponent.getElement().querySelector(`.films-list__container`);

    filmCards.forEach((film) => {
      render(filmContainer, film, RenderPosition.BEFOREEND);
    });
  }
};

// Функция для проверки фильмов с наибольшим кол-вом комментариев
const checkMostCommentedFilms = (filmsToCheck) => {
  const topFilms = filmsToCheck
    .slice()
    .sort((a, b) => {
      return b.comments - a.comments;
    })
    .slice(0, 2);


  if (topFilms.length > 0) {
    const filmCards = topFilms
      .map((film) => getFilm(film));

    const mostCommentedFilmsComponent = new MostCommentedFilmsComponent();

    render(filmsContentElement, mostCommentedFilmsComponent.getElement(), RenderPosition.BEFOREEND);

    const filmContainer = mostCommentedFilmsComponent.getElement().querySelector(`.films-list__container`);

    filmCards.forEach((film) => {
      render(filmContainer, film, RenderPosition.BEFOREEND);
    });
  }
};

// Проверим фильмы на определённые условия и отрендерим найденные
checkTopRatedFilms(films);
checkMostCommentedFilms(films);

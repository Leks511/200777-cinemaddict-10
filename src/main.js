import FilmComponent from './components/film';
// import {createFilmDetailsTemplate} from './components/film-details';
import MenuComponent from './components/menu';
import FilmsBoardComponent from './components/films-content';
import ShowMoreButtonComponent from './components/show-more-button';
import UserRankComponent from './components/user-rank';
import TopRatedFilmsComponent from './components/top-rated-films';
import MostCommentedFilmsComponent from './components/most-commented-films';
import FooterStatisticComponent from './components/footer-statistic';

// Получим данные для их отображения в компонентах
// import {createFilmDetailsMock} from './mock/film-details';
import {createFilmCardMocks} from './mock/film';
import {createFilterMock} from './mock/filter';

import {render, RenderPosition} from './util';

const FILMS_QUANTITY = 20;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

// Найдём элемент header и отрендерим туда рейтинг пользователя
const headerElement = document.querySelector(`.header`);
render(headerElement, UserRankComponent.getElement(FILMS_QUANTITY), RenderPosition.BEFOREEND);

// Найдём элемент main
const mainElement = document.querySelector(`.main`);

// Получим данные фильтров и отрендерим в main меню с фильтрами
const filters = createFilterMock();
render(mainElement, createMenuTemplate(filters), RenderPosition.BEFOREEND);

// Отобразим секцию с фильмами
render(mainElement, createFilmsContentTemplate(), RenderPosition.BEFOREEND);

// Найдём секцию с фильмами и отобразим туда все фильмы
const filmsContentElement = document.querySelector(`.films`);
const mainFilmsContainerElement = filmsContentElement.querySelector(`.films-list .films-list__container`);

// Получим данные фильмов и отобразим карточки определённое кол-во раз
const films = createFilmCardMocks(FILMS_QUANTITY);

let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
films.slice(0, showingFilmsCount).forEach((film) => render(mainFilmsContainerElement, createFilmCardTemplate(film), RenderPosition.BEFOREEND));


// Отобразим кнопку "Show more" и найдём её
render(mainFilmsContainerElement, createShowMoreButtonTemplate(), RenderPosition.AFTERBEGIN);
const showMoreButton = filmsContentElement.querySelector(`.films-list__show-more`);

showMoreButton.addEventListener(`click`, () => {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

  films.slice(prevFilmsCount, showingFilmsCount)
    .forEach((film) => render(mainFilmsContainerElement, createFilmCardTemplate(film), `beforeend`));

  if (showingFilmsCount >= films.length) {
    showMoreButton.remove();
  }
});

const footerElement = document.querySelector(`.footer`);
render(footerElement, createFooterStatisticTemplate(FILMS_QUANTITY), RenderPosition.BEFOREEND);

// Временно скроем всплывающее окно
// const filmDetailsMock = createFilmDetailsMock();
// render(footerElement, createFilmDetailsTemplate(filmDetailsMock), RenderPosition.AFTEREND);


// Функция для проверки фильмов с топовым рейтингом
const checkTopRatedFilms = (filmsToCheck) => {
  const topRatedFilms = filmsToCheck
    .slice()
    .sort((a, b) => {
      return b.rating - a.rating;
    })
    .slice(0, 2);

  if (topRatedFilms.length > 0) {
    const filmsMorkup = topRatedFilms.map((film) => createFilmCardTemplate(film)).join(``);

    render(filmsContentElement, createTopRatedFilmsList(filmsMorkup), RenderPosition.BEFOREEND);
  }
};

// Функция для проверки фильмов с наибольшим кол-вом комментариев
const checkMostCommentedFilms = (filmsToCheck) => {
  const mostCommentedFilms = filmsToCheck
    .slice()
    .sort((a, b) => {
      return b.comments - a.comments;
    })
    .slice(0, 2);


  if (mostCommentedFilms.length > 0) {

    const filmsMorkup = mostCommentedFilms.map((film) => createFilmCardTemplate(film)).join(``);

    render(filmsContentElement, createMostCommentedFilmsList(filmsMorkup), RenderPosition.BEFOREEND);
  }
};

// Проверим фильмы на определённые условия и отрендерим найденные
checkTopRatedFilms(films);
checkMostCommentedFilms(films);

//
// render(MostCommentedFilmsContainerElement, createFilmCardTemplate(filmMockData), RenderPosition.BEFOREEND);

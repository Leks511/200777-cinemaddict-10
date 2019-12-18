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

const renderFilm = (film) => {
  const filmComponent = new FilmComponent(film);
  const filmDetailsComponent = new FilmDetailsComponent(film);

  const filmTitle = filmComponent.getElement().querySelector(`.film-card__title`);
  const filmPoster = filmComponent.getElement().querySelector(`.film-card__poster`);
  const filmComments = filmComponent.getElement().querySelector(`.film-card__comments`);

  const filmCloseButton = filmDetailsComponent.getElement();

  filmTitle.addEventListener(`click`, () => {});
  filmPoster.addEventListener(`click`, () => {});
  filmComments.addEventListener(`click`, () => {});

  filmCloseButton.addEventListener(`click`, () => {});

  render(showMoreButton.getElement(), filmComponent.getElement(), RenderPosition.BEFOREBEGIN);
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
    renderFilm(film);
  });

// Добавим функционал для "Show more"
showMoreButton.getElement().addEventListener(`click`, () => {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

  films.slice(prevFilmsCount, showingFilmsCount)
    .forEach((film) => renderFilm(film));

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
    const filmCards = topFilms.map((film) => new FilmComponent(film).getTemplate()).join(``);

    render(filmsContentElement, new TopRatedFilmsComponent(filmCards).getElement(), RenderPosition.BEFOREEND);
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
    const filmCards = topFilms.map((film) => new FilmComponent(film).getTemplate()).join(``);

    render(filmsContentElement, new MostCommentedFilmsComponent(filmCards).getElement(), RenderPosition.BEFOREEND);
  }
};

// Проверим фильмы на определённые условия и отрендерим найденные
checkTopRatedFilms(films);
checkMostCommentedFilms(films);

import NoDataTitleComponent from './components/no-data-title';
import YesgDataTitleComponent from './components/yes-data-title';
import FilmComponent from './components/film';
import FilmDetailsComponent from './components/film-details';
import MenuComponent from './components/menu';
import SortComponent from './components/sort';
import BoardComponent from './components/board';
import AllFimsComponent from './components/all-films';
import ShowMoreButtonComponent from './components/show-more-button';
import UserRankComponent from './components/user-rank';
import TopRatedFilmsComponent from './components/top-rated-films';
import MostCommentedFilmsComponent from './components/most-commented-films';
import FooterStatisticComponent from './components/footer-statistic';

// Получим данные для их отображения в компонентах
import {createFilmCardMocks} from './mock/film';
import {createFilterMock} from './mock/filter';

import {render, RenderPosition} from './util';

const FILMS_QUANTITY = 10;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;
const ESC_CODE = 27;

// Найдём элементы страницы для последующего использования
const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

// Объявим компоненты для последующего многоразового использования
const boardComponent = new BoardComponent();
const showMoreButton = new ShowMoreButtonComponent();

// Функция, закрывающая попап фильма
const bindClosingToPopup = (popupComponent) => {
  const closePopupButtonElement = popupComponent.getElement().querySelector(`.film-details__close-btn`);

  // Функция, закрывающая попап
  const closePopup = () => {
    popupComponent.getElement().remove();
    popupComponent.removeElement();
  };

  // Функция прослушки
  const onPopupEscPress = (evt) => {
    if (evt.keyCode === ESC_CODE) {
      closePopup();
      document.removeEventListener(`keydown`, onPopupEscPress);
    }
  };

  // Добавим прослушку на закрытие попапа
  document.addEventListener(`keydown`, onPopupEscPress);
  closePopupButtonElement.addEventListener(`click`, closePopup);
};

// Функция, добавляющая функционал на каждую карту фильма
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
render(headerElement, new UserRankComponent(FILMS_QUANTITY).getElement(), RenderPosition.BEFOREEND);

// Получим данные фильтров и отрендерим в main меню с фильтрами
const filters = createFilterMock();
render(mainElement, new MenuComponent(filters).getElement(), RenderPosition.BEFOREEND);
render(mainElement, new SortComponent().getElement(), RenderPosition.BEFOREEND);

// Отобразим секцию для фильмов и найдём основные элементы
render(mainElement, boardComponent.getElement(), RenderPosition.BEFOREEND);
const filmsSectionElement = mainElement.querySelector(`.films`);
const filmsListElement = filmsSectionElement.querySelector(`.films-list`);

// Получим данные фильмов и отобразим карточки определённое кол-во раз
const films = createFilmCardMocks(FILMS_QUANTITY);

if (!films.length) {
  render(filmsListElement, new NoDataTitleComponent().getElement(), RenderPosition.BEFOREEND);
} else {
  // Найдём секцию с фильмами и отобразим туда все фильмы
  const mainFilmsListElement = boardComponent.getElement().querySelector(`.films-list`);
  render(mainFilmsListElement, new YesgDataTitleComponent().getElement(), RenderPosition.BEFOREEND);
  render(mainFilmsListElement, new AllFimsComponent().getElement(), RenderPosition.BEFOREEND);
  render(mainFilmsListElement, showMoreButton.getElement(), RenderPosition.BEFOREEND);

  const filmsContainerElement = mainFilmsListElement.querySelector(`.films-list__container`);

  // Отобразим стартовое кол-во фильмов
  let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
  films.slice(0, showingFilmsCount)
    .forEach((film) => {
      render(filmsContainerElement, getFilm(film), RenderPosition.BEFOREEND);
    });

  // Добавим функционал для "Show more"
  showMoreButton.getElement().addEventListener(`click`, () => {
    const prevFilmsCount = showingFilmsCount;
    showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

    films.slice(prevFilmsCount, showingFilmsCount)
      .forEach((film) => {
        render(filmsContainerElement, getFilm(film), RenderPosition.BEFOREEND);
      });

    if (showingFilmsCount >= films.length) {
      showMoreButton.getElement().remove();
      showMoreButton.removeElement();
    }
  });

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

      render(filmsSectionElement, topRatedFilmsComponent.getElement(), RenderPosition.BEFOREEND);

      const filmContainerElement = topRatedFilmsComponent.getElement().querySelector(`.films-list__container`);

      filmCards.forEach((film) => {
        render(filmContainerElement, film, RenderPosition.BEFOREEND);
      });
    }
  };

  // // Функция для проверки фильмов с наибольшим кол-вом комментариев
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

      render(filmsSectionElement, mostCommentedFilmsComponent.getElement(), RenderPosition.BEFOREEND);

      const filmContainerElement = mostCommentedFilmsComponent.getElement().querySelector(`.films-list__container`);

      filmCards.forEach((film) => {
        render(filmContainerElement, film, RenderPosition.BEFOREEND);
      });
    }
  };

  // // Проверим фильмы на определённые условия и отрендерим найденные
  checkTopRatedFilms(films);
  checkMostCommentedFilms(films);
}

// Рендеринг статистики в футере
const footerElement = document.querySelector(`.footer`);
render(footerElement, new FooterStatisticComponent(FILMS_QUANTITY).getElement(), RenderPosition.BEFOREEND);

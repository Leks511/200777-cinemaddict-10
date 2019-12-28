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

// Функция, закрывающая попап фильма
const bindClosingToPopup = (popupComponent) => {

  // Функция прослушки нажатия ESC
  const onPopupEscPress = (evt) => {
    if (evt.keyCode === ESC_CODE) {
      remove(popupComponent);
      document.removeEventListener(`keydown`, onPopupEscPress);
    }
  };

  // Добавим прослушку на закрытие попапа
  document.addEventListener(`keydown`, onPopupEscPress);
  popupComponent.setCloseButtonClickHandler(remove(popupComponent));
};




export default class PageController {
  constructor(container) {
    this._container = container;

    this._mainFilmsListComponent = new MainFilmsListComponent();
    this._notFoundFilmsComponent = new NotFoundFilmsComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();

    this._topRatedFilmsComponent = new TopRatedFilmsComponent();
    this._mostCommentedFilmsComponent = new MostCommentedFilmsComponent();
  }

  render(films) {
    this._films = films;

    const container = this._container.getElement();

    // Если фильмов - 0 , то отобразим сообщение об отсутствии
    if (!films.length) {
      render(container, this._notFoundFilmsComponent, RenderPosition.BEFOREEND);
    }

    // Иначе- отобразим содержимое на доску с фильмами
    else {
      // Отображаем основной список и кнопку загрузки
      render(container, this._mainFilmsListComponent, RenderPosition.BEFOREEND);
      render(this._mainFilmsListComponent.getElement(), this._showMoreButtonComponent, RenderPosition.BEFOREEND);


      // Найдём главный контейнер для фильмов
      const mainFilmsContainerElement = this._mainFilmsListComponent.getElement().querySelector(`.films-list__container`);


      // Отобразим доп. секции с фильмами и сразу найдём в них контейнеры для фильмов
      render(container, this._topRatedFilmsComponent, RenderPosition.BEFOREEND);
      const topRatedFilmsContainerElement = this._topRatedFilmsComponent.getElement().querySelector(`.films-list__container`);

      render(container, this._mostCommentedFilmsComponent, RenderPosition.BEFOREEND);
      const mostCommentedFilmsContainerElement = this._mostCommentedFilmsComponent.getElement().querySelector(`.films-list__container`);



      // Функция, навешивающая обработчики событий на части карточки фильма.
      const renderFilmCards = (startFilmNumber, endFilmNumber, films) => {
        films.slice(startFilmNumber, endFilmNumber)
          .forEach((film) => {
            const filmCardComponent = new FilmCardComponent(film);
            const filmDetailsComponent = new FilmDetailsComponent(film);

            // Привязка функционала к каждому попапу фильма
            bindClosingToPopup(filmDetailsComponent);

            // Рендер карточек фильмов и привязка функционала
            render(mainFilmsContainerElement, filmCardComponent, RenderPosition.BEFOREEND);

            filmCardComponent.setLinksClickHandler();
          });
      };

      // Отобразим несколько фильмов при старте
      let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
      renderFilmCards(0, showingFilmsCount, this._films);


      // Функция нахождения фильмов с топовым рейтингом
      const checkTopRatedFilms = (filmsToCheck) => {
        filmsToCheck
          .slice()
          .sort((a, b) => {
            return b.rating - a.rating;
          })
          .slice(0, 2)
          .map((film) => {
            render(topRatedFilmsContainerElement, new FilmCardComponent(film), RenderPosition.BEFOREEND);
          });
      };

      // Функция для проверки фильмов с наибольшим кол-вом комментариев
      const checkMostCommentedFilms = (filmsToCheck) => {
        filmsToCheck
          .slice()
          .sort((a, b) => {
            return b.comments - a.comments;
          })
          .slice(0, 2)
          .map((film) => {
            render(mostCommentedFilmsContainerElement, new FilmCardComponent(film), RenderPosition.BEFOREEND);
          });
      };

      // Проверим фильмы на определённые условия и отрендерим найденные
      checkTopRatedFilms(this._films);
      checkMostCommentedFilms(films);


      // Функция добавления карточек на доску по нажатию
      const addFilmsToBoard = () => {
        const prevFilmsCount = showingFilmsCount;
        showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

        renderFilmCards(prevFilmsCount, showingFilmsCount, this._films);

        if (showingFilmsCount >= films.length) {
          remove(this._showMoreButtonComponent);
        }
      };

      // Добавим функционал для "Show more"
      this._showMoreButtonComponent.setClickHandler(addFilmsToBoard);
    }
  }
}

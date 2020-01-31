import FilmCardComponent from '../components/film';
import FilmDetailsComponent from '../components/film-details';

import {render, remove, RenderPosition} from '../utils/render';

const footerElement = document.querySelector(`.footer`);

export default class MovieController {
  constructor(container, onDataChange) {
    this._container = container;

    this._onDataChange = onDataChange;

    // Создаём компоненты, которые потом будем наполнять из рендера и использовать
    // Пока - заглушки
    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
  }

  render(film) {
    // Метод берёт film из контроллера page и помещает в свой _film
    const oldFilmComponent = this._filmCardComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;

    // На его основе создаются компоненты карточки фильма и попапа фильма
    this._filmCardComponent = new FilmCardComponent(film);
    this._filmDetailsComponent = new FilmDetailsComponent(film);

    // Функция показа попапа
    const showPopup = () => {
      render(footerElement, this._filmDetailsComponent, RenderPosition.AFTEREND);

      this._filmDetailsComponent.setCloseButtonClickHandler(closePopup);
      document.addEventListener(`keydown`, onEscKeyDown);
    };

    // Функция закрытия попапа
    const closePopup = () => {
      remove(this._filmDetailsComponent);
    };

    // Закрытие попапа по нажатию Esc
    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

      if (isEscKey) {
        closePopup();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };


    // По клику на элементы карты покажем попап
    this._filmCardComponent.setLinksClickHandler(() => showPopup());


    // Опишем обработчики на кнопках карточки фильма
    this._filmCardComponent.setAddToWatchlistButtonClickHandler((evt) => {
      evt.preventDefault();

      this._onDataChange(this, film, Object.assign({}, film, {
        inWatchlist: !film.inWatchlist,
      }));
    });

    this._filmCardComponent.setMarkAsWatchedButtonClickHandler((evt) => {
      evt.preventDefault();

      this._onDataChange(this, film, Object.assign({}, film, {
        isWatched: !film.isWatched,
      }));
    });

    this._filmCardComponent.setMarkAsFavoriteButtonClickHandler((evt) => {
      evt.preventDefault();

      this._onDataChange(this, film, Object.assign({}, film, {
        isFavorite: !film.isFavorite,
      }));
    });


    // Опишем обработчики на кнопках попапа
    this._filmDetailsComponent.setMarkAsWatchedButtonClickHandler(() => {
      film.isWatched = !film.isWatched;
    });


    // Отрендерим фильм
    render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
  }

}

import FilmCardComponent from '../components/film';
import FilmDetailsComponent from '../components/film-details';

import {render, remove, RenderPosition} from '../utils/render';

const footerElement = document.querySelector(`.footer`);

export default class MovieController {
  constructor(container) {
    this._container = container;
  }

  render(film) {
    // Метод берёт film из контроллера page и помещает в свой _film
    this._film = film;

    // На его основе создаются компоненты карточки фильма и попапа фильма
    this._filmCardComponent = new FilmCardComponent(this._film);
    this._filmDetailsComponent = new FilmDetailsComponent(this._film);

    // Функция закрытия попапа
    const closePopup = () => {
      remove(this._filmDetailsComponent);
    };

    // // Закрытие попапа по нажатию Esc
    const onPopupEscPress = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

      if (isEscKey) {
        closePopup();
        document.removeEventListener(`keydown`, onPopupEscPress);
      }
    };

    // // Функция показа попапа
    const showPopup = () => {
      render(footerElement, this._filmDetailsComponent, RenderPosition.AFTEREND);

      this._filmDetailsComponent.setCloseButtonClickHandler(closePopup);
      document.addEventListener(`keydown`, onPopupEscPress);
    };

    // // Привязка функционала к каждому попапу фильма
    this._filmCardComponent.setLinksClickHandler(() => showPopup());

    // // Рендер карточек фильмов и привязка функционала
    render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
  }

}

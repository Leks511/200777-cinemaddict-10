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

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(film) {
    // Метод берёт film из контроллера page и помещает в свой _film
    const oldFilmComponent = this._filmCardComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;

    // На его основе создаются компоненты карточки фильма и попапа фильма
    this._filmCardComponent = new FilmCardComponent(film);
    this._filmDetailsComponent = new FilmDetailsComponent(film);

    // По клику на элементы карты покажем попап
    this._filmCardComponent.setLinksClickHandler(() => this._showPopup());

    // Отрендерим фильм
    render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
  }

  // Функция закрытия попапа
  _closePopup() {
    remove(this._filmDetailsComponent);
  }

  // Функция показа попапа
  _showPopup() {
    render(footerElement, this._filmDetailsComponent, RenderPosition.AFTEREND);

    this._filmDetailsComponent.setCloseButtonClickHandler(this._closePopup);
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  // Закрытие попапа по нажатию Esc
  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._closePopup();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}

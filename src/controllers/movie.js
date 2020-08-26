import {RenderPosition, render, remove} from "../utils/render.js";

import FilmCardComponent from "../components/film-card.js";
import FilmDetailsComponent from "../components/film-details.js";

const bodyElement = document.body;

export default class MovieController {
  constructor(container) {
    this._container = container;
  }

  render(film) {
    const filmCardComponent = new FilmCardComponent(film);
    const filmDetailsComponent = new FilmDetailsComponent(film);
  
    const removeFilmDetailsElement = () => {
      bodyElement.classList.remove(`hide-overflow`);
      filmDetailsComponent.getElement().remove();
      document.removeEventListener(`keydown`, onEscKeydown);
    };
  
    const onEscKeydown = (evt) => {
      evt.preventDefault();
      if (evt.key === `Escape` || `Esc`) {
        removeFilmDetailsElement();
      }
    };
  
    filmCardComponent.setControlClickHandler(() => {
      bodyElement.classList.add(`hide-overflow`);
      render(bodyElement, filmDetailsComponent, RenderPosition.BEFOREEND);
      document.addEventListener(`keydown`, onEscKeydown);
  
      filmDetailsComponent.setCloseButtonClickHandler(removeFilmDetailsElement);
    });
  
    render(filmsList, filmCardComponent, RenderPosition.BEFOREEND);
  }
}

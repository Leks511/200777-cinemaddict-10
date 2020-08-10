import {RenderPosition, render, remove} from "../utils/render.js";

import SortComponent from "../components/sort.js";
import FilmsComponent from "../components/films.js";
import AllMoviesComponent from "../components/all-movies.js";
import TopRatedComponent from "../components/top-rated.js";
import MostCommentedComponent from "../components/most-commented.js";
import FilmCardComponent from "../components/film-card.js";
import FilmDetailsComponent from "../components/film-details.js";
import ShowMoreButtonComponent from "../components/show-more-button.js";
import NoDataComponent from "../components/no-data.js";

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const FilmPatameters = {
  RATING: `rating`,
  COMMENTS_COUNT: `commentsCount`
};

const bodyElement = document.body;

// Функция рендеринга фильма
const renderFilm = (filmData, filmsList) => {
  const filmCardComponent = new FilmCardComponent(filmData);
  const filmDetailsComponent = new FilmDetailsComponent(filmData);

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
};

const renderFilms = (films, container, from, to) => {
  films
    .slice(from, to)
    .forEach((film) => renderFilm(film, container));
};


export default class PageController {
  constructor(container) {
    this._container = container;

    this._sortComponent = new SortComponent();
    this._filmsComponent = new FilmsComponent();
    this._noDataComponent = new NoDataComponent();
    this._allMoviesComponent = new AllMoviesComponent();
    this._topRatedComponent = new TopRatedComponent();
    this._mostCommentedComponent = new MostCommentedComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
  }

  renderFilms(films) {

    const container = this._container.getElement();
    render(container, this._sortComponent, RenderPosition.BEFOREEND);
    render(container, this._filmsComponent, RenderPosition.BEFOREEND);

    const contentContainer = this._filmsComponent.getElement();

    if (films.length) {
      render(contentContainer, this._allMoviesComponent, RenderPosition.BEFOREEND);

      const allMovies = this._allMoviesComponent.getElement();
      const filmsContainer = allMovies.querySelector(`.films-list__container`);

      // Функционал кнопки

      let showingFilms = SHOWING_FILMS_COUNT_ON_START;

      renderFilms(films, filmsContainer, 0, showingFilms);

      if (films.length > SHOWING_FILMS_COUNT_BY_BUTTON) {
        const showMoreButtonComponent = this._showMoreButtonComponent;

        render(allMovies, showMoreButtonComponent, RenderPosition.BEFOREEND);

        showMoreButtonComponent.setClickHandler(() => {
          renderFilms(films, filmsContainer, showingFilms, showingFilms += SHOWING_FILMS_COUNT_BY_BUTTON);

          if (showingFilms >= films.length) {
            remove(showMoreButtonComponent);
          }
        });
      }


      const renderExtra = (component, type) => {
        const sortedFilms = films
          .slice()
          .filter((film) => film[type] > 0)
          .sort((a, b) => b[type] - a[type]);

        if (sortedFilms.length) {
          render(contentContainer, component, RenderPosition.BEFOREEND);

          const extraContainer = component.getElement().querySelector(`.films-list__container`);

          renderFilms(sortedFilms, extraContainer, 0, 2);
        }
      };

      renderExtra(this._topRatedComponent, FilmPatameters.RATING);
      renderExtra(this._mostCommentedComponent, FilmPatameters.COMMENTS_COUNT);

    } else {
      render(contentContainer, this._noDataComponent, RenderPosition.BEFOREEND);
    }
  }
}

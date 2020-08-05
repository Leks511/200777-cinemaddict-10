import {RENDER_POSITION, render} from "./utils";

import ProfileComponent from "./components/profile";
import MenuComponent from "./components/menu";
import SortComponent from "./components/sort";
import ContentComponent from "./components/content";
import MainFimsListComponent from "./components/main-fllms-list";
import TopRatedFilmsListComponent from "./components/top-rated-films-list";
import MostCommentedFilmsListComponent from "./components/most-commented-films-list";
import ShowMoreButtonComponent from "./components/show-more-button";
import FilmCardComponent from "./components/film-card";
import StatisticComponent from "./components/statistic";
import NoDataComponent from "./components/no-data";
import FilmDetailsComponent from "./components/film-details";

import {generateFilms} from "./mocks/film-card";

const FILMS_COUNT = 22;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

// Массив фильмов
const films = generateFilms(FILMS_COUNT);

const bodyElement = document.body;

const headerElement = bodyElement.querySelector(`.header`);
const mainElement = bodyElement.querySelector(`.main`);
const footerElement = bodyElement.querySelector(`.footer`);

render(headerElement, new ProfileComponent(films).getElement(), RENDER_POSITION.BEFOREEND);

render(mainElement, new MenuComponent(films).getElement(), RENDER_POSITION.BEFOREEND);
render(mainElement, new SortComponent().getElement(), RENDER_POSITION.BEFOREEND);
render(mainElement, new ContentComponent().getElement(), RENDER_POSITION.BEFOREEND);

const filmsContentElement = mainElement.querySelector(`.films`);

const renderFilm = (filmData, filmsList) => {
  const filmCardComponent = new FilmCardComponent(filmData);
  const filmDetailsComponent = new FilmDetailsComponent(filmData);

  const filmCardControlElements = filmCardComponent.getElement().querySelectorAll(`.film-card__title, .film-card__poster, .film-card__comments`);
  const filmDetailsCloseButtonElement = filmDetailsComponent.getElement().querySelector(`.film-details__close-btn`);

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

  filmCardControlElements.forEach((control) => control.addEventListener(`click`, () => {
    bodyElement.classList.add(`hide-overflow`);
    render(bodyElement, filmDetailsComponent.getElement(), RENDER_POSITION.BEFOREEND);
    document.addEventListener(`keydown`, onEscKeydown);

    filmDetailsCloseButtonElement.addEventListener(`click`, () => {
      removeFilmDetailsElement();
    });
  }));

  render(filmsList, filmCardComponent.getElement(), RENDER_POSITION.BEFOREEND);
};

if (films.length) {
  render(filmsContentElement, new MainFimsListComponent().getElement(), RENDER_POSITION.BEFOREEND);

  const mainFilmsSectionElement = filmsContentElement.querySelector(`.films-list`);

  const mainFilmsListElement = mainFilmsSectionElement.querySelector(`.films-list__container`);


  // Функционал кнопки

  let showingFilms = SHOWING_FILMS_COUNT_ON_START;
  films.slice(0, showingFilms)
    .forEach((film) => renderFilm(film, mainFilmsListElement));

  if (films.length > SHOWING_FILMS_COUNT_BY_BUTTON) {
    render(mainFilmsSectionElement, new ShowMoreButtonComponent().getElement(), RENDER_POSITION.BEFOREEND);

    const showMoreButton = mainFilmsSectionElement.querySelector(`.films-list__show-more`);
    showMoreButton.addEventListener(`click`, () => {
      films.slice(showingFilms, showingFilms += SHOWING_FILMS_COUNT_BY_BUTTON)
        .forEach((film) => renderFilm(film, mainFilmsListElement));

      if (showingFilms >= films.length) {
        showMoreButton.remove();
      }
    });
  }


  // Top rated
  const topRatedFilms = films
    .slice()
    .filter((film) => film.rating > 0)
    .sort((a, b) => b.rating - a.rating);

  if (topRatedFilms.length) {
    render(filmsContentElement, new TopRatedFilmsListComponent().getElement(), RENDER_POSITION.BEFOREEND);

    const topRatedFilmsListElement = Array.from(filmsContentElement.querySelectorAll(`h2`)).filter((element) => element.textContent === `Top rated`)[0].parentElement.querySelector(`.films-list__container`);

    topRatedFilms
      .slice(0, 2)
      .forEach((film) => renderFilm(film, topRatedFilmsListElement));
  }

  // Most commented
  const mostCommentedFilms = films
    .slice()
    .filter((film) => film.commentsCount > 0)
    .sort((a, b) => b.commentsCount - a.commentsCount);

  if (mostCommentedFilms.length) {
    render(filmsContentElement, new MostCommentedFilmsListComponent().getElement(), RENDER_POSITION.BEFOREEND);

    const mostCommentedFilmsListElement = Array.from(filmsContentElement.querySelectorAll(`h2`)).filter((element) => element.textContent === `Most commented`)[0].parentElement.querySelector(`.films-list__container`);

    mostCommentedFilms
      .slice(0, 2)
      .forEach((film) => renderFilm(film, mostCommentedFilmsListElement));
  }

  render(footerElement, new StatisticComponent(films).getElement(), RENDER_POSITION.BEFOREEND);
} else {
  render(filmsContentElement, new NoDataComponent().getElement(), RENDER_POSITION.BEFOREEND);
}


import {RENDER_POSITION, render} from "./utils";

import Profile from "./components/profile";
import Menu from "./components/menu";
import Sort from "./components/sort";
import Content from "./components/content";
import MainFimsList from "./components/main-fllms-list";
import TopRatedFilmsList from "./components/top-rated-films-list";
import MostCommentedFilmsList from "./components/most-commented-films-list";
import ShowMoreButton from "./components/show-more-button";
import FilmCard from "./components/film-card";
import Statistic from "./components/statistic";
import NoData from "./components/no-data";
import FilmDetails from "./components/film-details";

import {generateFilms} from "./mocks/film-card";

const FILMS_COUNT = 11;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

// Массив фильмов
const films = generateFilms(FILMS_COUNT);

const bodyElement = document.body;

const headerElement = bodyElement.querySelector(`.header`);
const mainElement = bodyElement.querySelector(`.main`);
const footerElement = bodyElement.querySelector(`.footer`);

render(headerElement, new Profile(films).getElement(), RENDER_POSITION.BEFOREEND);

render(mainElement, new Menu(films).getElement(), RENDER_POSITION.BEFOREEND);
render(mainElement, new Sort().getElement(), RENDER_POSITION.BEFOREEND);
render(mainElement, new Content().getElement(), RENDER_POSITION.BEFOREEND);

const filmsContentElement = mainElement.querySelector(`.films`);

const renderFilm = (filmData, filmsList) => {
  const filmCardComponent = new FilmCard(filmData);
  const filmDetailsComponent = new FilmDetails(filmData);

  const filmCardControlElements = filmCardComponent.getElement().querySelectorAll(`.film-card__title, .film-card__poster, .film-card__comments`);
  const filmDetailsCloseButtonElement = filmDetailsComponent.getElement().querySelector(`.film-details__close-btn`);

  filmCardControlElements.forEach((control) => control.addEventListener(`click`, () => {
    bodyElement.classList.add(`hide-overflow`);
    render(bodyElement, filmDetailsComponent.getElement(), RENDER_POSITION.BEFOREEND);

    filmDetailsCloseButtonElement.addEventListener(`click`, () => {
      bodyElement.classList.remove(`hide-overflow`);
      filmDetailsComponent.getElement().remove();
    });
  }));

  render(filmsList, filmCardComponent.getElement(), RENDER_POSITION.BEFOREEND);
};

if (films.length) {
  render(filmsContentElement, new MainFimsList().getElement(), RENDER_POSITION.BEFOREEND);

  const mainFilmsSectionElement = filmsContentElement.querySelector(`.films-list`);

  const mainFilmsListElement = mainFilmsSectionElement.querySelector(`.films-list__container`);


  // Функционал кнопки

  let showingFilms = SHOWING_FILMS_COUNT_ON_START;
  films.slice(0, showingFilms)
    .forEach((film) => renderFilm(film, mainFilmsListElement));

  if (films.length > SHOWING_FILMS_COUNT_BY_BUTTON) {
    render(mainFilmsSectionElement, new ShowMoreButton().getElement(), RENDER_POSITION.BEFOREEND);

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
    render(filmsContentElement, new TopRatedFilmsList().getElement(), RENDER_POSITION.BEFOREEND);

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
    render(filmsContentElement, new MostCommentedFilmsList().getElement(), RENDER_POSITION.BEFOREEND);

    const mostCommentedFilmsListElement = Array.from(filmsContentElement.querySelectorAll(`h2`)).filter((element) => element.textContent === `Most commented`)[0].parentElement.querySelector(`.films-list__container`);

    mostCommentedFilms
      .slice(0, 2)
      .forEach((film) => renderFilm(film, mostCommentedFilmsListElement));
  }

  render(footerElement, new Statistic(films).getElement(), RENDER_POSITION.BEFOREEND);
} else {
  render(filmsContentElement, new NoData().getElement(), RENDER_POSITION.BEFOREEND);
}


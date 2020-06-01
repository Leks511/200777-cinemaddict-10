/* eslint-disable no-multiple-empty-lines */
import {createProfileTemplate} from "./components/profile";
import {createMenuTemplate} from "./components/menu";
import {createSortTemplate} from "./components/sort";
import {createContentTemplate} from "./components/content";
import {createMainFimsListTemplate} from "./components/main-fllms-list";
import {createTopRatedFilmsListTemplate} from "./components/top-rated-films-list";
import {createMostCommentedFilmsListTemplate} from "./components/most-commented-films-list";
import {createShowMoreButtonTemplate} from "./components/show-more-button";
import {createFilmCardTemplate} from "./components/film-card";
import {createStatisticTemplate} from "./components/statistic";
import {createNoDataTemplate} from "./components/no-data";
// import {createFilmDetailsTemplate} from "./components/film-details";

import {generateFilms} from "./mocks/film-card";

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const FILMS_COUNT = 11;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

// Массив фильмов
const films = generateFilms(FILMS_COUNT);

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);

render(headerElement, createProfileTemplate(films), `beforeend`);

render(mainElement, createMenuTemplate(films), `beforeend`);
render(mainElement, createSortTemplate(), `beforeend`);
render(mainElement, createContentTemplate(), `beforeend`);

const filmsContentElement = mainElement.querySelector(`.films`);

if (films.length) {
  render(filmsContentElement, createMainFimsListTemplate(), `beforeend`);

  const mainFilmsSectionElement = filmsContentElement.querySelector(`.films-list`);

  const mainFilmsListElement = mainFilmsSectionElement.querySelector(`.films-list__container`);


  // Функционал кнопки

  let showingFilms = SHOWING_FILMS_COUNT_ON_START;
  films.slice(0, showingFilms)
    .forEach((film) => render(mainFilmsListElement, createFilmCardTemplate(film), `beforeend`));

  if (films.length > SHOWING_FILMS_COUNT_BY_BUTTON) {
    render(mainFilmsSectionElement, createShowMoreButtonTemplate(), `beforeend`);

    const showMoreButton = mainFilmsSectionElement.querySelector(`.films-list__show-more`);
    showMoreButton.addEventListener(`click`, () => {
      films.slice(showingFilms, showingFilms += SHOWING_FILMS_COUNT_BY_BUTTON)
        .forEach((film) => render(mainFilmsListElement, createFilmCardTemplate(film), `beforeend`));

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
    render(filmsContentElement, createTopRatedFilmsListTemplate(), `beforeend`);

    const topRatedFilmsListElement = Array.from(filmsContentElement.querySelectorAll(`h2`)).filter((element) => element.textContent === `Top rated`)[0].parentElement.querySelector(`.films-list__container`);

    topRatedFilms
      .slice(0, 2)
      .forEach((film) => render(topRatedFilmsListElement, createFilmCardTemplate(film), `beforeend`));
  }

  // Most commented
  const mostCommentedFilms = films
    .slice()
    .filter((film) => film.commentsCount > 0)
    .sort((a, b) => b.commentsCount - a.commentsCount);

  if (mostCommentedFilms.length) {
    render(filmsContentElement, createMostCommentedFilmsListTemplate(), `beforeend`);

    const mostCommentedFilmsListElement = Array.from(filmsContentElement.querySelectorAll(`h2`)).filter((element) => element.textContent === `Most commented`)[0].parentElement.querySelector(`.films-list__container`);

    mostCommentedFilms
      .slice(0, 2)
      .forEach((film) => render(mostCommentedFilmsListElement, createFilmCardTemplate(film), `beforeend`));
  }


  render(footerElement, createStatisticTemplate(films), `beforeend`);
  // render(footerElement, createFilmDetailsTemplate(films[0]), `afterend`);
} else {
  render(filmsContentElement, createNoDataTemplate(), `beforeend`);
}


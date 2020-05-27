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
// import {createFilmDetailsTemplate} from "./components/film-details";

import {generateFilms} from "./mocks/film-card";

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const FILMS_COUNT = 26;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);

render(headerElement, createProfileTemplate(), `beforeend`);

render(mainElement, createMenuTemplate(), `beforeend`);
render(mainElement, createSortTemplate(), `beforeend`);
render(mainElement, createContentTemplate(), `beforeend`);

const filmsContentElement = mainElement.querySelector(`.films`);

render(filmsContentElement, createMainFimsListTemplate(), `beforeend`);
render(filmsContentElement, createTopRatedFilmsListTemplate(), `beforeend`);
render(filmsContentElement, createMostCommentedFilmsListTemplate(), `beforeend`);

const mainFilmsSectionElement = filmsContentElement.querySelector(`.films-list`);

const mainFilmsListElement = mainFilmsSectionElement.querySelector(`.films-list__container`);
const films = generateFilms(SHOWING_FILMS_COUNT_ON_START);
films.forEach((film) => render(mainFilmsListElement, createFilmCardTemplate(film), `beforeend`));

render(mainFilmsSectionElement, createShowMoreButtonTemplate(), `beforeend`);

const extraFilmsListElements = filmsContentElement.querySelectorAll(`.films-list--extra`);

const topRatedFilmsListElement = extraFilmsListElements[0].querySelector(`.films-list__container`);
films
  .slice(0, 2)
  .forEach((film) => render(topRatedFilmsListElement, createFilmCardTemplate(film), `beforeend`));

const mostCommentedFilmsListElement = extraFilmsListElements[1].querySelector(`.films-list__container`);
films
  .slice(0, 2)
  .forEach((film) => render(mostCommentedFilmsListElement, createFilmCardTemplate(film), `beforeend`));

render(footerElement, createStatisticTemplate(), `beforeend`);
// render(footerElement, createFilmDetailsTemplate(), `afterend`);

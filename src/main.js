/* eslint-disable no-multiple-empty-lines */
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

render(headerElement, new Profile(films), `beforeend`);

render(mainElement, new Menu(films), `beforeend`);
render(mainElement, new Sort(), `beforeend`);
render(mainElement, new Content(), `beforeend`);

const filmsContentElement = mainElement.querySelector(`.films`);

if (films.length) {
  render(filmsContentElement, new MainFimsList(), `beforeend`);

  const mainFilmsSectionElement = filmsContentElement.querySelector(`.films-list`);

  const mainFilmsListElement = mainFilmsSectionElement.querySelector(`.films-list__container`);


  // Функционал кнопки

  let showingFilms = SHOWING_FILMS_COUNT_ON_START;
  films.slice(0, showingFilms)
    .forEach((film) => render(mainFilmsListElement, new FilmCard(film), `beforeend`));

  if (films.length > SHOWING_FILMS_COUNT_BY_BUTTON) {
    render(mainFilmsSectionElement, new ShowMoreButton(), `beforeend`);

    const showMoreButton = mainFilmsSectionElement.querySelector(`.films-list__show-more`);
    showMoreButton.addEventListener(`click`, () => {
      films.slice(showingFilms, showingFilms += SHOWING_FILMS_COUNT_BY_BUTTON)
        .forEach((film) => render(mainFilmsListElement, new FilmCard(film), `beforeend`));

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
    render(filmsContentElement, new TopRatedFilmsList(), `beforeend`);

    const topRatedFilmsListElement = Array.from(filmsContentElement.querySelectorAll(`h2`)).filter((element) => element.textContent === `Top rated`)[0].parentElement.querySelector(`.films-list__container`);

    topRatedFilms
      .slice(0, 2)
      .forEach((film) => render(topRatedFilmsListElement, new FilmCard(film), `beforeend`));
  }

  // Most commented
  const mostCommentedFilms = films
    .slice()
    .filter((film) => film.commentsCount > 0)
    .sort((a, b) => b.commentsCount - a.commentsCount);

  if (mostCommentedFilms.length) {
    render(filmsContentElement, new MostCommentedFilmsList(), `beforeend`);

    const mostCommentedFilmsListElement = Array.from(filmsContentElement.querySelectorAll(`h2`)).filter((element) => element.textContent === `Most commented`)[0].parentElement.querySelector(`.films-list__container`);

    mostCommentedFilms
      .slice(0, 2)
      .forEach((film) => render(mostCommentedFilmsListElement, new FilmCard(film), `beforeend`));
  }


  render(footerElement, new Statistic(films), `beforeend`);
  // render(footerElement, new FilmDetails(films[0]), `afterend`);
} else {
  render(filmsContentElement, new NoData(), `beforeend`);
}


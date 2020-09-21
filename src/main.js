import {RenderPosition, render} from "./utils/render.js";

import StatisticComponent from "./components/statistic.js";
import ProfileComponent from "./components/profile.js";
import MenuComponent from "./components/menu.js";
import PageComponent from "./components/page.js";

import PageController from "./controllers/page.js";

import MoviesModel from "./models/movies.js";

import {generateFilms} from "./mocks/film-card";

const FILMS_COUNT = 22;

const mainElement = document.querySelector(`.main`);
const headerElement = document.querySelector(`.header`);
const footerElement = document.querySelector(`.footer`);

// Массив фильмов
const films = generateFilms(FILMS_COUNT);
const moviesModel = new MoviesModel();
moviesModel.setFilms(films);


render(headerElement, new ProfileComponent(films), RenderPosition.BEFOREEND);
render(mainElement, new MenuComponent(films), RenderPosition.BEFOREEND);

const pageComponent = new PageComponent();
const pageController = new PageController(pageComponent, moviesModel);


render(mainElement, pageComponent, RenderPosition.BEFOREEND);


render(footerElement, new StatisticComponent(films), RenderPosition.BEFOREEND);

pageController.render(films);

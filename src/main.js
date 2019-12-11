import {createFilmCardTemplate} from './components/film';
import {createFilmDetailsTemplate} from './components/details';
import {createMenuTemplate} from './components/menu';
import {createFilmsContentTemplate} from './components/films-content';
import {createShowMoreButtonTemplate} from './components/show-more-button';
import {createUserRankTemplate} from './components/user-rank';

import {createFilmCardMock} from './mock/film';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const headerElement = document.querySelector(`.header`);
render(headerElement, createUserRankTemplate(), `beforeend`);

const mainElement = document.querySelector(`.main`);
render(mainElement, createMenuTemplate(), `beforeend`);

render(mainElement, createFilmsContentTemplate(), `beforeend`);

const filmsContentElement = document.querySelector(`.films`);

const mainFilmsContainerElement = filmsContentElement.querySelector(`.films-list .films-list__container`);

const filmMockData = createFilmCardMock();
render(mainFilmsContainerElement, createFilmCardTemplate(filmMockData), `beforeend`);

render(mainFilmsContainerElement, createShowMoreButtonTemplate(), `afterend`);

const topRatedFilmsContainerElement = filmsContentElement.querySelectorAll(`.films-list--extra`)[0].querySelector(`.films-list__container`);
const MostCommentedFilmsContainerElement = filmsContentElement.querySelectorAll(`.films-list--extra`)[1].querySelector(`.films-list__container`);

render(topRatedFilmsContainerElement, createFilmCardTemplate(filmMockData), `beforeend`);
render(MostCommentedFilmsContainerElement, createFilmCardTemplate(filmMockData), `beforeend`);

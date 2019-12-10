import {createFilmCardTemplate} from './components/card';
import {createFilmDetailsTemplate} from './components/details';
import {createMenuTemplate} from './components/menu';
import {createShowMoreButtonTemplate} from './components/show-more-button';
import {createUserRankTemplate} from './components/user-rank';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const headerElement = document.querySelector('.header');
render(headerElement, createUserRankTemplate(), `beforeend`);


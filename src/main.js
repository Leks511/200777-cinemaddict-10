import {createFilmCardTemplate} from './components/film';
import {createFilmDetailsTemplate} from './components/film-details';
import {createMenuTemplate} from './components/menu';
import {createFilmsContentTemplate} from './components/films-content';
import {createShowMoreButtonTemplate} from './components/show-more-button';
import {createUserRankTemplate} from './components/user-rank';

// Получим данные для их отображения в компонентах
import {createFilmDetailsMock} from './mock/film-details';
import {createFilmCardMock, createFilmCardMocks} from './mock/film';
import {createFilterMock} from './mock/filter';

const FILMS_QUANTITY = 20;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

// функция рендеринга элементов
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// Найдём элемент header и отрендерим туда рейтинг пользователя
const headerElement = document.querySelector(`.header`);
render(headerElement, createUserRankTemplate(FILMS_QUANTITY), `beforeend`);

// Найдём элемент main
const mainElement = document.querySelector(`.main`);

//Получим данные фильтров и отрендерим в main меню с фильтрами
const filters = createFilterMock();
render(mainElement, createMenuTemplate(filters), `beforeend`);

// Отобразим секцию с фильмами
render(mainElement, createFilmsContentTemplate(), `beforeend`);

// Найдём элемент для списка фильмов
const filmsContentElement = document.querySelector(`.films`);
const mainFilmsContainerElement = filmsContentElement.querySelector(`.films-list .films-list__container`);

// Получим данные фильмов и отобразим карточки определённое кол-во раз
const films = createFilmCardMocks(FILMS_QUANTITY);

let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
films.slice(0, showingFilmsCount).forEach((film) => render(mainFilmsContainerElement, createFilmCardTemplate(film), `beforeend`));


// Отобразим кнопку "Show more" и найдём её
render(mainFilmsContainerElement, createShowMoreButtonTemplate(), `afterend`);
const showMoreButton = filmsContentElement.querySelector(`.films-list__show-more`);

showMoreButton.addEventListener(`click`, () => {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

  films.slice(prevFilmsCount, showingFilmsCount)
    .forEach((film) => render(mainFilmsContainerElement, createFilmCardTemplate(film), `beforeend`));

  if (showingFilmsCount >= films.length) {
    showMoreButton.remove();
  }
});



const footerElement = document.querySelector(`.footer`);

// Временно скроем всплывающее окно
const filmDetailsMock = createFilmDetailsMock();
//render(footerElement, createFilmDetailsTemplate(filmDetailsMock), `afterend`);

const topRatedFilmsContainerElement = filmsContentElement.querySelectorAll(`.films-list--extra`)[0].querySelector(`.films-list__container`);
const MostCommentedFilmsContainerElement = filmsContentElement.querySelectorAll(`.films-list--extra`)[1].querySelector(`.films-list__container`);

render(topRatedFilmsContainerElement, createFilmCardTemplate(filmMockData), `beforeend`);
render(MostCommentedFilmsContainerElement, createFilmCardTemplate(filmMockData), `beforeend`);

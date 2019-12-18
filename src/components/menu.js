import {createElement} from '../util';

const createFilterMorkup = (filter) => {
  const {name, quantity} = filter;

  return (
    `<a href="#watchlist" class="main-navigation__item">${name}<span class="main-navigation__item-count">${quantity}</span></a>`
  );
};

const createFiltersMorkup = (filters) => {
  return filters.map((filter) => createFilterMorkup(filter)).join(``);
};

const createMenuTemplate = (filters) => {

  const filtersMorkup = createFiltersMorkup(filters);

  return (
    `<nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>

      ${filtersMorkup}

      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>

    <ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};

export default class Menu {
  constructor(filters) {
    this._element = null;
    this._filters = filters;
  }

  getTemplate() {
    return createMenuTemplate(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

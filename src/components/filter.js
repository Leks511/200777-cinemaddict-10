import {FilterType} from "../utils/filter.js";
import AbstractComponent from "./abstract-component.js";

const FILTER_HASH_PREFIX = `#`;

const getFilterByHash = (hash) => {
  return hash.substring(FILTER_HASH_PREFIX.length);
};

const createFilterMarkup = (filter) => {
  const {name, count, active} = filter;

  const activeClass = active ? `main-navigation__item--active` : ``;
  const nameText = name === FilterType.ALL ? `All movies` : name;
  const countMarkup = name === FilterType.ALL ? `` : `<span class="main-navigation__item-count">${count}</span>`;

  return (
    `<a
      href="#${name}"
      class="main-navigation__item ${activeClass}">${nameText} ${countMarkup}</a>`
  );
};

const createFilterTemplate = (filters) => {
  const filtersMarkup = filters.map((filter) => createFilterMarkup(filter)).join(``);

  return (
    `<div style="display: contents">
      ${filtersMarkup}
    </div>`
  );
};

export default class FilterComponent extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName === `A`) {
        const filterType = getFilterByHash(evt.target.hash);
        handler(filterType);
      }
    });
  }
}

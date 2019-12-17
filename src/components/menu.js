const createFilterMorkup = (filter) => {
  const {name, quantity} = filter;

  return (
    `<a href="#watchlist" class="main-navigation__item">${name}<span class="main-navigation__item-count">${quantity}</span></a>`
  );
};

const createFiltersMorkup = (filters) => {
  return filters.map((filter) => createFilterMorkup(filter)).join(``);
};

export const createMenuTemplate = (filters) => {

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

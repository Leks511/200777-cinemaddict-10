export const FilterType = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`,
};

export const getFilmsByFilter = (films, filterType) => {
  switch (filterType) {
    case FilterType.ALL:
      return films;
    case FilterType.WATCHLIST:
      return films.filter((film) => film.inWatchlist);
    case FilterType.HISTORY:
      return films.filter((film) => film.isWatched);
    case FilterType.FAVORITES:
      return films.filter((film) => film.isFavorite);
  }

  return films;
};

const filterNames = [`Watchlist`, `History`, `Favorites`];

export const createFilterMock = () => {
  return filterNames.map((filter) => {
    return {
      name: filter,
      quantity: Math.floor(Math.random() * 10)
    };
  });
};

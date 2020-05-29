export const createProfileTemplate = (films) => {
  const watchedFilms = films.filter((film) => film.isWatched).length;

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${watchedFilms}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

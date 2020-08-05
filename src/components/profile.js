import AbstractComponent from "./abstract-component.js";

const getProfileRating = (count) => {
  let rating;

  if (count >= 1 && count <= 10) {
    rating = `novice`;
  }

  if (count > 10 && count <= 20) {
    rating = `fan`;
  }

  if (count > 21) {
    rating = `movie buff`;
  }

  return rating;
};


const createProfileTemplate = (films) => {
  const watchedFilms = films.filter((film) => film.isWatched).length;
  const userRating = watchedFilms ? getProfileRating(watchedFilms) : ``;
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${userRating}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class ProfileComponent extends AbstractComponent {
  constructor(data) {
    super();

    this._data = data;
  }

  getTemplate() {
    return createProfileTemplate(this._data);
  }
}

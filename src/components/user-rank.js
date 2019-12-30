import AbstractComponent from "./abstract-component";

const createUserRankTemplate = (filmsQuantity) => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${filmsQuantity}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class UserRank extends AbstractComponent {
  constructor(filmsCount) {
    super();

    this._filmsCount = filmsCount;
  }

  getTemplate() {
    return createUserRankTemplate(this._filmsCount);
  }
}

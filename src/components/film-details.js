import AbstractSmartComponent from "./abstract-smart-component.js";

const createUserRatinForm = (film) => {
  const {title, poster} = film;

  return (
    `<div class="form-details__middle-container">
      <section class="film-details__user-rating-wrap">
        <div class="film-details__user-rating-controls">
          <button class="film-details__watched-reset" type="button">Undo</button>
        </div>

        <div class="film-details__user-score">
          <div class="film-details__user-rating-poster">
            <img src="./images/posters/${poster}" alt="film-poster" class="film-details__user-rating-img">
          </div>

          <section class="film-details__user-rating-inner">
            <h3 class="film-details__user-rating-title">${title}</h3>

            <p class="film-details__user-rating-feelings">How you feel it?</p>

            <div class="film-details__user-rating-score">
              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="1" id="rating-1">
              <label class="film-details__user-rating-label" for="rating-1">1</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="2" id="rating-2">
              <label class="film-details__user-rating-label" for="rating-2">2</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="3" id="rating-3">
              <label class="film-details__user-rating-label" for="rating-3">3</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="4" id="rating-4">
              <label class="film-details__user-rating-label" for="rating-4">4</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="5" id="rating-5">
              <label class="film-details__user-rating-label" for="rating-5">5</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="6" id="rating-6">
              <label class="film-details__user-rating-label" for="rating-6">6</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="7" id="rating-7">
              <label class="film-details__user-rating-label" for="rating-7">7</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="8" id="rating-8">
              <label class="film-details__user-rating-label" for="rating-8">8</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="9" id="rating-9" checked>
              <label class="film-details__user-rating-label" for="rating-9">9</label>

            </div>
          </section>
        </div>
      </section>
    </div>`
  );
};

const Controls = {
  ADD_TO_WATCHLIST: {
    keyWord: `watchlist`,
    controlText: `Add to watchlist`
  },
  ALREADY_WATCHED: {
    keyWord: `watched`,
    controlText: `Already watched`
  },
  ADD_TO_FAVORITES: {
    keyWord: `favorite`,
    controlText: `Add to favorites`
  }
};

const getControlKeyWordAndName = (text) => {
  let dataObj;

  switch (text) {
    case Controls.ADD_TO_WATCHLIST.controlText:
      dataObj = Controls.ADD_TO_WATCHLIST;
      break;
    case Controls.ALREADY_WATCHED.controlText:
      dataObj = Controls.ALREADY_WATCHED;
      break;
    case Controls.ADD_TO_FAVORITES.controlText:
      dataObj = Controls.ADD_TO_FAVORITES;
      break;
  }

  return dataObj;
};

const createControl = (text, isActive) => {
  const {keyWord, controlText} = getControlKeyWordAndName(text);

  return (
    `<input
      type="checkbox"
      class="film-details__control-input visually-hidden"
      id="${keyWord}"
      name="${keyWord}"
      ${isActive ? `checked` : ``}
    >
    <label for="${keyWord}" class="film-details__control-label film-details__control-label--${keyWord}">${controlText}</label>`
  );
};

const generateGenresMarkup = (genres) => {
  return genres
    .map((genre) => `<span class="film-details__genre">${genre}</span>`);
};

const createFilmDetailsTemplate = (film, options = {}) => {
  const {
    title,
    originalTitle,
    rating,
    userRating,
    director,
    writers,
    actors,
    releaseDate,
    duration,
    country,
    genres,
    poster,
    description,
    commentsCount,
    age
  } = film;

  const {
    isAddedInWatchlist,
    isAlreadyWatched,
    isMarkedAsFavorite
  } = options;

  const genresMarkup = generateGenresMarkup(genres);

  const addToWatchlistControl = createControl(Controls.ADD_TO_WATCHLIST.controlText, isAddedInWatchlist);
  const alreadyWatchedControl = createControl(Controls.ALREADY_WATCHED.controlText, isAlreadyWatched);
  const addToFavoritesControl = createControl(Controls.ADD_TO_FAVORITES.controlText, isMarkedAsFavorite);

  const userRatingForm = isAlreadyWatched ? createUserRatinForm({title, poster}) : ``;

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">
    
              <p class="film-details__age">${age}+</p>
            </div>
    
            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${originalTitle}</p>
                </div>
    
                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                  <p class="film-details__user-rating">Your rate ${userRating}</p>
                </div>
              </div>
    
              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${releaseDate}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${duration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">
                    ${genresMarkup}
                </tr>
              </table>
    
              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>
    
          <section class="film-details__controls">
            ${addToWatchlistControl}
            ${alreadyWatchedControl}
            ${addToFavoritesControl}
          </section>
        </div>

        ${userRatingForm}
    
        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCount}</span></h3>
    
            <ul class="film-details__comments-list">
              <li class="film-details__comment">
                <span class="film-details__comment-emoji">
                  <img src="./images/emoji/smile.png" width="55" height="55" alt="emoji">
                </span>
                <div>
                  <p class="film-details__comment-text">Interesting setting and a good cast</p>
                  <p class="film-details__comment-info">
                    <span class="film-details__comment-author">Tim Macoveev</span>
                    <span class="film-details__comment-day">2019/12/31 23:59</span>
                    <button class="film-details__comment-delete">Delete</button>
                  </p>
                </div>
              </li>
              <li class="film-details__comment">
                <span class="film-details__comment-emoji">
                  <img src="./images/emoji/sleeping.png" width="55" height="55" alt="emoji">
                </span>
                <div>
                  <p class="film-details__comment-text">Booooooooooring</p>
                  <p class="film-details__comment-info">
                    <span class="film-details__comment-author">John Doe</span>
                    <span class="film-details__comment-day">2 days ago</span>
                    <button class="film-details__comment-delete">Delete</button>
                  </p>
                </div>
              </li>
              <li class="film-details__comment">
                <span class="film-details__comment-emoji">
                  <img src="./images/emoji/puke.png" width="55" height="55" alt="emoji">
                </span>
                <div>
                  <p class="film-details__comment-text">Very very old. Meh</p>
                  <p class="film-details__comment-info">
                    <span class="film-details__comment-author">John Doe</span>
                    <span class="film-details__comment-day">2 days ago</span>
                    <button class="film-details__comment-delete">Delete</button>
                  </p>
                </div>
              </li>
              <li class="film-details__comment">
                <span class="film-details__comment-emoji">
                  <img src="./images/emoji/angry.png" width="55" height="55" alt="emoji">
                </span>
                <div>
                  <p class="film-details__comment-text">Almost two hours? Seriously?</p>
                  <p class="film-details__comment-info">
                    <span class="film-details__comment-author">John Doe</span>
                    <span class="film-details__comment-day">Today</span>
                    <button class="film-details__comment-delete">Delete</button>
                  </p>
                </div>
              </li>
            </ul>
    
            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label"></div>
    
              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>
    
              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>
    
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="neutral-face">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>
    
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-gpuke" value="grinning">
                <label class="film-details__emoji-label" for="emoji-gpuke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>
    
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="grinning">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};

export default class FilmDetailsComponent extends AbstractSmartComponent {
  constructor(film) {
    super();

    this._film = film;

    this._isAddedInWatchlist = film.inWatchlist;
    this._isAlreadyWatched = film.isWatched;
    this._isMarkedAsFavorite = film.isFavorite;

    this._closeButtonClickHandler = null;
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._film, {
      isAddedInWatchlist: this._isAddedInWatchlist,
      isAlreadyWatched: this._isAlreadyWatched,
      isMarkedAsFavorite: this._isMarkedAsFavorite,
    });
  }

  recoveryListeners() {
    this.setCloseButtonClickHandler(this._closeButtonClickHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  setCloseButtonClickHandler(handler) {
    this.getElement()
      .querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);

    this._closeButtonClickHandler = handler;
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element
      .querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();

        this._isAddedInWatchlist = !this._isAddedInWatchlist;
        this.rerender();
      });

    element
      .querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();

        this._isAlreadyWatched = !this._isAlreadyWatched;
        this.rerender();
      });

    element
      .querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();

        this._isMarkedAsFavorite = !this._isMarkedAsFavorite;
        this.rerender();
      });
  }
}

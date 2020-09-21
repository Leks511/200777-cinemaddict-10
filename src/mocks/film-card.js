import {formatTime, formatDate} from "../utils/common.js";

const FILM_NAMES = [
  `Первый`,
  `Второй`,
  `NodeJS`,
  `Deno`,
  `Идём на React`,
  `Забыл название`,
  `Какой-то фильм`,
  `Десятый`,
  `Интенсив на 100!`,
  `Ещё один`,
  `Моковый фильм`,
  `Большой дом`,
  `Два монитора`,
  `Хорошее название`,
  `Длинный текст`,
];

const POSTERS = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`,
];

const DESCRIPTION = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const GENRES = [
  `Musical`,
  `Western`,
  `Drama`,
  `Comedy`,
  `Mystery`
];

const PERSONS = [
  `Anne Wigton`,
  `Heinz Herald`,
  `Richard Weil`,
  `Anthony Mann`,
  `Erich von Stroheim`,
  `Mary Beth Hughes`,
  `Dan Duryea`
];

const COUNTRIES = [
  `USA`,
  `Angola`,
  `USSR`,
  `Austria`,
  `Scotland`,
  `Canada`
];

const getRandomDescription = () => {
  return DESCRIPTION
    .slice()
    .split(`.`)
    .slice(0, getRandomIntegerNumber(1, 3));
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(max * Math.random());
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(0, 7);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return `${targetDate.getHours()}H ${targetDate.getMinutes()}m`;
};

const getRandomBoolean = () => {
  return Math.random() > 0.5 ? true : false;
};

const getRandomArrayItems = (array) => {
  return array
    .slice(0, getRandomIntegerNumber(1, 3));
};

export const generateFilm = () => {
  return {
    title: getRandomArrayItem(FILM_NAMES),
    originalTitle: getRandomArrayItem(FILM_NAMES),
    rating: getRandomIntegerNumber(0, 10),
    userRating: getRandomIntegerNumber(0, 9),
    director: getRandomArrayItem(PERSONS),
    writers: getRandomArrayItems(PERSONS),
    actors: getRandomArrayItems(PERSONS),
    releaseDate: formatDate(getRandomDate()),
    duration: formatTime(getRandomDate()),
    country: getRandomArrayItem(COUNTRIES),
    genres: getRandomArrayItems(GENRES),
    poster: getRandomArrayItem(POSTERS),
    description: getRandomDescription(),
    commentsCount: getRandomIntegerNumber(0, 50),
    inWatchlist: getRandomBoolean(),
    isWatched: getRandomBoolean(),
    isFavorite: getRandomBoolean(),
    age: getRandomIntegerNumber(1, 30),
  };
};

export const generateFilms = (count) => {
  return new Array(count).fill(``).map(() => generateFilm());
};

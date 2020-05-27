import {
  getRandomIntegerNumber,
  getRandomArrayItem,
  getRandomDate,
  getRandomBoolean
} from "../utils";

const FILM_NAMES = [
  `Первый`,
  `Второй`,
  `NodeJS`,
  `Deno`,
  `React выучим`,
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
  `the-dance-of-life.jpg`,
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

const getRandomDescription = () => {
  return DESCRIPTION
    .slice()
    .split(`.`)
    .slice(0, getRandomIntegerNumber(1, 3));
};

export const generateFilm = () => {
  return {
    title: getRandomArrayItem(FILM_NAMES),
    rating: getRandomIntegerNumber(0, 10),
    year: getRandomIntegerNumber(1900, 2020),
    duration: getRandomDate(),
    genre: getRandomArrayItem(GENRES),
    poster: getRandomArrayItem(POSTERS),
    description: getRandomDescription(),
    commentsCount: getRandomIntegerNumber(0, 50),
    inWatchlist: getRandomBoolean(),
    isWatched: getRandomBoolean(),
    isFavorite: getRandomBoolean(),
  };
};

export const generateFilms = (count) => {
  return new Array(count).fill(``).map(() => generateFilm());
};

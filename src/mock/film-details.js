import {FILM_NAMES, GENRES, POSTERS, DESCRIPTION, DIRECTORS, WRITERS, ACTORS, COUNTRIES, MONTHS} from './const';
import {getRandomArrayItem, getRandomIntegerNumber, getRandomArrayItems, getRandomDescription, getRandomDuration} from '../util';

const getReleaseDate = () => {
  return `${getRandomIntegerNumber(1, 31)} ${getRandomArrayItem(MONTHS)} ${getRandomIntegerNumber(0, 2020)} `;
};

export const createFilmDetailsMock = () => {
  return {
    cover: getRandomArrayItem(POSTERS),
    filmName: getRandomArrayItem(FILM_NAMES),
    originalFilmName: getRandomArrayItem(FILM_NAMES),
    rating: getRandomIntegerNumber(0, 5),
    userEvalutaion: getRandomIntegerNumber(0, 5),
    director: getRandomArrayItem(DIRECTORS),
    writers: getRandomArrayItems(WRITERS),
    actors: getRandomArrayItems(ACTORS),
    releaseDate: getReleaseDate(),
    duration: getRandomDuration(),
    country: getRandomArrayItem(COUNTRIES),
    genres: getRandomArrayItems(GENRES),
    description: getRandomDescription(DESCRIPTION),
    ageRating: getRandomIntegerNumber(0, 100)
  };
};

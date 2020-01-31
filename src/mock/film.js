import {FILM_NAMES, GENRES, POSTERS, DESCRIPTION, DIRECTORS, WRITERS, ACTORS, COUNTRIES, MONTHS} from './const';
import {getRandomArrayItem, getRandomIntegerNumber, getRandomArrayItems, getRandomDescription, getRandomDuration, getRandomBoolean} from '../utils/common';

const getReleaseDate = () => {
  return `${getRandomIntegerNumber(1, 31)} ${getRandomArrayItem(MONTHS)} ${getRandomIntegerNumber(0, 2020)} `;
};

const createFilmCardMock = () => {
  return {
    filmName: getRandomArrayItem(FILM_NAMES),
    originalFilmName: getRandomArrayItem(FILM_NAMES),
    rating: getRandomIntegerNumber(0, 5),
    userEvalutaion: getRandomIntegerNumber(0, 5),
    year: getRandomIntegerNumber(0, 2020),
    director: getRandomArrayItem(DIRECTORS),
    writers: getRandomArrayItems(WRITERS),
    actors: getRandomArrayItems(ACTORS),
    releaseDate: getReleaseDate(),
    duration: getRandomDuration(),
    genre: getRandomArrayItem(GENRES),
    genres: getRandomArrayItems(GENRES),
    poster: getRandomArrayItem(POSTERS),
    description: getRandomDescription(DESCRIPTION),
    fullDescription: getRandomDescription(DESCRIPTION),
    comments: getRandomIntegerNumber(0, 100),
    ageRating: getRandomIntegerNumber(0, 100),
    country: getRandomArrayItem(COUNTRIES),
    inWatchlist: getRandomBoolean(),
    isWatched: getRandomBoolean(),
    isFavorite: getRandomBoolean(),
  };
};

const createFilmCardMocks = (count) => {
  return new Array(count)
    .fill(``)
    .map(createFilmCardMock);
};

export {createFilmCardMock, createFilmCardMocks};

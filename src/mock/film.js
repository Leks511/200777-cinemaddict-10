import {FILM_NAMES, GENRES, POSTERS, DESCRIPTION} from './const';
import {getRandomArrayItem, getRandomIntegerNumber, getRandomDescription} from '../util';

const getRandomDate = () => {
  return new Date().getMinutes();
};

const createFilmCardMock = () => {
  return {
    filmName: getRandomArrayItem(FILM_NAMES),
    rating: getRandomIntegerNumber(0, 5),
    year: getRandomIntegerNumber(0, 2020),
    duration: getRandomDate(),
    genre: getRandomArrayItem(GENRES),
    poster: getRandomArrayItem(POSTERS),
    description: getRandomDescription(DESCRIPTION),
    comments: getRandomIntegerNumber(0, 100)
  };
};

const createFilmCardMocks = (count) => {
  return new Array(count)
    .fill(``)
    .map(createFilmCardMock);
};

export {createFilmCardMock, createFilmCardMocks};

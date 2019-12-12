import {FILM_NAMES, GENRES, POSTERS, DESCRIPTION, REGGISEURS, SCENARISTS, ACTORS, COUNTRIES} from './const';
import {getRandomArrayItem, getRandomIntegerNumber, getRandomDescription} from '../util';

export const createFilmDetailsMock = () => {
  return {
    cover: getRandomArrayItem(POSTERS),
    filmName: getRandomArrayItem(FILM_NAMES),
    originalFilmName: getRandomArrayItem(FILM_NAMES),
    rating: getRandomIntegerNumber(0, 5),
    userEvalutaion: getRandomIntegerNumber(0, 5),
    regisseur: getRandomArrayItem(REGGISEURS),
    scenarists: getRandomArrayItem(SCENARISTS),
    actors: getRandomArrayItem(ACTORS),
    releaseDate: `somedate`,
    duration: `someduration`,
    country: getRandomArrayItem(COUNTRIES),
    genre: getRandomArrayItem(GENRES),
    description: getRandomDescription(DESCRIPTION),
    ageRating: getRandomIntegerNumber(0, 100)
  };
};

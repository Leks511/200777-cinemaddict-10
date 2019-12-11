const FILM_NAMES = [
  `Привет`,
  `Новый фильм`,
  `2012`,
  `Ещё что-то`,
  `Почти пятнадцатый`,
  `Супер мок`,
  `Намного проще`,
  `Интенсив`,
  `Конец зимы`,
  `Идём на React`,
  `Node JS`,
  `Ещё какой-то фильм`,
  `Первый`,
  `Второй`,
  `Десятый`
];

const GENRES = [
  `Musical`,
  `Western`,
  `Comedy`,
  `Cartoon`,
  `Mystery`
];

const POSTERS = [
  `made-for-each-other`,
  `popeye-meets-sinbad`,
  `sagebrush-trail`,
  `santa-claus-conquers-the-martians`,
  `the-dance-of-life`,
  `the-great-flamarion`,
  `the-man-with-the-golden-arm`
];

const DESCRIPTION = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;


const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(max * Math.random());
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const getRandomDescription = (string) => {
  return string.split(`.`)
    .filter(() => Math.random() > 0.5)
    .slice(0, getRandomIntegerNumber(1, 3));
};

const getRandomDate = () => {
  return new Date().getMinutes();
};

export const createFilmCardMock = () => {
  return {
    filmName: getRandomArrayItem(FILM_NAMES),
    rating: getRandomIntegerNumber(0, 5),
    year: getRandomIntegerNumber(0, 2020),
    duration: getRandomDate(),
    genre: getRandomArrayItem(GENRES),
    description: getRandomDescription(DESCRIPTION),
    comments: getRandomIntegerNumber(0, 100)
  };
};



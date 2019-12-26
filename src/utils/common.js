export const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(max * Math.random());
};

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

export const getRandomArrayItems = (array) => {
  return array.filter(() => Math.random() > 0.5);
};

export const getRandomDescription = (string) => {
  return string.split(`.`)
    .filter(() => Math.random() > 0.5)
    .slice(0, getRandomIntegerNumber(1, 3));
};

export const getRandomDuration = () => {
  const targetDate = new Date();

  return `${targetDate.getHours()}h ${targetDate.getMinutes()}m`;
};

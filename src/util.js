const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(max * Math.random());
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const getRandomArrayItems = (array) => {
  return array.filter(() => Math.random() > 0.5);
};

const getRandomDescription = (string) => {
  return string.split(`.`)
    .filter(() => Math.random() > 0.5)
    .slice(0, getRandomIntegerNumber(1, 3));
};

const getRandomDuration = () => {
  const targetDate = new Date();

  return `${targetDate.getHours()}h ${targetDate.getMinutes()}m`
}

export {getRandomArrayItem, getRandomIntegerNumber, getRandomArrayItems, getRandomDescription, getRandomDuration};

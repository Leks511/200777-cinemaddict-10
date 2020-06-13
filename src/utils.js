export const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(max * Math.random());
};

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

export const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(0, 7);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return `${targetDate.getHours()}H ${targetDate.getMinutes()}m`;
};

export const getRandomBoolean = () => {
  return Math.random() > 0.5 ? true : false;
};

export const getRandomArrayItems = (array) => {
  return array
    .slice(0, getRandomIntegerNumber(1, 3));
};

export const createElement = (markup) => {
  const div = document.createElement(`div`);
  div.innerHTML = markup;

  return div.firstChild;
};

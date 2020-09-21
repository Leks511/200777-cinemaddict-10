import moment from "moment";

export const formatTime = (date) => {
  return moment(date).format(`HH MM`);
};

export const formatDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

import AbstractComponent from "./abstract-component.js";

const createFilmsTemplate = () => {
  return (
    `<section class="films"></section>`
  );
};

export default class FilmsComponent extends AbstractComponent {
  getTemplate() {
    return createFilmsTemplate();
  }
}

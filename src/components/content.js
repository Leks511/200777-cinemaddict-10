import AbstractComponent from "./abstract-component.js";

const createContentTemplate = () => {
  return (
    `<section class="films"></section>`
  );
};

export default class ContentComponent extends AbstractComponent {
  getTemplate() {
    return createContentTemplate();
  }
}

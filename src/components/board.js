import AbstractComponent from './abstract-component';

const createFilmsContentTemplate = () => {
  return (
    `<section class="films">
      <section class="films-list">

      </section>
    </section>`
  );
};

export default class Board extends AbstractComponent {
  getTemplate() {
    return createFilmsContentTemplate();
  }
}

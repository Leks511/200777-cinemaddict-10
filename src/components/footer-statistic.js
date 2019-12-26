import AbstractComponent from './abstract-component';

const createFooterStatisticTemplate = (filmsQuantity) => {
  return (
    `<section class="footer__statistics">
      <p>${filmsQuantity} movies inside</p>
    </section>`
  );
};

export default class FooterStatistic extends AbstractComponent {
  constructor(filmsQuantity) {
    super();

    this._filmsQuantity = filmsQuantity;
  }

  getTemplate() {
    return createFooterStatisticTemplate(this._filmsQuantity);
  }
}

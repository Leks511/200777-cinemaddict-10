export const createFooterStatisticTemplate = (filmsQuantity) => {
  return (
    `<section class="footer__statistics">
      <p>${filmsQuantity} movies inside</p>
    </section>`
  );
};

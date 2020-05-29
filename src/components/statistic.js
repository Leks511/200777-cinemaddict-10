export const createStatisticTemplate = (films) => {
  const allFilmsCount = films.length;

  return (
    `<section class="footer__statistics">
      <p>${allFilmsCount} movies inside</p>
    </section>`
  );
};

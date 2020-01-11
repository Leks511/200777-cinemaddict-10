// Контроллеры
import PageController from './controllers/page';

// Компоненты
import MenuComponent from './components/menu';
import FilmsBoardComponent from './components/films-board';
import UserRankComponent from './components/user-rank';
import FooterStatisticComponent from './components/footer-statistic';

// Получим данные для их отображения в компонентах
import {createFilmCardMocks} from './mock/film';
import {createFilterMock} from './mock/filter';

// Вспомогательные функции
import {render, RenderPosition} from './utils/render';

const FILMS_QUANTITY = 15;

// Найдём элементы страницы для последующего использования
const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

// Найдём элемент header и отрендерим туда рейтинг пользователя
render(headerElement, new UserRankComponent(FILMS_QUANTITY), RenderPosition.BEFOREEND);

// Получим данные фильтров и отрендерим в main меню с фильтрами
const filters = createFilterMock();
render(mainElement, new MenuComponent(filters), RenderPosition.BEFOREEND);

// Рендеринг статистики в футере
const footerElement = document.querySelector(`.footer`);
render(footerElement, new FooterStatisticComponent(FILMS_QUANTITY), RenderPosition.BEFOREEND);

// Получим данные фильмов и отобразим карточки определённое кол-во раз
const films = createFilmCardMocks(FILMS_QUANTITY);

// Рендеринг компонента доски с фильмами
const filmsBoardComponent = new FilmsBoardComponent();

const pageController = new PageController(filmsBoardComponent);
pageController.render(films);

// Наполнив компонент доски фильмами в PageController'е, выведем его на экран в mainElement'е
render(mainElement, filmsBoardComponent, RenderPosition.BEFOREEND);

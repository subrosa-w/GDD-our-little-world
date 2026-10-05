import './styles.css';
import { registerScene, goTo } from './router';
import { getProgress } from './progress';
import { mountLevelMenuButton } from './ui/levelMenu';

registerScene('login', () => import('./scenes/login').then((m) => m.default));
registerScene('menu', () => import('./scenes/menu').then((m) => m.default));
registerScene('prologo', () => import('./scenes/prologo').then((m) => m.default));
registerScene('nivel1', () => import('./scenes/nivel1').then((m) => m.default));
registerScene('nivel2', () => import('./scenes/nivel2').then((m) => m.default));
registerScene('nivel3', () => import('./scenes/nivel3').then((m) => m.default));
registerScene('final', () => import('./scenes/final').then((m) => m.default));

mountLevelMenuButton();

// Si ya entró antes, saltamos el login.
goTo(getProgress().loggedIn ? 'menu' : 'login');

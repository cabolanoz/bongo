const parameterisedRoute = (pattern = '', params = {}) => {
  const keys = Object.keys(params);

  if (!keys.length) return pattern;

  // Replace parameters with real values.
  return keys.reduce((acc, key) => {
    return acc.replace(new RegExp(`:${key}(\\([^\\)]*\\))?`), params[key]);
  }, pattern);
};

/* Routes */
export const Routes = {
  root: () => '/',
  promenades: () => '/juimonos',
  promenade: (params = {}) => parameterisedRoute('/juimonos/:slug([0-9a-z-_]+)', params),
  chitchats: () => '/tula-cuecho',
  chitchat: (params = {}) => parameterisedRoute('/tula-cuecho/:slug([0-9a-z-_]+)', params),
  weGoodLookings: () => '/salimos-tuani',
  weGoodLooking: (params = {}) => parameterisedRoute('/salimos-tuani/:slug([0-9a-z-_]+)', params),
  terms: () => '/terminos-y-usos',
  collaborators: () => '/colaboradores',
  login: () => '/inicia-sesion',
  forgetPassword: () => '/olvidaste-la-contrasena',
  signup: () => '/registrate',
  subscribe: () => '/suscribite',
  contactUs: () => '/contactanos'
};

/* Promenade routes */
export const PROMENADE_ROUTES = [
  Routes.root(),
  Routes.promenades(),
  Routes.promenade(),
];

/* Chitchat routes */
export const CHITCHAT_ROUTES = [
  Routes.chitchats(),
  Routes.chitchat(),
];

/* We good looking routes */
export const WE_GOOD_LOOKING_ROUTES = [
  Routes.weGoodLookings(),
  Routes.weGoodLooking(),
];

/* Extra routes */
export const EXTRA_ROUTES = [
  Routes.terms(),
  Routes.collaborators(),
];

/* Access routes */
export const ACCESS_ROUTES = [
  Routes.login(),
  Routes.forgetPassword(),
  Routes.signup(),
  Routes.subscribe(),
  Routes.contactUs(),
];

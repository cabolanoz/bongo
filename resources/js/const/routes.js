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
  weGoodLookings: () => '/salimos-tuani',
  weGoodLooking: (params = {}) => parameterisedRoute('/salimos-tuani/:slug([0-9a-z-_]+)', params),
  terms: () => '/terminos-y-usos',
  collaborators: () => '/colaboradores',
};

/* We good looking routes */
export const WE_GOOD_LOOKING_ROUTES = [
  Routes.weGoodLookings(),
  Routes.weGoodLooking(),
]

/* Extra routes */
export const EXTRA_ROUTES = [
  Routes.terms(),
  Routes.collaborators(),
];

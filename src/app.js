import { routesAuthority } from './services/menu';

export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
    },
  },
};

let authRoutes = {
  '/form/advanced-form': { authority: ['admin', 'user'] },
};

function ergodicRoutes(routes, authKey, authority) {
  routes.forEach(element => {
    if (element.path === authKey) {
      if (!element.authority) element.authority = []; // eslint-disable-line
      Object.assign(element.authority, authority || []);
    } else if (element.routes) {
      ergodicRoutes(element.routes, authKey, authority);
    }
    return element;
  });
}

export function patchRoutes(routes) {
  if (authRoutes !== null && authRoutes !== undefined) {
    Object.keys(authRoutes).map(authKey =>
      ergodicRoutes(routes, authKey, authRoutes[authKey].authority)
    );
    window.g_routes = routes;
  }
}

export function render(oldRender) {
  routesAuthority().then(response => {
    if (response && response.success) {
      authRoutes = response.data;
    }
    oldRender();
  });
}

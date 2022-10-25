import React from 'react';
import {
  isDarwin,
} from '../app/utils';
import {
  RoutesList,
  RoutesListActions,
  RoutesValid,
} from '../types';

export const makeRoutes = <
  Paths extends string,
>(
  routesGenerator: () =>
  & RoutesList<Paths>
  & RoutesValid<Paths, RoutesList<Paths>>,
): RoutesList<Paths> => routesGenerator();

export const routes = makeRoutes(() => {
  const windowsMenu = [
    {
      label: 'Dashboard',
      accelerator: isDarwin ? 'Cmd+D' : 'Ctrl+D',
      bridgeAction: { type: 'createWindow', path: '/' },
    },
    {
      label: 'Settings',
      accelerator: isDarwin ? 'Cmd+.' : 'Ctrl+.',
      bridgeAction: { type: 'createWindow', path: '/settings' },
    },
  ] as const;
  return ({
    '/': {
      component: React.lazy(() => import('../app/components/routes/dashboard')),
      window: {},
      menu: [
        {
          label: 'Window',
          type: 'submenu',
          submenu: windowsMenu,
        },
      ],
    },
    '/settings': {
      component: React.lazy(() => import('../app/components/routes/settings')),
      window: {},
      menu: [
        {
          label: 'Window',
          type: 'submenu',
          submenu: windowsMenu.filter(({ label }) => label !== 'Settings'),
        },
      ],
    },
  } as const);
});

export type Routes = typeof routes;
export type BridgeActions = RoutesListActions<typeof routes>;

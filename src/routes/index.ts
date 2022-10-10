import React from 'react';
import {
  RoutesList,
  RoutesListActions,
  RoutesValid,
} from '../types/route';

export const makeRoutes = <
  Paths extends string,
  Config = RoutesList<Paths>,
>(routesConfig: Config & RoutesValid<Paths, Config>) => routesConfig;

// @ts-ignore
export const routes = makeRoutes({
  '/': {
    component: React.lazy(() => import('../app/components/routes/dashboard')),
    window: {},
    menu: [
      {
        label: 'Window',
        type: 'submenu',
        submenu: [
          {
            label: 'Dashboard',
            bridgeAction: { type: 'createWindow', path: '/' },
          },
          {
            label: 'Settings',
            bridgeAction: { type: 'createWindow', path: '/settings' },
          },
        ],
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
        submenu: [
          {
            label: 'Dashboard',
            bridgeAction: { type: 'createWindow', path: '/' },
          },
        ],
      },
    ],
  },
} as const);

export type Routes = typeof routes;
export type BridgeActions = RoutesListActions<typeof routes>;

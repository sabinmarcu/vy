import {
  routes as routeConfig,
} from '../../../routes';

export const routes = Object.entries(routeConfig)
  .reduce(
    (acc, [path, { component }]) => [
      ...acc,
      { path, component },
    ],
    [],
  );

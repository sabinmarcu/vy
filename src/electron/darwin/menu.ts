import {
  MenuCreator,
} from '../types';

export const createMenu: MenuCreator = {
  pre: () => [
    {
      label: 'AppName',
      role: 'appMenu',
    },
  ],
  post: () => [],
};

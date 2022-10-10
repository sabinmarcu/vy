import {
  app,
} from 'electron';

app.setJumpList([
  {
    type: 'custom',
    name: 'Jump To',
    items: [
      {
        type: 'task',
        program: process.execPath,
        args: '',
        iconPath: process.execPath,
        iconIndex: 0,
        title: 'New Window',
        description: 'Create a new window',
      },
    ],
  },
]);

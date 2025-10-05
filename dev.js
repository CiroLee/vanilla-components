import liver from 'live-server';

liver.start({
  root: './app',
  open: true,
  ignore: 'node_modules',
  wait: 1000,
  cors: true,
});

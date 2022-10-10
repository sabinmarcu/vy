const platforms = [
  'all',
  'aix',
  'darwin',
  'freebsd',
  'linux',
  'openbsd',
  'sunos',
  'win32',
];
platforms.forEach(
  (platform) => {
    if (
      (process.platform === platform)
      || (platform === 'all')
    ) {
      try {
        console.log(`attempting to load platform '${platform}'`);
        // eslint-disable-next-line import/no-dynamic-require
        require(`./electron/${platform}/root`);
        console.log(`loaded platform '${platform}'`);
      } catch {
        // don't care
      }
    }
  },
);

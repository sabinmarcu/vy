import {
  PlatformMap,
} from '../types';

const platforms = [process.platform, 'all'] as const;
export const perPlatform = <
  T extends (...args: any) => any,
  Args = Parameters<T>,
>(
  forge: PlatformMap<T>,
  ...args: Args[]
): void => (
  platforms.forEach(
    (platform) => {
      if (forge[platform]) {
        forge[platform](...args);
      }
    },
  )
);

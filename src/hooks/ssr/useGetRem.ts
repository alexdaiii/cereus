import {useIsHydrated} from '@/hooks';

const CHROME_DEFAULT_FONT_SIZE = 16;

/**
 * Get the amount of pixels per rem
 */
export const useGetRem = () => {
  const isHydrated = useIsHydrated();
  return isHydrated
    ? parseFloat(getComputedStyle(window!.document.documentElement).fontSize)
    : CHROME_DEFAULT_FONT_SIZE;
};

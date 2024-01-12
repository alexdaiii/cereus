/**
 * This file contains a hook for checking if the JavaScript has been hydrated.
 * The code is copied from Remix.
 * @see {@link https://github.com/remix-run/remix}
 * @license MIT
 * @see {@link https://github.com/remix-run/remix/blob/main/LICENSE.md}
 */
import {useEffect, useState} from 'react';

let isHydrated = false;

/**
 * Return a boolean indicating if the JS has been hydrated already.
 * When doing Server-Side Rendering, the result will always be false.
 * When doing Client-Side Rendering, the result will always be false on the
 * first render and true from then on. Even if a new component renders it will
 * always start with true.
 */
export function useIsHydrated(): boolean {
  const [hydrated, setHydrated] = useState(() => isHydrated);

  useEffect(function hydrate() {
    isHydrated = true;
    setHydrated(true);
  }, []);

  return hydrated;
}

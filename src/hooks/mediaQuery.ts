import { useEffect, useState } from "react";

const useMediaQuery = (query: string, initialValue: boolean) => {
  const [matches, setMatches] = useState(initialValue);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);
  return matches;
};

export const useIsDesktopMedia = (initialValue: boolean = true) =>
  useMediaQuery(`(min-width: 1200px)`, initialValue);
export const useIsTabletMedia = (initialValue: boolean = true) =>
  useMediaQuery(`(max-width: 1199px) and (min-width: 768px)`, initialValue);
export const useIsMobileMedia = (initialValue: boolean = true) =>
  useMediaQuery(`(max-width: 767px)`, initialValue);

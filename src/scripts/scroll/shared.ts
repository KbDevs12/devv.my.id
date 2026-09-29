import { ScrollTrigger } from "gsap/ScrollTrigger";

export const MQ = {
  motion: "(prefers-reduced-motion: no-preference)",
  wide: "(min-width: 1024px)",
} as const;

export const CLS = {
  motion: "js-motion",
  hscroll: "js-hscroll",
} as const;

export const ANCHOR_LERP = 0.09;

let refreshTimer = 0;

export function scheduleRefresh(delay = 80): void {
  window.clearTimeout(refreshTimer);
  refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), delay);
}

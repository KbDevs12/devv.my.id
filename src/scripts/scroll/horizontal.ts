import { gsap } from "gsap";
import { CLS, scheduleRefresh } from "./shared";

export function setupHorizontal(): (() => void) | void {
  const section = document.querySelector<HTMLElement>("[data-hscroll]");
  const pin = section?.querySelector<HTMLElement>("[data-hscroll-pin]");
  const viewport = section?.querySelector<HTMLElement>(
    "[data-hscroll-viewport]",
  );
  const track = section?.querySelector<HTMLElement>("[data-hscroll-track]");
  const bar = section?.querySelector<HTMLElement>("[data-hscroll-progress]");
  if (!section || !pin || !viewport || !track) return;

  const root = document.documentElement;
  root.classList.add(CLS.hscroll);

  const getDistance = () =>
    Math.max(0, track.scrollWidth - viewport.clientWidth);

  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: pin,
      start: "top top",
      end: () => `+=${getDistance()}`,
      pin: true,
      scrub: true,
      invalidateOnRefresh: true,
      refreshPriority: 1,
    },
  });

  tl.to(track, { x: () => -getDistance() }, 0);
  if (bar)
    tl.fromTo(bar, { scaleX: 0, transformOrigin: "0 50%" }, { scaleX: 1 }, 0);

  scheduleRefresh();

  return () => {
    tl.scrollTrigger?.kill(true);
    tl.revert();
    root.classList.remove(CLS.hscroll);
    scheduleRefresh();
  };
}

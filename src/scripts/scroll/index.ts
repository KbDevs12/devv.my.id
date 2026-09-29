import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";

import { CLS, MQ, scheduleRefresh } from "./shared";
import { createLenis } from "./lenis";
import { scrollToHash, setupAnchors } from "./anchors";
import { setupHorizontal } from "./horizontal";
import { setupReveal } from "./reveal";
import { setupScrollSpy } from "./scrollspy";

gsap.registerPlugin(ScrollTrigger);

function initScroll(): () => void {
  const root = document.documentElement;
  const mm = gsap.matchMedia();
  let lenis: Lenis | null = null;

  mm.add(MQ.motion, () => {
    root.classList.add(CLS.motion);
    const smooth = createLenis();
    lenis = smooth.lenis;
    const offAnchors = setupAnchors(smooth.lenis);

    return () => {
      offAnchors();
      smooth.destroy();
      lenis = null;
      root.classList.remove(CLS.motion);
    };
  });

  mm.add(`${MQ.motion} and ${MQ.wide}`, () => setupHorizontal());

  mm.add({ motion: MQ.motion, wide: MQ.wide }, (ctx) => {
    if (!ctx.conditions?.motion) return;
    return setupReveal({ skipHorizontal: !!ctx.conditions.wide });
  });

  mm.add("all", () => setupScrollSpy());

  const onLoad = () => {
    ScrollTrigger.refresh();
    if (lenis) scrollToHash(lenis);
  };
  void document.fonts?.ready.then(() => scheduleRefresh());
  if (document.readyState === "complete") requestAnimationFrame(onLoad);
  else window.addEventListener("load", onLoad, { once: true });

  root.dataset.scroll = "ready";

  return () => {
    window.removeEventListener("load", onLoad);
    mm.revert();
    delete root.dataset.scroll;
  };
}
let destroy: (() => void) | null = null;

const start = () => {
  destroy?.();
  destroy = initScroll();
};
const stop = () => {
  destroy?.();
  destroy = null;
};

start();
document.addEventListener("astro:before-swap", stop);
document.addEventListener("astro:after-swap", start);

import.meta.hot?.dispose(() => {
  stop();
  document.removeEventListener("astro:before-swap", stop);
  document.removeEventListener("astro:after-swap", start);
});

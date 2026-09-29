import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function createLenis() {
  const lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
  });

  const raf = (time: number) => lenis.raf(time * 1000);
  lenis.on("scroll", () => ScrollTrigger.update());
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  return {
    lenis,
    destroy() {
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
    },
  };
}

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ITEMS = "[data-reveal], [data-reveal-stagger] > *";

interface Options {
  skipHorizontal: boolean;
}

export function setupReveal({ skipHorizontal }: Options): () => void {
  const items = gsap.utils
    .toArray<HTMLElement>(ITEMS)
    .filter(
      (el) =>
        !el.hasAttribute("data-revealed") &&
        !(skipHorizontal && el.closest("[data-hscroll]")),
    );

  const triggers = ScrollTrigger.batch(items, {
    start: "top 90%",
    once: true,
    interval: 0.08,
    batchMax: 6,
    onEnter: (batch) => {
      gsap.fromTo(
        batch,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.07,
          clearProps: "transform",
        },
      );

      batch.forEach((el) => el.setAttribute("data-revealed", ""));
    },
  });

  return () => {
    triggers.forEach((t) => t.kill());
    gsap.killTweensOf(items);
    gsap.set(items, { clearProps: "opacity,transform" });
  };
}

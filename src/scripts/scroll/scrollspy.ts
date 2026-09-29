import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function setupScrollSpy(): () => void {
  const links = gsap.utils.toArray<HTMLElement>("[data-nav-link]");
  const ids = [
    ...new Set(
      links.map((l) => l.dataset.target).filter((v): v is string => !!v),
    ),
  ];

  const setActive = (id: string) =>
    links.forEach((link) => {
      const on = link.dataset.target === id;
      link.toggleAttribute("data-active", on);
      if (on) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });

  const triggers = ids.flatMap((id) => {
    const el = document.getElementById(id);
    if (!el) return [];
    return ScrollTrigger.create({
      trigger: el,
      start: "top 40%",
      end: "bottom 40%",
      onToggle: (self) => self.isActive && setActive(id),
    });
  });

  return () => triggers.forEach((t) => t.kill());
}

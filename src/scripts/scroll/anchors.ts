import type Lenis from "lenis";
import { ANCHOR_LERP } from "./shared";

const getHeaderOffset = () =>
  document.querySelector<HTMLElement>(".mobile-nav > summary")?.offsetHeight ??
  0;

function getTarget(hash: string): HTMLElement | null {
  if (hash.length < 2) return null;
  try {
    return document.getElementById(decodeURIComponent(hash.slice(1)));
  } catch {
    return null;
  }
}

export function scrollToHash(lenis: Lenis): void {
  const target = getTarget(location.hash);
  if (target)
    lenis.scrollTo(target, { offset: -getHeaderOffset(), immediate: true });
}

export function setupAnchors(lenis: Lenis): () => void {
  const onClick = (e: MouseEvent) => {
    if (e.defaultPrevented || e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    const link = (e.target as Element | null)?.closest<HTMLAnchorElement>(
      "a[href]",
    );
    if (!link || link.target === "_blank" || link.hasAttribute("download"))
      return;

    const url = new URL(link.href, location.href);
    const samePage =
      url.origin === location.origin &&
      url.pathname === location.pathname &&
      url.search === location.search;
    if (!samePage) return;

    const target = getTarget(url.hash);
    if (!target) return;

    e.preventDefault();

    link.closest("details")?.removeAttribute("open");

    lenis.scrollTo(target, { offset: -getHeaderOffset(), lerp: ANCHOR_LERP });

    if (location.hash !== url.hash) history.pushState(null, "", url.hash);

    target.tabIndex = -1;
    target.focus({ preventScroll: true });
  };

  document.addEventListener("click", onClick);
  return () => document.removeEventListener("click", onClick);
}

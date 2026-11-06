/*
 * Shared scroll-into-view reveal runtime.
 *
 * Powers the <Reveal> wrapper component (src/components/Reveal.astro). All
 * variants trigger once, when the element enters the viewport, and taken
 * from the motion.dev js-scroll-triggered example the design references:
 *
 *   data-reveal="slide-left"  -> slide in from the left + fade.
 *   data-reveal="slide-right" -> slide in from the right + fade.
 *   data-reveal="scroll-fade" -> fade in only, no slide.
 *
 * Motion values live in src/styles/motion.css and are mirrored in MOTION below.
 */

import { animate, inView } from "motion";

export const MOTION = {
  slideDuration: 0.9,
  slideEase: [0.17, 0.55, 0.55, 1],
  slideDistance: 100,
  fadeDuration: 0.6,
};

function initSlideLeft(el) {
  const amount = Number(el.dataset.revealAmount ?? 0.5);
  const delay = Number(el.dataset.revealDelay ?? 0);
  const repeat = el.dataset.revealRepeat != null;

  let stop;
  const run = (element) => {
    animate(
      element,
      { opacity: [0, 1], x: [-MOTION.slideDistance, 0] },
      { duration: MOTION.slideDuration, ease: MOTION.slideEase, delay },
    );
    element.classList.add("reveal-in");

    if (repeat) {
      // Re-hide on exit so the next entry replays (matches the raw example).
      return () => {
        animate(element, { opacity: 0, x: -MOTION.slideDistance }, { duration: 0 });
        element.classList.remove("reveal-in");
      };
    }

    // Default: fire once, then stop observing.
    if (stop) stop();
  };

  stop = inView(el, run, { amount });
}

function initSlideRight(el) {
  const amount = Number(el.dataset.revealAmount ?? 0.5);
  const delay = Number(el.dataset.revealDelay ?? 0);
  const repeat = el.dataset.revealRepeat != null;

  let stop;
  const run = (element) => {
    animate(
      element,
      { opacity: [0, 1], x: [MOTION.slideDistance, 0] },
      { duration: MOTION.slideDuration, ease: MOTION.slideEase, delay },
    );
    element.classList.add("reveal-in");

    if (repeat) {
      // Re-hide on exit so the next entry replays (matches the raw example).
      return () => {
        animate(element, { opacity: 0, x: MOTION.slideDistance }, { duration: 0 });
        element.classList.remove("reveal-in");
      };
    }

    // Default: fire once, then stop observing.
    if (stop) stop();
  };

  stop = inView(el, run, { amount });
}

function initScrollFade(el) {
  const amount = Number(el.dataset.revealAmount ?? 0.3);
  const delay = Number(el.dataset.revealDelay ?? 0);
  const repeat = el.dataset.revealRepeat != null;

  let stop;
  const run = (element) => {
    // Explicit [0, 1] rather than a bare `1`: the classList.add() right below
    // removes the CSS rule holding opacity at 0, and Motion samples the
    // "current" value slightly later than this call, with just `1` as the
    // target it ends up animating from the (by-then) already-1 value, i.e.
    // not animating at all.
    animate(element, { opacity: [0, 1] }, { duration: MOTION.fadeDuration, ease: MOTION.slideEase, delay });
    element.classList.add("reveal-in");

    if (repeat) {
      return () => {
        animate(element, { opacity: 0 }, { duration: 0 });
        element.classList.remove("reveal-in");
      };
    }

    if (stop) stop();
  };

  stop = inView(el, run, { amount });
}

export function initReveal(root = document) {
  const els = root.querySelectorAll("[data-reveal]");
  if (!els.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    els.forEach((el) => el.classList.add("reveal-in"));
    return;
  }

  els.forEach((el) => {
    if (el.dataset.revealInit != null) return;
    el.dataset.revealInit = "";
    // Only now, with the observer about to attach, does the resting hidden/offset
    // state apply (see motion.css), so an element the user reaches before this
    // script has loaded is just visible, never stuck mid-animation.
    el.classList.add("reveal-pending");
    if (el.dataset.reveal === "scroll-fade") initScrollFade(el);
    else if (el.dataset.reveal === "slide-left") initSlideLeft(el);
    else if (el.dataset.reveal === "slide-right") initSlideRight(el);
  });
}

if (!window.__revealInit) {
  window.__revealInit = true;
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => initReveal());
  } else {
    initReveal();
  }
}

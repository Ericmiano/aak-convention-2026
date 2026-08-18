/**
 * Coastal Civic Modernism: motion makes the Convention's editorial fields settle
 * into alignment, using only opacity and transform with a complete reduced-motion path.
 */
import { useEffect } from "react";
import { useLocation } from "wouter";

const revealSelectors = [
  ".hero-section",
  ".intro-section",
  ".theme-section",
  ".programme-section",
  ".experience-section",
  ".venue-section",
  ".tours-section",
  ".registration-cta",
  ".page-hero",
  ".programme-page",
  ".theme-long",
  ".speakers-empty",
  ".experience-page",
  ".venue-page",
  ".build-tours-page",
  ".register-hero",
  ".register-page",
].join(", ");

export function MotionDirector() {
  const [location] = useLocation();

  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;
    let interactiveCleanup: (() => void) | undefined;
    let frame = 0;

    const setProgress = () => {
      frame = 0;
      const scrollRange = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      root.style.setProperty("--reading-progress", String(Math.min(window.scrollY / scrollRange, 1)));
    };

    const requestProgress = () => {
      if (!frame) frame = window.requestAnimationFrame(setProgress);
    };

    const stopMotion = () => {
      root.dataset.motion = "reduced";
      document.querySelectorAll<HTMLElement>("[data-motion-reveal]").forEach((element) => element.classList.add("is-visible"));
    };

    const startMotion = () => {
      root.dataset.motion = "on";
      const fields = Array.from(document.querySelectorAll<HTMLElement>(revealSelectors));
      fields.forEach((field) => field.setAttribute("data-motion-reveal", ""));

      observer = new IntersectionObserver(
        (entries) => entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer?.unobserve(entry.target);
          }
        }),
        { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
      );
      fields.forEach((field) => observer?.observe(field));

      const hero = document.querySelector<HTMLElement>(".hero-section");
      if (hero && window.matchMedia("(pointer: fine)").matches) {
        const onMove = (event: PointerEvent) => {
          const bounds = hero.getBoundingClientRect();
          const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 12;
          const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 8;
          hero.style.setProperty("--hero-shift-x", `${x.toFixed(2)}px`);
          hero.style.setProperty("--hero-shift-y", `${y.toFixed(2)}px`);
        };
        const reset = () => {
          hero.style.setProperty("--hero-shift-x", "0px");
          hero.style.setProperty("--hero-shift-y", "0px");
        };
        hero.addEventListener("pointermove", onMove, { passive: true });
        hero.addEventListener("pointerleave", reset);
        return () => {
          hero.removeEventListener("pointermove", onMove);
          hero.removeEventListener("pointerleave", reset);
        };
      }
      return undefined;
    };

    const applyPreference = () => {
      interactiveCleanup?.();
      observer?.disconnect();
      if (reducedMotion.matches) stopMotion();
      else interactiveCleanup = startMotion();
    };

    applyPreference();
    setProgress();
    window.addEventListener("scroll", requestProgress, { passive: true });
    window.addEventListener("resize", requestProgress, { passive: true });
    reducedMotion.addEventListener("change", applyPreference);

    return () => {
      observer?.disconnect();
      interactiveCleanup?.();
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestProgress);
      window.removeEventListener("resize", requestProgress);
      reducedMotion.removeEventListener("change", applyPreference);
    };
  }, [location]);

  return <div className="reading-progress" aria-hidden="true"><i /></div>;
}

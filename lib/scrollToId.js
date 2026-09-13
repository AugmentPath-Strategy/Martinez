export async function scrollToId(id) {
  const target = document.getElementById(id);
  if (!target) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    target.scrollIntoView();
    return;
  }

  const { default: gsap } = await import("gsap");
  const { ScrollToPlugin } = await import("gsap/ScrollToPlugin");
  gsap.registerPlugin(ScrollToPlugin);
  gsap.to(window, {
    duration: 1.05,
    scrollTo: { y: target, offsetY: 72 },
    ease: "power3.inOut",
  });
}

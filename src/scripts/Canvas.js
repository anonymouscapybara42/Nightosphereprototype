export function initCanvas() {
  const el = document.getElementById("bg-canvas");
  if (!el) return;

  function initVanta() {
    if (!window.VANTA?.HALO) {
      console.warn("Vanta HALO not available yet");
      return;
    }
    if (window.__vantaEffect) {
      window.__vantaEffect.destroy();
      window.__vantaEffect = null;
    }
    window.__vantaEffect = window.VANTA.HALO({
      el: "#bg-canvas",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      backgroundColor: 0x020817,
      baseColor: 0x0a1628,
      amplitudeFactor: 1.8,
      size: 1.4,
      xOffset: 0,
      yOffset: 0,
    });
  }

  // Small delay to ensure THREE + VANTA are parsed after head scripts
  if (window.VANTA?.HALO) {
    initVanta();
  } else {
    window.addEventListener("load", initVanta, { once: true });
  }

  document.addEventListener("astro:before-swap", () => {
    if (window.__vantaEffect) {
      window.__vantaEffect.destroy();
      window.__vantaEffect = null;
    }
  });
}
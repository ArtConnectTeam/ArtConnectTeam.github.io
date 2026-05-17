document.addEventListener("DOMContentLoaded", () => {
  const revealItems = document.querySelectorAll(".reveal");
  const progressBar = document.querySelector(".scroll-progress");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const mobileViewport = window.matchMedia("(max-width: 767px)");
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -8% 0px",
    }
  );
  
  revealItems.forEach((item) => observer.observe(item));
  
  const updateProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
    progressBar?.style.setProperty("--progress", Math.min(progress, 1));
  };
  
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
  updateProgress();
  
  const chooseForm = (role) => {
    document.querySelectorAll(".join-card").forEach((card) => {
      card.classList.toggle("is-active", card.dataset.role === role);
    });
  };
  
  document.querySelectorAll("[data-role]").forEach((button) => {
    button.addEventListener("click", () => chooseForm(button.dataset.role));
  });
  
  document.querySelectorAll("[data-choose]").forEach((link) => {
    link.addEventListener("click", () => chooseForm(link.dataset.choose));
  });
  
  if (!reducedMotion.matches && !mobileViewport.matches) {
    document.querySelectorAll("[data-tilt]").forEach((element) => {
      const maxTilt = element.classList.contains("phone-mockup") ? 7 : 4;
  
      element.addEventListener("pointermove", (event) => {
        if (mobileViewport.matches) return;

        const rect = element.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
  
        element.style.setProperty("--tilt-x", `${(-y * maxTilt).toFixed(2)}deg`);
        element.style.setProperty("--tilt-y", `${(x * maxTilt).toFixed(2)}deg`);
      });
  
      element.addEventListener("pointerleave", () => {
        if (mobileViewport.matches) return;

        element.style.setProperty("--tilt-x", "0deg");
        element.style.setProperty("--tilt-y", "0deg");
      });
    });
  }
  
});

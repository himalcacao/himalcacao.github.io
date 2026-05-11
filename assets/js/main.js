(() => {
  const heroVideo = document.querySelector("[data-hero-video]");

  if (!heroVideo) {
    return;
  }

  const source = heroVideo.querySelector("source");
  const mobileQuery = window.matchMedia("(max-width: 43.75rem)");

  const setHeroVideo = () => {
    const isMobile = mobileQuery.matches;
    const nextSource = isMobile ? heroVideo.dataset.mobileSrc : heroVideo.dataset.desktopSrc;
    const nextPoster = isMobile ? heroVideo.dataset.mobilePoster : heroVideo.dataset.desktopPoster;

    if (!source || !nextSource || source.getAttribute("src") === nextSource) {
      if (nextPoster) {
        heroVideo.setAttribute("poster", nextPoster);
      }
      return;
    }

    source.setAttribute("src", nextSource);

    if (nextPoster) {
      heroVideo.setAttribute("poster", nextPoster);
    }

    heroVideo.load();
    heroVideo.play().catch(() => {});
  };

  setHeroVideo();

  if (typeof mobileQuery.addEventListener === "function") {
    mobileQuery.addEventListener("change", setHeroVideo);
  } else if (typeof mobileQuery.addListener === "function") {
    mobileQuery.addListener(setHeroVideo);
  }
})();

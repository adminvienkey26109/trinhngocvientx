document.addEventListener("DOMContentLoaded", () => {
  const videoLinks = [
    "https://www.youtube.com/embed/pCbaNYGsqOs",
    "https://www.youtube.com/embed/ZGhTjouWqoQ",
    "https://www.youtube.com/embed/jDu2103LJIo",
    "https://www.youtube.com/embed/UUVfum1EpYY",
    "https://www.youtube.com/embed/vVHHrX91Qjw",
    "https://www.youtube.com/embed/MpIAp0n_giM",
    "https://www.youtube.com/embed/5RNNtw-DyQs",
    "https://www.youtube.com/embed/ZxPxDjmTpyU",
    "https://www.youtube.com/embed/AXzEeFkmev8",
    "https://www.youtube.com/embed/AGF-QP0rTnc"
  ];

  const ytFrame = document.getElementById("ytFrame");
  const toggleBtn = document.getElementById("toggleMuteBtn");
  let isMuted = true;

  if (ytFrame && toggleBtn) {
    const randomIndex = Math.floor(Math.random() * videoLinks.length);
    const videoUrl = `${videoLinks[randomIndex]}?autoplay=1&mute=1&enablejsapi=1`;
    ytFrame.src = videoUrl;

    toggleBtn.addEventListener("click", () => {
      const command = isMuted ? "unMute" : "mute";
      ytFrame.contentWindow.postMessage(
        JSON.stringify({
          event: "command",
          func: command,
          args: ""
        }),
        "*"
      );
      toggleBtn.textContent = isMuted ? "🔊 Tắt Tiếng" : "🔇 Bật Tiếng";
      isMuted = !isMuted;
    });
  }
});

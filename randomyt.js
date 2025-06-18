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
  if (ytFrame) {
    const randomIndex = Math.floor(Math.random() * videoLinks.length);
    // Chỉ có autoplay=1, không có mute => nỗ lực phát âm thanh
    const videoUrl = `${videoLinks[randomIndex]}?autoplay=1`;
    ytFrame.src = videoUrl;
  }
});

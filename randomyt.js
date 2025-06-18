document.addEventListener("DOMContentLoaded", () => {
  const videoLinks = [
    "https://www.youtube.com/embed/pCbaNYGsqOs?autoplay=1&mute=1",
    "https://www.youtube.com/embed/ZGhTjouWqoQ?autoplay=1&mute=1",
    "https://www.youtube.com/embed/jDu2103LJIo?autoplay=1&mute=1",
    "https://www.youtube.com/embed/UUVfum1EpYY?autoplay=1&mute=1",
    "https://www.youtube.com/embed/vVHHrX91Qjw?autoplay=1&mute=1",
    "https://www.youtube.com/embed/MpIAp0n_giM?autoplay=1&mute=1",
    "https://www.youtube.com/embed/5RNNtw-DyQs?autoplay=1&mute=1",
    "https://www.youtube.com/embed/ZxPxDjmTpyU?autoplay=1&mute=1",
    "https://www.youtube.com/embed/AXzEeFkmev8?autoplay=1&mute=1",
    "https://www.youtube.com/embed/AGF-QP0rTnc?autoplay=1&mute=1"
  ];

  const ytFrame = document.getElementById("ytFrame");
  if (ytFrame) {
    const randomIndex = Math.floor(Math.random() * videoLinks.length);
    ytFrame.src = videoLinks[randomIndex];
  }
});

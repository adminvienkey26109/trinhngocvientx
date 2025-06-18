document.addEventListener("DOMContentLoaded", () => {
  const videoLinks = [
    "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1",
    "https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1",
    "https://www.youtube.com/embed/kJQP7kiw5Fk?autoplay=1&mute=1",
    "https://www.youtube.com/embed/3JZ_D3ELwOQ?autoplay=1&mute=1",
    "https://www.youtube.com/embed/2Vv-BfVoq4g?autoplay=1&mute=1",
    "https://www.youtube.com/embed/LsoLEjrDogU?autoplay=1&mute=1",
    "https://www.youtube.com/embed/eVTXPUF4Oz4?autoplay=1&mute=1",
    "https://www.youtube.com/embed/uelHwf8o7_U?autoplay=1&mute=1",
    "https://www.youtube.com/embed/YykjpeuMNEk?autoplay=1&mute=1",
    "https://www.youtube.com/embed/HgzGwKwLmgM?autoplay=1&mute=1"
  ];

  const ytFrame = document.getElementById("ytFrame");
  if (ytFrame) {
    const randomIndex = Math.floor(Math.random() * videoLinks.length);
    ytFrame.src = videoLinks[randomIndex];
  }
});

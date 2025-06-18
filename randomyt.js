document.addEventListener("DOMContentLoaded", () => {
  const videoLinks = [
    "https://youtu.be/pCbaNYGsqOs?si=DKGsHV2bDlQxtkOh",
    "https://youtu.be/ZGhTjouWqoQ?si=ibg07HrnYHHTYtmE",
    "https://youtu.be/jDu2103LJIo?si=g0Ua5xeTIik6h3Xl",
    "https://youtu.be/UUVfum1EpYY?si=yTXf3Je2OmjWqxfc",
    "https://youtu.be/vVHHrX91Qjw?si=UNkoTK8-HJ9kfJm-",
    "https://youtu.be/MpIAp0n_giM?si=HeXDNn6LQaSNJeYI",
    "https://youtu.be/5RNNtw-DyQs?si=mfDavIMAhy7hJrKx",
    "https://youtu.be/ZxPxDjmTpyU?si=4aj-Wng3ouPqNYXp",
    "https://youtu.be/AXzEeFkmev8?si=gy93GJUkZCCNSVm6",
    "https://youtu.be/AGF-QP0rTnc?si=tR_mAFEYlSJIhOP-"
  ];

  const ytFrame = document.getElementById("ytFrame");
  if (ytFrame) {
    const randomIndex = Math.floor(Math.random() * videoLinks.length);
    ytFrame.src = videoLinks[randomIndex];
  }
});

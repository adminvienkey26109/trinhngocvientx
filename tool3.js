const toolPopup = document.getElementById("toolPopup");
  const closeBtn = document.getElementById("closeBtn");
  const openBtn = document.getElementById("openBtn");
  const adminBtn = document.getElementById("adminBtn");

  closeBtn.onclick = () => {
    toolPopup.style.display = "none";
    openBtn.style.display = "block";
  };

  openBtn.onclick = () => {
    toolPopup.style.display = "flex";
    openBtn.style.display = "none";
  };

  adminBtn.onclick = () => {
    const fbLink = "https://www.facebook.com/Vientn26";
    window.open(fbLink, "_blank");
  };

  // Kéo popup
  const header = document.getElementById("toolHeader");
  let isDragging = false, offsetX = 0, offsetY = 0;

  header.addEventListener('mousedown', e => {
    isDragging = true;
    offsetX = e.clientX - toolPopup.offsetLeft;
    offsetY = e.clientY - toolPopup.offsetTop;
    header.style.cursor = "grabbing";
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
    header.style.cursor = "move";
  });

  window.addEventListener('mousemove', e => {
    if (!isDragging) return;
    let x = e.clientX - offsetX;
    let y = e.clientY - offsetY;
    x = Math.max(0, Math.min(window.innerWidth - toolPopup.offsetWidth, x));
    y = Math.max(0, Math.min(window.innerHeight - toolPopup.offsetHeight, y));
    toolPopup.style.left = x + "px";
    toolPopup.style.top = y + "px";
    toolPopup.style.right = "auto";
  });

  // Dự đoán
  document.getElementById("predictBtn").addEventListener("click", function () {
    const d1 = parseInt(document.getElementById("dice1").value);
    const d2 = parseInt(document.getElementById("dice2").value);
    const d3 = parseInt(document.getElementById("dice3").value);
    const e = parseInt(document.getElementById("extra").value);

    if ([d1, d2, d3, e].some(v => isNaN(v) || v < 1 || v > 6)) {
      document.getElementById("result").innerHTML = "⚠️ Vui lòng nhập đủ 4 số từ 1 đến 6!";
      return;
    }

    let total = d1 + d2 + d3 + e;
    const mod = total % 12;
    const xiuSet = [0, 2, 4, 6, 8, 10];
    const ketQua = xiuSet.includes(mod) ? "Xỉu" : "Tài";

    document.getElementById("result").innerHTML =
      "Max: " + total + "<br>Fram ~: " + mod + "<br><span class='" + (ketQua === "Xỉu" ? "xiu" : "tai") + "'>" + ketQua + "</span>";
  });

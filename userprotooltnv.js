const gameLinks = [
  "tool1.html", "tool2.html", "tool3.html", "tool4.html", "tool5.html",
  "tool6.html", "tool7.html", "tool8.html", "tool9.html", "tool10.html"
];
const toolNames = [
  "TOOL MD5 💎", "TOOL MÃ PHIÊN 💎", "TOOL XÍ NGẦU 💎", "TOOL 4 🎮",
  "TOOL 5 🎮", "TOOL 6 🎮", "TOOL 7 🎮", "TOOL 8 🎮",
  "TOOL 9 🎮", "TOOL 10 🎮"
];
const keysURL = "https://adminvienkey26109.github.io/trinhngocvientx/keys.json";
const status = document.getElementById("status");
const userKeyInput = document.getElementById("userKey");
const gameMenu = document.getElementById("gameMenu");
const gamesButtons = document.getElementById("gamesButtons");
const gameContainer = document.getElementById("gameContainer");
const gameFrame = document.getElementById("gameFrame");
const expiryInfo = document.getElementById("expiryInfo");

let countdownInterval = null;

function showGameMenu() {
  gameMenu.style.display = "block";
  userKeyInput.style.display = "none";
  document.querySelector("button[onclick='checkKey()']").style.display = "none";
  gameContainer.style.display = "none";
  gamesButtons.innerHTML = "";

  for (let i = 0; i < gameLinks.length; i++) {
    const btn = document.createElement("button");
    btn.className = "game-btn";
    btn.textContent = toolNames[i] || `Tool ${i + 1}`;
    btn.onclick = () => openTool(i);
    gamesButtons.appendChild(btn);
  }

  startExpiryCountdown();
}

function openTool(index) {
  gameFrame.src = gameLinks[index];
  gameMenu.style.display = "none";
  gameContainer.style.display = "block";
}

function backToMenu() {
  gameFrame.src = "";
  gameContainer.style.display = "none";
  gameMenu.style.display = "block";
}

async function checkKey() {
  const inputKey = userKeyInput.value.trim();
  if (!inputKey) {
    status.textContent = "❌ Vui lòng nhập key!";
    status.style.color = "red";
    return;
  }

  status.textContent = "💎 Đang kiểm tra key...";
  status.style.color = "yellow";

  try {
    const res = await fetch(keysURL);
    const data = await res.json();
    const keyObj = data.keys.find(k => k.key === inputKey);

    if (!keyObj) {
      status.textContent = "❌ Key không hợp lệ!";
      status.style.color = "red";
      return;
    }

    const now = new Date();
    if (keyObj.expiresAt && new Date(keyObj.expiresAt) < now) {
      status.textContent = "⏰ Key đã hết hạn!";
      status.style.color = "red";
      return;
    }

    localStorage.setItem("userKey", inputKey);
    localStorage.setItem("keyExpire", keyObj.expiresAt || "");
    status.textContent = "";
    setTimeout(showGameMenu, 800);
  } catch (err) {
    status.textContent = "❌ Lỗi khi kiểm tra key.";
    status.style.color = "red";
    console.error(err);
  }
}

function logout() {
  localStorage.removeItem("userKey");
  localStorage.removeItem("keyExpire");
  location.reload();
}

function updateVNTime() {
  const now = new Date();
  const vnTimeStr = now.toLocaleString('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    hour12: false,
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    day: '2-digit', month: '2-digit', year: 'numeric'
  });
  document.getElementById("vnTime").textContent = `🕒 Giờ Việt Nam: ${vnTimeStr}`;
}

function startExpiryCountdown() {
  if (countdownInterval) clearInterval(countdownInterval);

  const expireDateStr = localStorage.getItem("keyExpire");
  if (!expireDateStr) {
    expiryInfo.textContent = "";
    return;
  }

  const expireDate = new Date(expireDateStr);
  countdownInterval = setInterval(() => {
    const now = new Date();
    let diff = expireDate.getTime() - now.getTime();
    if (diff <= 0) {
      expiryInfo.textContent = "⏰ Key đã hết hạn!";
      clearInterval(countdownInterval);
      logout();
      return;
    }
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);
    expiryInfo.textContent = `⏳ Còn lại: ${d} ngày ${h} giờ ${m} phút ${s} giây`;
  }, 1000);
}

window.onload = () => {
  const savedKey = localStorage.getItem("userKey");
  const savedExpire = localStorage.getItem("keyExpire");
  if (savedKey && (!savedExpire || new Date(savedExpire) > new Date())) {
    showGameMenu();
  }
  updateVNTime();
  setInterval(updateVNTime, 1000);
};

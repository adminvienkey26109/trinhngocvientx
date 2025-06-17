const keysURL = "https://adminvienkey26109.github.io/trinhngocvientx/keys.json";
const gameLinks = [
  "tool1.html", "tool2.html", "tool3.html", "tool4.html", "tool5.html",
  "tool6.html", "tool7.html", "tool8.html", "tool9.html", "tool10.html"
];
const toolNames = [
  "TOOL MD5 💎", "TOOL MA PHIEN 💎", "TOOL XÍ NGẦU 💎", "CHƯA UPDATE ❌",
  "CHƯA UPDATE ❌", "CHƯA UPDATE ❌", "CHƯA UPDATE ❌", "CHƯA UPDATE ❌",
  "CHƯA UPDATE ❌", "CHƯA UPDATE ❌"
];

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
    btn.textContent = toolNames[i];
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
  status.textContent = "🔄 Đang kiểm tra key...";
  status.style.color = "white";
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
    const expiresAt = new Date(keyObj.expiresAt);
    if (keyObj.expiresAt && expiresAt < now) {
      status.textContent = "⏰ Key đã hết hạn!";
      status.style.color = "red";
      return;
    }

    localStorage.setItem("userKey", inputKey);
    localStorage.setItem("keyExpire", keyObj.expiresAt || "");
    status.textContent = "";
    showGameMenu();
  } catch (e) {
    status.textContent = "❌ Lỗi khi kiểm tra key!";
    status.style.color = "red";
    console.error(e);
  }
}

function logout() {
  localStorage.removeItem("userKey");
  localStorage.removeItem("keyExpire");
  location.reload();
}

function startExpiryCountdown() {
  if (countdownInterval) clearInterval(countdownInterval);
  const expireDateStr = localStorage.getItem("keyExpire");
  if (!expireDateStr) return;
  const expireDate = new Date(expireDateStr);
  countdownInterval = setInterval(() => {
    const now = new Date();
    let diff = expireDate - now;
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

function updateVNTime() {
  const now = new Date().toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour12: false
  });
  document.getElementById("vnTime").textContent = `🕒 Giờ Việt Nam: ${now}`;
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

document.addEventListener("keydown", e => {
  if (
    e.key === "F12" ||
    (e.ctrlKey && e.shiftKey && ["I", "C", "J"].includes(e.key.toUpperCase())) ||
    (e.ctrlKey && ["U", "S"].includes(e.key.toUpperCase()))
  ) {
    e.preventDefault();
    alert("🚫 Không được phép!");
  }
});

document.addEventListener("contextmenu", e => {
  e.preventDefault();
  alert("🚫 Chuột phải bị khóa!");
});

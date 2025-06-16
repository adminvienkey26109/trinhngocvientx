const gameLinks = [
  "tool1.html", "tool2.html", "tool3.html", "tool4.html", "tool5.html",
  "tool6.html", "tool7.html", "tool8.html", "tool9.html", "tool10.html"
];

const toolNames = [
  "TOOL MD5 💎", "TOOL MÃ PHIÊN 💎", "TOOL XÍ NGẦU 💎", "CHƯA UPDATE ❌",
  "CHƯA UPDATE ❌", "CHƯA UPDATE ❌", "CHƯA UPDATE ❌", "CHƯA UPDATE ❌",
  "CHƯA UPDATE ❌", "CHƯA UPDATE ❌"
];

const keysURL = "https://raw.githubusercontent.com/adminvienkey26109/trinhngocvientx/main/keys.json";
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
  if (!document.getElementById("gameFrame")) {
    const frame = document.createElement("iframe");
    frame.id = "gameFrame";
    document.body.appendChild(frame);
  }
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
  status.style.color = "#fff";

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
    if (expiresAt < now) {
      status.textContent = "⏰ Key đã hết hạn!";
      status.style.color = "red";
      return;
    }

    localStorage.setItem("userKey", inputKey);
    localStorage.setItem("keyExpire", keyObj.expiresAt);
    status.textContent = "✅ Key hợp lệ, vào tool!";
    status.style.color = "#00ffbf";
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

function startExpiryCountdown() {
  if (countdownInterval) clearInterval(countdownInterval);

  const expireStr = localStorage.getItem("keyExpire");
  if (!expireStr) return;

  const expireDate = new Date(expireStr);
  countdownInterval = setInterval(() => {
    const now = new Date();
    let diff = expireDate - now;
    if (diff <= 0) {
      expiryInfo.textContent = "⏰ Key đã hết hạn!";
      clearInterval(countdownInterval);
      logout();
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff %= (1000 * 60 * 60 * 24);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff %= (1000 * 60 * 60);
    const minutes = Math.floor(diff / (1000 * 60));
    diff %= (1000 * 60);
    const seconds = Math.floor(diff / 1000);

    expiryInfo.textContent = `⏳ Còn lại: ${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`;
  }, 1000);
}

function updateVNTime() {
  const now = new Date();
  const vnTime = now.toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    day: "2-digit", month: "2-digit", year: "numeric",
    hour12: false
  });
  document.getElementById("vnTime").textContent = `🕒 Giờ Việt Nam: ${vnTime}`;
}

window.onload = () => {
  const savedKey = localStorage.getItem("userKey");
  const savedExpire = localStorage.getItem("keyExpire");
  if (savedKey && savedExpire && new Date(savedExpire) > new Date()) {
    showGameMenu();
  }
  updateVNTime();
  setInterval(updateVNTime, 1000);
};

// 🔒 Chống F12, chuột phải
document.addEventListener("keydown", e => {
  if (
    e.key === "F12" ||
    (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key.toUpperCase())) ||
    (e.ctrlKey && ["U", "S"].includes(e.key.toUpperCase()))
  ) {
    e.preventDefault();
    alert("🚫 Không được phép!");
  }
});

document.addEventListener("contextmenu", e => {
  e.preventDefault();
  alert("🚫 Không cho chuột phải!");
});

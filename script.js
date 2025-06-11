const keysURL = "https://raw.githubusercontent.com/adminvienkey26109/trinhngocvientx/refs/heads/main/keys.json";

const gameLinks = [
  "<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>TOOL TÀI XỈU Khanh Luxury</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Segoe UI', sans-serif;
      background: url('https://i.imgur.com/sPCatYp.jpeg') no-repeat center center fixed;
      background-size: cover;
      color: white;
      text-shadow: 1px 1px 2px #000;
    }
    .container {
      background: rgba(0, 0, 0, 0.6);
      margin: 20px auto;
      padding: 20px;
      border-radius: 15px;
      max-width: 600px;
    }
    h1 {
      color: #00ffd5;
      font-size: 28px;
    }
    input, button {
      width: 90%;
      padding: 10px;
      margin: 10px auto;
      font-size: 16px;
      border-radius: 8px;
      border: none;
      display: block;
    }
    input {
      background: #fff;
      color: #000;
    }
    button {
      background: #00ffc3;
      color: #000;
      font-weight: bold;
      cursor: pointer;
    }
    button:hover {
      background: #00dab5;
    }
    .output {
      background: rgba(255, 255, 255, 0.1);
      padding: 15px;
      border-radius: 10px;
      margin-top: 15px;
    }
  </style>
</head>
<body>

  <div class="container">
    <h1>💠 TOOL TÀI XỈU Khanh Luxury 💎</h1>
    <p>Dự đoán theo chuỗi Tài/Xỉu và MD5 ✈️</p>

    <h2>🔐 Dự đoán theo MD5</h2>
    <input type="text" id="md5Input" placeholder="Nhập chuỗi MD5 (32 ký tự)">
    <button onclick="predictFromMD5()">Dự đoán từ MD5</button>
    <div class="output" id="md5Output"></div>

    <h2>🧠 Dự đoán theo chuỗi kết quả</h2>
    <input type="text" id="seqInput" placeholder="Nhập chuỗi T/X (vd: T X T X X T)">
    <button onclick="predictFromSequence()">Dự đoán từ chuỗi</button>
    <div class="output" id="seqOutput"></div>
  </div>

  <script>
    function predictFromMD5() {
      const md5 = document.getElementById("md5Input").value.trim().toLowerCase();
      const output = document.getElementById("md5Output");

      if (!/^[a-f0-9]{32}$/.test(md5)) {
        output.innerHTML = "⚠️ Chuỗi MD5 sai rồi thằng ngu 👌";
        return;
      }

      const dice1 = parseInt(md5[0], 16) % 6 + 1;
      const dice2 = parseInt(md5[1], 16) % 6 + 1;
      const dice3 = parseInt(md5[2], 16) % 6 + 1;
      const total = dice1 + dice2 + dice3;
      const result = total < 11 ? "Xỉu" : "Tài";

      output.innerHTML = `
        🎲 Xúc xắc: ${dice1}, ${dice2}, ${dice3}<br>
        🫶🏻 Tổng điểm: ${total}<br>
        🎯 Kết quả dự đoán: <b>${result}</b>
      `;
    }

    function identifyCau(seq) {
      if (seq.includes("TTTT") || seq.includes("XXXX")) {
        return "Cầu bệt";
      } else if (seq.includes("TT") && seq.includes("XX")) {
        return "Cầu 1-1";
      } else if (seq.includes("TXXT") || seq.includes("XTTX")) {
        return "Cầu 2-2";
      } else if (seq.includes("TXT") || seq.includes("XTX")) {
        return "Cầu 3-1";
      } else {
        return "Cầu tự do";
      }
    }

    function predictFromSequence() {
      const raw = document.getElementById("seqInput").value.toUpperCase().replace(/\s+/g, '');
      const output = document.getElementById("seqOutput");

      if (!/^[TX]+$/.test(raw)) {
        output.innerHTML = "⚠️ Chuỗi không hợp lệ. Vui lòng nhập ví dụ: T X T X X T";
        return;
      }

      const countT = (raw.match(/T/g) || []).length;
      const countX = (raw.match(/X/g) || []).length;
      const cau = identifyCau(raw);
      let guess = "Tài (ngẫu nhiên)";
      if (countT > countX) guess = "Xỉu 🎲";
      else if (countX > countT) guess = "Tài 💎";

      output.innerHTML = `
        📊 Thống kê: ${countT} Tài, ${countX} Xỉu<br>
        🎯 Gợi ý ván sau: <b>${guess}</b><br>
        🔍 Loại cầu nhận diện: <b>${cau}</b>
      `;
    }
  </script>

</body>
</html>",
  "https://game2.example.com",
  "https://game3.example.com",
  "https://game4.example.com",
  "https://game5.example.com",
  "https://game6.example.com",
  "https://game7.example.com",
  "https://game8.example.com",
  "https://game9.example.com",
  "https://game10.example.com"
];

const status = document.getElementById("status");
const gameMenu = document.getElementById("gameMenu");
const gamesButtons = document.getElementById("gamesButtons");
const logoutBtn = document.getElementById("logoutBtn");
const countdownElem = document.getElementById("countdown");
const userKeyInput = document.getElementById("userKey");

function toggleAdminContacts() {
  const cont = document.getElementById("adminContacts");
  cont.style.display = cont.style.display === "block" ? "none" : "block";
}

function showGameMenu(expireDate) {
  gameMenu.style.display = "flex";
  userKeyInput.style.display = "none";
  document.querySelector("button[onclick='checkKey()']").style.display = "none";
  logoutBtn.style.display = "inline-block";

  gamesButtons.innerHTML = "";
  for (let i = 0; i < 10; i++) {
    const btn = document.createElement("button");
    btn.className = "game-btn";
    btn.innerHTML = `<span>Game ${i+1}</span>`;
    btn.onclick = () => {
      window.location.href = gameLinks[i];
    };
    gamesButtons.appendChild(btn);
  }

  if (expireDate) startCountdown(new Date(expireDate));
}

let countdownInterval;
function startCountdown(expireDate) {
  clearInterval(countdownInterval);
  function updateCountdown() {
    const now = new Date();
    const diff = expireDate - now;
    if (diff <= 0) {
      clearInterval(countdownInterval);
      alert("⏰ Key của bạn đã hết hạn và bị ban!");
      logout();
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    countdownElem.textContent = `Key hết hạn sau: ${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`;
  }
  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
}

async function checkKey() {
  const inputKey = userKeyInput.value.trim();
  if (!inputKey) {
    status.style.color = "red";
    status.textContent = "❌ Vui lòng nhập key!";
    return;
  }
  status.textContent = "🔄 Đang kiểm tra key...";
  status.style.color = "white";
  try {
    const res = await fetch(keysURL);
    const data = await res.json();
    if (!data.keys) throw new Error("Dữ liệu keys không hợp lệ");
    const keyObj = data.keys.find(k => k.key === inputKey);
    if (!keyObj) {
      status.style.color = "red";
      status.textContent = "❌ Key không hợp lệ.";
      return;
    }

    if (keyObj.expiresAt) {
      const expireDate = new Date(keyObj.expiresAt);
      const now = new Date();
      if (expireDate < now) {
        status.style.color = "red";
        status.textContent = "❌ Key của bạn đã hết hạn và bị ban!";
        return;
      }
      localStorage.setItem("userKey", inputKey);
      localStorage.setItem("keyExpire", keyObj.expiresAt);
      status.style.color = "green";
      status.textContent = "✅ Key hợp lệ! Đang chuyển hướng...";
      setTimeout(() => showGameMenu(keyObj.expiresAt), 1000);
    } else {
      localStorage.setItem("userKey", inputKey);
      localStorage.removeItem("keyExpire");
      status.style.color = "green";
      status.textContent = "✅ Key hợp lệ! Đang chuyển hướng...";
      setTimeout(() => showGameMenu(null), 1000);
    }
  } catch (e) {
    status.style.color = "red";
    status.textContent = "❌ Lỗi khi kiểm tra key.";
    console.error(e);
  }
}

function logout() {
  localStorage.removeItem("userKey");
  localStorage.removeItem("keyExpire");
  location.reload();
}

window.onload = () => {
  const savedKey = localStorage.getItem("userKey");
  const savedExpire = localStorage.getItem("keyExpire");
  if (savedKey) {
    if (savedExpire) {
      const expireDate = new Date(savedExpire);
      if (expireDate < new Date()) {
        alert("⏰ Key của bạn đã hết hạn và bị ban!");
        logout();
        return;
      }
      showGameMenu(savedExpire);
    } else {
      showGameMenu(null);
    }
  }
};

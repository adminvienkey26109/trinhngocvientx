const keysURL = "https://raw.githubusercontent.com/adminvienkey26109/trinhngocvientx/refs/heads/main/keys.json";

const gameLinks = [
"https://adminvienkey26109.github.io/adminvienkey26109/tooltxthuong3.html",
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
cont.style.display = (cont.style.display === "block") ? "none" : "block";
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
btn.innerHTML = <span>Game ${i+1}</span>;
btn.onclick = () => {
window.location.href = gameLinks[i];
};
gamesButtons.appendChild(btn);
}

if (expireDate) {
startCountdown(new Date(expireDate));
}
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

  setTimeout(() => {  
    showGameMenu(keyObj.expiresAt);  
  }, 1000);  
} else {  
  localStorage.setItem("userKey", inputKey);  
  localStorage.removeItem("keyExpire");  
  status.style.color = "green";  
  status.textContent = "✅ Key hợp lệ! Đang chuyển hướng...";  
  setTimeout(() => {  
    showGameMenu(null);  
  }, 1000);  
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
const now = new Date();
if (expireDate < now) {
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

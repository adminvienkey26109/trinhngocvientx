const owner = "adminvienkey26109";
const repo = "trinhngocvientx";
const path = "keys.json";
let sha = "";

function base64Encode(str) {
  return btoa(unescape(encodeURIComponent(str)));
}
function base64Decode(str) {
  return decodeURIComponent(escape(atob(str)));
}

function checkLogin() {
  const u = document.getElementById("username").value.trim();
  const p = document.getElementById("password").value.trim();
  if (u === "aekv208209" && p === "aekv20820998") {
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("pinBox").classList.remove("hidden");
  } else alert("Sai tài khoản hoặc mật khẩu!");
}

function checkPin() {
  const pin = document.getElementById("pin2").value.trim();
  if (pin === "261tnv") {
    document.getElementById("pinBox").classList.add("hidden");
    document.getElementById("mainBox").classList.remove("hidden");
  } else alert("Sai mã PIN 2!");
}

function generateKey() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 35; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
  document.getElementById("newKey").value = result;
}

async function loadKeys() {
  const token = document.getElementById("token").value.trim();
  const status = document.getElementById("status");
  const error = document.getElementById("error");
  error.textContent = "";
  if (!token) return alert("Vui lòng nhập GitHub Token!");

  status.textContent = "🔄 Đang tải keys.json...";
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
      headers: { Authorization: `token ${token}` }
    });
    if (!res.ok) throw new Error(`Lỗi tải: ${res.status}`);
    const data = await res.json();
    sha = data.sha;
    const content = base64Decode(data.content);
    document.getElementById("keyList").value = content;
    status.textContent = "✅ Tải keys.json thành công.";
    renderKeyList(JSON.parse(content));
  } catch (e) {
    status.textContent = "";
    error.textContent = "❌ Lỗi: " + e.message;
  }
}

function addKey() {
  const newKey = document.getElementById("newKey").value.trim();
  const textarea = document.getElementById("keyList");
  const time = document.getElementById("timeInput").value;
  const date = document.getElementById("dateInput").value;
  if (!newKey) return alert("Vui lòng tạo key mới.");
  if (time && date) return alert("Chỉ chọn 1 trong hai: Giờ HOẶC Ngày.");

  let expires = "";
  if (time) {
    const now = new Date();
    const [h, m] = time.split(":");
    now.setHours(h, m, 0, 0);
    expires = now.toISOString();
  } else if (date) {
    const d = new Date(date);
    expires = d.toISOString();
  }

  try {
    let json = JSON.parse(textarea.value);
    if (!Array.isArray(json.keys)) json.keys = [];
    if (json.keys.find(k => k.key === newKey)) return alert("Key đã tồn tại.");
    json.keys.push({ key: newKey, expiresAt: expires });
    textarea.value = JSON.stringify(json, null, 2);
    document.getElementById("newKey").value = "";
    renderKeyList(json);
  } catch {
    alert("Nội dung keys.json không hợp lệ.");
  }
}

async function saveKeys() {
  const token = document.getElementById("token").value.trim();
  const status = document.getElementById("status");
  const error = document.getElementById("error");
  error.textContent = "";
  if (!token) return alert("Vui lòng nhập GitHub Token!");

  const content = document.getElementById("keyList").value;
  try {
    JSON.parse(content);
  } catch {
    return alert("keys.json không hợp lệ.");
  }

  status.textContent = "💾 Đang lưu keys.json...";
  try {
    const body = {
      message: "Update keys.json via admin tool",
      content: base64Encode(content),
      sha: sha
    };
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
      method: "PUT",
      headers: {
        "Authorization": `token ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error(`Lỗi lưu file: ${res.status}`);
    const data = await res.json();
    sha = data.content.sha;
    status.textContent = "✅ Lưu thành công!";
  } catch (e) {
    status.textContent = "";
    error.textContent = "❌ Lỗi: " + e.message;
  }
}

function renderKeyList(json) {
  const container = document.getElementById("keyDisplay");
  container.innerHTML = "";
  if (!Array.isArray(json.keys)) return;
  const now = new Date();
  json.keys.forEach((item, index) => {
    const keyDiv = document.createElement("div");
    keyDiv.style.display = "flex";
    keyDiv.style.alignItems = "center";

    const keyInfo = document.createElement("div");
    keyInfo.style.flex = "1";
    keyInfo.style.padding = "4px";
    keyInfo.style.border = "1px dashed white";
    keyInfo.style.marginRight = "6px";
    keyInfo.style.wordBreak = "break-word";

    let expired = false;
    let expiryText = "";

    if (item.expiresAt) {
      const expireDate = new Date(item.expiresAt);
      expired = now > expireDate;
      expiryText = `⏳ HSD: ${expireDate.toLocaleString()}`;
    } else {
      expiryText = "♾️ Không giới hạn";
    }

    keyInfo.innerHTML = `
      🔑 <b>${item.key}</b><br>${expiryText} ${expired ? "❌ <span style='color:red'>Đã hết hạn</span>" : ""}
    `;

    const copyBtn = document.createElement("button");
    copyBtn.textContent = "📋 Copy";
    copyBtn.onclick = () => {
      if (expired) {
        alert("❌ Key đã hết hạn!");
      } else {
        navigator.clipboard.writeText(item.key);
        alert("✅ Đã sao chép key!");
      }
    };

    const delBtn = document.createElement("button");
    delBtn.textContent = "🗑️ Xóa";
    delBtn.style.marginLeft = "4px";
    delBtn.onclick = () => {
      if (confirm("Bạn có chắc muốn xóa key này?")) {
        json.keys.splice(index, 1);
        document.getElementById("keyList").value = JSON.stringify(json, null, 2);
        renderKeyList(json);
      }
    };

    keyDiv.appendChild(keyInfo);
    keyDiv.appendChild(copyBtn);
    keyDiv.appendChild(delBtn);
    container.appendChild(keyDiv);
  });
      }

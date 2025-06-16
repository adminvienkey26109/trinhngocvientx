window.onload = () => {
  document.getElementById("game-selection").style.display = "flex";
};

function choseGame(url) {
  document.getElementById("game-frame").src = url;
  document.getElementById("game-selection").style.display = "none";
  document.getElementById("tool-box").style.display = "flex";
}

function openCustomGame() {
  const url = document.getElementById("customGameUrl").value;
  if (url.trim()) choseGame(url);
}

function duDoan() {
  const md5 = document.getElementById("md5").value.trim();
  if (!md5 || md5.length < 10) return alert("Nhập mã MD5 hợp lệ!");
  const lastChar = md5[md5.length - 1];
  const ketQua = isNaN(lastChar) ? "Tài" : (parseInt(lastChar) % 2 === 0 ? "Xỉu" : "Tài");

  document.getElementById("actual").value = ketQua;
  document.getElementById("result").innerHTML = `<span style="color:cyan;">🎯 Dự đoán: ${ketQua}</span>`;
  document.getElementById("winSound").play();

  const li = document.createElement("li");
  li.innerHTML = `MD5: <span style="color:yellow;">${md5}</span> → Dự đoán: <span style="color:cyan;">${ketQua}</span> ➤ <span id="status-${md5}" style="color:gray;">Chờ xác nhận</span>`;
  document.getElementById("history-list").prepend(li);
}

function xacNhanKetQua() {
  const md5 = document.getElementById("md5").value.trim();
  const actual = prompt("Nhập kết quả thực tế (Tài/Xỉu):");
  if (!actual) return;
  const element = document.getElementById(`status-${md5}`);
  if (!element) return alert("Không tìm thấy lịch sử phù hợp!");
  const duDoan = document.getElementById("actual").value;
  element.innerHTML = duDoan === actual ? "✅ Đúng" : "❌ Sai";
  element.style.color = duDoan === actual ? "lime" : "red";
}

function pasteMD5() {
  navigator.clipboard.readText().then(text => {
    document.getElementById("md5").value = text;
  }).catch(() => alert("❌ Không thể dán từ clipboard"));
}

function xoaLichSu() {
  document.getElementById("result").innerHTML = "";
  document.getElementById("history-list").innerHTML = "";
  alert("🗑️ Đã xóa toàn bộ lịch sử");
}

function toggleMusic() {
  const iframe = document.getElementById("musicPlayer");
  const btn = document.getElementById("musicBtn");
  if (iframe.src.includes("auto_play=true")) {
    iframe.src = iframe.src.replace("auto_play=true", "auto_play=false");
    btn.innerText = "▶️";
  } else {
    iframe.src = iframe.src.replace("auto_play=false", "auto_play=true");
    btn.innerText = "⏸️";
  }
}

function dragElement(elmnt, dragHandle) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  dragHandle.onmousedown = dragMouseDown;
  function dragMouseDown(e) {
    e.preventDefault();
    pos3 = e.clientX; pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }
  function elementDrag(e) {
    e.preventDefault();
    pos1 = pos3 - e.clientX; pos2 = pos4 - e.clientY;
    pos3 = e.clientX; pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }
  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
dragElement(document.getElementById("tool-box"), document.getElementById("tool-drag"));

// Bảo vệ devtools
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', function(e) {
  if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I") || (e.ctrlKey && e.key === "U")) {
    e.preventDefault();
  }
});
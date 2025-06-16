document.addEventListener("contextmenu", e => e.preventDefault());
document.onkeydown = function (e) {
  if (e.key === "F12" || (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J"))) {
    return false;
  }
};

function duDoan() {
  const ma_phien = document.getElementById("ma_phien").value;
  const tong_3_hot = parseInt(document.getElementById("tong_3_hot").value);
  const diem_xi_truoc = parseInt(document.getElementById("diem_xi_truoc").value);
  const sai_phien_truoc = document.getElementById("sai_phien_truoc").checked;

  const so_cuoi = parseInt(ma_phien.slice(-1));
  let tong = tong_3_hot + diem_xi_truoc + so_cuoi;

  if (tong >= 18) tong -= 18;
  else if (tong >= 12) tong -= 12;
  else if (tong >= 5) tong -= 5;

  let ket_qua = "Không xác định ❓";
  if ([0, 2, 4, 6].includes(tong)) {
    ket_qua = "XỈU ❄️";
  } else if ([1, 3, 5, 7].includes(tong)) {
    ket_qua = "TÀI 🔥";
  }

  if (sai_phien_truoc) {
    ket_qua = ket_qua.includes("XỈU") ? "TÀI 🔥" : "XỈU ❄️";
  }

  const output = document.getElementById("log_output");
  output.innerHTML = `
    <div>Mã phiên: <b>${ma_phien}</b></div>
    <div class="result">→ Dự đoán: ${ket_qua}</div>
    <div style="margin-top: 10px; color: #888">VIEN V.I.P 🕳️💫</div>
  `;
  output.scrollIntoView({ behavior: 'smooth' });
}
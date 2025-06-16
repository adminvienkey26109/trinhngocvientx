function predictResult() {
      const md5 = document.getElementById('md5').value.trim();
      const key = document.getElementById('secret-key').value.trim();

      if (md5.length !== 32) {
        document.getElementById('result').innerHTML = '<span class="xiu">Chuỗi MD5 không hợp lệ.</span>';
        return;
      }

      const fullHash = md5 + key;
      const hash = CryptoJS.MD5(fullHash).toString();

      const sliced = hash.slice(0, 8);
      const intValue = parseInt(sliced, 16);
      const diceSum = (intValue % 6 + 1) + (Math.floor(intValue / 6) % 6 + 1) + (Math.floor(intValue / 36) % 6 + 1);
      const resultText = diceSum >= 11 ? `<span class="tai">Tài (${diceSum})</span>` : `<span class="xiu">Xỉu (${diceSum})</span>`;

      document.getElementById('result').innerHTML = 'Kết quả: ' + resultText;
    }

    window.onload = () => {
      document.getElementById('main-functions').style.display = 'block';
    };

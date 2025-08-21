/* ================= MATRIX FIX ================= */
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

let fontSize = 16;
let chars = "HAPPYBIRTHDAY";
let columns = 0;
let drops = [];

function setupMatrix() {
  const dpr = Math.max(1, window.devicePixelRatio || 1);

  const cssW = window.innerWidth;
  const cssH = window.innerHeight;

  canvas.width = Math.floor(cssW * dpr);
  canvas.height = Math.floor(cssH * dpr);

  // scale context để vẽ theo CSS px
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.font = `${fontSize}px monospace`;

  columns = Math.floor(cssW / fontSize);
  drops = Array(columns).fill(1);
}

function drawMatrix() {
  const cssW = window.innerWidth;
  const cssH = window.innerHeight;

  // phủ nền mờ để tạo vệt chữ
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, cssW, cssH);

  for (let i = 0; i < drops.length; i++) {
    const text = chars.charAt(Math.floor(Math.random() * chars.length));
    ctx.fillStyle = `rgba(255,255,255,${0.3 + Math.random() * 0.7})`;
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > cssH && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setupMatrix();
setInterval(drawMatrix, 50);
window.addEventListener("resize", setupMatrix);

/* ============== MESSAGES ============== */
const messages = ["Chúc Mừng", "Sinh Nhật", "Thanh Dịu"];
let msgIndex = 0;
const messageDiv = document.getElementById("message");

function showNextMessage() {
  if (msgIndex < messages.length) {
    messageDiv.textContent = messages[msgIndex];
    msgIndex++;
    setTimeout(showNextMessage, 2000);
  } else {
    messageDiv.textContent = "";
    showGift();
  }
}

/* ============== GIFT BOX ============== */
function showGift() {
  const giftDiv = document.createElement("div");
  giftDiv.id = "gift-box";

  // ảnh
  const img = document.createElement("img");
  img.src = "./images/ThanhDiu4.jpg";
  img.style.maxWidth = "300px";
  img.style.borderRadius = "10px";
  giftDiv.appendChild(img);
  giftDiv.appendChild(document.createElement("br"));

  // nút quà
  const btnGift = document.createElement("button");
  btnGift.textContent = "🎁 Quà nè";

  const params = new URLSearchParams(window.location.search);
  if (params.get("fromMessage") === "true") {
    btnGift.textContent = "🎁 Mở quà";
    btnGift.style.display = "inline-block";
  } else {
    btnGift.style.display = "none";
  }

  btnGift.addEventListener("click", () => {
    giftDiv.style.display = "none";

    let container = document.getElementById("container");
    if (!container) {
      container = document.createElement("div");
      container.id = "container";
      document.body.appendChild(container);
    }
    container.style.display = "block";

    if (typeof initTinhCau === "function") {
      initTinhCau();
    } else {
      console.error("Chưa tìm thấy hàm initTinhCau!");
    }
  });

  // nút lời nhắn
  const btnMsg = document.createElement("button");
  btnMsg.textContent = "💌 Lời nhắn";
  btnMsg.addEventListener("click", () => {
    const messagePage = document.getElementById("message-page");
    if (!messagePage) {
      console.error("#message-page không tồn tại");
      return;
    }

    Object.assign(messagePage.style, {
      display: "block",
      position: "fixed",
      left: "0",
      top: "0",
      width: "100vw",
      height: "100vh",
      zIndex: "9999",
      overflow: "auto",
      background: "transparent"
    });

    fetch("./message.html", { cache: "no-store" })
      .then(res => {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.text();
      })
      .then(html => {
        messagePage.innerHTML = html;

        // CSS
        if (!document.querySelector('link[href="./message.css"]')) {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = "./message.css";
          document.head.appendChild(link);
        }

        // JS
        function runInit() {
          if (typeof initMessage === "function") {
            initMessage();
          } else {
            setTimeout(runInit, 50);
          }
        }

        if (!document.getElementById("message-script")) {
          const s = document.createElement("script");
          s.id = "message-script";
          s.src = "./message.js";
          s.defer = true;
          s.onload = runInit;
          document.body.appendChild(s);
        } else {
          runInit();
        }

        // Ẩn hộp quà
        const giftBox = document.getElementById("gift-box");
        if (giftBox) giftBox.style.display = "none";
      })
      .catch(err => {
        console.error("Lỗi khi load message.html:", err);
        alert("Không tải được lời nhắn. Hãy chạy bằng Live Server và kiểm tra đường dẫn ./message.html");
      });
  });

  giftDiv.appendChild(btnGift);
  giftDiv.appendChild(btnMsg);
  document.body.appendChild(giftDiv);
}

/* ============== MUSIC + UNLOCK ============== */
const bgMusic = document.getElementById("bg-music");

document.getElementById("unlock-btn").addEventListener("click", () => {
  const pass = document.getElementById("password").value;
  if (pass === "2308") {
    document.getElementById("lock-screen").style.display = "none";
    bgMusic.play();
    setTimeout(showNextMessage, 2000);
  } else {
    document.getElementById("error-msg").textContent = "Sai mật khẩu!";
  }
});

window.addEventListener("load", () => {
  const params = new URLSearchParams(window.location.search);
  if (params.get("fromMessage") === "true") {
    document.getElementById("lock-screen").style.display = "none";
    bgMusic.play();
    showGift();
  }
});

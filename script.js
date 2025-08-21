const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
  ctx.scale(dpr, dpr);
  ctx.imageSmoothingEnabled = false;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);


const chars = "HAPPY BIRTH DAY THANH DIU";
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#fff";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}
setInterval(drawMatrix, 50);


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

function showGift() {
    const giftDiv = document.createElement("div");
    giftDiv.id = "gift-box";

    // Ảnh
    const img = document.createElement("img");
    img.src = "./images/ThanhDiu4.jpg";
    img.style.maxWidth = "300px";
    img.style.borderRadius = "10px";
    giftDiv.appendChild(img);
    giftDiv.appendChild(document.createElement("br"));

    // Nút quà
    const btnGift = document.createElement("button");
    btnGift.textContent = "🎁 Quà nè";

    const params = new URLSearchParams(window.location.search);
    if (params.get("fromMessage") === "true") {
        btnGift.textContent = "🎁 Mở quà";
        btnGift.style.display = "inline-block";
    } else {
        btnGift.style.display = "none"; // ẩn nếu lần đầu
    }

    btnGift.addEventListener("click", () => {
  // ❌ giftDiv.remove();
  giftDiv.style.display = "none";  // chỉ ẩn, không xoá

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


    // Nút lời nhắn
const btnMsg = document.createElement("button");
btnMsg.textContent = "💌 Lời nhắn";
btnMsg.addEventListener("click", () => {
  console.log("💌 Click nút Lời nhắn");

  const messagePage = document.getElementById("message-page");
  if (!messagePage) {
    console.error("#message-page không tồn tại");
    return;
  }

  // Bật overlay và ép nó nằm trên cùng
  Object.assign(messagePage.style, {
    display: "block",
    position: "fixed",
    left: "0",
    top: "0",
    width: "100vw",
    height: "100vh",
    zIndex: "9999",
    overflow: "auto",
    background: "transparent" // hoặc "rgba(0,0,0,0.0)"
  });

  fetch("./message.html", { cache: "no-store" })
    .then(res => {
      console.log("fetch message.html → status:", res.status);
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.text();
    })
    .then(html => {
      console.log("message.html length:", html.length);
      // ... trong handler của btnMsg, sau khi fetch xong:
      messagePage.innerHTML = html;

      // reset cờ để cho phép init lại trên DOM mới
      if (messagePage.dataset) {
        delete messagePage.dataset.inited;
      }

      // đảm bảo CSS
      if (!document.querySelector('link[href="./message.css"]')) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "./message.css";
        document.head.appendChild(link);
      }

      // nạp message.js nếu chưa có, xong thì init; nếu có rồi thì gọi init luôn
      if (!document.getElementById("message-script")) {
        const s = document.createElement("script");
        s.id = "message-script";
        s.src = "./message.js";
        s.defer = true;
        s.onload = () => initMessage();
        document.body.appendChild(s);
      } else {
        initMessage();
      }


      // Ẩn hộp quà
      const giftBox = document.getElementById("gift-box");
      if (giftBox) giftBox.style.display = "none";

      // Đảm bảo CSS đã có
      if (!document.querySelector('link[href="./message.css"]')) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "./message.css";
        document.head.appendChild(link);
      }

      // Nạp message.js rồi gọi initMessage()
      function runInit() {
        if (typeof initMessage === "function") {
          console.log("Gọi initMessage()");
          initMessage();
        } else {
          // đôi khi script vừa chèn chưa kịp define
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
    })
    .catch(err => {
      console.error("Lỗi khi load message.html:", err);
      alert("Không tải được lời nhắn. Hãy chạy bằng Live Server (không mở file trực tiếp) và kiểm tra đường dẫn ./message.html");
    });
});



    giftDiv.appendChild(btnGift);
    giftDiv.appendChild(btnMsg);
    document.body.appendChild(giftDiv);
}

// Nhạc nền
const bgMusic = document.getElementById("bg-music");

// Xử lý mở khóa
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

// Khi quay lại từ message.html
window.addEventListener("load", () => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("fromMessage") === "true") {
        document.getElementById("lock-screen").style.display = "none";
        bgMusic.play();
        showGift();
    }
});

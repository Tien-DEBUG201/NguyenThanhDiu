const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const chars = "HAPPY BIRTH DAY";
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

// Hiển thị chữ lần lượt
const messages = ["Chúc Mừng", "Sinh Nhật", "Thanh Dịu"];
let msgIndex = 0;
const messageDiv = document.getElementById("message");

function showNextMessage() {
    if (msgIndex < messages.length) {
        messageDiv.textContent = messages[msgIndex];
        msgIndex++;
        setTimeout(showNextMessage, 2000);
    } else {
        // Ẩn dòng chữ "Thanh Dịu"
        messageDiv.textContent = "";
        // Sau khi hết lời chúc -> hiện ảnh và nút
        showGift();
    }
}

function showGift() {
    const giftDiv = document.createElement("div");
    giftDiv.id = "gift-box";

    // Ảnh
    const img = document.createElement("img");
    img.src = "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSkfdu__3_E7RZjqcmZd9RHxazLkfqyP5UFYWr1Wfk8oLAImJKWEHjoj_keK6b2HlHgEeSaO30RCr6ShExwRUCUOSVGEZBKBWkZpyLI-j4R"; // Đặt ảnh bạn muốn vào cùng thư mục
    giftDiv.appendChild(img);

    // Nút quà
    const btn = document.createElement("button");
    btn.textContent = "Quà nè 🎁";
    btn.addEventListener("click", () => {
        // Ẩn khung quà
        giftDiv.remove();

        // Tạo container tinh cầu nếu chưa có
        let container = document.getElementById("container");
        if (!container) {
            container = document.createElement("div");
            container.id = "container";
            document.body.appendChild(container);
        }
        container.style.display = "block";

        // 📌 Gọi hàm tinh cầu của bạn
        if (typeof initTinhCau === "function") {
            initTinhCau(); // Hàm này nằm trong file tinh cầu riêng của bạn
        } else {
            console.error("Chưa tìm thấy hàm initTinhCau từ file tinh cầu!");
        }
    });

    giftDiv.appendChild(document.createElement("br"));
    giftDiv.appendChild(btn);

    document.body.appendChild(giftDiv);
}

// Phát nhạc
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

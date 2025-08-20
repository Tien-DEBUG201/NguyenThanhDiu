const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

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
        giftDiv.remove();


        let container = document.getElementById("container");
        if (!container) {
            container = document.createElement("div");
            container.id = "container";
            document.body.appendChild(container);
        }
        container.style.display = "block";

        // Hiển thị ảnh quà
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
        window.location.href = "./message.html";
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

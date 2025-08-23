function initMessage() {
  const root = document.getElementById("message-page");
  if (!root) return;

  // Nếu DOM này đã init rồi thì thôi (sau khi bạn thay innerHTML, cờ này đã bị xóa)
  if (root.dataset.inited === "1") return;
  root.dataset.inited = "1";

  // Tim bay theo chuột: gắn 1 lần cho body
  if (!document.body.hasMouseHeart) {
    document.body.hasMouseHeart = true;
    document.addEventListener("mousemove", (e) => {
      const heart = document.createElement("span");
      heart.style.left = e.pageX + "px";
      heart.style.top = e.pageY + "px";
      const size = Math.random() * 10;
      heart.style.width = 4 * size + "px";
      heart.style.height = 4 * size + "px";
      heart.style.transform = "rotate(" + (Math.random() * 360) + "deg)";
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 1000);
    });
  }

  // Lấy các phần tử từ DOM mới
  const mailBox = root.querySelector(".mail");
  const boxmail = root.querySelector(".boxMail");
  const close   = root.querySelector(".fa-xmark");

  // Gắn click cho phong bì (per-element guard)
  if (mailBox && !mailBox.dataset.bound) {
    mailBox.dataset.bound = "1";
    mailBox.addEventListener("click", () => {
      mailBox.classList.toggle("active");
      if (boxmail) boxmail.classList.add("active");

      // tạo nút quay lại sau 6s (nếu chưa có)
      setTimeout(() => {
        if (!root.querySelector("#back-btn") && boxmail) {
          const backBtn = document.createElement("button");
          backBtn.id = "back-btn";
          backBtn.textContent = "⬅ Quay lại";
          Object.assign(backBtn.style, {
            position: "absolute",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "8px 16px",
            fontSize: "16px",
            borderRadius: "8px",
            background: "#ff6699",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            zIndex: "10000",
          });
          backBtn.addEventListener("click", () => {
            // Ẩn overlay
            root.style.display = "none";
            // Hiện lại gift-box + nút quà
            const giftBox = document.getElementById("gift-box");
            if (giftBox) {
              giftBox.style.display = "block";
              const btnGift = giftBox.querySelector("button"); // nút 🎁
              if (btnGift) btnGift.style.display = "inline-block";
            }
          });
          boxmail.appendChild(backBtn);
        }
      }, 23000);
    });
  }

  // Nút đóng hộp thư (per-element guard)
  if (close && boxmail && !close.dataset.bound) {
    close.dataset.bound = "1";
    close.addEventListener("click", () => {
      boxmail.classList.remove("active");
      // reset trạng thái icon phong bì nếu muốn:
      if (mailBox) mailBox.classList.remove("active");
    });
  }
}

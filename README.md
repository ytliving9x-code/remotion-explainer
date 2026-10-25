# ⚡ 30S EXPLAINER STUDIO - HỆ THỐNG TẠO VIDEO TIKTOK GIẢI THÍCH 30 GIÂY

> **Nền tảng tự động hóa sản xuất video ngắn TikTok / Reels / Shorts "Giải thích mọi thứ trong 30 giây" xây dựng trên nền tảng Remotion, React và Vite.**
>
> 🌐 **Website Trực Tuyến**: [https://ytliving9x-code.github.io/remotion-explainer/](https://ytliving9x-code.github.io/remotion-explainer/)  
> 📖 **Tài liệu đầy đủ**: Chi tiết xem tại [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md)

---

## 🌟 Điểm Nổi Bật Của Dự Án

* **Chuẩn Định Dạng 9:16**: Độ phân giải `1080 x 1920`, 30fps, đúng chuẩn **30 giây** (`900 frames`).
* **Visual Giữ Chân Người Xem Cao (High Retention)**:
  * **Template X-Ray Thấu Thị 3D**: Tia quét laser neon, hiệu ứng bóc tách linh kiện (Exploded View), giao diện HUD khoa học viễn tưởng.
  * **Template Giải Thích Đa Năng (JSON-Driven)**: Tự động đổi nội dung, màu sắc và đồ họa chỉ bằng cách nạp kịch bản JSON mà không cần viết lại code video.
  * **Modular SVG Engines**: Động cơ vẽ máy móc chuyển động mượt mà (Cánh quạt, Cuộn dây mayso nóng đỏ, Luồng khí đối lưu nhiệt, Mặt cắt hoàn chỉnh Máy Sấy Tóc, Buồng đốt, Phản lực, Bánh răng...).
* **Hệ Thống Âm Thanh Đa Tầng**: Giọng đọc AI tự nhiên (Edge-TTS `NamMinhNeural`), 5 hiệu ứng SFX cơ khí procedural, nhạc nền nhịp điệu kích thích.
* **Mobile-First Web Studio**: Giao diện tối ưu hoàn hảo cho điện thoại với trình phát `@remotion/player` xem trước thời gian thực, bộ nạp kịch bản 1-chạm và tải video trực tiếp.

---

## 🚀 Hướng Dẫn Bắt Đầu Nhanh

### 1. Cài đặt thư viện:
```bash
npm install --legacy-peer-deps
```

### 2. Chạy Web Studio trên trình duyệt (Tối ưu Mobile):
```bash
npm run dev:web
```
*Truy cập:* `http://localhost:5173/remotion-explainer/`

### 3. Render Video MP4 chất lượng cao:
```bash
# Render video mẫu X-Ray Súng Lục 3D (30 giây)
npx remotion render XRayExplodedTikTok out/sung-luc-xray-exploded.mp4

# Render video Động Cơ Phản Lực
npx remotion render UniversalExplainerTikTok out/dong-co-phan-luc.mp4
```

---

## 📂 Tài Liệu Kiến Trúc Chi Tiết
Xem toàn bộ kiến trúc mã nguồn, giải thích từng component, danh sách icon và pipeline tự động hóa tại file [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md).

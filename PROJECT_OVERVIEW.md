# ⚡ 30S EXPLAINER STUDIO - HỆ THỐNG TẠO VIDEO TIKTOK GIẢI THÍCH 30 GIÂY

> **Tài liệu tổng hợp toàn bộ dự án**: Kiến trúc, Templates, Pipeline âm thanh, Web Studio Mobile và Hướng dẫn tự động hóa.
> 
> 🌐 **Website Studio Trực Tuyến**: [https://ytliving9x-code.github.io/remotion-explainer/](https://ytliving9x-code.github.io/remotion-explainer/)  
> 📁 **Mã nguồn GitHub**: [https://github.com/ytliving9x-code/remotion-explainer](https://github.com/ytliving9x-code/remotion-explainer)  
> 💻 **Đường dẫn dự án cục bộ**: `D:\remotion-explainer`

---

## 📌 1. Mục Tiêu & Định Dạng Video Chuẩn

Dự án được thiết kế để sản xuất hàng loạt video ngắn định dạng giải thích trực quan: **"Hiểu Mọi Thứ Trong 30 Giây"** nhằm đạt tỉ lệ giữ chân người xem (Retention Rate) tối đa trên TikTok, YouTube Shorts và Facebook Reels.

* **Tỉ lệ khung hình**: Dọc 9:16 (`1080 x 1920` px Full HD).
* **Thời lượng chuẩn**: Đúng **30.00 giây** (`900 frames` ở tốc độ `30 fps`).
* **Công thức kịch bản 30s**:
  * **0 - 3s (Frame 0 - 90)**: Hook giật gân, câu hỏi kích thích tò mò + Tên chủ đề.
  * **3 - 9s (Frame 90 - 270)**: **Bước 1** - Khởi đầu cơ chế (Hút gió / Bóp cò / Nạp điện...).
  * **9 - 15s (Frame 270 - 450)**: **Bước 2** - Gia nhiệt / Nén áp suất / Đập kim hỏa.
  * **15 - 21s (Frame 450 - 630)**: **Bước 3** - Đối lưu nhiệt / Kích nổ buồng đốt / Hất vỏ đạn.
  * **21 - 26s (Frame 630 - 780)**: **Bước 4** - Phun phản lực / Làm khô tóc / Nạp đạn mới.
  * **26 - 30s (Frame 780 - 900)**: Outro đếm ngược 30s kết thúc + Lời kêu gọi bình luận (CTA).

---

## 🎨 2. Các Template Video Đã Lập Trình

### 🔍 Template 1: X-Ray Thấu Thị & Bóc Tách Linh Kiện (`XRayExplodedTikTok`)
* **Thư mục code**: `src/XRayExploded/`
* **Điểm đột phá giữ chân người xem**:
  * **Tia quét Laser Scanline**: Một dải laser Cyan quét dọc thân máy tạo cảm giác phim khoa học viễn tưởng.
  * **Exploded View (Bóc tách linh kiện)**: Nắp trượt, thân súng, nòng súng, lò xo hồi chuyển, hộp tiếp đạn và viên đạn tự động tách rời lơ lửng trong không gian.
  * **HUD Tech Overlay**: Các thông số quân sự chạy real-time (tần số quét, áp suất buồng đạn 235 MPa, vận tốc đầu nòng 375 m/s, cơ chế khóa nòng lùi ngắn).
  * **Camera Zoom động**: Tự động phóng to thu nhỏ theo từng chu kỳ cơ khí (bóp cò, đập hạt nổ, giật trượt nắp, văng vỏ đạn đồng bay ra ngoài).

### ⚡ Template 2: Trình Giải Thích Đa Năng Theo Tham Số (`UniversalExplainerTikTok`)
* **Thư mục code**: `src/UniversalExplainer/`
* **Cơ chế**: Không cần viết lại mã nguồn video cho từng chủ đề! Chỉ cần thay đổi đối tượng JSON (`UniversalTopicConfig`), toàn bộ tiêu đề, phụ đề, màu sắc chủ đạo và linh kiện đồ họa sẽ tự động thay đổi.
* **Bộ Động Cơ Đồ Họa Vector (Modular SVG Engines) trong `ModularVisual.tsx`**:
  * `fan`: Cánh quạt / Tuabin gió quay tít với các luồng khí hút vào.
  * `heat-coil`: **Cuộn dây Mayso Niken-Crom** xoắn ốc 3D phát sáng đỏ rực 800°C với các sóng nhiệt tỏa ra.
  * `wind-thermal`: **Luồng khí đối lưu** phân tách từ không khí mát 25°C sang khí nóng nhiệt 120°C cuộn xoáy.
  * `blow-dry` / `hair-dryer`: **Mặt cắt hoàn chỉnh chiếc Máy Sấy Tóc** (thân máy, công tắc ON/MAX, động cơ quạt sau, cuộn mayso đỏ, vòi phun khí nóng làm bay hơi giọt nước).
  * `pressure`: Buồng nén khí pít-tông với đồng hồ áp suất vạch đỏ `PSI HIGH`.
  * `fire`: Buồng đốt nhiên liệu cuộn xoáy với lõi nhiệt trắng-vàng và tia lửa bắn ra.
  * `thrust`: Luồng phản lực siêu thanh với các hình thoi kim cương Mach diamonds.
  * `gear`: Hệ thống bánh răng cơ khí truyền động quay đối xứng nhịp nhàng.
  * `wave`: Sóng điện từ viba tần số cao đảo cực.
  * `generic`: Vi mạch công nghệ vi xử lý phát xung.

### 📐 Template 3: Bản Vẽ Kỹ Thuật Cơ Khí (`PistolExplainerTikTok`)
* **Thư mục code**: `src/PistolExplainer/`
* **Phong cách**: Bản vẽ Blueprint kỹ thuật quân sự, hiển thị thước đo milimet cơ khí, các bước cơ chế khóa nòng và nạp đạn.

---

## 🔊 3. Hệ Thống Âm Thanh Đa Tầng (Audio Pipeline)

Tất cả video được trang bị âm thanh 3 lớp đồng bộ từng frame:
1. **Lớp Giọng Đọc Thuyết Minh (AI Voiceover)**:
   * Được sinh bằng Microsoft Edge-TTS chất lượng cao: `vi-VN-NamMinhNeural` (giọng nam truyền cảm, dứt khoát) hoặc `vi-VN-HoaiMyNeural` (giọng nữ).
   * File âm thanh từng bước được lưu tại: `public/audio/*.mp3`.
2. **Lớp Hiệu Ứng Cơ Khí (SFX Layers)**:
   * `sfx_click.wav`: Tiếng lách cách khi ngón tay bóp cò hoặc bật công tắc.
   * `sfx_blast.wav`: Tiếng nổ áp suất uy lực lúc kích nổ buồng đốt.
   * `sfx_slide.wav`: Tiếng kim loại trượt nắp rít sắc nét.
   * `sfx_eject.wav`: Tiếng văng vỏ đạn đồng bay ra ngoài.
   * `sfx_chamber.wav`: Tiếng đóng buồng nạp đạn chắc nịch.
3. **Lớp Nhạc Nền Đẩy Nhịp (BGM Tension Synth)**:
   * `bgm_tension.wav`: Vòng lặp nhạc điện tử nhịp đập 120-130 BPM tạo cảm giác cuốn hút và hồi hộp.

---

## 📱 4. Ứng Dụng Web Studio Tối Ưu Cho Điện Thoại (Mobile-First Web App)

* **Công nghệ xây dựng**: React 19 + Vite 8 + `@remotion/player` + TypeScript.
* **Giao diện di động**:
  * **Thanh Header & Chips chọn nhanh**: Đổi giữa các chủ đề chỉ bằng 1 chạm (`🔍 X-Ray Thấu Thị 3D`, `✈️ Động Cơ Phản Lực`, `🍲 Lò Vi Sóng`, `🏎️ Bộ Vi Sai Ô Tô`, `💨 Máy Sấy Tóc`, `🔫 Bản Vẽ Cơ Khí`).
  * **Tab 1 - 📱 Xem Video**: Trình phát video 9:16 trực quan, hỗ trợ chạm phát/tạm dừng, tua thanh trượt timeline, tự động lặp lại (loop).
  * **Tab 2 - ✍️ Kịch Bản**:
    * **Form trực quan**: Nhập tiêu đề, chọn Icon linh kiện, điền câu thuyết minh của từng bước. Gõ chữ đến đâu video tự đổi theo thời gian thực (Live Reactivity).
    * **Dán JSON kịch bản**: Khung dán toàn bộ đoạn mã JSON kịch bản với nút *"📋 Dán Từ Clipboard"* tiện lợi.
  * **Tab 3 - 🚀 Tạo Video**:
    * Nút to **📥 Tải file kịch bản (JSON)**.
    * Tải trực tiếp video MP4 chất lượng cao đã render sẵn về thư viện ảnh điện thoại.
    * Sao chép lệnh Render tự động chạy trên terminal/server.

---

## 💻 5. Các Lệnh Điều Hành Dự Án (Cheat Sheet)

### Chạy và Thử Nghiệm:
```bash
# 1. Chạy Web Studio trên trình duyệt (Vite Mobile App)
npm run dev:web

# 2. Chạy Remotion Studio kiểm tra dòng thời gian của lập trình viên
npm run dev

# 3. Build gói Web App để deploy lên GitHub Pages
npm run build:web
```

### Render Video MP4:
```bash
# Render video X-Ray Súng Lục 3D (30 giây)
npx remotion render XRayExplodedTikTok out/sung-luc-xray-exploded.mp4

# Render video Động Cơ Phản Lực
npx remotion render UniversalExplainerTikTok out/dong-co-phan-luc.mp4

# Render video Máy Sấy Tóc với file kịch bản tuỳ biến
npx remotion render UniversalExplainerTikTok out/may-say-toc.mp4 --props="{\"id\":\"hair-dryer-30s\",\"title\":\"MÁY SẤY TÓC HOẠT ĐỘNG THẾ NÀO?\"}"
```

### Sinh Giọng Đọc & SFX Tự Động (Python Script):
```bash
python scripts/produce_video.py
```

---

## 📂 6. Cấu Trúc Cây Thư Mục Dự Án

```
D:\remotion-explainer\
├── .github/
│   └── workflows/
│       └── deploy.yml            # CI/CD tự động build & deploy GitHub Pages
├── public/
│   ├── audio/                    # File giọng đọc AI + SFX cơ khí + Nhạc nền
│   └── sung-luc-xray-exploded.mp4# Video mẫu 1080x1920 có sẵn để tải về
├── scripts/
│   └── produce_video.py          # Script Python tự động tải TTS và render video
├── src/
│   ├── Explainer/                # Template Explainer ngang (16:9 gốc)
│   ├── PistolExplainer/          # Template bản vẽ cơ khí súng lục 9:16
│   │   ├── AudioTracks.tsx       # Phối khí âm thanh đa tầng
│   │   ├── GunSchematic.tsx      # Bản vẽ động các bộ phận súng
│   │   ├── KineticCaptions.tsx   # Phụ đề chữ nhảy theo nhịp
│   │   └── TikTokHeader.tsx      # Header đếm ngược 30 giây
│   ├── UniversalExplainer/       # Template tổng quát theo tham số JSON
│   │   ├── ModularVisual.tsx     # Động cơ đồ họa vector các loại máy móc
│   │   ├── UniversalAudio.tsx    # Xử lý âm thanh theo kịch bản
│   │   ├── UniversalCaptions.tsx # Phụ đề động
│   │   ├── UniversalExplainerVideo.tsx # Composition chính
│   │   ├── UniversalHeader.tsx   # Thanh tiến trình 4 bước
│   │   └── types.ts              # Định nghĩa cấu trúc kịch bản JSON
│   ├── XRayExploded/             # Template X-Ray thấu thị & bóc tách linh kiện
│   │   ├── XRayHUDOverlay.tsx    # Lớp giao diện HUD viễn tưởng
│   │   ├── XRayLaserScan.tsx     # Hiệu ứng tia quét laser hologram
│   │   ├── XRayPistolExploded.tsx# Bóc tách từng chi tiết súng lơ lửng
│   │   └── XRayVideo.tsx         # Composition X-Ray 30s
│   ├── web/                      # Ứng dụng Web Mobile Studio
│   │   ├── App.tsx               # Giao diện chính điện thoại + Player + Tabs
│   │   └── main.tsx              # Điểm khởi chạy React
│   ├── Root.tsx                  # Đăng ký các Composition của Remotion
│   └── index.ts                  # Điểm khởi chạy của Remotion
├── index.html                    # Trang HTML chuẩn Viewport điện thoại
├── vite.config.mts               # Cấu hình Vite với base GitHub Pages
└── package.json                  # Khai báo thư viện và câu lệnh chạy
```

---

*Tài liệu được cập nhật tự động và lưu trữ vĩnh viễn trong dự án để bạn dễ dàng tra cứu, mở rộng thêm các loại máy móc mới bất cứ lúc nào!*

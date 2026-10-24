# Báo cáo sử dụng AI – SiteSafe

Mỗi thành viên tự điền phần của mình. Hãy khai đúng sự thật: giảng viên sẽ hỏi lại từng mục khi vấn đáp. Các dòng trong ngoặc vuông `[...]` là phần chủ nhân tự bổ sung, vì chỉ người đó biết.

## 1. Phan Anh Hào (SV1)

Nguồn của phần này: lịch sử Git của kho mã (`git log`), trong đó các commit có sự hỗ trợ của AI đều có dòng `Co-Authored-By: Claude ...` ở cuối nội dung commit.

### 1.1. Công cụ AI đã dùng
| Công cụ | Dùng để làm gì | Giai đoạn |
|---|---|---|
| Claude Code, mô hình Claude Opus 5.5 (4 commit) và Claude Sonnet 5.5 (11 commit), chạy trong VS Code | Đọc mã, sửa mã, viết tài liệu, đối chiếu với barem | 20/10/2026 – 24/10/2026 |
| [Hào bổ sung công cụ khác nếu có: ChatGPT, Copilot, Gemini…] | [Hào ghi] | [Hào ghi] |

### 1.2. Câu lệnh (prompt) chính
Mô tả theo ý chính, không chép nguyên văn. Mỗi dòng ứng với một commit ở mục 1.3.
1. Dùng chung một khung sidebar và topbar cho toàn bộ trang web.
2. Đăng nhập luôn phải nhập tài khoản và mật khẩu, và chuyển đến đúng trang theo vai trò.
3. Thêm vai trò Quản trị viên vào đăng nhập và đăng ký.
4. Thiết kế lại trang 404 và thêm hiệu ứng zoom khi rê chuột ở trang chủ.
5. Tích hợp MockAPI vào toàn bộ dự án qua `js/api.js`.
6. Thêm ảnh minh họa khóa huấn luyện, sửa modal chi tiết sự cố.
7. Thêm đăng nhập nhanh 4 tài khoản demo, giao diện sáng/tối, chỉnh menu trang chủ.
8. Chỉnh các trang quản lý kiểm tra, bảng sự cố, mã phiếu, lịch sử phiếu kiểm tra.
9. Đối chiếu dự án với barem CSE122, sửa AI-1 thiếu dữ liệu, xuất CSV, bỏ style inline, xóa `safety-store`, viết tài liệu trong `docs/`.

[Hào bổ sung hoặc sửa nếu cách diễn đạt khác thực tế, và ghi thêm các prompt tiêu biểu nếu còn nhớ]

### 1.3. Phần AI sinh ra (theo commit có dòng Co-Authored-By)

| Nội dung | Mô hình |
|---|---|
| Khung sidebar/topbar dùng chung: `css/shell.css`, `js/main.js` | Opus 5.5 |
| Đăng nhập luôn nhập tài khoản và mật khẩu, vào đúng trang theo vai trò: `js/modules/auth.js`, `login.html`, `index.html` | Opus 5.5 |
| Thêm vai trò Quản trị viên vào đăng nhập và đăng ký | Opus 5.5 |
| Thiết kế lại trang `404.html` | Sonnet 5.5 |
| Hiệu ứng zoom khi rê chuột ở trang chủ | Opus 5.5 |
| Tích hợp MockAPI qua `js/api.js` | Sonnet 5.5 |
| Ảnh minh họa khóa huấn luyện, sửa modal chi tiết sự cố | Sonnet 5.5 |
| Đăng nhập nhanh 4 tài khoản demo, nút đổi giao diện, thanh menu trang chủ | Sonnet 5.5 |
| Giao diện sáng/tối: `css/theme.css`, `js/main.js` | Sonnet 5.5 |
| Chỉnh trang quản lý kiểm tra (an toàn viên) | Sonnet 5.5 |
| Bỏ mục khỏi menu trang chủ, căn menu sang trái | Sonnet 5.5 |
| Xếp nút thao tác thành hàng ngang trong bảng sự cố | Sonnet 5.5 |
| Mã phiếu theo ngày giờ, xem lại và lịch sử phiếu kiểm tra, bỏ N/A | Sonnet 5.5 |
| AI-1 xử lý thiếu dữ liệu và độ tin cậy thấp, nút Xuất CSV, chuyển style inline sang class, thêm `docs/screen-inventory.md` | Sonnet 5.5 |
| Xóa module cửa hàng `safety-store` | Sonnet 5.5 |

Ngoài các commit trên, trong phiên làm việc 24/10 AI còn soạn các tài liệu trong `docs/` (`project-proposal.md`, `roles-and-features.md`, `team-assignment.md` và báo cáo này).

### 1.4. Phần sinh viên tự làm
Các commit của Hào **không có** dòng `Co-Authored-By` gồm 49 commit (trong đó 3 commit gộp nhánh ngày 20/10), từ 02/10 đến 19/10 và rải rác sau đó. Theo nội dung commit, đó là:
- Giao diện và chức năng đăng nhập, đăng ký, quên mật khẩu (14/10 – 18/10): `pages/auth/*`, `css/auth.css`, `js/modules/auth.js`.
- Ba trang công nhân: kiểm tra an toàn hằng ngày, báo cáo nguy cơ, sự cố đã gửi (14/10 – 20/10): `pages/worker/*`, `css/worker.css`, `js/modules/worker.js`.
- Trang chủ `index.html`: bố cục, video, icon, khối vai trò, footer, thanh cuộn mượt (11/10 – 20/10): `css/landing.css`.
- Design system và cấu trúc dự án ban đầu (02/10 – 04/10), thay ảnh, gộp nhánh.

Lưu ý: không có dòng `Co-Authored-By` không có nghĩa chắc chắn là không dùng AI. [Hào xác nhận và ghi rõ: phần nào tự viết hoàn toàn, phần nào có tham khảo hoặc dùng AI ngoài Claude Code]

Các quyết định của Hào trong phiên 24/10: giữ 3 nhánh cá nhân và không tạo nhánh `dev`; xóa `safety-store`; duyệt và đẩy từng commit lên `PhanAnhHao_branch` và `main`.

[Hào ghi thêm: các chỗ đã tự sửa lại kết quả của AI, và các chỗ đã kiểm tra trên trình duyệt]

### 1.5. Lỗi AI gặp phải và cách xử lý
| Lỗi | Phát hiện bằng cách nào | Cách xử lý |
|---|---|---|
| Khi ghi đoạn JavaScript xuất CSV bằng lệnh shell, AI làm mất ký tự thoát (`\s` thành `s`, `\r\n` thành xuống dòng thật), khiến trang `worker-my-hazards.html` lỗi cú pháp | Chạy kiểm tra cú pháp từng thẻ `<script>` bằng Node, báo "Invalid or unexpected token" | Sửa lại hai chỗ bằng công cụ chỉnh sửa trực tiếp, chạy lại và hết lỗi |
| Lúc đánh giá ban đầu, AI kết luận "3 trang thiếu `alt`" và "nhiều `outline: none` không có thay thế". Cả hai đều sai: ảnh có `alt` ở dòng kế tiếp, các `outline: none` đều có `border-color` và `box-shadow` thay thế | Đọc lại từng chỗ trong mã khi sửa | AI đính chính, không sửa thừa |
| Lúc đầu AI mô tả AI-2 và AI-3 theo ví dụ chung của barem, trong khi README dự án định nghĩa AI-2 là Checklist Generator và AI-3 là Risk Hotspot Insight | Đối chiếu với README của dự án | Cập nhật tài liệu theo README |
| AI ước lượng số bản ghi hazard là 5 theo `hazards.json`, chưa rà hết các nguồn dữ liệu | Đếm lại trong `js/api.js` | Ghi lại đúng: dữ liệu mẫu còn ít, cần nhóm thống nhất trước khi thêm |

[Hào bổ sung các lỗi khác do AI sinh ở giai đoạn 20/10 – 23/10 mà Hào còn nhớ, ví dụ lỗi giao diện hay lỗi logic đã phải nhờ AI sửa lại]

### 1.6. Cách kiểm chứng
- Chạy `node --check` cho `js/modules/worker.js` và kiểm tra cú pháp từng thẻ `<script>` của 3 trang worker.
- Chạy thử hàm `classifyHazard` bằng Node với 3 mô tả: quá ngắn (ra trạng thái thiếu dữ liệu), `Cáp điện hở nằm trong vũng nước` (Điện thi công, 96%), một câu mơ hồ (Chung / Khác, 42%).
- Quét mã bằng `grep` để đếm style inline, `!important`, ô nhập thiếu label.
- Dùng `git status`, `git log` để kiểm tra đúng file được commit trước khi đẩy.
- Chưa kiểm tra bằng trình duyệt trong phiên 24/10. [Hào ghi: đã mở trang nào, trên kích thước nào, kết quả ra sao]

### 1.7. Điều học được
[Hào tự viết, vài câu bằng lời của mình. Ví dụ: cách tách trạng thái "AI không chắc chắn" khỏi trạng thái lỗi; vì sao phải escape dữ liệu trước khi đưa vào `innerHTML`; cách đọc `git status` để commit đúng phần]

### 1.8. Tính năng nào chỉ mô phỏng, tính năng nào gọi API thật
- AI-1 (phân loại nguy cơ) chỉ mô phỏng bằng quy tắc từ khóa trong JavaScript, không gọi mô hình AI thật. Độ trễ 450 ms là giả lập.
- Dữ liệu dùng JSON mẫu, `localStorage` và MockAPI. Không có khóa API bí mật nào trong mã nguồn.

## 2. Đoàn Thanh Sơn (SV2)
[Sơn điền theo đúng mẫu mục 1: công cụ, prompt chính, phần AI sinh ra (đối chiếu `git log` của mình), phần tự làm, lỗi AI gặp phải, cách kiểm chứng, điều học được, mô phỏng hay API thật. AI-3 (Risk Hotspot Insight) là phần của Sơn.]

## 3. Trần Huy Hoàng (SV3)
[Hoàng điền theo đúng mẫu mục 1. AI-2 (Checklist Generator) là phần của Hoàng.]

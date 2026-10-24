# Báo cáo sử dụng AI – SiteSafe

Mỗi thành viên tự viết phần của mình, theo cùng một mẫu.

## 1. Phan Anh Hào (SV1)

Phần này dựa trên lịch sử Git của kho mã (`git log`). Các commit có sự hỗ trợ của AI đều có dòng `Co-Authored-By: Claude ...` ở cuối nội dung commit.

### 1.1. Công cụ AI đã dùng
| Công cụ | Tôi dùng để làm gì | Giai đoạn |
|---|---|---|
| Claude Code (Claude Opus 5.5 ở 4 commit, Claude Sonnet 5.5 ở 11 commit), chạy trong VS Code | Đọc mã, sửa mã, viết tài liệu, đối chiếu dự án với barem | 20/10/2026 – 24/10/2026 |

[Hào xác nhận: ngoài Claude Code, có dùng công cụ AI nào khác (ChatGPT, Copilot, Gemini…) không? Nếu không, thêm câu "Ngoài Claude Code, tôi không dùng công cụ AI nào khác." Nếu có, thêm một dòng vào bảng trên.]

### 1.2. Câu lệnh (prompt) chính
Tôi nhờ Claude Code, theo ý chính (không chép nguyên văn), lần lượt:
1. Dùng chung một khung sidebar và topbar cho toàn bộ trang web.
2. Bắt buộc nhập tài khoản và mật khẩu khi đăng nhập, rồi chuyển đúng trang theo vai trò.
3. Thêm vai trò Quản trị viên vào trang đăng nhập và đăng ký.
4. Thiết kế lại trang 404 và thêm hiệu ứng zoom khi rê chuột ở trang chủ.
5. Tích hợp MockAPI vào toàn bộ dự án qua `js/api.js`.
6. Thêm ảnh minh họa cho khóa huấn luyện và sửa cửa sổ chi tiết sự cố.
7. Thêm đăng nhập nhanh 4 tài khoản demo, giao diện sáng/tối và chỉnh menu trang chủ.
8. Chỉnh các trang quản lý kiểm tra, bảng sự cố, mã phiếu và lịch sử phiếu kiểm tra.
9. Đối chiếu dự án với barem CSE122, sửa AI-1 khi thiếu dữ liệu, thêm xuất CSV và JSON, bỏ style inline, xóa `safety-store`, viết tài liệu trong `docs/`.
10. Khắc phục 3 điểm yếu ở trang `worker-my-hazards.html`: chuyển 10 thẻ tĩnh sang render động từ dữ liệu, gắn xử lý logic xóa/sửa (kết nối `worker.js`) và hỗ trợ phím Esc đóng modal.

### 1.3. Phần AI sinh ra (theo các commit có dòng Co-Authored-By)

| Nội dung | Mô hình |
|---|---|
| Khung sidebar/topbar dùng chung: `css/shell.css`, `js/main.js` | Opus 5.5 |
| Đăng nhập luôn nhập tài khoản và mật khẩu, vào đúng trang theo vai trò: `js/modules/auth.js`, `login.html`, `index.html` | Opus 5.5 |
| Thêm vai trò Quản trị viên vào đăng nhập và đăng ký | Opus 5.5 |
| Thiết kế lại trang `404.html` | Sonnet 5.5 |
| Hiệu ứng zoom khi rê chuột ở trang chủ | Opus 5.5 |
| Tích hợp MockAPI qua `js/api.js` | Sonnet 5.5 |
| Ảnh minh họa khóa huấn luyện, sửa cửa sổ chi tiết sự cố | Sonnet 5.5 |
| Đăng nhập nhanh 4 tài khoản demo, nút đổi giao diện, thanh menu trang chủ | Sonnet 5.5 |
| Giao diện sáng/tối: `css/theme.css`, `js/main.js` | Sonnet 5.5 |
| Chỉnh trang quản lý kiểm tra (an toàn viên) | Sonnet 5.5 |
| Bỏ mục khỏi menu trang chủ, căn menu sang trái | Sonnet 5.5 |
| Xếp nút thao tác thành hàng ngang trong bảng sự cố | Sonnet 5.5 |
| Mã phiếu theo ngày giờ, xem lại và lịch sử phiếu kiểm tra, bỏ N/A | Sonnet 5.5 |
| AI-1 xử lý thiếu dữ liệu và độ tin cậy thấp, nút Xuất CSV, chuyển style inline sang class, `docs/screen-inventory.md` | Sonnet 5.5 |
| Xóa module cửa hàng `safety-store` | Sonnet 5.5 |
| Hoàn thiện CRUD sự cố (xóa/sửa), chuyển 10 thẻ tĩnh sang render động từ dữ liệu, thêm phím Esc đóng modal: `worker-my-hazards.html`, `worker.js`, `worker.css` | Claude / Antigravity |

Ngoài ra, Claude Code còn soạn các tài liệu trong `docs/` (`project-proposal.md`, `roles-and-features.md`, `team-assignment.md`), `README.md` gốc, và nút Xuất JSON cùng cơ chế đồng bộ giữa các tab ở trang "Sự cố đã gửi".

### 1.4. Phần tôi tự làm
Có 49 commit của tôi không có dòng `Co-Authored-By` (trong đó 3 commit gộp nhánh ngày 20/10), từ 02/10 đến 19/10 và rải rác sau đó. Theo nội dung commit, đó là:
- Giao diện và chức năng đăng nhập, đăng ký, quên mật khẩu (14/10 – 18/10): `pages/auth/*`, `css/auth.css`, `js/modules/auth.js`.
- Ba trang công nhân: kiểm tra an toàn hằng ngày, báo cáo nguy cơ, sự cố đã gửi (14/10 – 20/10): `pages/worker/*`, `css/worker.css`, `js/modules/worker.js`.
- Trang chủ `index.html`: bố cục, video, icon, khối vai trò, footer, thanh cuộn mượt (11/10 – 20/10): `css/landing.css`.
- Design system và cấu trúc dự án ban đầu (02/10 – 04/10), thay ảnh, gộp nhánh.

[Hào xác nhận: phần nào trong các mục trên tự viết hoàn toàn, phần nào có tham khảo tài liệu hoặc dùng AI. Không có dòng `Co-Authored-By` không chứng minh là không dùng AI, nên chỗ này phải đúng sự thật.]

Các quyết định tôi tự đưa ra khi làm việc với Claude Code: giữ nguyên 3 nhánh cá nhân và không tạo nhánh `dev`; xóa `safety-store`; xem lại, rồi tự quyết định khi nào đưa từng commit lên `PhanAnhHao_branch` và `main`.

### 1.5. Lỗi AI gặp phải và cách xử lý
| Lỗi | Tôi phát hiện bằng cách nào | Cách xử lý |
|---|---|---|
| Khi ghi đoạn JavaScript xuất CSV bằng lệnh shell, AI làm mất ký tự thoát (`\s` thành `s`, `\r\n` thành xuống dòng thật), khiến trang `worker-my-hazards.html` lỗi cú pháp | Chạy kiểm tra cú pháp từng thẻ `<script>` bằng Node, báo "Invalid or unexpected token" | Sửa lại hai chỗ bằng công cụ chỉnh sửa trực tiếp, chạy lại và hết lỗi |
| Lúc đánh giá ban đầu, AI kết luận "3 trang thiếu `alt`" và "nhiều `outline: none` không có thay thế". Cả hai đều sai: ảnh có `alt` ở dòng kế tiếp, các `outline: none` đều có `border-color` và `box-shadow` thay thế | Đọc lại từng chỗ trong mã khi sửa | AI đính chính, không sửa thừa |
| Lúc đầu AI mô tả AI-2 và AI-3 theo ví dụ chung của barem, trong khi README đề bài định nghĩa AI-2 là Checklist Generator và AI-3 là Risk Hotspot Insight | Đối chiếu với README đề bài | Cập nhật tài liệu theo README |
| AI ước lượng số bản ghi hazard là 5 theo `hazards.json`, chưa rà hết các nguồn dữ liệu | Đếm lại trong `js/api.js` | Ghi lại đúng: dữ liệu mẫu còn ít, cần cả nhóm thống nhất trước khi thêm |
| Lần kiểm tra tệp CSV đầu tiên báo "không có BOM" | Đọc byte đầu của tệp thay vì dùng `Blob.text()` (hàm này tự bỏ BOM khi giải mã) | Xác định đó là lỗi của cách kiểm tra, không phải lỗi của trang; tệp có BOM đúng |

[Hào bổ sung các lỗi khác do AI sinh ra ở giai đoạn 20/10 – 23/10 mà Hào còn nhớ, ví dụ lỗi giao diện hoặc lỗi logic đã phải nhờ AI sửa lại.]

### 1.6. Cách kiểm chứng
- Chạy `node --check` cho `js/modules/worker.js` và kiểm tra cú pháp từng thẻ `<script>` của 3 trang worker.
- Chạy thử hàm `classifyHazard` bằng Node với 3 mô tả: quá ngắn (ra trạng thái thiếu dữ liệu), `Cáp điện hở nằm trong vũng nước` (Điện thi công, 96%), một câu mơ hồ (Chung / Khác, 42%).
- Quét mã bằng `grep` để đếm style inline, `!important`, ô nhập thiếu label.
- Dùng `git status` và `git log` để kiểm tra đúng tệp được commit trước khi đẩy.
- Chạy thử trên Chrome (chế độ chạy ngầm, cửa sổ 1440×900) với tài khoản công nhân, 13/13 kiểm tra đạt:
  - Xuất CSV (tệp có BOM UTF-8, 10 dòng dữ liệu) và Xuất JSON; khi lọc mức Nghiêm trọng còn 2 dòng thì tệp xuất đúng 2 mục.
  - Trang tự tải lại khi danh sách sự cố đổi ở tab khác, không tải lại khi chỉ đổi dữ liệu khác.
  - AI-1: mô tả `abc` hiện cảnh báo thiếu dữ liệu; mô tả mơ hồ hiện độ tin cậy 42%; mô tả rõ ra Điện thi công 96% không có cảnh báo; bấm gợi ý mẫu thì điền vào ô mô tả.
  - Không có lỗi JavaScript.
- Chưa thử trên điện thoại thật, chưa thử ở 320px và zoom 200%.

### 1.7. Điều tôi học được
- AI "không chắc chắn" khác AI "bị lỗi": hàm `classifyHazard` trả về cờ `insufficient` (mô tả dưới 10 ký tự) hoặc `lowConfidence` (độ tin cậy 42%), còn lỗi mạng hoặc quá thời gian vẫn đi qua `showAiFallback`.
- Dữ liệu người dùng nhập phải được escape bằng `escapeHtml` trước khi đưa vào `innerHTML` để tránh XSS.
- Sự kiện `storage` chỉ chạy ở các tab khác nên dùng được để đồng bộ giữa các tab; cần chặn tải lại liên tục bằng `sessionStorage`.
- Phải kiểm tra bằng chính ứng dụng chạy thật, không chỉ đọc mã: lần đầu kết quả kiểm tra BOM sai là do cách kiểm tra, chỉ phát hiện khi đọc byte thô.
- Dùng `git status` và `git add` đúng tệp để commit đúng phần cần commit.

[Hào đọc lại, sửa bằng lời của mình, xóa ý nào chưa hiểu và thêm ý khác nếu có. Vấn đáp sẽ hỏi từng ý này.]

### 1.8. Tính năng nào chỉ mô phỏng, tính năng nào gọi API thật
- AI-1 (phân loại nguy cơ) chỉ mô phỏng bằng quy tắc từ khóa trong JavaScript, không gọi mô hình AI thật. Độ trễ 450 ms là giả lập.
- Dữ liệu dùng JSON mẫu, `localStorage` và MockAPI. Không có khóa API bí mật nào trong mã nguồn.

## 2. Đoàn Thanh Sơn (SV2)
[Sơn viết theo đúng mẫu mục 1: công cụ, prompt chính, phần AI sinh ra (đối chiếu `git log` của mình), phần tự làm, lỗi AI gặp phải, cách kiểm chứng, điều học được, mô phỏng hay API thật. AI-3 (Risk Hotspot Insight) là phần của Sơn.]

## 3. Trần Huy Hoàng (SV3)
[Hoàng viết theo đúng mẫu mục 1. AI-2 (Checklist Generator) là phần của Hoàng.]

# SiteSafe – Theo dõi an toàn công trường (BTL-16)

Bài tập lớn học phần **Phát triển ứng dụng Web cơ bản (CSE122)**, Trường Đại học Thủy Lợi. Nhóm 3 sinh viên. Sản phẩm Web Frontend (HTML, CSS, JavaScript, dữ liệu giả lập) có nhiều vai trò, CRUD, responsive, tương tác JavaScript và trải nghiệm AI.

## 1. Thông tin nhóm
| Thành viên | Nhánh Git | Phụ trách |
|---|---|---|
| Phan Anh Hào | `PhanAnhHao_branch` | Đăng nhập, đăng ký, quên mật khẩu, 3 trang công nhân, trang chủ, trang 404, AI-1 |
| Đoàn Thanh Sơn | `DoanThanhSon_branch` | Quản lý công trường, Quản trị viên, Huấn luyện an toàn, AI-3 |
| Trần Huy Hoàng | `TranHuyHoang_branch` | Cán bộ an toàn, trang dùng chung (thông báo, hồ sơ, cài đặt), AI-2 |

Chi tiết phân công và trách nhiệm chéo: [docs/team-assignment.md](docs/team-assignment.md).

## 2. Lĩnh vực và ngữ cảnh
Xây dựng / ConstructionTech. Phiếu kiểm tra an toàn, ảnh hiện trường và hành động khắc phục thường phân tán ở nhiều nơi nên khó theo dõi một nguy cơ từ lúc phát hiện đến lúc xử lý xong.

## 3. Vấn đề và mục tiêu
- **P1** Checklist không đồng nhất giữa các đội.
- **P2** Nguy cơ (hazard) thiếu quy trình theo dõi trạng thái.
- **P3** Ảnh minh chứng không gắn với lịch sử xử lý.
- **P4** Quản lý thiếu bản đồ rủi ro theo khu vực.

Mục tiêu O1–O7 và thực thể dữ liệu: [docs/project-proposal.md](docs/project-proposal.md).

## 4. Vai trò người dùng
Nhân sự hiện trường (công nhân), Cán bộ an toàn, Quản lý công trường, Quản trị viên. Bảng tính năng theo vai trò: [docs/roles-and-features.md](docs/roles-and-features.md).

## 5. Tính năng chính
- Đăng nhập, đăng ký, quên mật khẩu, đăng nhập nhanh 4 tài khoản demo theo vai trò.
- Công nhân: làm checklist an toàn hằng ngày, báo nguy cơ có ảnh, tìm, lọc, sắp xếp, sửa, xóa và xuất CSV sự cố của mình.
- Cán bộ an toàn: bảng điều khiển, xử lý chi tiết sự cố, quản lý các đợt kiểm tra.
- Quản lý: báo cáo an toàn, hành động khắc phục, bản đồ rủi ro khu vực.
- Quản trị viên: quản lý người dùng, phân khu, mẫu checklist.
- Dùng chung: thông báo, hồ sơ, cài đặt, huấn luyện an toàn, giao diện sáng/tối.

## 6. Tính năng AI
| Mã | Tính năng | Vai trò | Trạng thái |
|---|---|---|---|
| AI-1 | Hazard Classifier: phân nhóm nguy cơ, mức rủi ro, lý do, độ tin cậy; có kịch bản thiếu dữ liệu và độ tin cậy thấp | Công nhân | Đã làm |
| AI-2 | Checklist Generator: gợi ý checklist theo loại công việc | Cán bộ an toàn | Đang làm |
| AI-3 | Risk Hotspot Insight: tổng hợp khu vực nhiều nguy cơ | Quản lý | Đang làm |

Mỗi tính năng AI theo 6 bước: Nhập, Đang xử lý, Kết quả, Giải thích, Chấp nhận/Sửa/Từ chối/Tạo lại, Lưu vào dữ liệu. Các tính năng AI chỉ mô phỏng ở Frontend bằng quy tắc JavaScript, không gọi mô hình AI thật.

## 7. Công nghệ
HTML5 ngữ nghĩa, CSS3 (biến CSS, Flexbox, Grid), JavaScript thuần (module hóa theo vai trò), `localStorage`, MockAPI, tệp JSON mẫu trong `assets/data/`.

## 8. Cấu trúc thư mục
```
index.html, 404.html      Trang chủ và trang lỗi
pages/                    Các trang theo vai trò: auth, worker, safety-officer, manager, admin, common, training
css/                      style.css (biến dùng chung), shell.css (sidebar/topbar), theme.css (sáng/tối), responsive.css và CSS theo vai trò
js/main.js, js/api.js     Khung dùng chung, dữ liệu và MockAPI
js/modules/               JavaScript theo vai trò (auth, worker, safety, manager, admin, training, common)
assets/                   data (JSON mẫu), images, icons, video
docs/                     Tài liệu dự án
design/                   Liên kết thiết kế Figma/Canva
```

## 9. Chạy trên máy cá nhân
Không cần máy chủ riêng, chỉ cần một trình duyệt hiện đại.
1. Tải mã nguồn: `git clone https://github.com/phananhhao15/CSE122_67KTPM1_BTCK_Nhom8.git`
2. Mở thư mục trong VS Code, cài tiện ích **Live Server**.
3. Chuột phải `index.html`, chọn **Open with Live Server** (mặc định cổng 5501).
4. Ở trang chủ hoặc trang đăng nhập, bấm một trong 4 nút đăng nhập nhanh (công nhân, cán bộ an toàn, quản lý, quản trị viên).

Nên mở bằng Live Server thay vì mở trực tiếp tệp, vì trang cần nạp tệp JSON và các module.

## 10. Dữ liệu và MockAPI
Dữ liệu mẫu nằm trong `assets/data/*.json` và được nạp qua `js/api.js`. Mọi thao tác thêm, sửa, xóa được lưu vào `localStorage` và đồng bộ với MockAPI nên vẫn còn sau khi tải lại trang (F5). Nếu MockAPI không truy cập được, hệ thống tự dùng dữ liệu mẫu cục bộ.

## 11. Liên kết dự án
| Nội dung | Liên kết |
|---|---|
| Kho mã nguồn | https://github.com/phananhhao15/CSE122_67KTPM1_BTCK_Nhom8 |
| Thiết kế Figma/Canva | (xem `design/figma-link.txt`) |
| Bảng công việc Trello | https://trello.com/b/1SE0OZ9d/d%E1%BB%B1-an-sitesafe |

## 12. Quy trình làm việc nhóm
Mỗi thành viên làm trên nhánh cá nhân của mình (`PhanAnhHao_branch`, `DoanThanhSon_branch`, `TranHuyHoang_branch`), commit thường xuyên và hợp nhất vào `main`. Công việc được ghi trên bảng Trello, mỗi thẻ ứng với một màn hình. Bảng kiểm kê màn hình: [docs/screen-inventory.md](docs/screen-inventory.md).

## 13. Kiểm thử nhanh
1. **Trạng thái AI không chắc chắn (AI-1):** đăng nhập công nhân, vào "Báo cáo nguy cơ", gõ mô tả ngắn (ví dụ `abc`) rồi bấm "AI-1 Phân loại nguy cơ" để thấy cảnh báo thiếu dữ liệu và gợi ý mẫu câu. Gõ mô tả mơ hồ để thấy độ tin cậy thấp. Gõ "cáp điện hở nằm trong vũng nước" để thấy kết quả đầy đủ có giải thích.
2. **Tìm, lọc, sắp xếp:** vào "Sự cố đã gửi", thử ô tìm kiếm cùng các bộ lọc trạng thái, mức rủi ro, khu vực; bấm "Đặt lại lọc".
3. **Xuất dữ liệu:** trên cùng trang, bấm "Xuất CSV" hoặc "Xuất JSON" để tải các sự cố đang hiển thị.
4. **Dữ liệu bền vững:** tạo một báo cáo nguy cơ mới rồi nhấn F5, dữ liệu vẫn còn.
5. **Responsive và trợ năng:** mở DevTools (F12), chuyển kích thước 320px, 768px; phóng to 200%; bấm Tab để xem viền focus; bấm Esc để đóng cửa sổ.
6. **Giao diện sáng/tối:** bấm nút mặt trăng ở thanh trên cùng.

## 14. Khai báo sử dụng AI
Báo cáo công cụ AI, câu lệnh chính, phần AI sinh ra, lỗi AI gặp phải và phần sinh viên tự làm: [docs/ai-usage-report.md](docs/ai-usage-report.md).

## 15. Tài liệu liên quan
- [docs/screen-inventory.md](docs/screen-inventory.md): bảng kiểm kê màn hình.
- [docs/project-proposal.md](docs/project-proposal.md): đề xuất dự án.
- [docs/roles-and-features.md](docs/roles-and-features.md): vai trò và tính năng.
- [docs/team-assignment.md](docs/team-assignment.md): phân công nhóm.
- [docs/ai-usage-report.md](docs/ai-usage-report.md): báo cáo sử dụng AI.
- [docs/de-bai-btl-16.md](docs/de-bai-btl-16.md): đề bài gốc của giảng viên.

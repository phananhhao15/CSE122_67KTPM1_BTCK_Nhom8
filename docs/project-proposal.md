# Đề xuất dự án – BTL-16 SiteSafe: Theo dõi an toàn công trường

Học phần: Phát triển ứng dụng Web cơ bản (CSE122) · Nhóm 3 sinh viên · Sản phẩm Frontend (HTML, CSS, JavaScript, dữ liệu giả lập).

## 1. Ngữ cảnh
Tại công trường xây dựng, phiếu kiểm tra an toàn, ảnh hiện trường và hành động khắc phục thường phân tán ở nhiều nơi (giấy, tin nhắn, bảng tính). Khó theo dõi một nguy cơ từ lúc phát hiện đến lúc được xử lý xong.

## 2. Phát biểu vấn đề
| Mã | Vấn đề | Nhóm người bị ảnh hưởng |
|---|---|---|
| P1 | Checklist không đồng nhất giữa các đội, mỗi nơi một kiểu | Nhân sự hiện trường, Cán bộ an toàn |
| P2 | Nguy cơ (hazard) được báo nhưng thiếu quy trình theo dõi trạng thái | Cán bộ an toàn, Quản lý |
| P3 | Ảnh minh chứng không gắn với lịch sử xử lý | Cán bộ an toàn |
| P4 | Quản lý thiếu bản đồ nhiệt (heatmap) rủi ro theo khu vực | Quản lý công trường |

## 3. Mục tiêu
- O1. Biến bài toán thực tế thành sản phẩm Frontend có hành trình người dùng rõ ràng.
- O2. Thiết kế đầy đủ giao diện cho từng vai trò, mỗi vai trò có ít nhất 3 màn hình.
- O3. Thể hiện thao tác CRUD và trạng thái nghiệp vụ thật, không làm hình thức.
- O4. Dùng JavaScript/DOM cho tìm kiếm, lọc, kiểm tra hợp lệ, modal, thẻ, trạng thái và kết xuất dữ liệu.
- O5. Dùng JSON giả lập, LocalStorage và MockAPI.
- O6. Có ít nhất 3 trải nghiệm AI mô phỏng ở Frontend, theo đủ 6 bước AI UX.
- O7. Làm việc nhóm bằng Trello/Notion và Git/GitHub.

## 4. Vai trò người dùng
| Vai trò | Trách nhiệm chính |
|---|---|
| Nhân sự hiện trường (công nhân) | Thực hiện checklist an toàn, báo nguy cơ, theo dõi sự cố đã gửi |
| Cán bộ an toàn | Rà soát, xử lý sự cố, quản lý các đợt kiểm tra |
| Quản lý công trường | Theo dõi khu vực rủi ro, hành động khắc phục, báo cáo an toàn |
| Quản trị viên | Quản lý người dùng, phân khu, mẫu checklist |

## 5. Thực thể dữ liệu và vòng đời trạng thái
| Thực thể | Tạo | Đọc | Sửa | Xóa / Lưu trữ | Lưu ở |
|---|---|---|---|---|---|
| users | ✓ | ✓ | ✓ | ✓ / khóa | `assets/data/users.json`, localStorage, MockAPI |
| zones | ✓ | ✓ | ✓ | ✓ | `zones.json`, localStorage, MockAPI |
| checklists | ✓ | ✓ | ✓ | ✓ / lưu trữ | `checklists.json`, localStorage, MockAPI |
| hazards | ✓ | ✓ | ✓ | ✓ | `hazards.json`, localStorage, MockAPI |
| correctiveActions | ✓ | ✓ | ✓ | ✓ | localStorage, MockAPI |
| inspections | ✓ | ✓ | ✓ | ✓ | `inspections.json`, localStorage, MockAPI |
| trainings | ✓ | ✓ | ✓ | – | `trainings.json`, localStorage, MockAPI |

**Vòng đời sự cố (hazard):** Chờ duyệt (OPEN) → Đang khắc phục (IN_PROGRESS) → Đã giải quyết (RESOLVED). Mức rủi ro: LOW, MEDIUM, HIGH, CRITICAL.

## 6. Hành trình người dùng chính
Công nhân đăng nhập → làm checklist hoặc báo nguy cơ (AI-1 gợi ý phân loại, công nhân chấp nhận, sửa hoặc từ chối) → Cán bộ an toàn xử lý và giao hành động khắc phục → Quản lý theo dõi khu vực rủi ro và báo cáo → Quản trị viên quản lý mẫu và phân khu.

## 7. Tính năng AI
| Mã | Tính năng | Vai trò sử dụng | Mô phỏng |
|---|---|---|---|
| AI-1 | Hazard Classifier: phân nhóm nguy cơ, mức rủi ro, lý do, độ tin cậy | Công nhân | Quy tắc từ khóa trong `js/modules/worker.js` |
| AI-2 | Checklist Generator: gợi ý checklist theo loại công việc | Cán bộ an toàn | Quy tắc JS (đang phát triển) |
| AI-3 | Risk Hotspot Insight: tổng hợp khu vực nhiều hazard | Quản lý | Quy tắc JS (đang phát triển) |

Mọi tính năng AI theo 6 bước: Nhập → Đang xử lý → Kết quả → Giải thích → Chấp nhận/Sửa/Từ chối/Tạo lại → Lưu vào dữ liệu. AI-1 có thêm kịch bản thất bại: mô tả quá ngắn hoặc không khớp nhóm nào thì cảnh báo độ tin cậy thấp và cho nhập thủ công.

## 8. Phạm vi
Danh sách đầy đủ 21 màn hình: xem `docs/screen-inventory.md`. Phân công: xem `docs/team-assignment.md`.

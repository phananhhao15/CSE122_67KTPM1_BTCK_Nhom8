# Bảng kiểm kê màn hình – BTL-16 SiteSafe

Nhánh làm việc: `PhanAnhHao_branch` (Hào), `DoanThanhSon_branch` (Sơn), `TranHuyHoang_branch` (Hoàng).
Mã task (Task ID) trùng với tên thẻ trên bảng Trello của nhóm (mỗi cột người đánh số riêng: Hào, Sơn, Hoang).
Quy ước video OBS: `SVx-XX-ten-man-hinh.mp4` (SV1 = Hào, SV2 = Sơn, SV3 = Hoàng).

Cột trong ngoặc `(xác nhận)` là phần chủ trang cần kiểm tra lại cho khớp với trang thực tế.

| Role | User Goal | User Task | Screen | File | CRUD | States | AI | Assignee | Task ID | Branch | OBS |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Khách | Hiểu sản phẩm, vào hệ thống | Xem giới thiệu, đăng nhập nhanh | Trang chủ | `index.html` | R | Normal, lỗi đăng nhập | – | Hào | Hào-TASK-07 | PhanAnhHao_branch | SV1-01-index.mp4 |
| Khách | Báo lỗi đường dẫn | Quay về trang chủ | Trang 404 | `404.html` | – | Error | – | Hào | Hào-TASK-09 | PhanAnhHao_branch | SV1-02-404.mp4 |
| Chung | Vào hệ thống đúng vai trò | Nhập tài khoản, mật khẩu, chọn vai trò | Đăng nhập | `pages/auth/login.html` | R | Normal, Loading, Error (sai mật khẩu) | – | Hào | Hào-TASK-01 | PhanAnhHao_branch | SV1-03-login.mp4 |
| Chung | Tạo tài khoản | Nhập họ tên, email, SĐT, mật khẩu | Đăng ký tài khoản | `pages/auth/register.html` | C | Normal, Validation, Success | – | Hào | Hào-TASK-02 | PhanAnhHao_branch | SV1-04-register.mp4 |
| Chung | Lấy lại mật khẩu | Gửi yêu cầu khôi phục qua email | Khôi phục mật khẩu | `pages/auth/forgot-password.html` | C | Normal, Validation, Success | – | Hào | Hào-TASK-03 | PhanAnhHao_branch | SV1-05-forgot-password.mp4 |
| Công nhân | Kiểm tra an toàn đầu ca | Làm checklist, ghi chú, đính ảnh, gửi phiếu, xem lịch sử | Kiểm tra an toàn hằng ngày | `pages/worker/worker-safety-checklist.html` | C, R | Normal, Validation, Empty (lịch sử), Success | – | Hào | Hào-TASK-04 | PhanAnhHao_branch | SV1-06-worker-safety-checklist.mp4 |
| Công nhân | Báo cáo nguy cơ | Nhập mô tả, ảnh, phân loại, gửi báo cáo | Báo cáo nguy cơ an toàn | `pages/worker/worker-hazard-create.html` | C | Normal, Validation, Loading AI, Success | AI-1 Hazard Classifier (đủ 6 bước, có ca thiếu dữ liệu và độ tin cậy thấp) | Hào | Hào-TASK-05 | PhanAnhHao_branch | SV1-07-worker-hazard-create.mp4 |
| Công nhân | Theo dõi sự cố đã gửi | Tìm, lọc theo trạng thái/mức rủi ro/khu vực, sắp xếp, xem, sửa, xóa, xuất CSV | Sự cố đã gửi | `pages/worker/worker-my-hazards.html` | R, U, D | Normal, Empty (lọc không ra), Loading, Success | – | Hào | Hào-TASK-06 | PhanAnhHao_branch | SV1-08-worker-my-hazards.mp4 |
| Mọi vai trò | Học huấn luyện an toàn | Xem khóa học, đăng ký học (xác nhận) | Huấn luyện an toàn | `pages/training/safety-training.html` | R (xác nhận) | (xác nhận) | – | Sơn | Sơn-TASK-07 | DoanThanhSon_branch | SV2-01-safety-training.mp4 |
| Quản lý | Theo dõi tình hình an toàn | Xem chỉ số và báo cáo an toàn (xác nhận) | Báo cáo an toàn | `pages/manager/manager-safety-report.html` | R (xác nhận) | (xác nhận) | (xác nhận) | Sơn | Sơn-TASK-03 | DoanThanhSon_branch | SV2-02-manager-safety-report.mp4 |
| Quản lý | Theo dõi hành động khắc phục | Xem, giao, cập nhật hành động khắc phục (xác nhận) | Hành động khắc phục | `pages/manager/manager-corrective-actions.html` | C, R, U (xác nhận) | (xác nhận) | AI-3 Risk Hotspot Insight (chưa làm) | Sơn | Sơn-TASK-02 | DoanThanhSon_branch | SV2-03-manager-corrective-actions.mp4 |
| Quản lý | Nhận diện khu vực rủi ro | Xem bản đồ rủi ro theo phân khu (xác nhận) | Bản đồ rủi ro khu vực | `pages/manager/manager-zone-risk-map.html` | R (xác nhận) | (xác nhận) | (xác nhận) | Sơn | Sơn-TASK-01 | DoanThanhSon_branch | SV2-04-manager-zone-risk-map.mp4 |
| Quản trị | Quản lý tài khoản | Tìm, thêm, sửa, khóa người dùng (xác nhận) | Quản lý người dùng | `pages/admin/admin-user-management.html` | C, R, U, D (xác nhận) | (xác nhận) | – | Sơn | Sơn-TASK-06 | DoanThanhSon_branch | SV2-05-admin-user-management.mp4 |
| Quản trị | Quản lý phân khu | Lọc theo mức rủi ro, thêm, sửa phân khu (xác nhận) | Quản lý khu vực | `pages/admin/admin-zone-management.html` | C, R, U, D (xác nhận) | (xác nhận) | – | Sơn | Sơn-TASK-05 | DoanThanhSon_branch | SV2-06-admin-zone-management.mp4 |
| Quản trị | Quản lý mẫu checklist | Thêm, sửa, ẩn mẫu checklist (xác nhận) | Quản lý mẫu checklist | `pages/admin/admin-checklist-template-management.html` | C, R, U, D (xác nhận) | (xác nhận) | – | Sơn | Sơn-TASK-04 | DoanThanhSon_branch | SV2-07-admin-checklist-template-management.mp4 |
| Cán bộ an toàn | Nắm tình hình trong ngày | Xem chỉ số, danh sách việc cần xử lý (xác nhận) | Safety Dashboard | `pages/safety-officer/safety-dashboard.html` | R (xác nhận) | (xác nhận) | AI-2 Checklist Generator (chưa làm) | Hoàng | Hoang-TASK-01 | TranHuyHoang_branch | SV3-01-safety-dashboard.mp4 |
| Cán bộ an toàn | Xử lý sự cố | Xem chi tiết, đổi trạng thái, ghi chú (xác nhận) | Chi tiết sự cố | `pages/safety-officer/safety-hazard-detail.html` | R, U (xác nhận) | (xác nhận) | (xác nhận) | Hoàng | Hoang-TASK-02 | TranHuyHoang_branch | SV3-02-safety-hazard-detail.mp4 |
| Cán bộ an toàn | Quản lý các đợt kiểm tra | Tạo, tìm, lọc đợt kiểm tra (xác nhận) | Quản lý kiểm tra an toàn | `pages/safety-officer/safety-inspection-management.html` | C, R, U (xác nhận) | (xác nhận) | – | Hoàng | Hoang-TASK-03 | TranHuyHoang_branch | SV3-03-safety-inspection-management.mp4 |
| Mọi vai trò | Xem thông báo | Đọc, đánh dấu đã đọc (xác nhận) | Thông báo | `pages/common/notifications.html` | R, U (xác nhận) | (xác nhận) | – | Hoàng | Hoang-TASK-04 | TranHuyHoang_branch | SV3-04-notifications.mp4 |
| Mọi vai trò | Quản lý hồ sơ | Xem, sửa thông tin cá nhân (xác nhận) | Hồ sơ cá nhân | `pages/common/profile.html` | R, U (xác nhận) | (xác nhận) | – | Hoàng | Hoang-TASK-05 | TranHuyHoang_branch | SV3-05-profile.mp4 |
| Mọi vai trò | Tùy chỉnh | Đổi cài đặt giao diện, thông báo (xác nhận) | Cài đặt | `pages/common/settings.html` | R, U (xác nhận) | (xác nhận) | – | Hoàng | Hoang-TASK-06 | TranHuyHoang_branch | SV3-06-settings.mp4 |

Tổng: 21 màn hình (19 trang trong `pages/`, cộng `index.html` và `404.html`) → cần 21 video OBS.

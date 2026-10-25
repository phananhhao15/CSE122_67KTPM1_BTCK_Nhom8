# Vai trò và tính năng – SiteSafe

| Vai trò | Màn hình chính | Tính năng chính |
|---|---|---|
| Khách | `index.html`, `pages/auth/*`, `404.html` | Xem giới thiệu, đăng nhập (có 4 tài khoản demo), đăng ký, khôi phục mật khẩu |
| Công nhân | `pages/worker/*` | Làm checklist an toàn kèm ghi chú và ảnh, xem lịch sử phiếu; báo nguy cơ với AI-1 phân loại; tìm, lọc, sắp xếp, sửa, xóa, xuất CSV sự cố của mình |
| Cán bộ an toàn | `pages/safety-officer/*` | Bảng điều khiển, xử lý chi tiết sự cố, quản lý các đợt kiểm tra; AI-2 gợi ý checklist (chưa làm) |
| Quản lý | `pages/manager/*` | Báo cáo an toàn, hành động khắc phục, bản đồ rủi ro khu vực; AI-3 phân tích điểm nóng (chưa làm) |
| Quản trị viên | `pages/admin/*` | Quản lý người dùng, phân khu, mẫu checklist |
| Dùng chung | `pages/common/*`, `pages/training/*` | Thông báo, hồ sơ, cài đặt, huấn luyện an toàn, giao diện sáng/tối |

Khung sidebar và topbar dùng chung: `css/shell.css` và `js/main.js`. Giao diện sáng/tối: `css/theme.css`. Dữ liệu và MockAPI: `js/api.js`.

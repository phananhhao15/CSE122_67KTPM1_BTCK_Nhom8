# Báo cáo bài tập lớn Phát triển ứng dụng Web cơ bản

**TRƯỜNG ĐẠI HỌC THỦY LỢI**  
**KHOA CÔNG NGHỆ THÔNG TIN**

**Đề tài BTL 16 SiteSafe**  
**Theo dõi an toàn công trường**

Nhóm 8 — Lớp 67KTPM1  
Học phần CSE122 — Phát triển ứng dụng Web cơ bản  
Giảng viên học phần: [điền tên giảng viên]  
Học kỳ I năm học 2026–2027

| STT | Họ và tên      | Mã sinh viên | Vai trò phụ trách                                      |
| --- | -------------- | ------------ | ------------------------------------------------------ |
| 1   | Phan Anh Hào   | [2551170886] | Nhân sự hiện trường (công nhân), xác thực, trang chủ   |
| 2   | Đoàn Thanh Sơn | [2551170943] | Quản lý công trường, Quản trị viên, Huấn luyện an toàn |
| 3   | Trần Huy Hoàng | [2551170891] | Cán bộ an toàn, trang dùng chung                       |

## Tóm tắt

SiteSafe là nguyên mẫu website frontend phục vụ theo dõi an toàn tại công trường xây dựng: thực hiện checklist an toàn đầu ca, báo cáo nguy cơ (hazard) có ảnh, theo dõi trạng thái xử lý, giao hành động khắc phục và nhận diện khu vực rủi ro. Sản phẩm gồm bốn vai trò: Nhân sự hiện trường (công nhân), Cán bộ an toàn, Quản lý công trường và Quản trị viên. Các vai trò dùng chung dữ liệu để mô phỏng chuỗi phát hiện nguy cơ, xử lý, khắc phục và báo cáo.

Nhóm triển khai giao diện nhiều trang bằng HTML, CSS và JavaScript thuần. Mã được tách thành module theo vai trò, khung sidebar/topbar dùng chung và lớp dữ liệu có đồng bộ MockAPI. Dữ liệu ban đầu nằm trong các file JSON, được nạp vào localStorage; khi MockAPI không truy cập được, hệ thống dùng dữ liệu cục bộ. Ba trải nghiệm AI (Hazard Classifier, Checklist Generator, Risk Hotspot Insight) được mô phỏng bằng quy tắc JavaScript; sản phẩm không gọi mô hình AI thật.

Báo cáo trình bày bài toán, yêu cầu, luồng người dùng, kiến trúc, mô hình dữ liệu, chức năng theo vai trò, giao diện, kiểm thử và triển khai. Phạm vi đánh giá là nguyên mẫu chạy trong trình duyệt. Hệ thống chưa có máy chủ nghiệp vụ riêng, xác thực production hay gửi email thật. Những giới hạn này là cơ sở để xác định hướng phát triển tiếp theo.

## Mục lục

1. Tổng quan và tổ chức thực hiện.
2. Phân tích yêu cầu và luồng nghiệp vụ.
3. Kiến trúc và tổ chức dữ liệu.
4. Thiết kế và triển khai chức năng.
5. Giao diện và trải nghiệm người dùng.
6. Kiểm thử và triển khai.
7. Kết luận và hướng phát triển.
8. Tài liệu tham khảo.
9. Phụ lục danh mục màn hình và hướng dẫn trải nghiệm.

# Chương 1 Tổng quan và tổ chức thực hiện

## 1.1 Lý do lựa chọn đề tài

Tại công trường xây dựng, phiếu kiểm tra an toàn, ảnh hiện trường và hành động khắc phục thường nằm rải rác ở giấy tờ, tin nhắn và bảng tính. Khi một nguy cơ được phát hiện, rất khó theo dõi nó từ lúc báo cáo đến lúc được xử lý xong. Mỗi đội dùng một kiểu checklist riêng, ảnh minh chứng không gắn với lịch sử xử lý, còn quản lý thiếu cái nhìn tổng hợp về khu vực nào đang nhiều rủi ro.

SiteSafe đưa các nhiệm vụ này vào một nguyên mẫu thống nhất. Công nhân bắt đầu từ checklist đầu ca và báo cáo nguy cơ; cán bộ an toàn và quản lý xử lý, giao việc và theo dõi; quản trị viên duy trì danh mục người dùng, phân khu và mẫu checklist. Đề tài phù hợp với học phần Web cơ bản vì thể hiện được HTML ngữ nghĩa, CSS responsive, JavaScript thao tác DOM, CRUD có ràng buộc và trao đổi dữ liệu giữa các màn hình.

## 1.2 Mục tiêu sản phẩm

Sản phẩm hướng tới việc mô phỏng một chuỗi nghiệp vụ hoàn chỉnh thay vì tạo các trang giao diện độc lập. Các mục tiêu chính (O1–O7 trong đề xuất dự án) gồm: biến bài toán thực tế thành sản phẩm có hành trình người dùng rõ ràng; thiết kế giao diện cho từng vai trò, mỗi vai trò có ít nhất ba màn hình; thể hiện CRUD và trạng thái nghiệp vụ thật; dùng JavaScript/DOM cho tìm kiếm, lọc, kiểm tra hợp lệ và kết xuất dữ liệu; dùng JSON giả lập, localStorage và MockAPI; có ít nhất ba trải nghiệm AI mô phỏng theo sáu bước; làm việc nhóm bằng Trello và Git/GitHub.

Tiêu chí hoàn thành một chức năng không chỉ là hiển thị được form hoặc bảng. Người dùng phải thực hiện được hành động, nhận phản hồi đúng và thấy dữ liệu cập nhật khi quay lại. Các tình huống rỗng, dữ liệu sai và thao tác thất bại được xem xét cùng luồng thành công.

## 1.3 Phạm vi và giới hạn

Website gồm 21 màn hình chức năng theo bảng kiểm kê hiện hành: 19 trang trong thư mục pages, cộng index.html và 404.html.

Về dữ liệu, đây là ứng dụng frontend chạy trong trình duyệt. localStorage giữ trạng thái qua lần tải lại; MockAPI cho phép đồng bộ khi truy cập được, nhưng đây vẫn là dịch vụ giả lập dùng cho học tập. Đăng nhập, đăng ký và khôi phục mật khẩu là mô phỏng. Việc kiểm tra quyền trên giao diện và trong JavaScript có tác dụng kiểm soát luồng nguyên mẫu, không thay thế xác thực và phân quyền phía máy chủ.

## 1.4 Phân công thành viên

| Thành viên     | Phần việc phụ trách                                                                                                  | Nhánh Git           | Tính năng AI              |
| -------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------- | ------------------------- |
| Phan Anh Hào   | Đăng nhập, đăng ký, quên mật khẩu; ba trang công nhân; trang chủ; trang 404                                          | PhanAnhHao_branch   | AI-1 Hazard Classifier    |
| Đoàn Thanh Sơn | Báo cáo an toàn, hành động khắc phục, bản đồ rủi ro; quản lý người dùng, phân khu, mẫu checklist; huấn luyện an toàn | DoanThanhSon_branch | AI-3 Risk Hotspot Insight |
| Trần Huy Hoàng | Bảng điều khiển, chi tiết sự cố, quản lý đợt kiểm tra; thông báo, hồ sơ, cài đặt                                     | TranHuyHoang_branch | AI-2 Checklist Generator  |

Trách nhiệm chéo: Hào phụ trách design system, điều hướng, giao diện sáng/tối và khả năng tiếp cận; Sơn phụ trách kiến trúc JavaScript, dữ liệu giả lập và MockAPI; Hoàng phụ trách kiểm thử responsive, tích hợp và triển khai.

Nhóm tổ chức công việc trên Trello (mỗi thẻ ứng với một màn hình) và lưu mã trên GitHub. Mỗi thành viên làm trên nhánh cá nhân, commit thường xuyên rồi hợp nhất vào main. Các phần dùng chung như khung sidebar/topbar (shell.css, main.js) và giao diện sáng/tối (theme.css) được đối chiếu với mọi trang đang sử dụng thay vì chỉ kiểm tra trang của người sửa. Phạm vi AI hỗ trợ được trình bày riêng tại mục 6.5.

# Chương 2 Phân tích yêu cầu và luồng nghiệp vụ

## 2.1 Người dùng và vấn đề cần giải quyết

| Mã  | Vấn đề                                                     | Chức năng đáp ứng                                                          |
| --- | ---------------------------------------------------------- | -------------------------------------------------------------------------- |
| P1  | Checklist không đồng nhất giữa các đội                     | Mẫu checklist do Quản trị viên quản lý; công nhân thực hiện theo mẫu chung |
| P2  | Nguy cơ được báo nhưng thiếu quy trình theo dõi trạng thái | Vòng đời hazard OPEN → IN_PROGRESS → RESOLVED, xử lý bởi cán bộ an toàn    |
| P3  | Ảnh minh chứng không gắn với lịch sử xử lý                 | Báo cáo nguy cơ kèm ảnh, lưu cùng bản ghi hazard                           |
| P4  | Quản lý thiếu bản đồ rủi ro theo khu vực                   | Bản đồ rủi ro theo phân khu và AI-3 Risk Hotspot Insight                   |

Khách chưa đăng nhập xem trang giới thiệu và có thể đăng nhập nhanh bằng bốn tài khoản demo theo vai trò. Sau đăng nhập, menu và trang chính được xác định theo vai trò để tránh thao tác vào chức năng không thuộc phạm vi tài khoản.

## 2.2 Yêu cầu chức năng theo vai trò

Công nhân cần làm checklist an toàn hằng ngày kèm ghi chú và ảnh, xem lịch sử phiếu; báo nguy cơ với mô tả, ảnh, khu vực và nhận gợi ý phân loại từ AI-1; theo dõi các sự cố đã gửi với tìm kiếm, lọc theo trạng thái/mức rủi ro/khu vực, sắp xếp, sửa, xóa và xuất CSV.

Cán bộ an toàn cần xem bảng điều khiển các việc cần xử lý, mở chi tiết sự cố để đổi trạng thái và ghi chú, quản lý các đợt kiểm tra; AI-2 gợi ý checklist theo loại công việc.

Quản lý công trường cần xem báo cáo an toàn, theo dõi và giao hành động khắc phục, quan sát bản đồ rủi ro theo khu vực kèm phân tích điểm nóng của AI-3.

Quản trị viên cần quản lý tài khoản người dùng, danh sách phân khu và mẫu checklist. Mọi vai trò dùng chung thông báo, hồ sơ, cài đặt và trang huấn luyện an toàn.

## 2.3 Yêu cầu phi chức năng

Giao diện cần hoạt động ở kích thước desktop và mobile, tránh tràn nội dung chính và giữ thao tác bằng bàn phím. Biểu mẫu cần nhãn rõ và lỗi sát trường; thông báo không phụ thuộc duy nhất vào màu. Các thao tác xóa hoặc thay đổi lớn cần có xác nhận.

Mã được tổ chức để phân biệt bố cục HTML, định dạng CSS, module JavaScript theo vai trò và lớp dữ liệu. Giao diện hỗ trợ chế độ sáng/tối ở các trang làm việc. Hệ thống cần phản hồi khi không đọc/ghi được storage và không báo thành công nếu việc lưu thất bại.

## 2.4 Luồng báo cáo và xử lý nguy cơ

Công nhân đăng nhập, mở trang Báo cáo nguy cơ, nhập mô tả, chọn khu vực và đính ảnh. AI-1 phân tích mô tả để gợi ý nhóm nguy cơ, mức rủi ro, lý do và độ tin cậy; công nhân chấp nhận, sửa, từ chối hoặc yêu cầu tạo lại. Khi gửi, hazard mới có trạng thái OPEN. Cán bộ an toàn nhận sự cố, chuyển sang IN_PROGRESS khi bắt đầu khắc phục và RESOLVED khi hoàn tất. Quản lý theo dõi hành động khắc phục và mức rủi ro theo khu vực; công nhân thấy trạng thái cập nhật tại trang Sự cố đã gửi.

## 2.5 Vòng đời sự cố

| Trạng thái  | Nhãn hiển thị          | Chuyển tiếp chính | Ý nghĩa                                         |
| ----------- | ---------------------- | ----------------- | ----------------------------------------------- |
| OPEN        | Chưa xử lý / Chờ duyệt | IN_PROGRESS       | Nguy cơ vừa được báo, chưa có người xử lý       |
| IN_PROGRESS | Đang khắc phục         | RESOLVED          | Đã giao hoặc đang thực hiện hành động khắc phục |
| RESOLVED    | Đã giải quyết          | –                 | Nguy cơ đã được xử lý xong                      |

Mức rủi ro được chia thành bốn bậc: LOW, MEDIUM, HIGH, CRITICAL. Mức này được dùng để lọc, sắp xếp và tính điểm nóng theo khu vực.

## 2.6 Luồng quản trị và huấn luyện

Quản trị viên thêm, sửa, khóa tài khoản; duy trì danh sách phân khu kèm mức rủi ro; thêm, sửa, ẩn mẫu checklist để các đội dùng cùng một chuẩn. Trang huấn luyện an toàn hiển thị các khóa học cho mọi vai trò. Thông báo, hồ sơ và cài đặt là các trang dùng chung, mở được từ khung sidebar/topbar của mọi vai trò.

# Chương 3 Kiến trúc và tổ chức dữ liệu

## 3.1 Công nghệ sử dụng

| Thành phần          | Công nghệ                   | Vai trò trong sản phẩm                                     |
| ------------------- | --------------------------- | ---------------------------------------------------------- |
| Cấu trúc trang      | HTML5 ngữ nghĩa             | Bố cục, form và vùng nội dung                              |
| Định dạng           | CSS3                        | Biến giao diện, Flexbox/Grid, responsive và theme sáng/tối |
| Tương tác           | JavaScript thuần            | DOM, sự kiện, validation, lọc và xử lý nghiệp vụ           |
| Dữ liệu             | JSON, localStorage, MockAPI | Dữ liệu mẫu, lưu trạng thái và đồng bộ                     |
| Thiết kế            | Figma/Canva                 | Mockup tham chiếu cho các màn hình                         |
| Quản lý và cộng tác | Git, GitHub, Trello         | Mã nguồn, nhánh theo thành viên và theo dõi công việc      |

Toàn bộ bố cục và thành phần giao diện được định nghĩa bằng CSS riêng, không dùng framework giao diện bên ngoài.

## 3.2 Tổ chức mã nguồn

```text
Repository/
├── index.html, 404.html          Trang chủ và trang lỗi
├── pages/                        Các trang theo vai trò
│   ├── auth/                     Đăng nhập, đăng ký, quên mật khẩu
│   ├── worker/                   Checklist, báo nguy cơ, sự cố đã gửi
│   ├── safety-officer/           Dashboard, chi tiết sự cố, đợt kiểm tra
│   ├── manager/                  Báo cáo, hành động khắc phục, bản đồ rủi ro
│   ├── admin/                    Người dùng, phân khu, mẫu checklist
│   ├── common/                   Thông báo, hồ sơ, cài đặt
│   └── training/                 Huấn luyện an toàn
├── css/                          style, shell, theme, responsive và CSS theo vai trò
├── js/
│   ├── main.js, api.js           Khung dùng chung, dữ liệu và MockAPI
│   └── modules/                  auth, worker, safety, manager, admin, training, common
├── assets/                       data (JSON mẫu), images, icons, video
├── docs/                         Đề bài, đề xuất, phân công, kiểm kê màn hình, báo cáo AI
└── design/                       Mockup và liên kết thiết kế
```

Mỗi vai trò có module JavaScript và stylesheet riêng, giúp chia việc rõ ràng. Các phần dùng chung được tách thành tệp độc lập: css/shell.css và js/main.js cho sidebar/topbar, css/theme.css cho chế độ sáng/tối, js/api.js cho dữ liệu.

## 3.3 Các lớp xử lý

HTML cung cấp cấu trúc và các vị trí hiển thị dữ liệu. main.js dựng khung sidebar/topbar theo vai trò (mảng navigationLinks), gắn nút chuyển giao diện sáng/tối và kiểm tra truy cập. Module theo vai trò đọc dữ liệu từ api.js, chuẩn bị giá trị hiển thị và xử lý sự kiện. api.js giữ dữ liệu, đọc/ghi localStorage và đồng bộ với MockAPI.

Khung giao diện dùng chung hoạt động như sau: các trang có thể viết khung cũ (.app-layout, .sidebar, .topbar, .page-content); khi tải trang, main.js đổi sang khung thống nhất (.wcl-app, .wcl-sidebar, .wcl-topbar, .wcl-content). Nhờ đó mọi vai trò có cùng một sidebar và topbar, đổi giao diện chỉ cần sửa một nơi.

## 3.4 Mô hình dữ liệu liên kết bằng ID

| Tập dữ liệu       | Thuộc tính/liên kết chính                                                           | Mục đích                                |
| ----------------- | ----------------------------------------------------------------------------------- | --------------------------------------- |
| users             | id, email, role, roleLabel, trạng thái                                              | Tài khoản và phân quyền theo vai trò    |
| zones             | id, mã khu, tên khu, mức rủi ro                                                     | Phân khu công trường                    |
| checklists        | id, tên mẫu, các mục kiểm tra, trạng thái                                           | Mẫu checklist an toàn                   |
| hazards           | id, title, description, zoneId, category, riskLevel, status, reportedBy, reportedAt | Sự cố/nguy cơ được báo                  |
| correctiveActions | hazardId, người phụ trách, trạng thái                                               | Hành động khắc phục do quản lý theo dõi |
| inspections       | id, khu vực, thời gian, trạng thái                                                  | Các đợt kiểm tra an toàn                |
| trainings         | id, tên khóa, nội dung                                                              | Huấn luyện an toàn                      |
| notifications     | userId, nội dung, trạng thái đọc                                                    | Thông báo cho người dùng                |

Dữ liệu mẫu hiện có trong assets/data gồm 8 người dùng, 6 phân khu, 19 mẫu/mục checklist, 5 sự cố, 5 đợt kiểm tra và 4 khóa huấn luyện (số bản ghi đếm theo trường id của từng file JSON). Quan hệ trọng tâm là zones → hazards → correctiveActions. Người báo nằm ở hazard.reportedBy; khu vực nằm ở hazard.zoneId. Đây là liên kết logic bằng ID trong object, chưa phải các bảng có khóa ngoại do cơ sở dữ liệu bảo đảm.

## 3.5 Dữ liệu mẫu, localStorage và MockAPI

Dữ liệu ban đầu nằm trong assets/data/\*.json và được nạp qua js/api.js. Mọi thao tác thêm, sửa, xóa được lưu vào localStorage (khóa siteSafeData cùng các khóa riêng cho thông báo, huấn luyện và phiên đăng nhập siteSafeUser) nên vẫn còn sau khi tải lại trang.

api.js còn có lớp đồng bộ MockAPI: địa chỉ dịch vụ được cấu hình trong hằng MOCKAPI_URL hoặc lưu ở khóa siteSafeMockApiUrl; ảnh chụp dữ liệu đồng bộ lưu ở siteSafeMockSnapshot. Nếu MockAPI không truy cập được, hệ thống tự dùng dữ liệu mẫu cục bộ.

localStorage chia theo origin gồm giao thức, host và cổng. Bản Live Server và bản triển khai trên GitHub Pages (nếu có) không tự dùng chung dữ liệu cục bộ. Khi mô phỏng tương tác nhiều vai trò, cần dùng các tài khoản trong cùng origin và trình duyệt.

## 3.6 Kiểm tra truy cập và xử lý lỗi

auth.js cung cấp hàm hasRole() và bước kiểm tra truy cập khi tải trang: người chưa đăng nhập bị chuyển về trang đăng nhập kèm tham số next để quay lại đúng trang sau khi đăng nhập; người không đủ vai trò bị từ chối truy cập. Giao diện ẩn các mục menu không thuộc vai trò giúp hướng dẫn người dùng, nhưng không được dùng thay cho việc kiểm tra lại trong mã. Cơ chế này không thay thế xác thực phía máy chủ.

# Chương 4 Thiết kế và triển khai chức năng

## 4.1 Xác thực và trang chủ

Trang chủ index.html giới thiệu sản phẩm bằng ảnh nền và video công trường, cho phép đăng nhập nhanh theo bốn vai trò. Trang đăng nhập yêu cầu nhập tài khoản, mật khẩu và chuyển đúng trang theo vai trò. Trang đăng ký kiểm tra họ tên, email, số điện thoại, mật khẩu; trang quên mật khẩu gửi yêu cầu khôi phục mô phỏng. Các trang xác thực cố ý giữ giao diện sáng.

## 4.2 Công nhân làm checklist và báo nguy cơ

Trang Kiểm tra an toàn hằng ngày cho công nhân tích các mục checklist, ghi chú, đính ảnh, gửi phiếu và xem lịch sử; khi chưa có lịch sử, trang hiển thị trạng thái rỗng. Trang có khối chuỗi ngày an toàn để tạo động lực duy trì thói quen kiểm tra.

Trang Báo cáo nguy cơ có form mô tả, khu vực, ảnh và phần AI-1. Form kiểm tra đầu vào trước khi gửi; lỗi hiển thị sát trường và giữ lại giá trị người dùng đã nhập. Khi gửi hợp lệ, hazard mới được tạo với trạng thái OPEN.

## 4.3 Công nhân theo dõi sự cố đã gửi

Trang Sự cố đã gửi lấy các hazard do chính người đăng nhập báo. Người dùng tìm theo từ khóa, lọc theo trạng thái, mức rủi ro và khu vực, sắp xếp, xem chi tiết, sửa, xóa và xuất CSV. Bộ lọc kết hợp với nhau; khi không có kết quả, trang hiển thị hướng dẫn thay vì để trống vùng nội dung. Thao tác xóa cần xác nhận trước khi thực hiện.

## 4.4 Cán bộ an toàn xử lý sự cố

Bảng điều khiển hiển thị các chỉ số và danh sách việc cần xử lý. Trang chi tiết sự cố cho phép xem thông tin, ảnh minh chứng, đổi trạng thái theo vòng đời và ghi chú. Trang Quản lý kiểm tra an toàn cho phép tạo, tìm và lọc các đợt kiểm tra. Các thay đổi trạng thái được lưu lại để công nhân và quản lý thấy cùng một dữ liệu.

## 4.5 Quản lý công trường theo dõi rủi ro

Báo cáo an toàn tổng hợp chỉ số theo dữ liệu sự cố. Trang Hành động khắc phục cho phép xem, giao và cập nhật hành động. Trang Bản đồ rủi ro khu vực trình bày mức rủi ro theo phân khu và tích hợp AI-3, mô tả ở mục 4.7.

## 4.6 Quản trị hệ thống

Quản trị viên tìm, thêm, sửa và khóa tài khoản; lọc phân khu theo mức rủi ro, thêm và sửa phân khu; thêm, sửa và ẩn mẫu checklist. Các thao tác ảnh hưởng dữ liệu liên quan cần được xét trước khi xóa hoặc khóa. Mật khẩu mẫu trong dữ liệu local chỉ phục vụ nguyên mẫu; khi phát triển backend phải thay bằng băm mật khẩu và quản lý phiên đúng chuẩn.

## 4.7 Ba trải nghiệm AI mô phỏng theo quy tắc

| Mã   | Tính năng            | Vai trò        | Đầu vào                    | Xử lý và kết quả                                                           | Quyền quyết định                 | Trạng thái                                          |
| ---- | -------------------- | -------------- | -------------------------- | -------------------------------------------------------------------------- | -------------------------------- | --------------------------------------------------- |
| AI-1 | Hazard Classifier    | Công nhân      | Mô tả, khu vực             | Khớp từ khóa với các nhóm nguy cơ; trả nhóm, mức rủi ro, lý do, độ tin cậy | Chấp nhận, sửa, từ chối, tạo lại | Đã làm, tích hợp ở trang báo nguy cơ                |
| AI-2 | Checklist Generator  | Cán bộ an toàn | Loại công việc             | Gợi ý các mục checklist phù hợp                                            | Chấp nhận, sửa, từ chối, lưu     | Đang phát triển                                     |
| AI-3 | Risk Hotspot Insight | Quản lý        | Dữ liệu sự cố theo khu vực | Tổng hợp khu vực nhiều nguy cơ và đề xuất hành động ưu tiên                | Xem, xác nhận, lưu               | Đã tích hợp ở bản đồ rủi ro (có giao diện sáng/tối) |

AI-1 phân loại nguy cơ vào các nhóm như Điện thi công, Làm việc trên cao, Hố móng & Sụt lở, PCCC & Hàn cắt, Vật thể rơi, Bảo hộ cá nhân, Mặt bằng thi công và Chung / Khác. Độ tin cậy là điểm theo quy tắc từ khóa, không phải xác suất đã được hiệu chuẩn. Khi mô tả quá ngắn hoặc không khớp nhóm nào, hệ thống trả độ tin cậy thấp, cảnh báo và cho phép nhập thủ công thay vì tạo kết quả giả.

Mỗi trải nghiệm AI theo sáu bước: Nhập, Đang xử lý, Kết quả, Giải thích, Chấp nhận/Sửa/Từ chối/Tạo lại, Lưu vào dữ liệu. Thời gian chờ ở bước xử lý là mô phỏng để thể hiện trạng thái loading, không phải độ trễ của dịch vụ ngoài. Tình trạng AI-2 cần được nhóm xác nhận lại trước khi nộp.

# Chương 5 Giao diện và trải nghiệm người dùng

## 5.1 Tổ chức thiết kế

Giao diện dùng bảng màu và hình ảnh gắn với ngữ cảnh công trường, phân biệt vùng điều hướng và nội dung chính. Biến CSS dùng chung (style.css) giúp thống nhất màu, khoảng cách và đường viền. Các nhóm trang có stylesheet riêng (worker, manager, admin, training, auth, landing) nhưng tái sử dụng nút, form, bảng, card và trạng thái dùng chung.

Thiết kế tham chiếu được lưu trong thư mục design (liên kết Canva và 21 mockup tương ứng 21 màn hình). Bảng kiểm kê màn hình ánh xạ từng màn hình tới tệp, mục tiêu, CRUD, trạng thái, người phụ trách và nhánh.

## 5.2 Khung điều hướng và responsive

Sidebar và topbar của mọi trang dùng chung một nguồn (shell.css và main.js); menu theo vai trò nằm trong mảng navigationLinks. Trên mobile, menu được thu gọn và mở bằng nút trên topbar. responsive.css và phần media query trong stylesheet từng vai trò đổi số cột và sắp xếp lại form, bảng khi màn hình hẹp.

Chế độ sáng/tối do theme.css quản lý bằng thuộc tính data-theme trên thẻ html; nút chuyển giao diện do mountThemeToggle trong main.js chèn vào topbar và lưu lựa chọn ở localStorage (khóa siteSafeTheme). Các trang đăng nhập, trang chủ và 404 cố ý giữ giao diện sáng. Khi thêm thành phần có màu viết cứng, cần bổ sung luật tối tương ứng vào theme.css.

## 5.3 Biểu mẫu và hỗ trợ truy cập

Mỗi trường cần có nhãn; lỗi hiển thị sát trường và giữ giá trị người dùng đã nhập. Validation đặt ở bước nhập liệu và kiểm tra lại khi lưu. Focus-visible giúp nhận biết phần tử khi dùng Tab; hộp thoại có cơ chế đóng bằng bàn phím. Các cải thiện này hỗ trợ truy cập nhưng không được xem là chứng nhận tuân thủ đầy đủ WCAG khi chưa có đánh giá toàn diện.

## 5.4 Bao phủ trạng thái

| Tình huống          | Phản hồi phù hợp                                                  |
| ------------------- | ----------------------------------------------------------------- |
| Đang xử lý          | Khóa thao tác gửi lặp và hiển thị chỉ báo loading (đăng nhập, AI) |
| Không có dữ liệu    | Thông điệp giải thích, ví dụ lịch sử checklist trống              |
| Không khớp bộ lọc   | Nêu không tìm thấy và cho đổi hoặc xóa bộ lọc                     |
| Đầu vào sai         | Lỗi sát trường, giữ giá trị người dùng                            |
| Đăng nhập sai       | Thông báo lỗi tại trang đăng nhập                                 |
| Độ tin cậy AI thấp  | Cảnh báo và cho nhập thủ công                                     |
| Trang không tồn tại | Trang 404 có đường quay về trang chủ                              |

Dữ liệu được đọc từ localStorage đồng bộ nên các thao tác lọc không phải chờ mạng. Chỉ lớp đồng bộ MockAPI mới phụ thuộc kết nối, và khi lỗi hệ thống quay về dữ liệu cục bộ.

# Chương 6 Kiểm thử và triển khai

## 6.1 Phương pháp kiểm thử

Kiểm thử được thực hiện thủ công theo từng màn hình và luồng xuyên vai trò: kiểm tra giao diện ở các viewport, kiểm tra validation, kiểm tra dữ liệu còn lại sau khi tải lại trang và kiểm tra các vai trò đọc cùng một dữ liệu. Mỗi màn hình được ghi lại bằng một video OBS có mặt sinh viên cùng commit tương ứng trên GitHub, theo quy ước đặt tên SVx-XX-ten-man-hinh.mp4.

Repository hiện không có bộ kiểm thử tự động; báo cáo này không khẳng định đã chạy bộ hồi quy tự động hay công cụ kiểm tra HTML. [Nhóm bổ sung kết quả kiểm thử thực tế nếu có.] Kết quả kiểm thử trên một trình duyệt hoặc viewport giả lập không dùng để khẳng định đã kiểm thử đầy đủ mọi trình duyệt và thiết bị.

## 6.2 Các ca kiểm thử nghiệp vụ tiêu biểu

| Mã   | Tình huống                                   | Kết quả cần kiểm tra                               |
| ---- | -------------------------------------------- | -------------------------------------------------- |
| TC01 | Đăng nhập sai mật khẩu                       | Báo lỗi, không vào hệ thống                        |
| TC02 | Truy cập trang vai trò khác khi đã đăng nhập | Bị từ chối hoặc chuyển hướng                       |
| TC03 | Đăng nhập nhanh theo từng vai trò            | Vào đúng trang và menu của vai trò                 |
| TC04 | Gửi báo nguy cơ thiếu mô tả hoặc khu vực     | Lỗi tại trường, không tạo hazard                   |
| TC05 | AI-1 nhận mô tả quá ngắn                     | Cảnh báo độ tin cậy thấp, cho nhập thủ công        |
| TC06 | Gửi báo nguy cơ hợp lệ                       | Hazard OPEN xuất hiện ở Sự cố đã gửi               |
| TC07 | Lọc kết hợp trạng thái, mức rủi ro, khu vực  | Danh sách khớp, không khớp thì hiện hướng dẫn      |
| TC08 | Xóa hoặc sửa sự cố của mình                  | Có xác nhận, dữ liệu cập nhật sau khi tải lại      |
| TC09 | Xuất CSV sự cố                               | Tệp chứa đúng các bản ghi đang lọc                 |
| TC10 | Cán bộ an toàn đổi trạng thái sự cố          | Công nhân thấy trạng thái mới                      |
| TC11 | Quản trị viên khóa tài khoản                 | Tài khoản bị khóa không đăng nhập được             |
| TC12 | Chuyển giao diện sáng/tối rồi tải lại        | Lựa chọn được giữ, các trang làm việc đổi màu đúng |
| TC13 | MockAPI không truy cập được                  | Hệ thống dùng dữ liệu cục bộ, không vỡ trang       |
| TC14 | Mở đường dẫn không tồn tại                   | Hiện trang 404 với đường về trang chủ              |

Các dòng trên là checklist kết quả cần đạt khi tái kiểm tra. Video và lịch sử commit là minh chứng cụ thể của từng đợt, không được thay bằng một bảng đánh dấu thành công không có lần chạy tương ứng.

## 6.3 Chạy cục bộ

Không cần máy chủ riêng, chỉ cần trình duyệt hiện đại. Các bước:

1. Tải mã nguồn: `git clone https://github.com/phananhhao15/CSE122_67KTPM1_BTCK_Nhom8.git`.
2. Mở thư mục trong VS Code và cài tiện ích Live Server.
3. Chuột phải index.html, chọn Open with Live Server (cổng mặc định 5501).
4. Ở trang chủ hoặc trang đăng nhập, bấm một trong bốn nút đăng nhập nhanh theo vai trò.

Nên mở bằng Live Server thay vì mở trực tiếp tệp, vì trang cần nạp các tệp JSON và module. Tài khoản mẫu trong assets/data/users.json (ví dụ admin@sitesafe.test, antoan.hoang@sitesafe.test, quan.pm@sitesafe.test) dùng mật khẩu mẫu password123. Mật khẩu này chỉ phục vụ nguyên mẫu công khai, không phải thông tin xác thực production.

## 6.4 Quy trình nhánh và hợp nhất

Mỗi thành viên làm trên nhánh cá nhân (PhanAnhHao_branch, DoanThanhSon_branch, TranHuyHoang_branch), commit thường xuyên và hợp nhất vào main bằng Pull Request hoặc merge sau khi đối chiếu. Khi có thay đổi dùng chung như khung sidebar/topbar hoặc theme, các thành viên lấy main về nhánh của mình trước khi sửa tiếp để tránh xung đột. Việc tải tệp lên qua giao diện web GitHub từng gây xung đột giả do khác biệt kết thúc dòng CRLF/LF; khi hợp nhất cần bỏ qua khác biệt này.

Kho mã: https://github.com/phananhhao15/CSE122_67KTPM1_BTCK_Nhom8. [Nhóm bổ sung địa chỉ GitHub Pages nếu đã bật triển khai; chưa bật thì ghi rõ chỉ chạy bằng Live Server.]

## 6.5 Sử dụng AI và minh chứng cá nhân

Nhóm có sử dụng Claude Code để hỗ trợ đọc và sửa mã, viết tài liệu và đối chiếu dự án với barem. Báo cáo không mô tả toàn bộ mã là do sinh viên tự viết từ đầu. Các đóng góp cá nhân cần được đối chiếu bằng nhánh, commit, nội dung review và khả năng giải thích phần phụ trách.

Tài liệu docs/ai-usage-report.md ghi lại phạm vi hỗ trợ của từng thành viên, dựa trên lịch sử Git; các commit có hỗ trợ AI đều có dòng Co-Authored-By ở cuối nội dung commit. Sinh viên cần phân biệt phần tự phát hiện, tự chỉnh sửa, được AI hỗ trợ và phần đã trực tiếp kiểm chứng. Video OBS và lịch sử công việc là minh chứng riêng, không được suy ra tự động từ việc mã có trong repo.

Theo đề bài, mỗi giao diện đã duyệt tương ứng một video OBS: 21 màn hình cần 21 video, mỗi thành viên quay phần của mình. Không dùng danh sách kế hoạch này để khẳng định mọi video đã hoàn tất hoặc đã được chấm.

# Chương 7 Kết luận và hướng phát triển

## 7.1 Kết quả thực hiện

SiteSafe thể hiện một nguyên mẫu frontend nhiều vai trò có quan hệ dữ liệu xuyên trang. Luồng trọng tâm nối được checklist đầu ca, báo nguy cơ, gợi ý phân loại, xử lý của cán bộ an toàn, hành động khắc phục và bản đồ rủi ro của quản lý. Các vai trò vận hành có chức năng quản lý tương ứng; các trải nghiệm AI cho thấy cách trình bày xử lý, căn cứ và quyền quyết định của người dùng.

Về kỹ thuật, sản phẩm dùng JavaScript thuần để thao tác DOM, xử lý sự kiện, lọc/sắp xếp, validate và lưu dữ liệu. Việc tách module theo vai trò giúp thành viên tìm đúng phần phụ trách, trong khi khung giao diện và dữ liệu dùng chung giữ sự nhất quán toàn hệ thống. Các tài liệu đề xuất, phân công và kiểm kê màn hình hỗ trợ bàn giao và vấn đáp.

## 7.2 Hạn chế hiện tại

Giới hạn lớn nhất là dữ liệu chưa tập trung. localStorage không giải quyết đồng bộ nhiều máy hay chống can thiệp dữ liệu; MockAPI chỉ là dịch vụ giả lập. Phiên và mật khẩu mô phỏng không phù hợp sử dụng thực tế. Quên mật khẩu không gửi email thật và hệ thống chưa có thông báo thời gian thực.

Các tính năng AI dựa trên quy tắc từ khóa, chưa được đánh giá bằng dữ liệu thực; không thể xem độ tin cậy hay điểm khu vực như dự báo chính xác. Kiểm thử chủ yếu thủ công, chưa có bộ kiểm thử tự động và chưa kiểm tra đầy đủ nhiều trình duyệt, thiết bị vật lý hay trình đọc màn hình.

## 7.3 Hướng phát triển

Bước tiếp theo là xây dựng API và cơ sở dữ liệu tập trung, chuyển các ràng buộc quyền và vòng đời sự cố sang phía máy chủ, băm mật khẩu và quản lý phiên đúng chuẩn. Ảnh minh chứng nên được lưu ở dịch vụ lưu trữ tệp thay vì trong trình duyệt.

Sau đó có thể bổ sung gửi email, nhắc việc khắc phục quá hạn, thông báo thời gian thực và ứng dụng di động cho công nhân hiện trường. Các gợi ý AI nên được thay bằng mô hình thật khi có dữ liệu, kèm đo lường và diễn giải giới hạn. Kiểm thử cần mở rộng sang kiểm thử tự động, nhiều trình duyệt, bàn phím và thiết bị vật lý. Những thay đổi này là hướng phát triển, không phải tính năng đã triển khai trong bản báo cáo.

# Tài liệu tham khảo

1. Đề bài BTL-16 SiteSafe và barem đánh giá học phần CSE122 do giảng viên cung cấp (docs/de-bai-btl-16.md).
2. Repository mã nguồn nhóm 8: https://github.com/phananhhao15/CSE122_67KTPM1_BTCK_Nhom8
3. Tài liệu nội bộ: project-proposal.md, roles-and-features.md, team-assignment.md, screen-inventory.md và ai-usage-report.md trong thư mục docs.
4. Bảng công việc Trello: https://trello.com/b/1SE0OZ9d/d%E1%BB%B1-an-sitesafe
5. MDN Web Docs, Using the Web Storage API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
6. MockAPI: https://mockapi.io

# Phụ lục A Danh mục màn hình

Danh sách đối chiếu với bảng kiểm kê màn hình (docs/screen-inventory.md). Các khối lỗi, hộp thoại, loading và empty là trạng thái trong trang, không tách thành trang riêng để tăng số lượng.

| Mã    | Màn hình                   | Tệp HTML                                               | Vai trò        |
| ----- | -------------------------- | ------------------------------------------------------ | -------------- |
| UI-01 | Trang chủ                  | index.html                                             | Khách          |
| UI-02 | Không tìm thấy trang       | 404.html                                               | Khách          |
| UI-03 | Đăng nhập                  | pages/auth/login.html                                  | Dùng chung     |
| UI-04 | Đăng ký tài khoản          | pages/auth/register.html                               | Dùng chung     |
| UI-05 | Khôi phục mật khẩu         | pages/auth/forgot-password.html                        | Dùng chung     |
| UI-06 | Kiểm tra an toàn hằng ngày | pages/worker/worker-safety-checklist.html              | Công nhân      |
| UI-07 | Báo cáo nguy cơ an toàn    | pages/worker/worker-hazard-create.html                 | Công nhân      |
| UI-08 | Sự cố đã gửi               | pages/worker/worker-my-hazards.html                    | Công nhân      |
| UI-09 | Bảng điều khiển an toàn    | pages/safety-officer/safety-dashboard.html             | Cán bộ an toàn |
| UI-10 | Chi tiết sự cố             | pages/safety-officer/safety-hazard-detail.html         | Cán bộ an toàn |
| UI-11 | Quản lý kiểm tra an toàn   | pages/safety-officer/safety-inspection-management.html | Cán bộ an toàn |
| UI-12 | Báo cáo an toàn            | pages/manager/manager-safety-report.html               | Quản lý        |
| UI-13 | Hành động khắc phục        | pages/manager/manager-corrective-actions.html          | Quản lý        |
| UI-14 | Bản đồ rủi ro khu vực      | pages/manager/manager-zone-risk-map.html               | Quản lý        |
| UI-15 | Quản lý người dùng         | pages/admin/admin-user-management.html                 | Quản trị viên  |
| UI-16 | Quản lý khu vực            | pages/admin/admin-zone-management.html                 | Quản trị viên  |
| UI-17 | Quản lý mẫu checklist      | pages/admin/admin-checklist-template-management.html   | Quản trị viên  |
| UI-18 | Huấn luyện an toàn         | pages/training/safety-training.html                    | Dùng chung     |
| UI-19 | Thông báo                  | pages/common/notifications.html                        | Dùng chung     |
| UI-20 | Hồ sơ cá nhân              | pages/common/profile.html                              | Dùng chung     |
| UI-21 | Cài đặt                    | pages/common/settings.html                             | Dùng chung     |

# Phụ lục B Kịch bản trải nghiệm liên vai trò

1. Mở trang chủ, xem giới thiệu; vào Đăng nhập và chọn đăng nhập nhanh vai trò Công nhân.
2. Làm checklist an toàn đầu ca, ghi chú, đính ảnh và gửi phiếu; kiểm tra lịch sử phiếu.
3. Mở Báo cáo nguy cơ, nhập mô tả ngắn để xem cảnh báo độ tin cậy thấp của AI-1, sau đó nhập mô tả đầy đủ, chấp nhận hoặc sửa gợi ý và gửi. Kiểm tra hazard OPEN trong Sự cố đã gửi; thử tìm, lọc, sắp xếp và xuất CSV.
4. Đăng xuất, đăng nhập Cán bộ an toàn trong cùng origin; mở Chi tiết sự cố, chuyển trạng thái sang đang khắc phục rồi đã giải quyết, ghi chú.
5. Đăng nhập Quản lý; xem Báo cáo an toàn, giao hành động khắc phục và dùng AI-3 trên Bản đồ rủi ro khu vực để xem khu vực nhiều nguy cơ.
6. Đăng nhập Quản trị viên; thêm hoặc khóa một tài khoản, chỉnh phân khu và mẫu checklist.
7. Quay lại Công nhân để kiểm tra trạng thái sự cố đã cập nhật; thử chuyển giao diện sáng/tối ở các trang làm việc.

Kịch bản dùng dữ liệu local của cùng origin. Nếu đổi máy hoặc trình duyệt, cần chuẩn bị dữ liệu riêng và không kỳ vọng các thao tác trước tự đồng bộ, trừ phần đã đồng bộ qua MockAPI.

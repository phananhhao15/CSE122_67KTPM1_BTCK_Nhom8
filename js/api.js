/**
 * ==============================================================================
 * SiteSafe API - Tầng Dịch Vụ Dữ Liệu Dùng Chung Toàn Dự Án
 * ==============================================================================
 * 
 * Mô tả:
 * - Đóng vai trò lớp trung gian duy nhất đọc, lưu trữ và xử lý dữ liệu của hệ thống.
 * - Khởi tạo (seed) dữ liệu ban đầu từ các file `assets/data/*.json` vào LocalStorage.
 * - Tích hợp bộ dữ liệu nhúng dự phòng (Embedded Fallback) để chạy tốt ngay cả khi
 *   mở trực tiếp bằng giao thức file:// (bị trình duyệt hạn chế CORS).
 * - Cung cấp cả phương thức Bất đồng bộ (Promise / async-await) để sẵn sàng kết nối
 *   Backend thật, và phương thức Đồng bộ (Sync) để tương thích ngược với toàn bộ
 *   code hiện có của các thành viên.
 * - Hỗ trợ phân nhóm dịch vụ rõ ràng: Auth, Users, Hazards, Checklists, Inspections,
 *   Zones, Actions, Trainings, Notifications, Products, AI Services.
 * 
 * Bản quyền thuộc nhóm phát triển SiteSafe - BTL-16 CSE122.
 */

(function (window) {
  "use strict";

  // ============================================================================
  // 1. CẤU HÌNH & KHÓA LƯU TRỮ
  // ============================================================================
  const STORAGE_KEY = "siteSafeData";
  const SESSION_USER_KEY = "siteSafeUser";
  const NOTIFICATIONS_STORAGE_KEY = "siteSafeNotifications";
  const TRAININGS_STORAGE_KEY = "siteSafeTrainings";
  const LISTINGS_STORAGE_KEY = "siteSafeSafetyListings";
  const CART_STORAGE_KEY = "siteSafeSafetyCart";
  const ORDERS_STORAGE_KEY = "siteSafeSafetyOrders";

  const CONFIG = {
    USE_BACKEND: false, // Chuyển thành true khi có RESTful Backend API thật
    API_BASE_URL: "https://api.sitesafe.vn/v1",
    SIMULATE_LATENCY: 120, // Độ trễ giả lập (ms) mô phỏng mạng thật
  };

  // ============================================================================
  // 2. DỮ LIỆU DỰ PHÒNG MẶC ĐỊNH (EMBEDDED SEED DATA)
  // Khớp 100% với các file trong assets/data/*.json
  // ============================================================================
  const DEFAULT_SEED_DATA = {
    users: [
      {
        id: "USR-001",
        fullName: "Nguyễn Minh Anh",
        email: "admin@sitesafe.test",
        password: "password123",
        role: "ADMIN",
        roleLabel: "Quản trị viên",
        phone: "0901234567",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
        status: "ACTIVE",
        lastLogin: "2026-09-24T08:30:00.000Z",
        createdAt: "2026-01-10T00:00:00.000Z"
      },
      {
        id: "USR-002",
        fullName: "Trần Huy Hoàng",
        email: "antoan.hoang@sitesafe.test",
        password: "password123",
        role: "SAFETY_OFFICER",
        roleLabel: "Cán bộ an toàn",
        phone: "0912345678",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=120&q=80",
        status: "ACTIVE",
        lastLogin: "2026-09-24T08:15:00.000Z",
        createdAt: "2026-01-12T00:00:00.000Z"
      },
      {
        id: "USR-003",
        fullName: "Phạm Minh Quân",
        email: "quan.pm@sitesafe.test",
        password: "password123",
        role: "SITE_MANAGER",
        roleLabel: "Quản lý công trường",
        phone: "0923456789",
        avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=120&q=80",
        status: "ACTIVE",
        lastLogin: "2026-09-23T17:40:00.000Z",
        createdAt: "2026-01-15T00:00:00.000Z"
      },
      {
        id: "USR-004",
        fullName: "Trần Quốc Huy",
        email: "huy.tq@sitesafe.test",
        password: "password123",
        role: "WORKER",
        roleLabel: "Công nhân hiện trường",
        phone: "0934567890",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
        status: "ACTIVE",
        lastLogin: "2026-09-24T07:55:00.000Z",
        createdAt: "2026-02-01T00:00:00.000Z"
      },
      {
        id: "USR-005",
        fullName: "Phan Anh Hào",
        email: "hao.pa@sitesafe.test",
        password: "password123",
        role: "WORKER",
        roleLabel: "Công nhân hiện trường",
        phone: "0945678901",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
        status: "ACTIVE",
        lastLogin: "2026-09-24T08:00:00.000Z",
        createdAt: "2026-02-05T00:00:00.000Z"
      },
      {
        id: "USR-006",
        fullName: "Đoàn Thanh Sơn",
        email: "son.dt@sitesafe.test",
        password: "password123",
        role: "SITE_MANAGER",
        roleLabel: "Quản lý công trường",
        phone: "0956789012",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80",
        status: "ACTIVE",
        lastLogin: "2026-09-23T16:30:00.000Z",
        createdAt: "2026-02-10T00:00:00.000Z"
      },
      {
        id: "USR-007",
        fullName: "Võ Thành Long",
        email: "long.vt@sitesafe.test",
        password: "password123",
        role: "SAFETY_OFFICER",
        roleLabel: "Cán bộ an toàn",
        phone: "0967890123",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80",
        status: "ACTIVE",
        lastLogin: "2026-09-24T07:30:00.000Z",
        createdAt: "2026-02-15T00:00:00.000Z"
      },
      {
        id: "USR-008",
        fullName: "Bùi Văn Dũng",
        email: "dung.bv@sitesafe.test",
        password: "password123",
        role: "WORKER",
        roleLabel: "Công nhân hiện trường",
        phone: "0978901234",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80",
        status: "ACTIVE",
        lastLogin: "2026-09-23T07:45:00.000Z",
        createdAt: "2026-02-20T00:00:00.000Z"
      }
    ],

    zones: [
      {
        id: "ZONE-001",
        code: "LM-A",
        aliases: ["LM-STR"],
        name: "Tòa A - Khối tháp 25 tầng",
        description: "Kết cấu cao tầng, giàn giáo bao che và lắp đặt cốp pha.",
        riskLevel: "CRITICAL",
        supervisor: "Võ Thành Long",
        supervisorPhone: "0967890123",
        hazardsCount: 12,
        status: "ACTIVE",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=80",
        coordinates: { x: 35, y: 25 },
        createdAt: "2026-01-10T00:00:00.000Z"
      },
      {
        id: "ZONE-002",
        code: "LM-B",
        aliases: ["LM-MAT"],
        name: "Kho vật tư và nhiên liệu",
        description: "Lưu trữ máy móc, thiết bị nâng, bồn dầu tạm và hóa chất xây dựng.",
        riskLevel: "MEDIUM",
        supervisor: "Phan Anh Hào",
        supervisorPhone: "0945678901",
        hazardsCount: 5,
        status: "ACTIVE",
        image: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=400&q=80",
        coordinates: { x: 65, y: 70 },
        createdAt: "2026-01-10T00:00:00.000Z"
      },
      {
        id: "ZONE-003",
        code: "LM-C",
        aliases: [],
        name: "Khu điều hành và hạ tầng",
        description: "Văn phòng ban chỉ huy, phòng y tế công trường và cổng kiểm soát an ninh.",
        riskLevel: "LOW",
        supervisor: "Đoàn Thanh Sơn",
        supervisorPhone: "0956789012",
        hazardsCount: 1,
        status: "ACTIVE",
        image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=400&q=80",
        coordinates: { x: 15, y: 80 },
        createdAt: "2026-01-10T00:00:00.000Z"
      },
      {
        id: "ZONE-004",
        code: "BR-E",
        aliases: ["BR-PILE"],
        name: "Mố cầu phía Đông",
        description: "Thi công cọc khoan nhồi, hố móng sâu và đúc dầm cầu dẫn.",
        riskLevel: "HIGH",
        supervisor: "Trần Huy Hoàng",
        supervisorPhone: "0912345678",
        hazardsCount: 8,
        status: "ACTIVE",
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=400&q=80",
        coordinates: { x: 80, y: 30 },
        createdAt: "2026-01-10T00:00:00.000Z"
      },
      {
        id: "ZONE-005",
        code: "LM-D",
        aliases: [],
        name: "Khu tập kết phế liệu",
        description: "Khu vực tạm dừng thi công, phân loại xà bần và thu gom sắt vụn.",
        riskLevel: "MEDIUM",
        supervisor: "Bùi Văn Dũng",
        supervisorPhone: "0978901234",
        hazardsCount: 2,
        status: "INACTIVE",
        image: "https://images.unsplash.com/photo-1590644365607-1c5a0c4a3f25?auto=format&fit=crop&w=400&q=80",
        coordinates: { x: 50, y: 90 },
        createdAt: "2026-01-10T00:00:00.000Z"
      },
      {
        id: "ZONE-006",
        code: "MEP-01",
        aliases: [],
        name: "Khu cơ điện và trạm biến áp tạm",
        description: "Hệ thống tủ điện tổng công trường, máy phát điện dự phòng và cáp ngầm.",
        riskLevel: "HIGH",
        supervisor: "Trần Huy Hoàng",
        supervisorPhone: "0912345678",
        hazardsCount: 4,
        status: "ACTIVE",
        image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=400&q=80",
        coordinates: { x: 45, y: 50 },
        createdAt: "2026-01-12T00:00:00.000Z"
      }
    ],

    hazards: [
      {
        id: "HZ-001",
        title: "Miệng cọc khoan nhồi thiếu rào chắn",
        description: "Khu vực quanh miệng cọc đang thi công chưa có đủ biển cảnh báo và rào chắn liên tục cho người đi lại.",
        zoneId: "ZONE-004",
        zoneCode: "BR-E",
        zoneName: "Mố cầu phía Đông",
        category: "Hố đào & Cọc nhồi",
        riskLevel: "CRITICAL",
        status: "OPEN",
        statusLabel: "Chưa xử lý",
        reporter: "Trần Quốc Huy",
        reportedBy: "huy.tq@sitesafe.test",
        reportedAt: "2026-09-20T09:15:00.000Z",
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1400&q=85",
        aiSuggestedCategory: "Hố sâu & Rơi ngã",
        aiSuggestedRisk: "CRITICAL",
        aiConfidence: 0.94,
        correctiveActionId: "ACT-001"
      },
      {
        id: "HZ-002",
        title: "Lan can sàn tầng 12 thiếu tấm chắn chân",
        description: "Một đoạn lan can tại tầng 12 chưa có đủ tay vịn và tấm chắn chân, có nguy cơ người hoặc vật rơi xuống.",
        zoneId: "ZONE-001",
        zoneCode: "LM-A",
        zoneName: "Khu kết cấu và giàn giáo",
        category: "Làm việc trên cao",
        riskLevel: "HIGH",
        status: "IN_PROGRESS",
        statusLabel: "Đang xử lý",
        reporter: "Trần Quốc Huy",
        reportedBy: "huy.tq@sitesafe.test",
        reportedAt: "2026-09-18T14:30:00.000Z",
        image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1400&q=85",
        aiSuggestedCategory: "Làm việc trên cao",
        aiSuggestedRisk: "HIGH",
        aiConfidence: 0.91,
        correctiveActionId: "ACT-002"
      },
      {
        id: "HZ-003",
        title: "Dây điện tạm đặt gần khu vực ẩm ướt",
        description: "Dây điện chưa được treo cao và có nguy cơ tiếp xúc với nước tại lối đi của khu cơ điện.",
        zoneId: "ZONE-006",
        zoneCode: "MEP-01",
        zoneName: "Khu cơ điện",
        category: "An toàn điện",
        riskLevel: "HIGH",
        status: "OPEN",
        statusLabel: "Chưa xử lý",
        reporter: "Bùi Văn Dũng",
        reportedBy: "dung.bv@sitesafe.test",
        reportedAt: "2026-09-20T10:00:00.000Z",
        image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1400&q=85",
        aiSuggestedCategory: "An toàn điện",
        aiSuggestedRisk: "HIGH",
        aiConfidence: 0.88,
        correctiveActionId: "ACT-003"
      },
      {
        id: "HZ-004",
        title: "Dầu thủy lực rò rỉ gần lối đi",
        description: "Vệt dầu nhỏ cạnh máy nâng có thể gây trượt ngã và cần được vệ sinh, đặt biển cảnh báo ngay.",
        zoneId: "ZONE-002",
        zoneCode: "LM-B",
        zoneName: "Kho vật tư và thiết bị nâng",
        category: "Cháy nổ & Hóa chất",
        riskLevel: "MEDIUM",
        status: "IN_PROGRESS",
        statusLabel: "Đang xử lý",
        reporter: "Phan Anh Hào",
        reportedBy: "hao.pa@sitesafe.test",
        reportedAt: "2026-09-19T16:20:00.000Z",
        image: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=1400&q=85",
        aiSuggestedCategory: "Trượt ngã & Môi trường",
        aiSuggestedRisk: "MEDIUM",
        aiConfidence: 0.85,
        correctiveActionId: "ACT-004"
      },
      {
        id: "HZ-005",
        title: "Vật liệu xây dựng chắn lối đi bộ",
        description: "Vật liệu đã được sắp xếp lại và lối đi bộ được kẻ vạch rõ ràng.",
        zoneId: "ZONE-002",
        zoneCode: "LM-B",
        zoneName: "Kho vật tư",
        category: "Mặt bằng thi công",
        riskLevel: "LOW",
        status: "RESOLVED",
        statusLabel: "Đã giải quyết",
        reporter: "Trần Quốc Huy",
        reportedBy: "huy.tq@sitesafe.test",
        reportedAt: "2026-09-15T08:00:00.000Z",
        image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=1000&q=80",
        aiSuggestedCategory: "Trật tự hiện trường",
        aiSuggestedRisk: "LOW",
        aiConfidence: 0.95,
        correctiveActionId: "ACT-005"
      }
    ],

    checklists: [
      {
        id: "CL-001",
        question: "Dây cứu sinh được neo chắc chắn vào điểm cố định",
        note: "Kiểm tra móc khóa an toàn và dây treo trước khi leo cao",
        workType: "Làm việc trên cao",
        isRequired: true,
        status: "ACTIVE"
      },
      {
        id: "CL-002",
        question: "Sàn thao tác có rào chắn và tấm chắn chân",
        note: "Không có khoảng trống nguy hiểm, tay vịn chịu tải tốt",
        workType: "Làm việc trên cao",
        isRequired: true,
        status: "ACTIVE"
      },
      {
        id: "CL-003",
        question: "Tủ điện có aptomat chống giật và được đóng kín",
        note: "Kiểm tra trước khi cấp nguồn và nối đất vỏ kim loại",
        workType: "Điện thi công",
        isRequired: true,
        status: "ACTIVE"
      },
      {
        id: "CL-004",
        question: "Dây nguồn không hở vỏ và được cố định gọn gàng",
        note: "Không để dây nằm trên lối đi hoặc khu vực đọng nước",
        workType: "Điện thi công",
        isRequired: true,
        status: "ACTIVE"
      },
      {
        id: "CL-005",
        question: "Khu vực bên dưới tải nâng đã được rào chắn",
        note: "Có tín hiệu viên hướng dẫn khi nâng hạ cẩu tháp",
        workType: "Nâng hạ vật liệu",
        isRequired: false,
        status: "DRAFT"
      },
      {
        id: "CL-006",
        question: "Công nhân trang bị đầy đủ bảo hộ cá nhân (mũ, giày, áo phản quang)",
        note: "Bắt buộc 100% nhân sự vào công trường",
        workType: "An toàn chung",
        isRequired: true,
        status: "ACTIVE"
      },
      {
        id: "CL-007",
        question: "Miệng hố đào sâu trên 1.5m có rào chắn liên tục và đèn cảnh báo ban đêm",
        note: "Bố trí thang lên xuống an toàn",
        workType: "Đào đất & Hố móng",
        isRequired: true,
        status: "ACTIVE"
      }
    ],

    checklistResults: [
      {
        id: "CHK-001",
        checkDate: "2026-09-24",
        workZone: "LM-STR",
        zoneName: "Khu kết cấu và giàn giáo",
        submittedBy: "huy.tq@sitesafe.test",
        submittedByName: "Trần Quốc Huy",
        submittedAt: "2026-09-24T06:45:00.000Z",
        status: "PASSED",
        items: [
          { id: "item-1", result: "pass" },
          { id: "item-2", result: "pass" },
          { id: "item-3", result: "pass" },
          { id: "item-4", result: "pass" },
          { id: "item-5", result: "pass" }
        ]
      }
    ],

    inspections: [
      {
        id: "IN-001",
        title: "Kiểm tra an toàn giàn giáo",
        zoneId: "ZONE-001",
        zoneCode: "LM-A",
        zone: "Khu kết cấu và giàn giáo",
        owner: "Bùi Văn Dũng",
        date: "2026-09-24",
        status: "scheduled",
        statusLabel: "Đã lên lịch",
        searchTags: "kiểm tra an toàn giàn giáo khu kết cấu",
        checklistCount: 12,
        issuesFound: 0,
        createdAt: "2026-09-20T08:00:00.000Z"
      },
      {
        id: "IN-002",
        title: "Kiểm tra thiết bị nâng",
        zoneId: "ZONE-002",
        zoneCode: "LM-B",
        zone: "Kho vật tư và thiết bị nâng",
        owner: "Trần Huy Hoàng",
        date: "2026-09-22",
        status: "in-progress",
        statusLabel: "Đang thực hiện",
        searchTags: "kiểm tra thiết bị nâng kho vật tư",
        checklistCount: 8,
        issuesFound: 1,
        createdAt: "2026-09-21T08:00:00.000Z"
      },
      {
        id: "IN-003",
        title: "Kiểm tra an toàn điện",
        zoneId: "ZONE-006",
        zoneCode: "MEP-01",
        zone: "Khu cơ điện",
        owner: "Trần Huy Hoàng",
        date: "2026-09-20",
        status: "completed",
        statusLabel: "Đã hoàn thành",
        searchTags: "kiểm tra an toàn điện khu cơ điện",
        checklistCount: 15,
        issuesFound: 1,
        createdAt: "2026-09-19T08:00:00.000Z"
      },
      {
        id: "IN-004",
        title: "Kiểm tra phòng cháy chữa cháy",
        zoneId: "ZONE-002",
        zoneCode: "LM-B",
        zone: "Kho vật tư",
        owner: "Võ Thành Long",
        date: "2026-09-26",
        status: "scheduled",
        statusLabel: "Đã lên lịch",
        searchTags: "kiểm tra phòng cháy chữa cháy kho vật tư",
        checklistCount: 10,
        issuesFound: 0,
        createdAt: "2026-09-22T08:00:00.000Z"
      },
      {
        id: "IN-005",
        title: "Kiểm tra khu vực cọc",
        zoneId: "ZONE-004",
        zoneCode: "BR-E",
        zone: "Mố cầu phía Đông",
        owner: "Trần Huy Hoàng",
        date: "2026-09-18",
        status: "completed",
        statusLabel: "Đã hoàn thành",
        searchTags: "kiểm tra khu vực cọc mố cầu phía đông",
        checklistCount: 14,
        issuesFound: 2,
        createdAt: "2026-09-17T08:00:00.000Z"
      }
    ],

    correctiveActions: [
      {
        id: "ACT-001",
        hazardId: "HZ-001",
        title: "Dựng rào chắn quanh miệng cọc",
        zone: "Mố cầu phía Đông",
        zoneCode: "BR-E",
        assignee: "Võ Thành Long",
        dueDate: "2026-09-21",
        progress: 100,
        status: "COMPLETED",
        priority: "CRITICAL",
        note: "Đã dựng rào thép tiêu chuẩn cao 1.2m và gắn đèn xoay cảnh báo.",
        createdAt: "2026-09-20T10:00:00.000Z"
      },
      {
        id: "ACT-002",
        hazardId: "HZ-002",
        title: "Lắp bổ sung lan can và tấm chắn chân",
        zone: "Khu kết cấu và giàn giáo",
        zoneCode: "LM-A",
        assignee: "Phan Quốc Huy",
        dueDate: "2026-09-25",
        progress: 65,
        status: "IN_PROGRESS",
        priority: "HIGH",
        note: "Đang lắp tấm chắn chân tại trục 4-6, dự kiến hoàn tất trong ngày.",
        createdAt: "2026-09-18T16:00:00.000Z"
      },
      {
        id: "ACT-003",
        hazardId: "HZ-003",
        title: "Treo cao và bọc bảo vệ dây điện tạm",
        zone: "Khu cơ điện",
        zoneCode: "MEP-01",
        assignee: "Trần Huy Hoàng",
        dueDate: "2026-09-22",
        progress: 35,
        status: "IN_PROGRESS",
        priority: "HIGH",
        note: "Đã có giá đỡ chữ A, chờ tổ điện kéo lại tuyến cáp.",
        createdAt: "2026-09-20T11:00:00.000Z"
      },
      {
        id: "ACT-004",
        hazardId: "HZ-004",
        title: "Vệ sinh dầu tràn và đặt biển cảnh báo",
        zone: "Kho vật tư",
        zoneCode: "LM-B",
        assignee: "Nguyễn Minh Khoa",
        dueDate: "2026-09-24",
        progress: 80,
        status: "IN_PROGRESS",
        priority: "MEDIUM",
        note: "Đã rải cát thấm dầu, còn kiểm tra phớt thủy lực xe nâng.",
        createdAt: "2026-09-19T17:00:00.000Z"
      },
      {
        id: "ACT-005",
        hazardId: "HZ-005",
        title: "Bổ sung kính bảo hộ tại khu cắt vật liệu",
        zone: "Khu gia công",
        zoneCode: "LM-B",
        assignee: "Trần Huy Hoàng",
        dueDate: "2026-09-18",
        progress: 100,
        status: "COMPLETED",
        priority: "LOW",
        note: "Đã cấp phát 10 kính bảo hộ chống bụi và mạt kim loại cho thợ cắt.",
        createdAt: "2026-09-15T09:00:00.000Z"
      }
    ],

    trainings: [
      {
        id: "TR-001",
        title: "An toàn lao động trên cao",
        description: "Quy chuẩn đeo dây an toàn 2 móc, kiểm tra sàn công tác giàn giáo và lắp đặt lưới chống rơi ngã.",
        duration: "45 phút",
        level: "Bắt buộc",
        image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=600&q=80",
        status: "COMPLETED",
        progress: 100,
        category: "Trên cao",
        instructor: "Trần Huy Hoàng",
        validUntil: "2027-09-20"
      },
      {
        id: "TR-002",
        title: "PCCC & Ứng phó sự cố khẩn cấp",
        description: "Hướng dẫn sử dụng bình bột/CO2, vận hành lăng vòi chữa cháy và quy trình sơ tán hiện trường khi có báo động.",
        duration: "60 phút",
        level: "Bắt buộc",
        image: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=600&q=80",
        status: "IN_PROGRESS",
        progress: 60,
        category: "PCCC",
        instructor: "Võ Thành Long",
        validUntil: "2027-10-01"
      },
      {
        id: "TR-003",
        title: "An toàn điện công trường",
        description: "Quy định nối đất vỏ thiết bị, sử dụng tủ điện tạm chuẩn IP54 và kiểm tra định kỳ dụng cụ điện cầm tay.",
        duration: "30 phút",
        level: "Khuyến nghị",
        image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80",
        status: "NOT_STARTED",
        progress: 0,
        category: "Điện",
        instructor: "Trần Huy Hoàng",
        validUntil: "2027-11-15"
      },
      {
        id: "TR-004",
        title: "Quy trình làm việc trong hố sâu & không gian kín",
        description: "Đo nồng độ khí độc/oxy, cấp khí tươi nhân tạo và phương án cứu hộ khẩn cấp bằng tời cứu sinh.",
        duration: "50 phút",
        level: "Bắt buộc",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80",
        status: "NOT_STARTED",
        progress: 0,
        category: "Hố móng",
        instructor: "Võ Thành Long",
        validUntil: "2027-12-01"
      }
    ],

    products: [
      {
        id: "PPE-001",
        name: "Mũ bảo hộ ABS có núm vặn",
        category: "Bảo hộ cá nhân",
        price: 185000,
        stock: 24,
        seller: "Bảo hộ Thành Công",
        art: "ppe",
        description: "Chất liệu ABS chịu lực cao, lót xốp giảm chấn, núm vặn tăng đơ chỉnh vòng đầu tiện lợi."
      },
      {
        id: "PPE-002",
        name: "Áo phản quang lưới 2 túi",
        category: "Bảo hộ cá nhân",
        price: 95000,
        stock: 42,
        seller: "Đồ bảo hộ Minh Phát",
        art: "ppe",
        description: "Vải lưới thoáng khí, dải phản quang xám 5cm phát sáng mạnh trong đêm, có túi đựng bộ đàm."
      },
      {
        id: "HGT-001",
        name: "Dây đai an toàn toàn thân 2 móc",
        category: "Làm việc trên cao",
        price: 890000,
        stock: 8,
        seller: "Thiết bị công nghiệp An Tâm",
        art: "height",
        description: "Đai toàn thân kết hợp bộ giảm xóc, 2 móc thép lớn mạ kẽm chịu tải 22kN tiêu chuẩn CE."
      },
      {
        id: "WRN-001",
        name: "Cọc tiêu giao thông phản quang",
        category: "Cảnh báo công trường",
        price: 125000,
        stock: 30,
        seller: "Bảo hộ Thành Công",
        art: "warning",
        description: "Nhựa PVC dẻo chịu va đập không vỡ, đế cao su chống đổ, màng phản quang cao cấp."
      },
      {
        id: "WRN-002",
        name: "Biển báo công trường đang thi công",
        category: "Cảnh báo công trường",
        price: 240000,
        stock: 15,
        seller: "Vật tư xây dựng Hưng Thịnh",
        art: "warning",
        description: "Tôn tráng kẽm sơn tĩnh điện, dán decal phản quang 3M, khung thép hộp chữ A vững chắc."
      },
      {
        id: "AID-001",
        name: "Tủ sơ cứu công trường 30 người",
        category: "Sơ cứu",
        price: 760000,
        stock: 6,
        seller: "Y tế công nghiệp An Tâm",
        art: "first-aid",
        description: "Đầy đủ danh mục vật tư y tế theo Thông tư 19/2016/TT-BYT, vỏ nhôm kính khóa an toàn."
      }
    ],

    notifications: [
      {
        id: "NT-001",
        title: "Có sự cố mới cần xem xét",
        detail: "Lan can sàn tầng 12 đang chờ xử lý.",
        type: "HAZARD_NEW",
        targetUrl: "pages/safety-officer/safety-hazard-detail.html?hazard=HZ-002",
        read: false,
        createdAt: "2026-09-24T08:00:00.000Z"
      },
      {
        id: "NT-002",
        title: "Checklist ca sáng đã được nộp",
        detail: "Checklist an toàn ca sáng tại Tòa A đã hoàn thành.",
        type: "CHECKLIST_SUBMIT",
        targetUrl: "pages/worker/worker-safety-checklist.html",
        read: false,
        createdAt: "2026-09-24T07:00:00.000Z"
      },
      {
        id: "NT-003",
        title: "Hành động khắc phục sắp đến hạn",
        detail: "Treo cao dây điện tạm tại Khu cơ điện cần cập nhật tiến độ trước 25/09/2026.",
        type: "ACTION_DUE",
        targetUrl: "pages/manager/manager-corrective-actions.html",
        read: true,
        createdAt: "2026-09-23T14:30:00.000Z"
      }
    ],

    orders: []
  };

  // ============================================================================
  // 3. STORAGE ENGINE & DATA SEEDING
  // ============================================================================

  /**
   * Tính đường dẫn gốc đến thư mục assets/data dựa trên vị trí trang hiện tại.
   */
  function getProjectRootPrefix() {
    if (typeof window === "undefined" || !window.location) return "";
    const pathParts = window.location.pathname.split("/").filter(Boolean);
    const pagesIndex = pathParts.lastIndexOf("pages");
    if (pagesIndex < 0) return "";
    const depthInsidePages = pathParts.length - pagesIndex - 2;
    return "../".repeat(depthInsidePages + 1);
  }

  /**
   * Đọc dữ liệu từ LocalStorage. Tự động seed từ fallback nếu trống.
   */
  function getStoredData() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        // Lần đầu chạy: khởi tạo bộ dữ liệu mặc định
        const initial = JSON.parse(JSON.stringify(DEFAULT_SEED_DATA));
        saveStoredData(initial);
        syncLegacyKeys(initial);
        return initial;
      }

      const data = JSON.parse(raw);
      // Đảm bảo không bị thiếu các mảng cơ bản
      let needsSave = false;
      Object.keys(DEFAULT_SEED_DATA).forEach((key) => {
        if (!data[key] || !Array.isArray(data[key])) {
          data[key] = Array.isArray(DEFAULT_SEED_DATA[key])
            ? JSON.parse(JSON.stringify(DEFAULT_SEED_DATA[key]))
            : [];
          needsSave = true;
        }
      });

      if (needsSave) {
        saveStoredData(data);
      }
      return data;
    } catch (e) {
      console.warn("[SiteSafeApi] Lỗi phân tích LocalStorage, khôi phục dữ liệu mặc định:", e);
      const fallback = JSON.parse(JSON.stringify(DEFAULT_SEED_DATA));
      saveStoredData(fallback);
      return fallback;
    }
  }

  /**
   * Lưu dữ liệu vào LocalStorage và đồng bộ các key cục bộ.
   */
  function saveStoredData(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      syncLegacyKeys(data);
    } catch (e) {
      console.error("[SiteSafeApi] Không thể lưu LocalStorage:", e);
    }
  }

  /**
   * Đồng bộ dữ liệu sang các key lẻ mà một số module cũ đang đọc
   * (siteSafeTrainings, siteSafeNotifications,...) nhằm tương thích tối đa.
   */
  function syncLegacyKeys(data) {
    try {
      if (data.trainings) {
        localStorage.setItem(TRAININGS_STORAGE_KEY, JSON.stringify(data.trainings));
      }
      if (data.notifications) {
        localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(data.notifications));
      }
    } catch (e) {
      // bỏ qua lỗi storage quota
    }
  }

  /**
   * Giả lập thời gian phản hồi mạng (mô phỏng gọi API thật).
   */
  function simulateDelay(ms) {
    const delay = typeof ms === "number" ? ms : CONFIG.SIMULATE_LATENCY;
    return new Promise((resolve) => setTimeout(resolve, delay));
  }

  /**
   * Tạo cấu trúc phản hồi chuẩn RESTful.
   */
  function createResponse(success, data, message, error) {
    return {
      success: Boolean(success),
      data: data !== undefined ? data : null,
      message: message || (success ? "Thành công" : "Có lỗi xảy ra"),
      error: error || null,
      timestamp: new Date().toISOString()
    };
  }

  // ============================================================================
  // 4. CÁC MODULE DỊCH VỤ NGHIỆP VỤ (NAMESPACES)
  // ============================================================================

  // ----------------------------------------------------------------------------
  // 4.1. AUTH SERVICE (Xác thực & Phiên làm việc)
  // ----------------------------------------------------------------------------
  const auth = {
    /**
     * Lấy thông tin người dùng đang đăng nhập trong phiên.
     */
    getCurrentUser() {
      try {
        const raw = localStorage.getItem(SESSION_USER_KEY);
        return raw ? JSON.parse(raw) : null;
      } catch (e) {
        localStorage.removeItem(SESSION_USER_KEY);
        return null;
      }
    },

    /**
     * Đăng nhập hệ thống (Đồng bộ).
     */
    loginSync(email, password, role) {
      const data = getStoredData();
      const cleanEmail = String(email || "").trim().toLowerCase();
      const user = data.users.find((u) => u.email.toLowerCase() === cleanEmail);

      if (!user) {
        // Nếu chưa có trong danh sách nhưng hợp lệ format, tạo session demo phù hợp role
        const demoUser = {
          id: `USR-${Date.now()}`,
          fullName: cleanEmail.split("@")[0] || "Người dùng SiteSafe",
          email: cleanEmail,
          role: role || "WORKER",
          roleLabel: role === "ADMIN" ? "Quản trị viên" : role === "SAFETY_OFFICER" ? "Cán bộ an toàn" : role === "SITE_MANAGER" ? "Quản lý công trường" : "Công nhân hiện trường",
          status: "ACTIVE"
        };
        localStorage.setItem(SESSION_USER_KEY, JSON.stringify(demoUser));
        return demoUser;
      }

      if (user.status === "INACTIVE") {
        throw new Error("Tài khoản của bạn hiện đang bị khóa. Vui lòng liên hệ Quản trị viên.");
      }

      // Cập nhật thời điểm đăng nhập gần nhất
      user.lastLogin = new Date().toISOString();
      if (role && user.role !== role) {
        user.role = role; // Hỗ trợ chuyển vai trò trên màn hình đăng nhập nếu được chọn
      }
      saveStoredData(data);

      const sessionUser = {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        roleLabel: user.roleLabel,
        phone: user.phone || "",
        avatar: user.avatar || ""
      };
      localStorage.setItem(SESSION_USER_KEY, JSON.stringify(sessionUser));
      return sessionUser;
    },

    /**
     * Đăng nhập hệ thống (Bất đồng bộ - Async).
     */
    async login(email, password, role) {
      await simulateDelay();
      try {
        const user = auth.loginSync(email, password, role);
        return createResponse(true, user, "Đăng nhập thành công.");
      } catch (err) {
        return createResponse(false, null, err.message, err.message);
      }
    },

    /**
     * Đăng xuất hệ thống.
     */
    logout() {
      localStorage.removeItem(SESSION_USER_KEY);
      return createResponse(true, null, "Đã đăng xuất.");
    },

    /**
     * Đăng ký tài khoản mới (Async).
     */
    async register(userData) {
      await simulateDelay();
      try {
        const data = getStoredData();
        const cleanEmail = String(userData.email || "").trim().toLowerCase();

        if (!cleanEmail || !cleanEmail.includes("@")) {
          throw new Error("Địa chỉ email không hợp lệ.");
        }

        const exists = data.users.some((u) => u.email.toLowerCase() === cleanEmail);
        if (exists) {
          throw new Error("Email này đã được sử dụng trong hệ thống.");
        }

        const newUser = {
          id: userData.id || `USR-${Date.now().toString().slice(-6)}`,
          fullName: userData.fullName || cleanEmail.split("@")[0],
          email: cleanEmail,
          password: userData.password || "password123",
          role: userData.role || "WORKER",
          roleLabel: userData.roleLabel || "Công nhân hiện trường",
          phone: userData.phone || "",
          avatar: userData.avatar || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
          status: "ACTIVE",
          createdAt: new Date().toISOString()
        };

        data.users.push(newUser);
        saveStoredData(data);
        return createResponse(true, newUser, "Đăng ký tài khoản thành công.");
      } catch (err) {
        return createResponse(false, null, err.message, err.message);
      }
    },

    /**
     * Cập nhật thông tin hồ sơ cá nhân.
     */
    updateProfile(profileData) {
      const data = getStoredData();
      const current = auth.getCurrentUser();
      if (!current) throw new Error("Chưa đăng nhập.");

      const index = data.users.findIndex((u) => u.id === current.id || u.email === current.email);
      const updated = {
        ...current,
        ...profileData,
        id: current.id,
        role: current.role
      };

      if (index >= 0) {
        data.users[index] = { ...data.users[index], ...profileData };
        saveStoredData(data);
      }

      localStorage.setItem(SESSION_USER_KEY, JSON.stringify(updated));
      return updated;
    }
  };

  // ----------------------------------------------------------------------------
  // 4.2. USERS SERVICE (Quản lý người dùng - Admin)
  // ----------------------------------------------------------------------------
  const users = {
    getAllSync(filter = {}) {
      const data = getStoredData();
      let list = [...data.users];

      if (filter.role && filter.role !== "ALL") {
        list = list.filter((u) => u.role === filter.role);
      }
      if (filter.status && filter.status !== "ALL") {
        list = list.filter((u) => u.status === filter.status);
      }
      if (filter.search) {
        const q = filter.search.toLowerCase();
        list = list.filter(
          (u) =>
            u.fullName.toLowerCase().includes(q) ||
            u.email.toLowerCase().includes(q) ||
            u.id.toLowerCase().includes(q)
        );
      }
      return list;
    },

    async getAll(filter) {
      await simulateDelay();
      return createResponse(true, users.getAllSync(filter));
    },

    getById(id) {
      const data = getStoredData();
      return data.users.find((u) => u.id === id || u.email.toLowerCase() === String(id).toLowerCase()) || null;
    },

    saveSync(user) {
      const data = getStoredData();
      const cleanEmail = String(user.email || "").trim().toLowerCase();
      const idToSave = user.id || `USR-${Date.now().toString().slice(-4)}`;

      const existingIndex = data.users.findIndex(
        (u) => u.id === idToSave || (u.email && u.email.toLowerCase() === cleanEmail)
      );

      const userToSave = {
        id: idToSave,
        fullName: user.fullName || "Người dùng SiteSafe",
        email: cleanEmail,
        password: user.password || "password123",
        role: user.role || "WORKER",
        roleLabel:
          user.role === "ADMIN"
            ? "Quản trị viên"
            : user.role === "SAFETY_OFFICER"
            ? "Cán bộ an toàn"
            : user.role === "SITE_MANAGER"
            ? "Quản lý công trường"
            : "Công nhân hiện trường",
        phone: user.phone || "",
        avatar: user.avatar || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
        status: user.status || "ACTIVE",
        createdAt: user.createdAt || new Date().toISOString()
      };

      if (existingIndex >= 0) {
        data.users[existingIndex] = { ...data.users[existingIndex], ...userToSave };
      } else {
        data.users.push(userToSave);
      }

      saveStoredData(data);
      return userToSave;
    },

    async save(user) {
      await simulateDelay();
      try {
        const saved = users.saveSync(user);
        return createResponse(true, saved, "Đã lưu tài khoản người dùng.");
      } catch (e) {
        return createResponse(false, null, e.message, e.message);
      }
    },

    deleteSync(id) {
      const data = getStoredData();
      data.users = data.users.filter((u) => u.id !== id && u.email !== id);
      saveStoredData(data);
      return true;
    },

    async delete(id) {
      await simulateDelay();
      users.deleteSync(id);
      return createResponse(true, { id }, "Đã xóa tài khoản.");
    },

    toggleStatus(id) {
      const data = getStoredData();
      const user = data.users.find((u) => u.id === id);
      if (user) {
        user.status = user.status === "INACTIVE" ? "ACTIVE" : "INACTIVE";
        saveStoredData(data);
        return user;
      }
      return null;
    }
  };

  // ----------------------------------------------------------------------------
  // 4.3. HAZARDS SERVICE (Quản lý Nguy cơ & Sự cố an toàn)
  // ----------------------------------------------------------------------------
  const hazards = {
    getAllSync(filters = {}) {
      const data = getStoredData();
      let list = [...data.hazards];

      if (filters.status && filters.status !== "ALL") {
        list = list.filter((h) => h.status === filters.status);
      }
      if (filters.riskLevel && filters.riskLevel !== "ALL") {
        list = list.filter((h) => h.riskLevel === filters.riskLevel);
      }
      if (filters.zoneId) {
        list = list.filter((h) => h.zoneId === filters.zoneId || h.zoneCode === filters.zoneId);
      }
      if (filters.reportedBy) {
        list = list.filter((h) => h.reportedBy === filters.reportedBy || h.reporter === filters.reportedBy);
      }
      if (filters.search) {
        const q = filters.search.toLowerCase();
        list = list.filter(
          (h) =>
            h.title.toLowerCase().includes(q) ||
            h.description.toLowerCase().includes(q) ||
            h.id.toLowerCase().includes(q)
        );
      }
      return list;
    },

    async getAll(filters) {
      await simulateDelay();
      return createResponse(true, hazards.getAllSync(filters));
    },

    getById(id) {
      const data = getStoredData();
      return data.hazards.find((h) => h.id === id) || null;
    },

    saveSync(hazard) {
      const data = getStoredData();
      const hazardToSave = {
        ...hazard,
        id: hazard.id || `HZ-${Date.now().toString().slice(-4)}`,
        status: hazard.status || "OPEN",
        riskLevel: hazard.riskLevel || "MEDIUM",
        reportedAt: hazard.reportedAt || new Date().toISOString()
      };

      const existingIndex = data.hazards.findIndex((item) => item.id === hazardToSave.id);

      if (existingIndex >= 0) {
        data.hazards[existingIndex] = { ...data.hazards[existingIndex], ...hazardToSave };
      } else {
        data.hazards.unshift(hazardToSave); // đưa lên đầu danh sách
      }

      saveStoredData(data);

      // Tự động tạo 1 notification thông báo có sự cố mới nếu là tạo mới
      if (existingIndex < 0) {
        notifications.createSync({
          title: "Sự cố an toàn mới được báo cáo",
          detail: `${hazardToSave.title} tại ${hazardToSave.zoneName || hazardToSave.zoneCode || "hiện trường"}`,
          type: "HAZARD_NEW",
          targetUrl: `pages/safety-officer/safety-hazard-detail.html?hazard=${hazardToSave.id}`
        });
      }

      return hazardToSave;
    },

    async save(hazard) {
      await simulateDelay();
      const saved = hazards.saveSync(hazard);
      return createResponse(true, saved, "Đã lưu thông tin sự cố.");
    },

    deleteSync(id) {
      const data = getStoredData();
      data.hazards = data.hazards.filter((h) => h.id !== id);
      saveStoredData(data);
      return true;
    },

    async delete(id) {
      await simulateDelay();
      hazards.deleteSync(id);
      return createResponse(true, { id }, "Đã xóa sự cố.");
    },

    /**
     * Thống kê sự cố phục vụ Dashboard của Cán bộ an toàn và Quản lý.
     */
    getStats() {
      const all = hazards.getAllSync();
      const urgent = all.filter((h) => ["OPEN", "IN_PROGRESS"].includes(h.status) && ["HIGH", "CRITICAL"].includes(h.riskLevel));
      const pendingReview = all.filter((h) => h.status === "OPEN");
      const resolved = all.filter((h) => ["RESOLVED", "CLOSED"].includes(h.status));

      return {
        total: all.length,
        urgentCount: urgent.length,
        pendingReviewCount: pendingReview.length,
        resolvedCount: resolved.length,
        criticalCount: all.filter((h) => h.riskLevel === "CRITICAL").length,
        highCount: all.filter((h) => h.riskLevel === "HIGH").length,
        mediumCount: all.filter((h) => h.riskLevel === "MEDIUM").length,
        lowCount: all.filter((h) => h.riskLevel === "LOW").length
      };
    }
  };

  // ----------------------------------------------------------------------------
  // 4.4. CHECKLISTS SERVICE (Mẫu câu hỏi & Kết quả ca làm việc)
  // ----------------------------------------------------------------------------
  const checklists = {
    getTemplatesSync(workType) {
      const data = getStoredData();
      let list = [...data.checklists];
      if (workType && workType !== "ALL") {
        list = list.filter((item) => item.workType === workType);
      }
      return list;
    },

    async getTemplates(workType) {
      await simulateDelay();
      return createResponse(true, checklists.getTemplatesSync(workType));
    },

    saveTemplateSync(template) {
      const data = getStoredData();
      const itemToSave = {
        ...template,
        id: template.id || `CL-${Date.now().toString().slice(-4)}`,
        status: template.status || "ACTIVE"
      };

      const existingIndex = data.checklists.findIndex((item) => item.id === itemToSave.id);
      if (existingIndex >= 0) {
        data.checklists[existingIndex] = { ...data.checklists[existingIndex], ...itemToSave };
      } else {
        data.checklists.push(itemToSave);
      }

      saveStoredData(data);
      return itemToSave;
    },

    async saveTemplate(template) {
      await simulateDelay();
      const saved = checklists.saveTemplateSync(template);
      return createResponse(true, saved, "Đã lưu mẫu câu hỏi checklist.");
    },

    deleteTemplateSync(id) {
      const data = getStoredData();
      data.checklists = data.checklists.filter((item) => item.id !== id);
      saveStoredData(data);
      return true;
    },

    async deleteTemplate(id) {
      await simulateDelay();
      checklists.deleteTemplateSync(id);
      return createResponse(true, { id }, "Đã xóa mẫu checklist.");
    },

    /**
     * Nộp kết quả kiểm tra checklist ca làm việc (Worker).
     */
    submitResultSync(result) {
      const data = getStoredData();
      const user = auth.getCurrentUser() || {};
      const submission = {
        ...result,
        id: result.id || `CHK-${Date.now().toString().slice(-5)}`,
        submittedBy: result.submittedBy || user.email || "worker@sitesafe.test",
        submittedByName: result.submittedByName || user.fullName || "Công nhân hiện trường",
        submittedAt: result.submittedAt || new Date().toISOString(),
        status: result.status || "PASSED"
      };

      if (!Array.isArray(data.checklistResults)) {
        data.checklistResults = [];
      }

      data.checklistResults.unshift(submission);
      saveStoredData(data);
      return submission;
    },

    async submitResult(result) {
      await simulateDelay();
      const saved = checklists.submitResultSync(result);
      return createResponse(true, saved, "Đã nộp kết quả checklist thành công.");
    },

    getResultsSync() {
      const data = getStoredData();
      return data.checklistResults || [];
    }
  };

  // ----------------------------------------------------------------------------
  // 4.5. INSPECTIONS SERVICE (Đợt kiểm tra an toàn - Safety Officer)
  // ----------------------------------------------------------------------------
  const inspections = {
    getAllSync(filters = {}) {
      const data = getStoredData();
      let list = [...data.inspections];

      if (filters.status && filters.status !== "all") {
        list = list.filter((i) => i.status === filters.status);
      }
      if (filters.date) {
        list = list.filter((i) => i.date === filters.date);
      }
      if (filters.search) {
        const q = filters.search.toLowerCase();
        list = list.filter(
          (i) =>
            i.title.toLowerCase().includes(q) ||
            (i.zone && i.zone.toLowerCase().includes(q)) ||
            (i.owner && i.owner.toLowerCase().includes(q)) ||
            (i.searchTags && i.searchTags.toLowerCase().includes(q))
        );
      }
      return list;
    },

    async getAll(filters) {
      await simulateDelay();
      return createResponse(true, inspections.getAllSync(filters));
    },

    getById(id) {
      const data = getStoredData();
      return data.inspections.find((i) => i.id === id) || null;
    },

    saveSync(inspection) {
      const data = getStoredData();
      const itemToSave = {
        ...inspection,
        id: inspection.id || `IN-${Date.now().toString().slice(-4)}`,
        status: inspection.status || "scheduled",
        statusLabel:
          inspection.status === "completed"
            ? "Đã hoàn thành"
            : inspection.status === "in-progress"
            ? "Đang thực hiện"
            : "Đã lên lịch",
        createdAt: inspection.createdAt || new Date().toISOString()
      };

      const existingIndex = data.inspections.findIndex((item) => item.id === itemToSave.id);
      if (existingIndex >= 0) {
        data.inspections[existingIndex] = { ...data.inspections[existingIndex], ...itemToSave };
      } else {
        data.inspections.unshift(itemToSave);
      }

      saveStoredData(data);
      return itemToSave;
    },

    async save(inspection) {
      await simulateDelay();
      const saved = inspections.saveSync(inspection);
      return createResponse(true, saved, "Đã lưu đợt kiểm tra an toàn.");
    },

    deleteSync(id) {
      const data = getStoredData();
      data.inspections = data.inspections.filter((item) => item.id !== id);
      saveStoredData(data);
      return true;
    },

    async delete(id) {
      await simulateDelay();
      inspections.deleteSync(id);
      return createResponse(true, { id }, "Đã xóa đợt kiểm tra.");
    }
  };

  // ----------------------------------------------------------------------------
  // 4.6. ZONES SERVICE (Khu vực công trường & Bản đồ rủi ro)
  // ----------------------------------------------------------------------------
  const zones = {
    getAllSync(filters = {}) {
      const data = getStoredData();
      let list = [...data.zones];

      if (filters.status && filters.status !== "ALL") {
        list = list.filter((z) => z.status === filters.status);
      }
      if (filters.riskLevel && filters.riskLevel !== "ALL") {
        list = list.filter((z) => z.riskLevel === filters.riskLevel);
      }
      if (filters.search) {
        const q = filters.search.toLowerCase();
        list = list.filter(
          (z) =>
            z.name.toLowerCase().includes(q) ||
            z.code.toLowerCase().includes(q) ||
            (z.aliases && z.aliases.some((a) => a.toLowerCase().includes(q)))
        );
      }
      return list;
    },

    async getAll(filters) {
      await simulateDelay();
      return createResponse(true, zones.getAllSync(filters));
    },

    getById(idOrCode) {
      const data = getStoredData();
      const query = String(idOrCode || "").trim().toLowerCase();
      return (
        data.zones.find(
          (z) =>
            z.id.toLowerCase() === query ||
            z.code.toLowerCase() === query ||
            (z.aliases && z.aliases.some((a) => a.toLowerCase() === query))
        ) || null
      );
    },

    saveSync(zone) {
      const data = getStoredData();
      const itemToSave = {
        ...zone,
        id: zone.id || `ZONE-${Date.now().toString().slice(-4)}`,
        code: zone.code || `Z-${Date.now().toString().slice(-3)}`,
        riskLevel: zone.riskLevel || "MEDIUM",
        status: zone.status || "ACTIVE",
        createdAt: zone.createdAt || new Date().toISOString()
      };

      const existingIndex = data.zones.findIndex(
        (item) => item.id === itemToSave.id || item.code === itemToSave.code
      );

      if (existingIndex >= 0) {
        data.zones[existingIndex] = { ...data.zones[existingIndex], ...itemToSave };
      } else {
        data.zones.push(itemToSave);
      }

      saveStoredData(data);
      return itemToSave;
    },

    async save(zone) {
      await simulateDelay();
      const saved = zones.saveSync(zone);
      return createResponse(true, saved, "Đã lưu khu vực công trường.");
    },

    deleteSync(idOrCode) {
      const data = getStoredData();
      data.zones = data.zones.filter((z) => z.id !== idOrCode && z.code !== idOrCode);
      saveStoredData(data);
      return true;
    },

    async delete(idOrCode) {
      await simulateDelay();
      zones.deleteSync(idOrCode);
      return createResponse(true, { id: idOrCode }, "Đã xóa khu vực.");
    },

    /**
     * Dữ liệu tổng hợp cho Bản đồ rủi ro (Risk Map).
     */
    getRiskMapData() {
      const zoneList = zones.getAllSync();
      const hazardList = hazards.getAllSync();

      return zoneList.map((z) => {
        const zoneHazards = hazardList.filter(
          (h) => h.zoneId === z.id || h.zoneCode === z.code || (z.aliases && z.aliases.includes(h.zoneCode))
        );
        const criticalHazards = zoneHazards.filter((h) => h.riskLevel === "CRITICAL").length;
        const openHazards = zoneHazards.filter((h) => h.status === "OPEN").length;

        return {
          ...z,
          hazardsCount: zoneHazards.length,
          criticalHazards,
          openHazards
        };
      });
    }
  };

  // ----------------------------------------------------------------------------
  // 4.7. CORRECTIVE ACTIONS SERVICE (Hành động khắc phục)
  // ----------------------------------------------------------------------------
  const correctiveActions = {
    getAllSync(filters = {}) {
      const data = getStoredData();
      let list = [...data.correctiveActions];

      if (filters.status) {
        list = list.filter((a) => a.status === filters.status);
      }
      if (filters.hazardId) {
        list = list.filter((a) => a.hazardId === filters.hazardId);
      }
      return list;
    },

    async getAll(filters) {
      await simulateDelay();
      return createResponse(true, correctiveActions.getAllSync(filters));
    },

    getByHazardId(hazardId) {
      const data = getStoredData();
      return data.correctiveActions.filter((a) => a.hazardId === hazardId);
    },

    saveSync(action) {
      const data = getStoredData();
      const progress = Math.max(0, Math.min(100, Number(action.progress || 0)));
      const itemToSave = {
        ...action,
        id: action.id || `ACT-${Date.now().toString().slice(-4)}`,
        progress,
        status: progress === 100 ? "COMPLETED" : action.status || "IN_PROGRESS",
        createdAt: action.createdAt || new Date().toISOString()
      };

      const existingIndex = data.correctiveActions.findIndex((item) => item.id === itemToSave.id);
      if (existingIndex >= 0) {
        data.correctiveActions[existingIndex] = { ...data.correctiveActions[existingIndex], ...itemToSave };
      } else {
        data.correctiveActions.push(itemToSave);
      }

      // Cập nhật trạng thái sự cố tương ứng nếu hành động hoàn thành
      if (itemToSave.hazardId && progress === 100) {
        const hazardIndex = data.hazards.findIndex((h) => h.id === itemToSave.hazardId);
        if (hazardIndex >= 0) {
          data.hazards[hazardIndex].status = "RESOLVED";
          data.hazards[hazardIndex].statusLabel = "Đã giải quyết";
        }
      }

      saveStoredData(data);
      return itemToSave;
    },

    async save(action) {
      await simulateDelay();
      const saved = correctiveActions.saveSync(action);
      return createResponse(true, saved, "Đã lưu hành động khắc phục.");
    },

    deleteSync(id) {
      const data = getStoredData();
      data.correctiveActions = data.correctiveActions.filter((a) => a.id !== id);
      saveStoredData(data);
      return true;
    },

    /**
     * Thống kê báo cáo an toàn (Manager Safety Report).
     */
    getSummary() {
      const allActions = correctiveActions.getAllSync();
      const allHazards = hazards.getAllSync();
      const completed = allActions.filter((a) => a.status === "COMPLETED" || a.progress === 100);

      return {
        totalHazards: allHazards.length,
        criticalHazards: allHazards.filter((h) => h.riskLevel === "CRITICAL").length,
        completedActions: completed.length,
        totalActions: allActions.length,
        completionRate: allActions.length ? Math.round((completed.length / allActions.length) * 100) : 0
      };
    }
  };

  // ----------------------------------------------------------------------------
  // 4.8. TRAININGS SERVICE (Huấn luyện an toàn)
  // ----------------------------------------------------------------------------
  const trainings = {
    getAllSync(filters = {}) {
      const data = getStoredData();
      let list = [...data.trainings];
      if (filters.status) {
        list = list.filter((t) => t.status === filters.status);
      }
      return list;
    },

    async getAll(filters) {
      await simulateDelay();
      return createResponse(true, trainings.getAllSync(filters));
    },

    getById(id) {
      const data = getStoredData();
      return data.trainings.find((t) => t.id === id) || null;
    },

    updateStatusSync(id, newStatus) {
      const data = getStoredData();
      const course = data.trainings.find((t) => t.id === id);
      if (course) {
        course.status = newStatus;
        course.progress = newStatus === "COMPLETED" ? 100 : newStatus === "IN_PROGRESS" ? 50 : 0;
        saveStoredData(data);
        return course;
      }
      return null;
    },

    async updateStatus(id, newStatus) {
      await simulateDelay();
      const updated = trainings.updateStatusSync(id, newStatus);
      return createResponse(true, updated, "Đã cập nhật trạng thái đào tạo.");
    }
  };

  // ----------------------------------------------------------------------------
  // 4.9. NOTIFICATIONS SERVICE (Thông báo hệ thống)
  // ----------------------------------------------------------------------------
  const notifications = {
    getAllSync() {
      const data = getStoredData();
      return data.notifications || [];
    },

    async getAll() {
      await simulateDelay();
      return createResponse(true, notifications.getAllSync());
    },

    createSync(notification) {
      const data = getStoredData();
      const itemToSave = {
        id: `NT-${Date.now().toString().slice(-4)}`,
        title: notification.title || "Thông báo an toàn",
        detail: notification.detail || "",
        type: notification.type || "INFO",
        targetUrl: notification.targetUrl || "",
        read: false,
        createdAt: new Date().toISOString()
      };

      if (!Array.isArray(data.notifications)) {
        data.notifications = [];
      }

      data.notifications.unshift(itemToSave);
      saveStoredData(data);
      return itemToSave;
    },

    markAllAsReadSync() {
      const data = getStoredData();
      data.notifications = (data.notifications || []).map((n) => ({ ...n, read: true }));
      saveStoredData(data);
      return data.notifications;
    },

    async markAllAsRead() {
      await simulateDelay();
      const result = notifications.markAllAsReadSync();
      return createResponse(true, result, "Đã đánh dấu đã đọc tất cả thông báo.");
    }
  };

  // ----------------------------------------------------------------------------
  // 4.10. PRODUCTS & STORE SERVICE (Thiết bị an toàn công trường)
  // ----------------------------------------------------------------------------
  const products = {
    getAllSync(filters = {}) {
      const data = getStoredData();
      let list = [...data.products];

      if (filters.category && filters.category !== "all") {
        list = list.filter((p) => p.category === filters.category);
      }
      if (filters.search) {
        const q = filters.search.toLowerCase();
        list = list.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.seller.toLowerCase().includes(q)
        );
      }
      return list;
    },

    async getAll(filters) {
      await simulateDelay();
      return createResponse(true, products.getAllSync(filters));
    },

    createListingSync(product) {
      const data = getStoredData();
      const itemToSave = {
        ...product,
        id: product.id || `PRD-${Date.now().toString().slice(-4)}`,
        price: Number(product.price) || 0,
        stock: Number(product.stock) || 0
      };

      data.products.push(itemToSave);
      saveStoredData(data);
      return itemToSave;
    },

    checkoutOrderSync(cartItems) {
      const data = getStoredData();
      const order = {
        id: `ORD-${Date.now().toString().slice(-6)}`,
        items: cartItems,
        total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        status: "SIMULATED",
        createdAt: new Date().toISOString()
      };

      if (!Array.isArray(data.orders)) {
        data.orders = [];
      }
      data.orders.push(order);

      // Trừ số lượng tồn kho
      cartItems.forEach((ci) => {
        const p = data.products.find((prod) => prod.id === ci.id);
        if (p) {
          p.stock = Math.max(0, p.stock - ci.quantity);
        }
      });

      saveStoredData(data);
      return order;
    }
  };

  // ----------------------------------------------------------------------------
  // 4.11. AI SIMULATOR SERVICE (3 Trải nghiệm AI bắt buộc của đề tài BTL-16)
  // ----------------------------------------------------------------------------
  const ai = {
    /**
     * AI-1: Hazard Classifier (Phân loại nguy cơ và độ ưu tiên).
     * Luồng: Nhập mô tả/ảnh -> Xử lý (delay) -> Kết quả phân loại -> Giải thích lý do.
     */
    async classifyHazard(title, description, zoneId) {
      await simulateDelay(600); // mô phỏng AI inference

      const text = `${title} ${description}`.toLowerCase();
      let category = "Chưa phân loại";
      let riskLevel = "MEDIUM";
      let confidence = 0.88;
      let reasons = [];
      let recommendations = [];

      if (text.includes("rơi") || text.includes("cao") || text.includes("lan can") || text.includes("giàn giáo")) {
        category = "Làm việc trên cao";
        riskLevel = "HIGH";
        confidence = 0.93;
        reasons.push("Phát hiện từ khóa nguy cơ ngã cao (lan can, sàn thao tác, giàn giáo).");
        recommendations.push("Ngừng làm việc tại vị trí chưa có lan can; lắp đặt dây cứu sinh kép.");
      } else if (text.includes("điện") || text.includes("dây") || text.includes("nước") || text.includes("ẩm")) {
        category = "An toàn điện";
        riskLevel = "HIGH";
        confidence = 0.91;
        reasons.push("Phát hiện nguy cơ rò điện do đường dây tạm tiếp xúc độ ẩm.");
        recommendations.push("Ngắt nguồn tạm thời, treo cao dây cáp và kiểm tra rơ-le chống giật ELCB.");
      } else if (text.includes("cọc") || text.includes("hố") || text.includes("móng") || text.includes("sâu")) {
        category = "Hố đào & Cọc nhồi";
        riskLevel = "CRITICAL";
        confidence = 0.96;
        reasons.push("Hố đào sâu có nguy cơ sụt lún hoặc người/vật rơi trực diện vào miệng hố.");
        recommendations.push("Dựng rào chắn cứng cao 1.2m bao quanh và đặt đèn cảnh báo chớp vàng.");
      } else if (text.includes("dầu") || text.includes("tràn") || text.includes("trượt")) {
        category = "Mặt bằng thi công & Hóa chất";
        riskLevel = "MEDIUM";
        confidence = 0.87;
        reasons.push("Vệt dầu gây nguy cơ trượt ngã và cháy nổ nếu gần nguồn nhiệt.");
        recommendations.push("Sử dụng mùn cưa/cát thấm hút, vệ sinh bề mặt và đặt biển cảnh báo.");
      } else {
        category = "An toàn hiện trường";
        riskLevel = "MEDIUM";
        confidence = 0.80;
        reasons.push("Đánh giá tổng quát dựa trên các tiêu chuẩn an toàn lao động tại công trường.");
        recommendations.push("Cần cử cán bộ an toàn kiểm tra trực tiếp và đánh giá tại chỗ.");
      }

      return createResponse(true, {
        category,
        riskLevel,
        confidence,
        reasons,
        recommendations,
        canApply: true
      }, "AI phân loại nguy cơ hoàn tất.");
    },

    /**
     * AI-2: Checklist Generator (Gợi ý checklist theo loại công việc).
     */
    async generateChecklist(workType, zoneName) {
      await simulateDelay(600);

      const presets = {
        "Làm việc trên cao": [
          "Dây cứu sinh được neo chắc chắn vào kết cấu chịu lực đạt chuẩn.",
          "Sàn thao tác giàn giáo có đủ lan can trên, tay vịn giữa và tấm chắn chân.",
          "Công nhân mang dây đai an toàn toàn thân 2 móc còn hạn kiểm định.",
          "Thời tiết thuận lợi, không có gió to cấp 5 trở lên hoặc mưa trơn trượt."
        ],
        "Điện thi công": [
          "Tủ điện tạm trang bị aptomat chống giật ELCB 30mA hoạt động tốt.",
          "Vỏ kim loại của tủ điện và máy hàn được tiếp địa an toàn.",
          "Dây cáp nguồn không bị nứt vỡ cách điện, treo cao tối thiểu 2.5m.",
          "Có bình chữa cháy CO2 đặt cạnh tủ điện tổng."
        ],
        "Hố đào & Móng sâu": [
          "Thành hố đào đã được vát taluy hoặc đóng cừ gia cố chống sạt lở.",
          "Rào chắn cứng xung quanh miệng hố đào cao tối thiểu 1.2m.",
          "Bố trí thang lên xuống chắc chắn cách nhau không quá 15m.",
          "Đo kiểm tra không khí độc trước khi công nhân xuống hố sâu trên 2m."
        ],
        "Nâng hạ vật liệu": [
          "Cẩu tháp và cáp cẩu đã được kiểm định an toàn kỹ thuật.",
          "Khu vực bán kính quay cẩu đã được phong tỏa và có tín hiệu viên cảnh báo.",
          "Không đứng dưới tải cẩu đang di chuyển."
        ]
      };

      const items = presets[workType] || [
        "Công nhân được trang bị đầy đủ bảo hộ lao động đạt chuẩn.",
        "Mặt bằng thi công gọn gàng, không có vật cản lối thoát nạn.",
        "Đã phổ biến biện pháp an toàn đầu giờ cho toàn đội."
      ];

      return createResponse(true, {
        workType,
        zoneName,
        suggestedItems: items,
        reason: `AI đã tổng hợp từ tiêu chuẩn TCVN và lịch sử sự cố tại khu vực ${zoneName || "hiện trường"}.`
      }, "AI đề xuất checklist thành công.");
    },

    /**
     * AI-3: Risk Hotspot Insight (Phân tích điểm nóng rủi ro công trường).
     */
    async getRiskHotspotInsights(zoneCode) {
      await simulateDelay(500);

      const riskMap = zones.getRiskMapData();
      const target = zoneCode ? riskMap.find((z) => z.code === zoneCode) : null;

      if (target) {
        return createResponse(true, {
          zone: target.name,
          riskLevel: target.riskLevel,
          totalHazards: target.hazardsCount,
          analysis: `Khu vực ${target.name} ghi nhận ${target.hazardsCount} sự cố, trong đó có ${target.criticalHazards} sự cố nghiêm trọng.`,
          recommendation: target.riskLevel === "CRITICAL"
            ? "Cần tăng cường tần suất kiểm tra 2 lần/ngày và bố trí giám sát viên thường trực."
            : "Duy trì kiểm tra định kỳ và nhắc nhở công nhân tuân thủ quy trình."
        });
      }

      // Phân tích toàn công trường
      const highestRiskZone = [...riskMap].sort((a, b) => b.hazardsCount - a.hazardsCount)[0];
      return createResponse(true, {
        summary: `Điểm nóng an toàn hiện tại là ${highestRiskZone ? highestRiskZone.name : "Khu kết cấu"}.`,
        topZone: highestRiskZone,
        recommendation: "Tập trung đôn đốc các hành động khắc phục tại các khu vực đang thi công cao tầng và mố cầu."
      });
    }
  };

  // ============================================================================
  // 5. TẦNG TƯƠNG THÍCH NGƯỢC (BACKWARD COMPATIBILITY LAYER)
  // Giữ nguyên 100% tên hàm cũ mà các trang HTML/JS của nhóm đang gọi.
  // ============================================================================

  // Quản lý sự cố cũ
  function getHazards() {
    return hazards.getAllSync();
  }
  function saveHazard(hazard) {
    return hazards.saveSync(hazard);
  }
  function deleteHazard(id) {
    return hazards.deleteSync(id);
  }

  // Quản lý tài khoản cũ
  function getUsers() {
    return users.getAllSync();
  }
  function saveUser(user) {
    return users.saveSync(user);
  }
  function deleteUser(id) {
    return users.deleteSync(id);
  }

  // Quản lý khu vực cũ
  function getZones() {
    return zones.getAllSync();
  }
  function saveZone(zone) {
    return zones.saveSync(zone);
  }
  function deleteZone(id) {
    return zones.deleteSync(id);
  }

  // Quản lý checklist cũ
  function getChecklists() {
    return checklists.getTemplatesSync();
  }
  function saveChecklist(checklist) {
    return checklists.saveTemplateSync(checklist);
  }
  function deleteChecklist(id) {
    return checklists.deleteTemplateSync(id);
  }
  function saveChecklistResult(result) {
    return checklists.submitResultSync(result);
  }

  // Quản lý kiểm tra cũ
  function getInspections() {
    return inspections.getAllSync();
  }
  function saveInspection(inspection) {
    return inspections.saveSync(inspection);
  }
  function deleteInspection(id) {
    return inspections.deleteSync(id);
  }

  // Hành động khắc phục cũ
  function getCorrectiveActions() {
    return correctiveActions.getAllSync();
  }
  function saveCorrectiveAction(action) {
    return correctiveActions.saveSync(action);
  }

  // ============================================================================
  // 6. TỰ ĐỘNG KHỞI TẠO (INIT ENGINE)
  // ============================================================================
  /**
   * Cố gắng fetch từ assets/data/*.json nếu đang chạy trên HTTP/HTTPS.
   * Nếu chạy qua file:// hoặc fetch lỗi thì fallback tự động về DEFAULT_SEED_DATA.
   */
  async function init() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      // Đã có dữ liệu trong LocalStorage, sẵn sàng phục vụ
      return getStoredData();
    }

    const prefix = getProjectRootPrefix();
    const isHttp = window.location.protocol.startsWith("http");

    if (isHttp) {
      try {
        const [usersRes, hazardsRes, zonesRes, checklistsRes, inspectionsRes, trainingsRes, productsRes] =
          await Promise.all([
            fetch(`${prefix}assets/data/users.json`).then((r) => r.json()).catch(() => null),
            fetch(`${prefix}assets/data/hazards.json`).then((r) => r.json()).catch(() => null),
            fetch(`${prefix}assets/data/zones.json`).then((r) => r.json()).catch(() => null),
            fetch(`${prefix}assets/data/checklists.json`).then((r) => r.json()).catch(() => null),
            fetch(`${prefix}assets/data/inspections.json`).then((r) => r.json()).catch(() => null),
            fetch(`${prefix}assets/data/trainings.json`).then((r) => r.json()).catch(() => null),
            fetch(`${prefix}assets/data/products.json`).then((r) => r.json()).catch(() => null)
          ]);

        const mergedData = {
          users: Array.isArray(usersRes) && usersRes.length ? usersRes : DEFAULT_SEED_DATA.users,
          hazards: Array.isArray(hazardsRes) && hazardsRes.length ? hazardsRes : DEFAULT_SEED_DATA.hazards,
          zones: Array.isArray(zonesRes) && zonesRes.length ? zonesRes : DEFAULT_SEED_DATA.zones,
          checklists: checklistsRes && checklistsRes.templates ? checklistsRes.templates : DEFAULT_SEED_DATA.checklists,
          checklistResults: checklistsRes && checklistsRes.submissions ? checklistsRes.submissions : DEFAULT_SEED_DATA.checklistResults,
          inspections: Array.isArray(inspectionsRes) && inspectionsRes.length ? inspectionsRes : DEFAULT_SEED_DATA.inspections,
          correctiveActions: DEFAULT_SEED_DATA.correctiveActions,
          trainings: Array.isArray(trainingsRes) && trainingsRes.length ? trainingsRes : DEFAULT_SEED_DATA.trainings,
          products: Array.isArray(productsRes) && productsRes.length ? productsRes : DEFAULT_SEED_DATA.products,
          notifications: DEFAULT_SEED_DATA.notifications,
          orders: []
        };

        saveStoredData(mergedData);
        return mergedData;
      } catch (err) {
        console.info("[SiteSafeApi] Fetch data/ json gặp lỗi, chuyển sang dữ liệu nhúng sẵn:", err);
      }
    }

    // Mặc định fallback
    const fallback = JSON.parse(JSON.stringify(DEFAULT_SEED_DATA));
    saveStoredData(fallback);
    return fallback;
  }

  // Tự động kiểm tra và khởi tạo dữ liệu ngay khi nạp script
  getStoredData();

  // ============================================================================
  // 7. PHƠI ĐỐI TƯỢNG TOÀN CỤC window.siteSafeApi
  // ============================================================================
  window.siteSafeApi = {
    // Cấu hình
    config: CONFIG,
    init,
    resetData() {
      localStorage.removeItem(STORAGE_KEY);
      return getStoredData();
    },

    // Các Namespace Dịch Vụ Mới
    auth,
    users,
    hazards,
    checklists,
    inspections,
    zones,
    actions: correctiveActions,
    trainings,
    notifications,
    products,
    ai,

    // Tương thích ngược với mã nguồn hiện tại của nhóm
    getHazards,
    saveHazard,
    deleteHazard,
    getUsers,
    saveUser,
    deleteUser,
    getZones,
    saveZone,
    deleteZone,
    getChecklists,
    saveChecklist,
    deleteChecklist,
    getInspections,
    saveInspection,
    deleteInspection,
    getCorrectiveActions,
    saveCorrectiveAction,
    saveChecklistResult
  };

})(typeof window !== "undefined" ? window : this);

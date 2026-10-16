// Module nghiệp vụ dành cho Quản trị viên (Admin).
(function (window) {
  function getApi() {
    if (!window.siteSafeApi) {
      throw new Error("Cần nạp js/api.js trước admin.js");
    }
    return window.siteSafeApi;
  }

  function getDataPath(filename) {
    if (
      window.siteSafeMain &&
      typeof window.siteSafeMain.getProjectRootPrefix === "function"
    ) {
      return `${window.siteSafeMain.getProjectRootPrefix()}assets/data/${filename}`;
    }
    return `../../assets/data/${filename}`;
  }

  const DEFAULT_USERS = [
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
      createdAt: "2026-01-10T00:00:00.000Z",
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
      createdAt: "2026-01-12T00:00:00.000Z",
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
      createdAt: "2026-01-15T00:00:00.000Z",
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
      createdAt: "2026-02-01T00:00:00.000Z",
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
      createdAt: "2026-02-05T00:00:00.000Z",
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
      createdAt: "2026-02-10T00:00:00.000Z",
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
      createdAt: "2026-02-15T00:00:00.000Z",
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
      createdAt: "2026-02-20T00:00:00.000Z",
    },
  ];

  const DEFAULT_ZONES = [
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
      createdAt: "2026-01-10T00:00:00.000Z",
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
      createdAt: "2026-01-10T00:00:00.000Z",
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
      createdAt: "2026-01-10T00:00:00.000Z",
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
      createdAt: "2026-01-10T00:00:00.000Z",
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
      createdAt: "2026-01-10T00:00:00.000Z",
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
      createdAt: "2026-01-12T00:00:00.000Z",
    },
  ];

  const DEFAULT_CHECKLIST_TEMPLATES = [
    {
      id: "CL-001",
      question: "Dây cứu sinh được neo chắc chắn vào điểm cố định",
      note: "Kiểm tra móc khóa an toàn và dây treo trước khi leo cao",
      workType: "Làm việc trên cao",
      isRequired: true,
      status: "ACTIVE",
    },
    {
      id: "CL-002",
      question: "Sàn thao tác có rào chắn và tấm chắn chân",
      note: "Không có khoảng trống nguy hiểm, tay vịn chịu tải tốt",
      workType: "Làm việc trên cao",
      isRequired: true,
      status: "ACTIVE",
    },
    {
      id: "CL-003",
      question: "Tủ điện có aptomat chống giật và được đóng kín",
      note: "Kiểm tra trước khi cấp nguồn và nối đất vỏ kim loại",
      workType: "Điện thi công",
      isRequired: true,
      status: "ACTIVE",
    },
    {
      id: "CL-004",
      question: "Dây nguồn không hở vỏ và được cố định gọn gàng",
      note: "Không để dây nằm trên lối đi hoặc khu vực đọng nước",
      workType: "Điện thi công",
      isRequired: true,
      status: "ACTIVE",
    },
    {
      id: "CL-005",
      question: "Khu vực bên dưới tải nâng đã được rào chắn",
      note: "Có tín hiệu viên hướng dẫn khi nâng hạ cẩu tháp",
      workType: "Nâng hạ vật liệu",
      isRequired: false,
      status: "DRAFT",
    },
    {
      id: "CL-006",
      question: "Công nhân trang bị đầy đủ bảo hộ cá nhân (mũ, giày, áo phản quang)",
      note: "Bắt buộc 100% nhân sự vào công trường",
      workType: "An toàn chung",
      isRequired: true,
      status: "ACTIVE",
    },
    {
      id: "CL-007",
      question: "Miệng hố đào sâu trên 1.5m có rào chắn liên tục và đèn cảnh báo ban đêm",
      note: "Bố trí thang lên xuống an toàn",
      workType: "Đào đất & Hố móng",
      isRequired: true,
      status: "ACTIVE",
    },
  ];

  // Tải danh sách người dùng từ assets/data/users.json và đồng bộ LocalStorage.
  async function loadUsers() {
    let sourceUsers = DEFAULT_USERS;
    try {
      const res = await fetch(getDataPath("users.json"));
      if (res.ok) {
        sourceUsers = await res.json();
      }
    } catch (e) {
      console.warn("Dùng danh sách người dùng mặc định từ users.json fallback:", e);
    }

    const api = getApi();
    const localUsers = api.getUsers();
    if (!localUsers || localUsers.length === 0) {
      sourceUsers.forEach((u) => api.saveUser(u));
      return sourceUsers;
    }
    const localIds = new Set(localUsers.map((u) => u.id));
    let added = false;
    sourceUsers.forEach((u) => {
      if (!localIds.has(u.id)) {
        api.saveUser(u);
        added = true;
      }
    });
    return added ? api.getUsers() : (localUsers.length >= sourceUsers.length ? localUsers : sourceUsers);
  }

  function getAllUsers() {
    return getApi().getUsers();
  }

  function saveUser(user) {
    return getApi().saveUser(user);
  }

  function deleteUser(id) {
    return getApi().deleteUser(id);
  }

  // Tải danh mục khu vực từ assets/data/zones.json và đồng bộ LocalStorage.
  async function loadZones() {
    let sourceZones = DEFAULT_ZONES;
    try {
      const res = await fetch(getDataPath("zones.json"));
      if (res.ok) {
        sourceZones = await res.json();
      }
    } catch (e) {
      console.warn("Dùng danh mục khu vực mặc định từ zones.json fallback:", e);
    }

    const api = getApi();
    const localZones = api.getZones();
    if (!localZones || localZones.length === 0) {
      sourceZones.forEach((z) => api.saveZone(z));
      return sourceZones;
    }
    const localCodes = new Set(localZones.map((z) => z.code || z.id));
    let added = false;
    sourceZones.forEach((z) => {
      if (!localCodes.has(z.code) && !localCodes.has(z.id)) {
        api.saveZone(z);
        added = true;
      }
    });
    return added ? api.getZones() : (localZones.length >= sourceZones.length ? localZones : sourceZones);
  }

  function getAllZones() {
    return getApi().getZones();
  }

  function saveZone(zone) {
    return getApi().saveZone(zone);
  }

  function deleteZone(id) {
    return getApi().deleteZone(id);
  }

  // Tải danh mục mẫu checklist từ assets/data/checklists.json và đồng bộ LocalStorage.
  async function loadChecklists() {
    let templates = DEFAULT_CHECKLIST_TEMPLATES;
    try {
      const res = await fetch(getDataPath("checklists.json"));
      if (res.ok) {
        const data = await res.json();
        templates = Array.isArray(data) ? data : data.templates || DEFAULT_CHECKLIST_TEMPLATES;
      }
    } catch (e) {
      console.warn("Dùng mẫu checklist mặc định từ checklists.json fallback:", e);
    }

    const api = getApi();
    const localChecklists = api.getChecklists();
    if (!localChecklists || localChecklists.length === 0) {
      templates.forEach((t) =>
        api.saveChecklist({
          id: t.id,
          question: t.question,
          note: t.note,
          title: t.question,
          workType: t.workType,
          isRequired: t.isRequired,
          status: t.status || "ACTIVE",
        }),
      );
      return api.getChecklists();
    }
    const localIds = new Set(localChecklists.map((c) => c.id));
    let added = false;
    templates.forEach((t) => {
      if (!localIds.has(t.id)) {
        api.saveChecklist({
          id: t.id,
          question: t.question,
          note: t.note,
          title: t.question,
          workType: t.workType,
          isRequired: t.isRequired,
          status: t.status || "ACTIVE",
        });
        added = true;
      }
    });
    return added ? api.getChecklists() : (localChecklists.length >= templates.length ? localChecklists : templates);
  }

  function getAllChecklists() {
    return getApi().getChecklists();
  }

  function saveChecklist(checklist) {
    return getApi().saveChecklist(checklist);
  }

  function deleteChecklist(id) {
    return getApi().deleteChecklist(id);
  }

  window.siteSafeAdmin = {
    loadUsers,
    getAllUsers,
    saveUser,
    deleteUser,
    loadZones,
    getAllZones,
    saveZone,
    deleteZone,
    loadChecklists,
    getAllChecklists,
    saveChecklist,
    deleteChecklist,
  };
})(window);


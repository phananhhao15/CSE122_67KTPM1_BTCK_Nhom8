// Module nghiệp vụ dành cho quản lý công trường.
(function (window) {
  function getApi() {
    if (!window.siteSafeApi) {
      throw new Error("Cần nạp js/api.js trước manager.js");
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

  const DEFAULT_HAZARDS = [
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
      correctiveActionId: "ACT-001",
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
      correctiveActionId: "ACT-002",
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
      correctiveActionId: "ACT-003",
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
      correctiveActionId: "ACT-004",
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
      correctiveActionId: "ACT-005",
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

  // Tải danh sách sự cố từ assets/data/hazards.json và đồng bộ LocalStorage (hỗ trợ cả fetch và fallback).
  async function loadHazards() {
    let sourceHazards = DEFAULT_HAZARDS;
    try {
      const res = await fetch(getDataPath("hazards.json"));
      if (res.ok) {
        sourceHazards = await res.json();
      }
    } catch (e) {
      console.warn("Dùng danh sách sự cố mặc định từ assets/data/hazards.json fallback:", e);
    }

    const api = getApi();
    const localHazards = api.getHazards();
    if (!localHazards || localHazards.length === 0) {
      sourceHazards.forEach((h) => api.saveHazard(h));
      return sourceHazards;
    }

    const localIds = new Set(localHazards.map((h) => h.id));
    let added = false;
    sourceHazards.forEach((h) => {
      if (!localIds.has(h.id)) {
        api.saveHazard(h);
        added = true;
      }
    });

    return added ? api.getHazards() : (localHazards.length >= sourceHazards.length ? localHazards : sourceHazards);
  }

  // Tải danh mục khu vực từ assets/data/zones.json và đồng bộ LocalStorage (hỗ trợ cả fetch và fallback).
  async function loadZones() {
    let sourceZones = DEFAULT_ZONES;
    try {
      const res = await fetch(getDataPath("zones.json"));
      if (res.ok) {
        sourceZones = await res.json();
      }
    } catch (e) {
      console.warn("Dùng danh mục khu vực mặc định từ assets/data/zones.json fallback:", e);
    }

    const api = getApi();
    const localZones = api.getZones();
    if (!localZones || localZones.length === 0) {
      sourceZones.forEach((z) => api.saveZone(z));
      return sourceZones;
    }

    // Đảm bảo các thuộc tính quan trọng như hazardsCount, riskLevel luôn được cập nhật chính xác từ source
    sourceZones.forEach((sz) => {
      const existing = localZones.find((lz) => (lz.code && lz.code === sz.code) || lz.id === sz.id);
      if (existing) {
        let changed = false;
        if (existing.hazardsCount === undefined || existing.hazardsCount !== sz.hazardsCount) {
          existing.hazardsCount = sz.hazardsCount;
          changed = true;
        }
        if (!existing.riskLevel || existing.riskLevel !== sz.riskLevel) {
          existing.riskLevel = sz.riskLevel;
          changed = true;
        }
        if (changed) {
          api.saveZone(existing);
        }
      } else {
        api.saveZone(sz);
      }
    });

    return api.getZones().length >= sourceZones.length ? api.getZones() : sourceZones;
  }

  // Khởi tạo các hành động khắc phục liên kết với hazards từ assets/data/hazards.json
  async function loadCorrectiveActions() {
    const api = getApi();
    let localActions = api.getCorrectiveActions();

    // Mẫu hành động tương ứng với dữ liệu hazards
    const defaultActionMap = {
      "HZ-001": {
        id: "ACT-001",
        hazardId: "HZ-001",
        title: "Dựng rào chắn quanh miệng cọc",
        context: "HZ-001 · Mố cầu phía Đông",
        owner: "Võ Thành Long",
        deadline: "21/09/2026",
        progress: 100,
        status: "COMPLETED",
        isLate: false,
      },
      "HZ-002": {
        id: "ACT-002",
        hazardId: "HZ-002",
        title: "Lắp bổ sung lan can và tấm chắn chân",
        context: "HZ-002 · Khu kết cấu và giàn giáo",
        owner: "Phan Quốc Huy",
        deadline: "25/09/2026",
        progress: 65,
        status: "IN_PROGRESS",
        isLate: false,
      },
      "HZ-003": {
        id: "ACT-003",
        hazardId: "HZ-003",
        title: "Treo cao và bọc bảo vệ dây điện tạm",
        context: "HZ-003 · Khu cơ điện",
        owner: "Trần Huy Hoàng",
        deadline: "22/09/2026",
        progress: 35,
        status: "IN_PROGRESS",
        isLate: true,
      },
      "HZ-004": {
        id: "ACT-004",
        hazardId: "HZ-004",
        title: "Vệ sinh dầu tràn và đặt biển cảnh báo",
        context: "HZ-004 · Kho vật tư và thiết bị nâng",
        owner: "Nguyễn Minh Khoa",
        deadline: "24/09/2026",
        progress: 80,
        status: "IN_PROGRESS",
        isLate: false,
      },
      "HZ-005": {
        id: "ACT-005",
        hazardId: "HZ-005",
        title: "Sắp xếp lại vật liệu và kẻ vạch lối đi",
        context: "HZ-005 · Kho vật tư",
        owner: "Trần Quốc Huy",
        deadline: "18/09/2026",
        progress: 100,
        status: "COMPLETED",
        isLate: false,
      },
    };

    try {
      const hazards = await loadHazards();
      if (!localActions || localActions.length === 0) {
        hazards.forEach((hazard) => {
          const matched = defaultActionMap[hazard.id] || {
            id: hazard.correctiveActionId || `ACT-${hazard.id}`,
            hazardId: hazard.id,
            title: `Xử lý sự cố: ${hazard.title}`,
            context: `${hazard.id} · ${hazard.zoneName || "Khu vực thi công"}`,
            owner: hazard.reporter || "Chưa phân công",
            deadline: "30/09/2026",
            progress: hazard.status === "RESOLVED" ? 100 : 50,
            status: hazard.status === "RESOLVED" ? "COMPLETED" : "IN_PROGRESS",
            isLate: false,
          };
          api.saveCorrectiveAction(matched);
        });
        return api.getCorrectiveActions();
      }

      // Merge nếu có hazard mới chưa có hành động
      const existingIds = new Set(localActions.map((a) => a.id));
      let added = false;
      hazards.forEach((hazard) => {
        const actId = hazard.correctiveActionId || `ACT-${hazard.id}`;
        if (!existingIds.has(actId)) {
          const matched = defaultActionMap[hazard.id] || {
            id: actId,
            hazardId: hazard.id,
            title: `Xử lý sự cố: ${hazard.title}`,
            context: `${hazard.id} · ${hazard.zoneName || "Khu vực thi công"}`,
            owner: hazard.reporter || "Chưa phân công",
            deadline: "30/09/2026",
            progress: hazard.status === "RESOLVED" ? 100 : 50,
            status: hazard.status === "RESOLVED" ? "COMPLETED" : "IN_PROGRESS",
            isLate: false,
          };
          api.saveCorrectiveAction(matched);
          added = true;
        }
      });
      return added ? api.getCorrectiveActions() : localActions;
    } catch (e) {
      console.warn("Không thể liên kết actions từ hazards:", e);
    }

    return localActions;
  }

  // Lấy toàn bộ hành động khắc phục.
  function getCorrectiveActions() {
    return getApi().getCorrectiveActions();
  }

  // Cập nhật tiến độ một hành động.
  function updateCorrectiveProgress(action, progress) {
    const normalizedProgress = Math.max(0, Math.min(100, Number(progress)));
    return getApi().saveCorrectiveAction({
      ...action,
      progress: normalizedProgress,
      status: normalizedProgress === 100 ? "COMPLETED" : "IN_PROGRESS",
    });
  }

  // Tạo số liệu tổng quan cho báo cáo từ dữ liệu thực tế.
  function getSafetySummary() {
    let hazards = getApi().getHazards();
    let zones = getApi().getZones();
    if (!zones || zones.length === 0) zones = DEFAULT_ZONES;
    if (!hazards || hazards.length === 0) hazards = DEFAULT_HAZARDS;
    let totalHazards = 0;
    let criticalHazards = 0;

    zones.forEach((zone) => {
      const count = Number(zone.hazardsCount) || 0;
      totalHazards += count;
      if (zone.riskLevel === "CRITICAL") criticalHazards += count;
    });

    if (totalHazards === 0) {
      totalHazards = hazards.length;
      criticalHazards = hazards.filter((h) => h.riskLevel === "CRITICAL").length;
    }

    const openCount = hazards.filter(
      (h) => h.status === "OPEN" || h.status === "IN_PROGRESS",
    ).length;
    const completedCount = Math.max(0, totalHazards - openCount);
    const completionRate = totalHazards
      ? Math.round((completedCount / totalHazards) * 100)
      : 0;

    return {
      totalHazards,
      criticalHazards,
      completedActions: completedCount,
      completionRate,
    };
  }

  window.siteSafeManager = {
    loadHazards,
    loadZones,
    loadCorrectiveActions,
    getCorrectiveActions,
    updateCorrectiveProgress,
    getSafetySummary,
  };
})(window);


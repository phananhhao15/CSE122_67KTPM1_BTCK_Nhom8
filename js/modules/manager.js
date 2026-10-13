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

  // Tải danh sách sự cố từ assets/data/hazards.json và đồng bộ LocalStorage.
  async function loadHazards() {
    try {
      const res = await fetch(getDataPath("hazards.json"));
      if (res.ok) {
        const hazards = await res.json();
        const api = getApi();
        const localHazards = api.getHazards();
        if (!localHazards || localHazards.length === 0) {
          hazards.forEach((h) => api.saveHazard(h));
          return hazards;
        }
        const localIds = new Set(localHazards.map((h) => h.id));
        let added = false;
        hazards.forEach((h) => {
          if (!localIds.has(h.id)) {
            api.saveHazard(h);
            added = true;
          }
        });
        return added ? api.getHazards() : localHazards;
      }
    } catch (e) {
      console.warn("Không thể tải hazards.json từ máy chủ/tệp cục bộ:", e);
    }
    return getApi().getHazards();
  }

  // Tải danh mục khu vực từ assets/data/zones.json và đồng bộ LocalStorage.
  async function loadZones() {
    try {
      const res = await fetch(getDataPath("zones.json"));
      if (res.ok) {
        const zones = await res.json();
        const api = getApi();
        const localZones = api.getZones();
        if (!localZones || localZones.length === 0) {
          zones.forEach((z) => api.saveZone(z));
          return zones;
        }
        const localCodes = new Set(localZones.map((z) => z.code || z.id));
        let added = false;
        zones.forEach((z) => {
          if (!localCodes.has(z.code) && !localCodes.has(z.id)) {
            api.saveZone(z);
            added = true;
          }
        });
        return added ? api.getZones() : localZones;
      }
    } catch (e) {
      console.warn("Không thể tải zones.json từ máy chủ/tệp cục bộ:", e);
    }
    return getApi().getZones();
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
    const hazards = getApi().getHazards();
    const zones = getApi().getZones();
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


// ==========================================================================
// Module Nghiệp vụ Công nhân & AI-1 Hazard Classifier (Hào phụ trách)
// Đợt 2: Worker Features & AI Hazard Classification
// ==========================================================================
(function (window) {
  "use strict";

  function getApi() {
    if (!window.siteSafeApi) {
      throw new Error("Cần nạp js/api.js trước khi nạp js/modules/worker.js");
    }
    return window.siteSafeApi;
  }

  // Danh mục dữ liệu khởi tạo chuẩn cho công trường SiteSafe
  const DEFAULT_ZONES = [
    {
      id: "ZONE-001",
      code: "LM-STR",
      name: "Tòa A - Khối tháp 25 tầng (Kết cấu & giàn giáo)",
      description: "Kết cấu cao tầng, giàn giáo bao che và lắp đặt cốp pha.",
      riskLevel: "CRITICAL",
      supervisor: "Võ Thành Long",
      supervisorPhone: "0967890123",
      hazardsCount: 12,
      status: "ACTIVE",
    },
    {
      id: "ZONE-002",
      code: "LM-MAT",
      name: "Kho vật tư và nhiên liệu",
      description: "Lưu trữ máy móc, thiết bị nâng, bồn dầu tạm và hóa chất xây dựng.",
      riskLevel: "MEDIUM",
      supervisor: "Phan Anh Hào",
      supervisorPhone: "0945678901",
      hazardsCount: 5,
      status: "ACTIVE",
    },
    {
      id: "ZONE-003",
      code: "LM-C",
      name: "Khu điều hành và hạ tầng",
      description: "Văn phòng ban chỉ huy, phòng y tế công trường và cổng kiểm soát an ninh.",
      riskLevel: "LOW",
      supervisor: "Đoàn Thanh Sơn",
      supervisorPhone: "0956789012",
      hazardsCount: 1,
      status: "ACTIVE",
    },
    {
      id: "ZONE-004",
      code: "BR-PILE",
      name: "Mố cầu phía Đông (Thi công cọc & hố móng)",
      description: "Thi công cọc khoan nhồi, hố móng sâu và đúc dầm cầu dẫn.",
      riskLevel: "HIGH",
      supervisor: "Trần Huy Hoàng",
      supervisorPhone: "0912345678",
      hazardsCount: 8,
      status: "ACTIVE",
    },
    {
      id: "ZONE-005",
      code: "LM-D",
      name: "Khu tập kết phế liệu và xà bần",
      description: "Khu vực tạm dừng thi công, phân loại xà bần và thu gom sắt vụn.",
      riskLevel: "MEDIUM",
      supervisor: "Bùi Văn Dũng",
      supervisorPhone: "0978901234",
      hazardsCount: 2,
      status: "ACTIVE",
    },
    {
      id: "ZONE-006",
      code: "MEP-01",
      name: "Khu cơ điện và trạm biến áp tạm",
      description: "Hệ thống tủ điện tổng công trường, máy phát điện dự phòng và cáp ngầm.",
      riskLevel: "HIGH",
      supervisor: "Trần Huy Hoàng",
      supervisorPhone: "0912345678",
      hazardsCount: 4,
      status: "ACTIVE",
    },
  ];

  const DEFAULT_CHECKLIST_ITEMS = [
    {
      id: "CL-001",
      title: "Trang bị bảo hộ cá nhân (PPE) đầy đủ (Mũ, áo phản quang, giày mũi thép)",
      workType: "Bảo hộ cá nhân",
      status: "ACTIVE",
    },
    {
      id: "CL-002",
      title: "Lối đi bộ, sàn thao tác thông thoáng, không có vật cản hay dầu mỡ trơn trượt",
      workType: "Mặt bằng thi công",
      status: "ACTIVE",
    },
    {
      id: "CL-003",
      title: "Dây cáp điện thi công được treo cao >2.5m, tủ điện có nắp đậy và rơ-le chống giật (ELCB)",
      workType: "Điện thi công",
      status: "ACTIVE",
    },
    {
      id: "CL-004",
      title: "Khu vực mép sàn, hố mở trên cao có lan can bảo vệ 2 tầng và tấm chắn chân",
      workType: "Làm việc trên cao",
      status: "ACTIVE",
    },
    {
      id: "CL-005",
      title: "Nắm rõ quy trình thoát hiểm khẩn cấp và vị trí bình chữa cháy khu vực",
      workType: "PCCC & Ứng phó",
      status: "ACTIVE",
    },
  ];

  const DEFAULT_SAMPLE_HAZARDS = [
    {
      id: "HZ-101",
      title: "Lan can sàn công tác tầng 12 thiếu thanh chắn chân",
      description: "Một đoạn lan can tại góc phía Đông tầng 12 chưa lắp đủ tay vịn phụ và tấm chắn chân, nguy cơ đá gạch rơi xuống dưới.",
      zoneId: "ZONE-001",
      zoneName: "Tòa A - Khối tháp 25 tầng (Kết cấu & giàn giáo)",
      category: "Làm việc trên cao",
      riskLevel: "HIGH",
      status: "OPEN",
      reportedBy: "hao.pa@sitesafe.test",
      reporterName: "Phan Anh Hào",
      reportedAt: "2026-10-12T08:30:00.000Z",
      image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "HZ-102",
      title: "Dầu thủy lực rò rỉ gần lối đi xe nâng",
      description: "Vệt dầu nhỏ loang gần máy nâng tại cửa kho B, đã được vệ sinh rải cát tạm thời và cắm nón cảnh báo trơn trượt.",
      zoneId: "ZONE-002",
      zoneName: "Kho vật tư và nhiên liệu",
      category: "Mặt bằng thi công",
      riskLevel: "MEDIUM",
      status: "RESOLVED",
      reportedBy: "hao.pa@sitesafe.test",
      reporterName: "Phan Anh Hào",
      reportedAt: "2026-10-10T14:15:00.000Z",
      image: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "HZ-103",
      title: "Miệng hố cọc khoan nhồi thiếu rào chắn liên tục",
      description: "Khu vực miệng cọc P-18 vừa khoan xong chỉ có dây cảnh báo trùng, thiếu rào chắn cứng chống ngã ban đêm.",
      zoneId: "ZONE-004",
      zoneName: "Mố cầu phía Đông (Thi công cọc & hố móng)",
      category: "Hố móng & Sụt lở",
      riskLevel: "CRITICAL",
      status: "OPEN",
      reportedBy: "hao.pa@sitesafe.test",
      reporterName: "Phan Anh Hào",
      reportedAt: "2026-10-13T09:45:00.000Z",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "HZ-104",
      title: "Dây điện máy hàn tiếp xúc vũng nước mưa",
      description: "Đoạn cáp máy hàn bị rách vỏ cách điện nằm vắt ngang vũng nước đọng gần khu MEP, tiềm ẩn nguy cơ phóng điện giật.",
      zoneId: "ZONE-006",
      zoneName: "Khu cơ điện và trạm biến áp tạm",
      category: "Điện thi công",
      riskLevel: "CRITICAL",
      status: "OPEN",
      reportedBy: "hao.pa@sitesafe.test",
      reporterName: "Phan Anh Hào",
      reportedAt: "2026-10-14T07:20:00.000Z",
      image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    },
  ];

  // Khởi tạo dữ liệu dùng chung qua api.js nếu chưa có
  function seedInitialWorkerData() {
    const api = getApi();

    // 1. Khởi tạo zones nếu trống
    const zones = api.getZones();
    if (!Array.isArray(zones) || zones.length === 0) {
      DEFAULT_ZONES.forEach(function (zone) {
        api.saveZone(zone);
      });
    }

    // 2. Khởi tạo checklists nếu trống
    const checklists = api.getChecklists();
    if (!Array.isArray(checklists) || checklists.length === 0) {
      DEFAULT_CHECKLIST_ITEMS.forEach(function (cl) {
        api.saveChecklist(cl);
      });
    }

    // 3. Khởi tạo hazards nếu trống
    const hazards = api.getHazards();
    if (!Array.isArray(hazards) || hazards.length === 0) {
      DEFAULT_SAMPLE_HAZARDS.forEach(function (hz) {
        api.saveHazard(hz);
      });
    }
  }

  // Lấy danh sách khu vực công trường từ api.js
  function getZones() {
    seedInitialWorkerData();
    return getApi().getZones();
  }

  // Lấy danh sách mẫu câu hỏi checklist từ api.js
  function getChecklists() {
    seedInitialWorkerData();
    const list = getApi().getChecklists();
    if (!list || list.length === 0) {
      return DEFAULT_CHECKLIST_ITEMS;
    }
    return list;
  }

  // Lấy danh sách các nguy cơ/sự cố do công nhân gửi
  function getMyHazards(userOrEmail) {
    seedInitialWorkerData();
    const allHazards = getApi().getHazards();
    if (!userOrEmail) {
      return allHazards;
    }

    const email = typeof userOrEmail === "object" ? userOrEmail.email : userOrEmail;
    const cleanEmail = String(email || "").trim().toLowerCase();

    // Lọc theo email người gửi hoặc hiển thị toàn bộ nếu là quản lý/an toàn
    return allHazards.filter(function (hazard) {
      if (!hazard) return false;
      const rep = String(hazard.reportedBy || "").trim().toLowerCase();
      return rep === cleanEmail || rep === "worker" || !rep;
    });
  }

  // Lấy chi tiết một nguy cơ theo ID
  function getHazardById(id) {
    const all = getApi().getHazards();
    return all.find((item) => item.id === id) || null;
  }

  // Báo cáo nguy cơ mới qua api.js
  function reportHazard(hazardData) {
    const api = getApi();
    const reportedAt = hazardData.reportedAt || new Date().toISOString();
    const newHazard = {
      ...hazardData,
      // Mỗi lần gửi là một báo cáo riêng, mã theo ngày giờ gửi: HZ-yyyyMMdd-HHmmss
      id: hazardData.id || makeStampId("HZ", new Date(reportedAt)),
      status: hazardData.status || "OPEN",
      reportedAt: reportedAt,
    };
    return api.saveHazard(newHazard);
  }

  // Báo cáo do người dùng gửi từ trang tạo nguy cơ (mã dạng HZ-yyyyMMdd-HHmmss), mới nhất trước
  function getSubmittedHazards(userOrEmail) {
    const email = String(typeof userOrEmail === "object" && userOrEmail ? userOrEmail.email : userOrEmail || "")
      .trim().toLowerCase();
    return getApi().getHazards()
      .filter(function (h) {
        return h && /^HZ-\d{8}-\d{6}$/.test(String(h.id)) &&
          (!email || String(h.reportedBy || "").trim().toLowerCase() === email);
      })
      .sort(function (a, b) { return String(b.reportedAt).localeCompare(String(a.reportedAt)); });
  }

  // Cập nhật thông tin nguy cơ qua api.js
  function updateHazard(hazardData) {
    const api = getApi();
    return api.saveHazard(hazardData);
  }

  // Xóa nguy cơ qua api.js
  function deleteHazard(id) {
    const api = getApi();
    api.deleteHazard(id);
    return true;
  }

  // Lưu kết quả kiểm tra checklist ca làm việc qua api.js
  function submitChecklist(resultData) {
    const api = getApi();
    const submittedAt = resultData.submittedAt || new Date().toISOString();
    const record = {
      ...resultData,
      // Mỗi lần nộp là một phiếu riêng, mã theo ngày giờ nộp: PKT-yyyyMMdd-HHmmss
      id: resultData.id || makeStampId("PKT", new Date(submittedAt)),
      submittedAt: submittedAt,
    };
    return api.saveChecklistResult(record);
  }

  function makeStampId(prefix, d) {
    const p = function (n) { return String(n).padStart(2, "0"); };
    return prefix + "-" + d.getFullYear() + p(d.getMonth() + 1) + p(d.getDate()) +
      "-" + p(d.getHours()) + p(d.getMinutes()) + p(d.getSeconds());
  }

  // Lịch sử phiếu kiểm tra an toàn đã nộp của người dùng (mới nhất trước)
  function getMyChecklistSubmissions(userOrEmail) {
    const api = getApi();
    const all = api.checklists && api.checklists.getResultsSync ? api.checklists.getResultsSync() : [];
    const email = String(typeof userOrEmail === "object" && userOrEmail ? userOrEmail.email : userOrEmail || "")
      .trim().toLowerCase();
    return all
      .filter(function (r) {
        // Chỉ lấy phiếu do trang này tạo (có summary) và thuộc về người dùng
        if (!r || !r.summary || !Array.isArray(r.items)) return false;
        const owner = String(r.workerEmail || r.submittedBy || "").trim().toLowerCase();
        return !email || owner === email;
      })
      .sort(function (a, b) { return String(b.submittedAt).localeCompare(String(a.submittedAt)); });
  }

  // ==========================================================================
  // AI-1 HAZARD CLASSIFIER (Hào phụ trách)
  // Quy chuẩn: QCVN 18:2021/BXD (Quy chuẩn kỹ thuật quốc gia về An toàn trong xây dựng)
  // Trải nghiệm: Nhập -> Xử lý (Loading/Progress) -> Kết quả -> Giải thích -> Quyền người dùng
  // ==========================================================================
  function classifyHazard({ description, zoneId, title }) {
    return new Promise(function (resolve) {
      // Mô phỏng độ trễ xử lý AI thông minh (450ms)
      setTimeout(function () {
        const text = `${title || ""} ${description || ""}`.toLowerCase();

        // 1. Nhóm An toàn điện (ELECTRICAL)
        const electricalKeywords = [
          "điện", "cáp điện", "dây điện", "ổ cắm", "tủ điện", "hở điện",
          "ẩm ướt", "vũng nước", "rò rỉ điện", "phóng điện", "chập điện",
          "máy hàn", "biến áp", "cầu dao", "elcb"
        ];
        const matchedElec = electricalKeywords.filter((k) => text.includes(k));

        // 2. Nhóm Làm việc trên cao / Nguy cơ rơi ngã (FALL_HAZARD)
        const fallKeywords = [
          "ngã", "rơi", "độ cao", "lan can", "giàn giáo", "sàn thao tác",
          "mép sàn", "thang", "hố thông tầng", "dây an toàn", "dây cứu sinh",
          "lưới an toàn", "tay vịn", "tấm chắn chân", "tầng cao"
        ];
        const matchedFall = fallKeywords.filter((k) => text.includes(k));

        // 3. Nhóm Vật thể rơi / Rơi đổ vật liệu (FALLING_OBJECTS)
        const fallingObjKeywords = [
          "vật rơi", "đá rơi", "gạch rơi", "rơi vỡ", "xếp cao", "xà gồ",
          "cẩu vật", "móc cẩu", "thiếu lưới che", "sắt thép rơi", "văng bắn"
        ];
        const matchedObj = fallingObjKeywords.filter((k) => text.includes(k));

        // 4. Nhóm Hố đào / Móng cọc / Sụt lở đất (EXCAVATION)
        const excaKeywords = [
          "hố đào", "hố móng", "sụt lở", "sạt đất", "vách đất", "cọc khoan",
          "khoan nhồi", "nứt đất", "hố sâu", "taluy"
        ];
        const matchedExca = excaKeywords.filter((k) => text.includes(k));

        // 5. Nhóm Cháy nổ & Hàn cắt (FIRE_EXPLOSION)
        const fireKeywords = [
          "cháy", "nổ", "bình gas", "bình oxy", "hàn cắt", "bồn dầu",
          "xăng", "nhiên liệu", "tia lửa", "chữa cháy", "khói"
        ];
        const matchedFire = fireKeywords.filter((k) => text.includes(k));

        // 6. Nhóm Trang bị BHLĐ (PPE)
        const ppeKeywords = [
          "mũ bảo hộ", "kính bảo hộ", "dây đai", "ủng", "găng tay", "thiếu bhlđ",
          "không mang", "bảo hộ cá nhân", "tai nghe chống ồn"
        ];
        const matchedPpe = ppeKeywords.filter((k) => text.includes(k));

        // 7. Nhóm Mặt bằng & Lối đi cản trở (HOUSEKEEPING)
        const houseKeywords = [
          "lối đi", "vật cản", "chắn lối", "bừa bãi", "đinh nhọn", "dầu tràn",
          "trơn trượt", "xà bần", "rác thải", "chiếu sáng"
        ];
        const matchedHouse = houseKeywords.filter((k) => text.includes(k));

        // Xác định phân loại ưu tiên cao nhất
        let result = null;

        if (matchedElec.length > 0 && (matchedElec.includes("ẩm ướt") || matchedElec.includes("vũng nước") || matchedElec.includes("hở điện"))) {
          result = {
            category: "Điện thi công",
            categoryCode: "ELECTRICAL",
            riskLevel: "CRITICAL",
            riskLevelLabel: "Mức nghiêm trọng",
            confidence: 96,
            summary: "Nguy cơ rò điện và điện giật cực kỳ nguy hiểm do dây dẫn bị hỏng/tiếp xúc ẩm ướt.",
            matchedKeywords: matchedElec,
            standardRef: "QCVN 18:2021/BXD Mục 2.8 & TCVN 5308-91 về An toàn điện công trường",
            explanation: [
              `Phát hiện từ khóa nguy cơ: "${matchedElec.join('", "')}".`,
              "Cáp điện hoặc thiết bị tiếp xúc môi trường ẩm ướt tăng nguy cơ dẫn điện truyền qua nước gây tử vong.",
              "Quy chuẩn yêu cầu toàn bộ nguồn điện thi công phải qua Rơ-le chống giật (ELCB) và treo cao tối thiểu 2.5m.",
            ],
            recommendedActions: [
              "Ngắt ngay nguồn điện nhánh cấp cho vị trí này tại tủ điện tầng.",
              "Treo cáp điện cao ráo lên giá đỡ cách điện, tuyệt đối không thả chìm trong nước.",
              "Đặt biển cảnh báo nguy hiểm điện giật và báo ngay Cán bộ an toàn nghiệm thu trước khi cấp điện lại.",
            ],
            suggestedTitle: "Dây điện thi công mất an toàn gần khu vực ẩm ướt",
          };
        } else if (matchedFall.length > 0) {
          const isCritical = text.includes("tầng cao") || text.includes("hố sâu") || text.includes("không thắt dây");
          result = {
            category: "Làm việc trên cao",
            categoryCode: "FALL_HAZARD",
            riskLevel: isCritical ? "CRITICAL" : "HIGH",
            riskLevelLabel: isCritical ? "Mức nghiêm trọng" : "Mức cao",
            confidence: 94,
            summary: "Nguy cơ rơi ngã từ trên cao do thiếu lan can bao che hoặc thiếu điểm neo an toàn.",
            matchedKeywords: matchedFall,
            standardRef: "QCVN 18:2021/BXD Mục 2.2 về Biện pháp phòng ngừa rơi ngã",
            explanation: [
              `Phát hiện từ khóa nguy cơ: "${matchedFall.join('", "')}".`,
              "Mọi vị trí thao tác có độ cao từ 2m trở lên bắt buộc phải có lan can bảo vệ 2 tầng hoặc lưới đỡ an toàn.",
              "Người lao động thiếu thanh chắn chân dễ làm rơi dụng cụ hoặc trượt chân rơi xuống tầng dưới.",
            ],
            recommendedActions: [
              "Lắp bổ sung ngay lan can bảo vệ tạm thời (cao tối thiểu 1.1m) và tấm chắn chân cao 15cm.",
              "Trang bị dây đai an toàn toàn thân (harness) móc cố định vào dây cứu sinh chịu lực.",
              "Căng dây cảnh báo không phận bên dưới khu vực thi công trên cao.",
            ],
            suggestedTitle: "Khu vực thi công trên cao thiếu lan can chắn an toàn",
          };
        } else if (matchedExca.length > 0) {
          result = {
            category: "Hố móng & Sụt lở",
            categoryCode: "EXCAVATION",
            riskLevel: "CRITICAL",
            riskLevelLabel: "Mức nghiêm trọng",
            confidence: 92,
            summary: "Nguy cơ sụt lở thành hố đào hoặc tai nạn rơi xuống hố móng sâu không được che chắn.",
            matchedKeywords: matchedExca,
            standardRef: "QCVN 18:2021/BXD Mục 2.4 về An toàn công tác đất và hố đào",
            explanation: [
              `Phát hiện từ khóa nguy cơ: "${matchedExca.join('", "')}".`,
              "Hố móng sâu và cọc khoan nhồi tiềm ẩn nguy cơ sập vách đất bất ngờ do rung động máy móc hoặc ngấm nước.",
              "Quy chuẩn yêu cầu rào chắn cứng cao tối thiểu 1.2m và đèn tín hiệu chiếu sáng cảnh báo ban đêm.",
            ],
            recommendedActions: [
              "Lắp dựng rào chắn cứng kiên cố xung quanh miệng hố đào.",
              "Kiểm tra hệ thống văng chống cừ và kiểm soát vết nứt taluy đất xung quanh.",
              "Cắm biển cảnh báo hố sâu nguy hiểm có phản quang nhìn rõ ban đêm.",
            ],
            suggestedTitle: "Miệng hố đào/cọc móng sâu thiếu rào chắn bảo vệ",
          };
        } else if (matchedFire.length > 0) {
          result = {
            category: "PCCC & Hàn cắt",
            categoryCode: "FIRE_EXPLOSION",
            riskLevel: "HIGH",
            riskLevelLabel: "Mức cao",
            confidence: 91,
            summary: "Nguy cơ cháy nổ do tia lửa hàn cắt hoặc tích trữ nhiên liệu không đúng quy định an toàn.",
            matchedKeywords: matchedFire,
            standardRef: "TCVN 3890:2023 & QCVN 06:2022/BXD về An toàn phòng cháy chữa cháy",
            explanation: [
              `Phát hiện từ khóa nguy cơ: "${matchedFire.join('", "')}".`,
              "Khu vực có vật liệu dễ cháy không được thực hiện hàn cắt nếu thiếu tấm bạt chắn xỉ hàn chuyên dụng.",
              "Bình khí nén oxy/gas bắt buộc phải có van chống cháy ngược và để đứng cố định trên giá.",
            ],
            recommendedActions: [
              "Trang bị tối thiểu 2 bình chữa cháy xách tay (bột ABC hoặc CO2) ngay cạnh khu vực phát sinh nhiệt.",
              "Di dời các chất dễ bắt lửa ra xa tối thiểu 5m và che bạt chống cháy.",
              "Cử người canh lửa (fire watch) trong và sau khi thi công hàn cắt ít nhất 30 phút.",
            ],
            suggestedTitle: "Khu vực hàn cắt/lưu trữ nhiên liệu chưa đảm bảo PCCC",
          };
        } else if (matchedObj.length > 0) {
          result = {
            category: "Vật thể rơi",
            categoryCode: "FALLING_OBJECTS",
            riskLevel: "HIGH",
            riskLevelLabel: "Mức cao",
            confidence: 89,
            summary: "Nguy cơ vật tư, gạch đá hoặc thiết bị rơi từ tầng cao xuống lối đi bên dưới.",
            matchedKeywords: matchedObj,
            standardRef: "QCVN 18:2021/BXD Mục 2.3 về Chống vật thể rơi đổ",
            explanation: [
              `Phát hiện từ khóa nguy cơ: "${matchedObj.join('", "')}".`,
              "Vật liệu tập kết tại mép sàn tầng cao không được chằng buộc chắc chắn dễ bị gió thổi hoặc vô ý làm rơi.",
              "Thiếu lưới hứng bảo vệ bao che công trình tại các hướng tiếp giáp khu dân cư và lối đi nội bộ.",
            ],
            recommendedActions: [
              "Chằng buộc hoặc di chuyển vật liệu vào sâu trong sàn tối thiểu 1.5m cách mép biên.",
              "Căng lưới hứng chống rơi vật thể và dựng mái che bảo vệ lối đi lại bên dưới.",
              "Yêu cầu 100% người bước vào khu vực nguy hiểm phải đội mũ bảo hộ quai cài cẩn thận.",
            ],
            suggestedTitle: "Vật liệu xếp mép sàn nguy cơ rơi xuống lối đi",
          };
        } else if (matchedPpe.length > 0) {
          result = {
            category: "Bảo hộ cá nhân",
            categoryCode: "PPE",
            riskLevel: "MEDIUM",
            riskLevelLabel: "Mức vừa",
            confidence: 88,
            summary: "Không tuân thủ đầy đủ việc mang trang bị bảo hộ lao động cá nhân bắt buộc trên công trường.",
            matchedKeywords: matchedPpe,
            standardRef: "Thông tư 25/2022/TT-BLĐTBXH về Trang cấp phương tiện bảo vệ cá nhân",
            explanation: [
              `Phát hiện từ khóa nguy cơ: "${matchedPpe.join('", "')}".`,
              "Người lao động thiếu mũ bảo hộ, kính chống bụi hoặc giày bảo hộ mũi thép chịu lực.",
              "Tăng nguy cơ chấn thương nặng khi xảy ra sự cố va chạm hoặc mảnh vụn bắn vào mắt.",
            ],
            recommendedActions: [
              "Nhắc nhở công nhân trang bị đầy đủ BHLĐ trước khi cho phép tiếp tục công việc.",
              "Cấp phát bổ sung ngay phương tiện bảo hộ tại phòng an toàn công trường.",
              "Ghi nhận biên bản vi phạm quy định an toàn nếu tái phạm.",
            ],
            suggestedTitle: "Công nhân thiếu trang bị bảo hộ cá nhân (BHLĐ) khi làm việc",
          };
        } else if (matchedHouse.length > 0) {
          result = {
            category: "Mặt bằng thi công",
            categoryCode: "HOUSEKEEPING",
            riskLevel: "LOW",
            riskLevelLabel: "Mức thấp",
            confidence: 87,
            summary: "Mặt bằng làm việc lộn xộn, vật tư cản trở lối đi hoặc bề mặt trơn trượt.",
            matchedKeywords: matchedHouse,
            standardRef: "QCVN 18:2021/BXD Mục 2.1 về Vệ sinh và tổ chức mặt bằng công trường",
            explanation: [
              `Phát hiện từ khóa nguy cơ: "${matchedHouse.join('", "')}".`,
              "Vật tư thải, xà bần hoặc đinh sắt vương vãi trên lối đi gây nguy cơ vấp ngã hoặc đâm xuyên chân.",
              "Lối thoát nạn tạm thời bị che chắn làm chậm trễ quá trình sơ tán khi có tình huống khẩn cấp.",
            ],
            recommendedActions: [
              "Tổ chức dọn dẹp vệ sinh theo tiêu chuẩn 5S công trường, thu gom đinh và sắt vụn.",
              "Giải phóng hoàn toàn lối đi lại và cửa thoát hiểm.",
              "Rải cát thấm hút dầu nhớt loang và rửa sạch bề mặt chống trơn trượt.",
            ],
            suggestedTitle: "Mặt bằng thi công bừa bãi, vật cản chắn lối đi bộ",
          };
        } else {
          // Phân loại tổng quát theo ngữ cảnh
          result = {
            category: "Chung / Khác",
            categoryCode: "GENERAL",
            riskLevel: "MEDIUM",
            riskLevelLabel: "Mức vừa",
            confidence: 82,
            summary: "Phát hiện điều kiện chưa đảm bảo an toàn cần cán bộ chuyên môn kiểm tra chi tiết.",
            matchedKeywords: ["quan sát hiện trường"],
            standardRef: "Nội quy an toàn lao động chung công trường SiteSafe",
            explanation: [
              "Hệ thống phân tích mô tả hiện trường và nhận diện nguy cơ tiềm ẩn gây gián đoạn thi công.",
              "Cần cán bộ an toàn chuyên trách kiểm tra thực tế để đưa ra biện pháp khắc phục đặc thù.",
            ],
            recommendedActions: [
              "Khoanh vùng cảnh báo khu vực phát hiện sự cố.",
              "Thông báo cho cán bộ an toàn phụ trách phân khu kiểm tra đánh giá trực tiếp.",
            ],
            suggestedTitle: "Nguy cơ an toàn cần rà soát kiểm tra tại hiện trường",
          };
        }

        resolve(result);
      }, 450);
    });
  }

  // Tiện ích escape dữ liệu chống XSS
  function escapeHtml(str) {
    return String(str || "").replace(/[&<>'"]/g, function (c) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      }[c];
    });
  }

  // Định dạng ngày hiển thị dd/mm/yyyy hh:mm
  function formatDate(isoStr) {
    if (!isoStr) return "--";
    try {
      const d = new Date(isoStr);
      if (isNaN(d.getTime())) return String(isoStr);
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = d.getFullYear();
      const hours = String(d.getHours()).padStart(2, "0");
      const mins = String(d.getMinutes()).padStart(2, "0");
      return `${day}/${month}/${year} ${hours}:${mins}`;
    } catch (e) {
      return String(isoStr);
    }
  }

  // Lấy class badge theo mức độ rủi ro
  function getRiskBadgeClass(level) {
    switch (String(level).toUpperCase()) {
      case "CRITICAL":
        return "badge-danger";
      case "HIGH":
        return "badge-danger";
      case "MEDIUM":
        return "badge-warning";
      case "LOW":
        return "badge-success";
      default:
        return "badge";
    }
  }

  // Lấy nhãn hiển thị theo mức độ rủi ro
  function getRiskLabel(level) {
    switch (String(level).toUpperCase()) {
      case "CRITICAL":
        return "Mức nghiêm trọng";
      case "HIGH":
        return "Mức cao";
      case "MEDIUM":
        return "Mức vừa";
      case "LOW":
        return "Mức thấp";
      default:
        return level || "Chưa xác định";
    }
  }

  // Lấy class badge theo trạng thái sự cố
  function getStatusBadgeClass(status) {
    switch (String(status).toUpperCase()) {
      case "OPEN":
        return "badge-warning";
      case "IN_PROGRESS":
        return "badge-primary";
      case "RESOLVED":
        return "badge-success";
      default:
        return "badge";
    }
  }

  // Lấy nhãn hiển thị theo trạng thái sự cố
  function getStatusLabel(status) {
    switch (String(status).toUpperCase()) {
      case "OPEN":
        return "Đang chờ duyệt";
      case "IN_PROGRESS":
        return "Đang xử lý";
      case "RESOLVED":
        return "Đã khắc phục";
      default:
        return status || "Đang chờ";
    }
  }

  // Xuất module ra namespace window.siteSafeWorker
  window.siteSafeWorker = {
    getZones,
    getChecklists,
    getMyHazards,
    getHazardById,
    reportHazard,
    updateHazard,
    deleteHazard,
    submitChecklist,
    getMyChecklistSubmissions,
    getSubmittedHazards,
    classifyHazard,
    escapeHtml,
    formatDate,
    getRiskBadgeClass,
    getRiskLabel,
    getStatusBadgeClass,
    getStatusLabel,
    seedInitialWorkerData,
  };
})(window);


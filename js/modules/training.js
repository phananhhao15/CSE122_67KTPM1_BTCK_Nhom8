// Module quản lý đào tạo an toàn lao động (Safety Training).
(function (window) {
  const STORAGE_KEY = "siteSafeTrainings";

  function getDataPath(filename) {
    if (
      window.siteSafeMain &&
      typeof window.siteSafeMain.getProjectRootPrefix === "function"
    ) {
      return `${window.siteSafeMain.getProjectRootPrefix()}assets/data/${filename}`;
    }
    return `../../assets/data/${filename}`;
  }

  // Tải danh sách khóa huấn luyện từ assets/data/trainings.json.
  async function loadTrainings() {
    try {
      const res = await fetch(getDataPath("trainings.json"));
      if (res.ok) {
        const fileTrainings = await res.json();
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(fileTrainings));
          return fileTrainings;
        }

        try {
          const localTrainings = JSON.parse(saved);
          const localMap = new Map(localTrainings.map((t) => [t.id, t]));
          // Đồng bộ nếu có khóa học mới trong trainings.json nhưng giữ tiến độ đã học
          const merged = fileTrainings.map((ft) => {
            if (localMap.has(ft.id)) {
              return { ...ft, ...localMap.get(ft.id) };
            }
            return ft;
          });
          localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
          return merged;
        } catch (e) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(fileTrainings));
          return fileTrainings;
        }
      }
    } catch (e) {
      console.warn("Không thể tải trainings.json từ máy chủ/tệp cục bộ:", e);
    }
    return getTrainings();
  }

  // Lấy danh sách đào tạo từ LocalStorage (đồng bộ).
  function getTrainings() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Parse error fallback
      }
    }
    return [
      {
        id: "TR-001",
        title: "An toàn lao động trên cao",
        description:
          "Quy chuẩn đeo dây an toàn 2 móc, kiểm tra sàn công tác giàn giáo và lắp đặt lưới chống rơi ngã.",
        duration: "45 phút",
        level: "Bắt buộc",
        image:
          "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=600&q=80",
        status: "COMPLETED",
        progress: 100,
      },
      {
        id: "TR-002",
        title: "PCCC & Ứng phó sự cố khẩn cấp",
        description:
          "Hướng dẫn sử dụng bình bột/CO2, vận hành lăng vòi chữa cháy và quy trình sơ tán hiện trường khi có báo động.",
        duration: "60 phút",
        level: "Bắt buộc",
        image:
          "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=600&q=80",
        status: "IN_PROGRESS",
        progress: 60,
      },
      {
        id: "TR-003",
        title: "An toàn điện công trường",
        description:
          "Quy định nối đất vỏ thiết bị, sử dụng tủ điện tạm chuẩn IP54 và kiểm tra định kỳ dụng cụ điện cầm tay.",
        duration: "30 phút",
        level: "Khuyến nghị",
        image:
          "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80",
        status: "NOT_STARTED",
        progress: 0,
      },
      {
        id: "TR-004",
        title: "Quy trình làm việc trong hố sâu & không gian kín",
        description:
          "Đo nồng độ khí độc/oxy, cấp khí tươi nhân tạo và phương án cứu hộ khẩn cấp bằng tời cứu sinh.",
        duration: "50 phút",
        level: "Bắt buộc",
        image:
          "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80",
        status: "NOT_STARTED",
        progress: 0,
      },
    ];
  }

  // Cập nhật trạng thái và tiến độ của một khóa học.
  function updateTrainingStatus(courseId, nextStatus) {
    const list = getTrainings();
    const index = list.findIndex((c) => c.id === courseId);
    if (index >= 0) {
      list[index].status = nextStatus;
      if (nextStatus === "COMPLETED") {
        list[index].progress = 100;
      } else if (nextStatus === "IN_PROGRESS") {
        list[index].progress = 50;
      } else {
        list[index].progress = 0;
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }
    return list;
  }

  window.siteSafeTraining = {
    loadTrainings,
    getTrainings,
    updateTrainingStatus,
  };
})(window);


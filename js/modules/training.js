// Module quản lý đào tạo an toàn lao động (Safety Training).
(function (window) {
  function getTrainings() {
    const defaultTrainings = [
      {
        id: "TR-001",
        title: "An toàn lao động trên cao",
        description: "Quy chuẩn đeo dây an toàn, kiểm tra giàn giáo và chống rơi ngã.",
        duration: "45 phút",
        level: "Bắt buộc",
        image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=600&q=80",
        status: "COMPLETED"
      },
      {
        id: "TR-002",
        title: "PCCC & Ứng phó sự cố khẩn cấp",
        description: "Hướng dẫn sử dụng bình chữa cháy và quy trình sơ tán công trường.",
        duration: "60 phút",
        level: "Bắt buộc",
        image: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=600&q=80",
        status: "IN_PROGRESS"
      },
      {
        id: "TR-003",
        title: "An toàn điện công trường",
        description: "Quy định nối đất, tủ điện tạm và kiểm tra thiết bị cầm tay.",
        duration: "30 phút",
        level: "Khuyến nghị",
        image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80",
        status: "NOT_STARTED"
      }
    ];

    const saved = localStorage.getItem("siteSafeTrainings");
    if (!saved) {
      localStorage.setItem("siteSafeTrainings", JSON.stringify(defaultTrainings));
      return defaultTrainings;
    }
    try {
      return JSON.parse(saved);
    } catch (e) {
      return defaultTrainings;
    }
  }

  window.siteSafeTraining = {
    getTrainings,
  };
})(window);

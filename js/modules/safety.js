// Module nghiệp vụ dành cho cán bộ an toàn.
(function (window) {
  function getApi() {
    if (!window.siteSafeApi) {
      throw new Error("Cần nạp js/api.js trước safety.js");
    }
    return window.siteSafeApi;
  }

  // Lấy các hazard cần review.
  function getOpenHazards() {
    return getApi()
      .getHazards()
      .filter((hazard) => ["OPEN", "IN_PROGRESS"].includes(hazard.status));
  }

  // Giao một hành động khắc phục.
  function assignCorrectiveAction(action) {
    return getApi().saveCorrectiveAction({
      ...action,
      status: action.status || "ASSIGNED",
      progress: Number(action.progress || 0),
    });
  }

  // Cập nhật trạng thái hazard.
  function updateHazardStatus(hazard, status) {
    return getApi().saveHazard({ ...hazard, status });
  }

  window.siteSafeSafety = {
    getOpenHazards,
    assignCorrectiveAction,
    updateHazardStatus,
  };
})(window);

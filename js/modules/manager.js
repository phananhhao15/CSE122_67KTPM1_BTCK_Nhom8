// Module nghiệp vụ dành cho quản lý công trường.
(function (window) {
  function getApi() {
    if (!window.siteSafeApi) {
      throw new Error("Cần nạp js/api.js trước manager.js");
    }
    return window.siteSafeApi;
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

  // Tạo số liệu tổng quan cho báo cáo.
  function getSafetySummary() {
    const hazards = getApi().getHazards();
    const actions = getCorrectiveActions();
    const completedActions = actions.filter(
      (action) => action.status === "COMPLETED" || action.progress === 100,
    ).length;
    return {
      totalHazards: hazards.length,
      criticalHazards: hazards.filter(
        (hazard) => hazard.riskLevel === "CRITICAL",
      ).length,
      completedActions,
      completionRate: actions.length
        ? Math.round((completedActions / actions.length) * 100)
        : 0,
    };
  }

  window.siteSafeManager = {
    getCorrectiveActions,
    updateCorrectiveProgress,
    getSafetySummary,
  };
})(window);

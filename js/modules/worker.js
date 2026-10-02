// Module nghiệp vụ dành cho công nhân hiện trường.
(function (window) {
  function getApi() {
    if (!window.siteSafeApi) {
      throw new Error("Cần nạp js/api.js trước worker.js");
    }
    return window.siteSafeApi;
  }

  // Gửi một hazard mới.
  function reportHazard(hazard) {
    return getApi().saveHazard({
      ...hazard,
      status: hazard.status || "OPEN",
      reportedAt: hazard.reportedAt || new Date().toISOString(),
    });
  }

  // Lưu kết quả checklist.
  function submitChecklist(result) {
    return getApi().saveChecklistResult({
      ...result,
      submittedAt: result.submittedAt || new Date().toISOString(),
    });
  }

  // Lấy các hazard do một worker gửi.
  function getMyHazards(reporter) {
    return getApi()
      .getHazards()
      .filter((hazard) => hazard.reportedBy === reporter);
  }

  window.siteSafeWorker = { reportHazard, submitChecklist, getMyHazards };
})(window);

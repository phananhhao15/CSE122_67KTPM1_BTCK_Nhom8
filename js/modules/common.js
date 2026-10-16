// Module nghiệp vụ dùng chung (Common: Notifications, Profile, Settings).
(function (window) {
  function getNotifications() {
    return JSON.parse(localStorage.getItem("siteSafeNotifications") || "[]");
  }

  function saveNotifications(notifications) {
    localStorage.setItem("siteSafeNotifications", JSON.stringify(notifications));
  }

  function markAllNotificationsRead() {
    const notifications = getNotifications().map(item => ({ ...item, read: true }));
    saveNotifications(notifications);
    return notifications;
  }

  window.siteSafeCommon = {
    getNotifications,
    saveNotifications,
    markAllNotificationsRead,
  };
})(window);

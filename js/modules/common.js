// Module nghiệp vụ dùng chung (Common: Notifications, Profile, Settings).
(function (window) {
  // Có api.js thì dùng thông báo chung (được đồng bộ lên MockAPI).
  function getApi() {
    return window.siteSafeApi && window.siteSafeApi.notifications ? window.siteSafeApi : null;
  }

  function getNotifications() {
    if (getApi()) return getApi().notifications.getAllSync();
    return JSON.parse(localStorage.getItem("siteSafeNotifications") || "[]");
  }

  function saveNotifications(notifications) {
    localStorage.setItem("siteSafeNotifications", JSON.stringify(notifications));
  }

  function markAllNotificationsRead() {
    if (getApi()) return getApi().notifications.markAllAsReadSync();
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

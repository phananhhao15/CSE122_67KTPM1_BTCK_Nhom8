// Module xác thực dùng chung cho các trang SiteSafe.
(function (window) {
  const sessionKey = "siteSafeUser";

  // Đọc người dùng hiện tại.
  function getCurrentUser() {
    try {
      return JSON.parse(localStorage.getItem(sessionKey) || "null");
    } catch (error) {
      localStorage.removeItem(sessionKey);
      return null;
    }
  }

  // Lưu phiên đăng nhập.
  function login(user) {
    localStorage.setItem(sessionKey, JSON.stringify(user));
    return user;
  }

  // Xóa phiên đăng nhập.
  function logout() {
    localStorage.removeItem(sessionKey);
  }

  // Kiểm tra người dùng có đúng role không.
  function hasRole(role) {
    const user = getCurrentUser();
    return Boolean(user && (role === "ANY" || user.role === role));
  }

  window.siteSafeAuth = { getCurrentUser, login, logout, hasRole };
})(window);

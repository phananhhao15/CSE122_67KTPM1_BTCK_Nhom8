const roleLabels = {
  ADMIN: "Quản trị viên",
  SAFETY_OFFICER: "Cán bộ an toàn",
  SITE_MANAGER: "Quản lý công trường",
  WORKER: "Công nhân hiện trường",
};

// Tính đường dẫn từ trang hiện tại về thư mục gốc dự án.
function getProjectRootPrefix() {
  const pathParts = window.location.pathname.split("/").filter(Boolean);
  const pagesIndex = pathParts.lastIndexOf("pages");

  if (pagesIndex < 0) {
    return "";
  }

  const depthInsidePages = pathParts.length - pagesIndex - 2;
  return "../".repeat(depthInsidePages + 1);
}

// Tải menu sidebar dùng chung nếu trang có phần tử .sidebar.
function loadSidebarMenu() {
  const sidebar = document.querySelector(".sidebar");

  if (!sidebar) {
    return;
  }

  const rootPrefix = getProjectRootPrefix();
  sidebar.innerHTML = `
    <a class="sidebar-brand" href="${rootPrefix}index.html">SiteSafe</a>
		<nav aria-label="Menu chính">
      <a href="${rootPrefix}pages/worker/worker-safety-checklist.html">Checklist an toàn</a>
      <a href="${rootPrefix}pages/worker/worker-hazard-create.html">Báo cáo nguy cơ</a>
      <a href="${rootPrefix}pages/worker/worker-my-hazards.html">Sự cố của tôi</a>
      <a href="${rootPrefix}pages/safety-officer/safety-dashboard.html">Safety Dashboard</a>
      <a href="${rootPrefix}pages/safety-officer/safety-inspection-management.html">Quản lý kiểm tra</a>
      <a href="${rootPrefix}pages/manager/manager-corrective-actions.html">Hành động khắc phục</a>
      <a href="${rootPrefix}pages/manager/manager-zone-risk-map.html">Bản đồ rủi ro</a>
      <a href="${rootPrefix}pages/admin/admin-user-management.html">Quản lý người dùng</a>
      <a href="${rootPrefix}pages/training/safety-training.html">Huấn luyện an toàn</a>
		</nav>
		<button class="sidebar-logout" type="button">Đăng xuất</button>
	`;

  sidebar
    .querySelector(".sidebar-logout")
    .addEventListener("click", logoutUser);
}

// Đọc phiên đăng nhập hiện tại.
function getCurrentUser() {
  const savedUser = localStorage.getItem("siteSafeUser");

  if (!savedUser) {
    return null;
  }

  try {
    return JSON.parse(savedUser);
  } catch (error) {
    localStorage.removeItem("siteSafeUser");
    return null;
  }
}

// Kiểm tra role mà trang hiện tại yêu cầu.
function checkAuthState() {
  const requiredRole = document.body.dataset.requiredRole;
  const currentUser = getCurrentUser();

  if (!requiredRole) {
    return currentUser;
  }

  if (!currentUser) {
    window.location.href = `${getProjectRootPrefix()}pages/auth/login.html`;
    return null;
  }

  if (requiredRole !== "ANY" && currentUser.role !== requiredRole) {
    window.location.href = `${getProjectRootPrefix()}index.html`;
    return null;
  }

  return currentUser;
}

// Xóa phiên và đưa người dùng về trang đăng nhập.
function logoutUser() {
  localStorage.removeItem("siteSafeUser");
  window.location.href = `${getProjectRootPrefix()}pages/auth/login.html`;
}

// Chạy các chức năng dùng chung khi trang đã sẵn sàng.
document.addEventListener("DOMContentLoaded", function () {
  loadSidebarMenu();
  const currentUser = checkAuthState();
  const userRoleElement = document.querySelector("[data-current-user-role]");

  if (userRoleElement && currentUser) {
    userRoleElement.textContent =
      roleLabels[currentUser.role] || currentUser.role;
  }
});

window.siteSafeMain = {
  checkAuthState,
  getCurrentUser,
  loadSidebarMenu,
  logoutUser,
};

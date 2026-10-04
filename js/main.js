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
  const currentUser = getCurrentUser();
  const navigationLinks = [
    {
      href: "pages/worker/worker-safety-checklist.html",
      label: "Checklist an toàn",
      roles: ["WORKER"],
    },
    {
      href: "pages/worker/worker-hazard-create.html",
      label: "Báo cáo nguy cơ",
      roles: ["WORKER"],
    },
    {
      href: "pages/worker/worker-my-hazards.html",
      label: "Sự cố của tôi",
      roles: ["WORKER"],
    },
    {
      href: "pages/safety-officer/safety-dashboard.html",
      label: "Safety Dashboard",
      roles: ["SAFETY_OFFICER"],
    },
    {
      href: "pages/safety-officer/safety-inspection-management.html",
      label: "Quản lý kiểm tra",
      roles: ["SAFETY_OFFICER"],
    },
    {
      href: "pages/manager/manager-safety-report.html",
      label: "Báo cáo an toàn",
      roles: ["SITE_MANAGER"],
    },
    {
      href: "pages/manager/manager-corrective-actions.html",
      label: "Hành động khắc phục",
      roles: ["SITE_MANAGER"],
    },
    {
      href: "pages/manager/manager-zone-risk-map.html",
      label: "Bản đồ rủi ro",
      roles: ["SITE_MANAGER"],
    },
    {
      href: "pages/admin/admin-user-management.html",
      label: "Quản lý người dùng",
      roles: ["ADMIN"],
    },
    {
      href: "pages/admin/admin-checklist-template-management.html",
      label: "Quản lý mẫu checklist",
      roles: ["ADMIN"],
    },
    {
      href: "pages/admin/admin-zone-management.html",
      label: "Quản lý khu vực",
      roles: ["ADMIN"],
    },
    {
      href: "pages/training/safety-training.html",
      label: "Huấn luyện an toàn",
      roles: ["WORKER", "SAFETY_OFFICER", "SITE_MANAGER", "ADMIN"],
    },
  ];
  const visibleLinks = navigationLinks
    .filter((link) => currentUser && link.roles.includes(currentUser.role))
    .map(
      (link) =>
        `<a href="${rootPrefix}${link.href}">${link.label}</a>`,
    )
    .join("");

  sidebar.innerHTML = `
    <a class="sidebar-brand" href="${rootPrefix}index.html">SiteSafe</a>
		<nav aria-label="Menu chính">
      ${visibleLinks}
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

const roleLabels = {
  ADMIN: "Quản trị viên",
  SAFETY_OFFICER: "Cán bộ an toàn",
  SITE_MANAGER: "Quản lý công trường",
  WORKER: "Công nhân hiện trường",
};

window.showCustomPrompt = function(message, defaultValue = "") {
  return new Promise((resolve) => {
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.zIndex = "9999";

    const modal = document.createElement("div");
    modal.style.backgroundColor = "white";
    modal.style.padding = "20px";
    modal.style.borderRadius = "8px";
    modal.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
    modal.style.width = "300px";
    modal.style.maxWidth = "90%";
    modal.style.fontFamily = "sans-serif";

    const msgEl = document.createElement("p");
    msgEl.textContent = message;
    msgEl.style.marginBottom = "10px";
    msgEl.style.marginTop = "0";
    
    const inputEl = document.createElement("input");
    inputEl.type = "text";
    inputEl.value = defaultValue;
    inputEl.style.width = "100%";
    inputEl.style.padding = "8px";
    inputEl.style.marginBottom = "15px";
    inputEl.style.border = "1px solid #ccc";
    inputEl.style.borderRadius = "4px";
    inputEl.style.boxSizing = "border-box";

    const btnContainer = document.createElement("div");
    btnContainer.style.display = "flex";
    btnContainer.style.justifyContent = "flex-end";
    btnContainer.style.gap = "10px";

    const okBtn = document.createElement("button");
    okBtn.textContent = "OK";
    okBtn.style.padding = "6px 12px";
    okBtn.style.backgroundColor = "var(--primary, #0056b3)";
    okBtn.style.color = "white";
    okBtn.style.border = "none";
    okBtn.style.borderRadius = "4px";
    okBtn.style.cursor = "pointer";

    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Hủy";
    cancelBtn.style.padding = "6px 12px";
    cancelBtn.style.backgroundColor = "#ccc";
    cancelBtn.style.color = "black";
    cancelBtn.style.border = "none";
    cancelBtn.style.borderRadius = "4px";
    cancelBtn.style.cursor = "pointer";

    btnContainer.appendChild(cancelBtn);
    btnContainer.appendChild(okBtn);

    modal.appendChild(msgEl);
    modal.appendChild(inputEl);
    modal.appendChild(btnContainer);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    inputEl.focus();

    const cleanup = () => {
      document.body.removeChild(overlay);
    };

    okBtn.addEventListener("click", () => {
      resolve(inputEl.value);
      cleanup();
    });

    cancelBtn.addEventListener("click", () => {
      resolve(null);
      cleanup();
    });

    inputEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        resolve(inputEl.value);
        cleanup();
      } else if (e.key === "Escape") {
        resolve(null);
        cleanup();
      }
    });
  });
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

// Menu theo vai trò, dùng cho thanh điều hướng trên cùng.
const roleMenus = {
  ADMIN: [
    ["pages/admin/admin-user-management.html", "Quản lý người dùng"],
    ["pages/admin/admin-zone-management.html", "Quản lý khu vực"],
    ["pages/admin/admin-checklist-template-management.html", "Mẫu checklist"],
    ["pages/training/safety-training.html", "Huấn luyện an toàn"],
  ],
  SITE_MANAGER: [
    ["pages/manager/manager-safety-report.html", "Báo cáo an toàn"],
    ["pages/manager/manager-corrective-actions.html", "Hành động khắc phục"],
    ["pages/manager/manager-zone-risk-map.html", "Bản đồ rủi ro"],
    ["pages/training/safety-training.html", "Huấn luyện an toàn"],
  ],
  SAFETY_OFFICER: [
    ["pages/safety-officer/safety-dashboard.html", "Safety Dashboard"],
    ["pages/safety-officer/safety-inspection-management.html", "Quản lý kiểm tra"],
    ["pages/training/safety-training.html", "Huấn luyện an toàn"],
  ],
  WORKER: [
    ["pages/worker/worker-safety-checklist.html", "Checklist an toàn"],
    ["pages/worker/worker-hazard-create.html", "Báo cáo nguy cơ"],
    ["pages/worker/worker-my-hazards.html", "Sự cố của tôi"],
    ["pages/training/safety-training.html", "Huấn luyện an toàn"],
  ],
};

// Trang không có .sidebar thì chèn thanh điều hướng + nút Đăng xuất ở đầu trang.
function loadTopNavigation() {
  const currentUser = getCurrentUser();

  if (
    document.querySelector(".sidebar") ||
    document.querySelector(".site-topnav") ||
    !document.body.dataset.requiredRole ||
    !currentUser
  ) {
    return;
  }

  const rootPrefix = getProjectRootPrefix();
  const currentPath = window.location.pathname;
  const links = (roleMenus[currentUser.role] || [])
    .map(function (item) {
      const isActive = currentPath.endsWith(item[0]);
      return `<a href="${rootPrefix}${item[0]}"${isActive ? ' aria-current="page" class="is-active"' : ""}>${item[1]}</a>`;
    })
    .join("");

  const style = document.createElement("style");
  style.textContent = `
    .site-topnav { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 16px; padding: 10px 24px; color: #fff; background: #1e293b; }
    .site-topnav .topnav-brand { margin-right: 8px; color: #fff; font-weight: 700; cursor: default; user-select: none; }
    .site-topnav nav { display: flex; flex: 1; flex-wrap: wrap; gap: 4px 8px; }
    .site-topnav nav a { padding: 6px 10px; color: #cbd5e1; border-radius: 6px; font-size: 0.92rem; text-decoration: none; }
    .site-topnav nav a:hover, .site-topnav nav a.is-active { color: #fff; background: rgb(255 255 255 / 14%); }
    .site-topnav .topnav-role { color: #94a3b8; font-size: 0.85rem; }
    .site-topnav .topnav-logout { padding: 6px 12px; color: #fff; background: #ef4444; border: 0; border-radius: 6px; cursor: pointer; font: inherit; font-size: 0.9rem; }
    @media (max-width: 700px) { .site-topnav { padding: 10px 16px; } }`;
  document.head.appendChild(style);

  const topNav = document.createElement("header");
  topNav.className = "site-topnav";
  topNav.innerHTML = `
    <span class="topnav-brand">SiteSafe</span>
    <nav aria-label="Menu chính">${links}</nav>
    <span class="topnav-role">${roleLabels[currentUser.role] || currentUser.role}</span>
    <button class="topnav-logout" type="button">Đăng xuất</button>`;
  topNav
    .querySelector(".topnav-logout")
    .addEventListener("click", logoutUser);
  document.body.insertBefore(topNav, document.body.firstChild);
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
  loadTopNavigation();
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

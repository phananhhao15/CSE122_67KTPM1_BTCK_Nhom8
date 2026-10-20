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

// Menu dùng chung cho mọi vai trò (thứ tự hiển thị trong sidebar).
const navigationLinks = [
  {
    href: "pages/worker/worker-safety-checklist.html",
    label: "Kiểm tra an toàn",
    icon: "checklist",
    roles: ["WORKER"],
  },
  {
    href: "pages/worker/worker-hazard-create.html",
    label: "Báo cáo nguy cơ",
    icon: "alert",
    roles: ["WORKER"],
  },
  {
    href: "pages/worker/worker-my-hazards.html",
    label: "Sự cố của tôi",
    icon: "file",
    roles: ["WORKER"],
  },
  {
    href: "pages/safety-officer/safety-dashboard.html",
    label: "Safety Dashboard",
    icon: "dashboard",
    roles: ["SAFETY_OFFICER"],
  },
  {
    href: "pages/safety-officer/safety-inspection-management.html",
    label: "Quản lý kiểm tra",
    icon: "checklist",
    roles: ["SAFETY_OFFICER"],
  },
  {
    href: "pages/manager/manager-safety-report.html",
    label: "Báo cáo an toàn",
    icon: "chart",
    roles: ["SITE_MANAGER"],
  },
  {
    href: "pages/manager/manager-corrective-actions.html",
    label: "Hành động khắc phục",
    icon: "wrench",
    roles: ["SITE_MANAGER"],
  },
  {
    href: "pages/manager/manager-zone-risk-map.html",
    label: "Bản đồ rủi ro",
    icon: "map",
    roles: ["SITE_MANAGER"],
  },
  {
    href: "pages/admin/admin-user-management.html",
    label: "Quản lý người dùng",
    icon: "users",
    roles: ["ADMIN"],
  },
  {
    href: "pages/admin/admin-checklist-template-management.html",
    label: "Quản lý mẫu checklist",
    icon: "list",
    roles: ["ADMIN"],
  },
  {
    href: "pages/admin/admin-zone-management.html",
    label: "Quản lý khu vực",
    icon: "pin",
    roles: ["ADMIN"],
  },
  {
    href: "pages/training/safety-training.html",
    label: "Huấn luyện an toàn",
    icon: "cap",
    roles: ["WORKER", "SAFETY_OFFICER", "SITE_MANAGER", "ADMIN"],
  },
];

// Tên nhóm menu theo vai trò và tên khu vực trên breadcrumb theo thư mục trang.
const navGroupLabels = {
  WORKER: "Công việc hiện trường",
  SAFETY_OFFICER: "Giám sát an toàn",
  SITE_MANAGER: "Quản lý công trường",
  ADMIN: "Quản trị hệ thống",
};
const sectionLabels = {
  worker: "Công việc",
  "safety-officer": "Giám sát an toàn",
  manager: "Quản lý công trường",
  admin: "Quản trị hệ thống",
  common: "Tài khoản",
  training: "Đào tạo",
};

// Icon nét 24x24 cho sidebar/topbar (cùng bộ với trang worker).
const shellIcons = {
  home: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  checklist: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="m9 12 2 2 4-4"/><path d="M9 3v2h6V3"/>',
  alert: '<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h5"/>',
  dashboard: '<path d="M3 13h8V3H3z"/><path d="M13 21h8V11h-8z"/><path d="M13 3v6h8V3z"/><path d="M3 21h8v-6H3z"/>',
  chart: '<path d="M3 3v18h18"/><path d="M7 15v2"/><path d="M11 11v6"/><path d="M15 7v10"/><path d="M19 12v5"/>',
  wrench: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z"/>',
  map: '<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14"/><path d="M15 6v14"/>',
  users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  list: '<path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  cap: '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  bell: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  chevron: '<path d="m9 18 6-6-6-6"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>',
};

function shellIcon(name, size) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${shellIcons[name]}</svg>`;
}

// Chữ viết tắt cho avatar: chữ đầu của từ đầu và từ cuối trong tên.
function getUserInitials(name) {
  const words = String(name || "").trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "U";
  const last = words.length > 1 ? words[words.length - 1].charAt(0) : "";
  return (words[0].charAt(0) + last).toUpperCase();
}

// Dựng sidebar + topbar kiểu .wcl- (giống trang checklist) cho các trang dùng khung cũ
// <div class="app-layout"> <aside class="sidebar"> <header class="topbar"> <div class="page-content">.
// Trang worker đã viết sẵn khung .wcl- trong HTML nên không có .sidebar và được bỏ qua.
function loadSidebarMenu() {
  const layout = document.querySelector(".app-layout");
  const sidebar = layout && layout.querySelector(".sidebar");

  if (!sidebar) {
    return;
  }

  const rootPrefix = getProjectRootPrefix();
  const currentUser = getCurrentUser();
  const role = currentUser ? currentUser.role : "";
  const currentPath = window.location.pathname.replace(/\\/g, "/");
  const pathParts = currentPath.split("/").filter(Boolean);
  const folder = pathParts[pathParts.lastIndexOf("pages") + 1] || "";

  const navItems = navigationLinks
    .filter((link) => link.roles.includes(role))
    .map((link) => {
      const isActive = currentPath.endsWith(link.href);
      return `<a class="wcl-nav__link${isActive ? " is-active" : ""}" href="${rootPrefix}${link.href}"${isActive ? ' aria-current="page"' : ""}>${shellIcon(link.icon, 20)}${link.label}</a>`;
    })
    .join("");

  // Đổi class khung cũ sang khung .wcl- để dùng chung CSS trong css/shell.css
  layout.className = "wcl-app";
  layout.id = layout.id || "wclApp";
  sidebar.className = "wcl-sidebar";
  sidebar.id = sidebar.id || "wclSidebar";
  const mainContent = layout.querySelector(".main-content");
  const topbar = layout.querySelector(".topbar");
  const pageContent = layout.querySelector(".page-content");
  if (mainContent) mainContent.className = "wcl-main";
  if (pageContent) pageContent.className = "wcl-content";

  sidebar.innerHTML = `
    <a class="wcl-brand" href="${rootPrefix}index.html" aria-label="SiteSafe - Trang chủ">
      ${shellIcon("shield", 34)}<span>site<em>safe</em></span>
    </a>
    <nav class="wcl-nav" aria-label="Menu chính">
      <a class="wcl-nav__link" href="${rootPrefix}index.html">${shellIcon("home", 20)}Trang chủ</a>
      ${navItems ? `<p class="wcl-nav__label">${navGroupLabels[role] || "Công việc"}</p>${navItems}` : ""}
    </nav>
    <div class="wcl-sidebar-user">
      <span class="wcl-avatar" data-shell-initials aria-hidden="true"></span>
      <div class="wcl-sidebar-user__meta">
        <span class="wcl-sidebar-user__name" data-shell-name></span>
        <span class="wcl-sidebar-user__role" data-current-user-role></span>
      </div>
      <button class="wcl-sidebar-user__logout" type="button" aria-label="Đăng xuất" title="Đăng xuất">${shellIcon("logout", 18)}</button>
    </div>
  `;

  const backdrop = document.createElement("button");
  backdrop.className = "wcl-backdrop";
  backdrop.type = "button";
  backdrop.tabIndex = -1;
  backdrop.setAttribute("aria-label", "Đóng menu");
  sidebar.insertAdjacentElement("afterend", backdrop);

  if (topbar) {
    const pageTitle = document.title.split("|")[0].trim();
    topbar.className = "wcl-topbar";
    topbar.innerHTML = `
      <button class="wcl-icon-btn wcl-menu-btn" type="button" aria-label="Mở menu" aria-controls="${sidebar.id}" aria-expanded="false">${shellIcon("menu", 20)}</button>
      <nav aria-label="Breadcrumb">
        <ol class="wcl-breadcrumb">
          <li>${sectionLabels[folder] || "SiteSafe"} ${shellIcon("chevron", 16)}</li>
          <li aria-current="page" data-shell-title></li>
        </ol>
      </nav>
      <span class="wcl-topbar-spacer" aria-hidden="true"></span>
      <a class="wcl-icon-btn" href="${rootPrefix}pages/common/notifications.html" aria-label="Thông báo">${shellIcon("bell", 20)}</a>
      <a class="wcl-topbar-user" href="${rootPrefix}pages/common/profile.html" aria-label="Hồ sơ cá nhân">
        <span class="wcl-avatar" data-shell-initials aria-hidden="true"></span>
        <span class="wcl-topbar-user__meta">
          <span class="wcl-topbar-user__name" data-shell-name></span>
          <span class="wcl-topbar-user__role" data-current-user-role></span>
        </span>
      </a>
    `;
    topbar.querySelector("[data-shell-title]").textContent = pageTitle;

    const menuButton = topbar.querySelector(".wcl-menu-btn");
    const setNavOpen = (isOpen) => {
      layout.classList.toggle("is-nav-open", isOpen);
      menuButton.setAttribute("aria-expanded", String(isOpen));
    };
    menuButton.addEventListener("click", () => setNavOpen(!layout.classList.contains("is-nav-open")));
    backdrop.addEventListener("click", () => setNavOpen(false));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setNavOpen(false);
    });
  }

  // Dữ liệu người dùng lấy từ localStorage nên gán bằng textContent (tránh chèn HTML)
  const displayName = currentUser ? currentUser.fullName || currentUser.email || "Người dùng" : "Khách";
  layout.querySelectorAll("[data-shell-name]").forEach((el) => { el.textContent = displayName; });
  layout.querySelectorAll("[data-shell-initials]").forEach((el) => { el.textContent = getUserInitials(displayName); });

  sidebar
    .querySelector(".wcl-sidebar-user__logout")
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

// main.js nạp ở cuối <body> nên dựng khung ngay để tránh nháy giao diện cũ.
if (document.readyState === "loading") {
  loadSidebarMenu();
}

// Chạy các chức năng dùng chung khi trang đã sẵn sàng.
document.addEventListener("DOMContentLoaded", function () {
  loadSidebarMenu();
  const currentUser = checkAuthState();

  if (currentUser) {
    document.querySelectorAll("[data-current-user-role]").forEach((el) => {
      el.textContent = roleLabels[currentUser.role] || currentUser.role;
    });
  }
});

window.siteSafeMain = {
  checkAuthState,
  getCurrentUser,
  loadSidebarMenu,
  logoutUser,
};

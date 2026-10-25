// ==========================================================================
// Module Xác thực & Route Guard SiteSafe (Hào phụ trách)
// Đợt 1: Auth & Session Management
// ==========================================================================
(function (window) {
  "use strict";

  const SESSION_KEY = "siteSafeUser";

  function getApi() {
    if (!window.siteSafeApi) {
      throw new Error("Cần nạp js/api.js trước khi nạp js/modules/auth.js");
    }
    return window.siteSafeApi;
  }

  // Đọc phiên người dùng hiện tại từ LocalStorage
  function getCurrentUser() {
    try {
      const savedUser = localStorage.getItem(SESSION_KEY);
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
  }

  // Lưu phiên người dùng hiện tại vào LocalStorage
  function setCurrentUser(user) {
    if (!user) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
    const sessionData = {
      id: user.id || "USR-GUEST",
      fullName: user.fullName || user.email.split("@")[0],
      email: user.email,
      role: user.role,
      roleLabel: user.roleLabel || user.role,
      avatar: user.avatar || "",
      lastLogin: new Date().toISOString(),
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
    return sessionData;
  }

  // Xóa phiên đăng nhập và chuyển hướng về trang login
  function logout() {
    // 1. Gọi hàm logout của API nếu api.js hỗ trợ
    const api = window.siteSafeApi;
    if (api && typeof api.logout === "function") {
      try {
        api.logout();
      } catch (e) {
        // bỏ qua nếu api.logout gặp lỗi
      }
    }

    // 2. Gọi hàm logout dùng chung của main.js nếu có
    if (window.siteSafeMain && typeof window.siteSafeMain.logoutUser === "function") {
      window.siteSafeMain.logoutUser();
      return;
    }

    // 3. Xóa session thủ công và điều hướng
    localStorage.removeItem(SESSION_KEY);
    const pathParts = window.location.pathname.split("/").filter(Boolean);
    const pagesIndex = pathParts.lastIndexOf("pages");
    let prefix = "";
    if (pagesIndex >= 0) {
      const depth = pathParts.length - pagesIndex - 2;
      prefix = "../".repeat(depth + 1);
    }
    window.location.href = `${prefix}pages/auth/login.html`;
  }

  // Kiểm tra người dùng có đúng vai trò hay không
  function hasRole(role) {
    const user = getCurrentUser();
    if (!user) return false;
    if (!role || role === "ANY") return true;
    if (Array.isArray(role)) return role.includes(user.role);
    return user.role === role;
  }

  /**
   * Route Guard: Kiểm tra đăng nhập và quyền truy cập của trang.
   * Đưa ra global duy nhất (window.requireAuth) để bảo vệ các trang nghiệp vụ.
   *
   * @param {string|string[]} [allowedRoles] - Vai trò được phép (VD: 'WORKER' hoặc ['ADMIN', 'SAFETY_OFFICER']).
   * @returns {object|null} Trả về đối tượng user nếu hợp lệ; nếu không hợp lệ sẽ tự động chuyển hướng.
   */
  function requireAuth(allowedRoles) {
    const user = getCurrentUser();

    // 1. Tính toán đường dẫn tương đối tới login.html
    const pathParts = window.location.pathname.split("/").filter(Boolean);
    const pagesIndex = pathParts.lastIndexOf("pages");
    let prefix = "";
    if (pagesIndex >= 0) {
      const depth = pathParts.length - pagesIndex - 2;
      prefix = "../".repeat(depth + 1);
    }

    // 2. Chưa đăng nhập -> Chuyển về login.html kèm param ?next=
    if (!user) {
      const currentRelativePath = window.location.pathname + window.location.search;
      window.location.href = `${prefix}pages/auth/login.html?next=${encodeURIComponent(currentRelativePath)}`;
      return null;
    }

    // 3. Kiểm tra phân quyền vai trò (Role check)
    if (allowedRoles) {
      const rolesArray = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
      if (!rolesArray.includes("ANY") && !rolesArray.includes(user.role)) {
        // Sai vai trò -> Chuyển về trang phù hợp hoặc trang chủ
        window.location.href = `${prefix}index.html`;
        return null;
      }
    }

    return user;
  }

  const DEFAULT_USERS = [
    {
      id: "USR-001",
      fullName: "Nguyễn Minh Anh",
      email: "admin@sitesafe.test",
      password: "password123",
      role: "ADMIN",
      roleLabel: "Quản trị viên",
      phone: "0901234567",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
      status: "ACTIVE",
      createdAt: "2026-01-10T00:00:00.000Z",
    },
    {
      id: "USR-002",
      fullName: "Trần Huy Hoàng",
      email: "antoan.hoang@sitesafe.test",
      password: "password123",
      role: "SAFETY_OFFICER",
      roleLabel: "Cán bộ an toàn",
      phone: "0912345678",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=120&q=80",
      status: "ACTIVE",
      createdAt: "2026-01-12T00:00:00.000Z",
    },
    {
      id: "USR-003",
      fullName: "Phạm Minh Quân",
      email: "quan.pm@sitesafe.test",
      password: "password123",
      role: "SITE_MANAGER",
      roleLabel: "Quản lý công trường",
      phone: "0923456789",
      avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=120&q=80",
      status: "ACTIVE",
      createdAt: "2026-01-15T00:00:00.000Z",
    },
    {
      id: "USR-004",
      fullName: "Phan Anh Hào",
      email: "hao.pa@sitesafe.test",
      password: "password123",
      role: "WORKER",
      roleLabel: "Công nhân hiện trường",
      phone: "0945678901",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
      status: "ACTIVE",
      createdAt: "2026-02-05T00:00:00.000Z",
    },
    {
      id: "USR-005",
      fullName: "Trần Quốc Huy",
      email: "huy.tq@sitesafe.test",
      password: "password123",
      role: "WORKER",
      roleLabel: "Công nhân hiện trường",
      phone: "0934567890",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
      status: "ACTIVE",
      createdAt: "2026-02-01T00:00:00.000Z",
    },
  ];

  // Lấy danh sách users từ api.js, khởi tạo người dùng mặc định qua api.saveUser nếu danh sách trống
  async function fetchUsers() {
    const api = getApi();
    let users = api.getUsers();
    if (!Array.isArray(users) || users.length === 0) {
      DEFAULT_USERS.forEach(function (user) {
        api.saveUser(user);
      });
      users = api.getUsers();
    }
    return users;
  }

  /**
   * Đăng nhập người dùng qua dữ liệu api.js
   * @param {object} params
   * @param {string} params.emailOrUsername - Địa chỉ email hoặc tên người dùng
   * @param {string} params.password - Mật khẩu
   * @param {string} [params.role] - Vai trò đã chọn ở bước wizard (nếu có)
   */
  async function login({ emailOrUsername, password, role }) {
    if (!emailOrUsername || !password) {
      throw new Error("Vui lòng nhập đầy đủ thông tin đăng nhập và mật khẩu.");
    }

    const cleanAccount = String(emailOrUsername).trim().toLowerCase();
    const cleanPass = String(password).trim();
    const cleanRole = role ? String(role).trim().toUpperCase() : "";

    const users = await fetchUsers();

    // Tìm kiếm theo email hoặc fullName/id
    const matchedUser = users.find(function (u) {
      if (!u) return false;
      const uEmail = (u.email || "").toLowerCase();
      const uName = (u.fullName || "").toLowerCase();
      const uId = (u.id || "").toLowerCase();
      return uEmail === cleanAccount || uName === cleanAccount || uId === cleanAccount;
    });

    if (!matchedUser) {
      throw new Error("Tài khoản hoặc mật khẩu không chính xác. Vui lòng kiểm tra lại.");
    }

    // Kiểm tra mật khẩu
    if (!matchedUser.password || matchedUser.password !== cleanPass) {
      throw new Error("Tài khoản hoặc mật khẩu không chính xác. Vui lòng kiểm tra lại.");
    }

    // Kiểm tra trạng thái tài khoản
    if (matchedUser.status === "LOCKED" || matchedUser.status === "INACTIVE") {
      throw new Error("Tài khoản của bạn hiện đang bị khóa hoặc tạm dừng hoạt động. Vui lòng liên hệ Quản trị viên.");
    }

    // Kiểm tra vai trò nếu người dùng đã chọn vai trò cụ thể ở bước chọn role
    if (cleanRole && matchedUser.role && matchedUser.role !== cleanRole) {
      const roleMap = {
        WORKER: "Công nhân hiện trường",
        SAFETY_OFFICER: "Cán bộ an toàn",
        SITE_MANAGER: "Quản lý công trường",
        ADMIN: "Quản trị viên",
      };
      const expectedName = roleMap[cleanRole] || cleanRole;
      const actualName = roleMap[matchedUser.role] || matchedUser.role;
      throw new Error(
        `Tài khoản này thuộc vai trò "${actualName}", không khớp với vai trò "${expectedName}" bạn đã chọn.`
      );
    }

    // Cập nhật thời gian đăng nhập lastLogin qua api.js
    const updatedUser = {
      ...matchedUser,
      lastLogin: new Date().toISOString(),
    };
    try {
      getApi().saveUser(updatedUser);
    } catch (e) {
      // bỏ qua nếu lưu lastLogin thất bại
    }

    // Lưu session và trả về
    return setCurrentUser(updatedUser);
  }

  // Tài khoản demo: mỗi vai trò một tài khoản có sẵn trong DEFAULT_USERS
  const DEMO_EMAILS = {
    WORKER: "hao.pa@sitesafe.test",
    SAFETY_OFFICER: "antoan.hoang@sitesafe.test",
    SITE_MANAGER: "quan.pm@sitesafe.test",
    ADMIN: "admin@sitesafe.test",
  };

  /**
   * Đăng nhập nhanh bằng tài khoản demo của một vai trò (nút demo ở trang đăng nhập / trang chủ).
   * Dữ liệu trên MockAPI có thể bị sửa (đổi mật khẩu, khóa tài khoản) khi demo, nên nếu đăng nhập
   * thường thất bại thì tạo phiên trực tiếp từ DEFAULT_USERS để buổi demo không bị gián đoạn.
   * @param {string} role - WORKER | SAFETY_OFFICER | SITE_MANAGER | ADMIN
   */
  async function loginDemo(role) {
    const email = DEMO_EMAILS[role];
    const demoUser = DEFAULT_USERS.find(function (u) {
      return u.email === email;
    });
    if (!demoUser) {
      throw new Error("Không có tài khoản demo cho vai trò này.");
    }

    try {
      return await login({ emailOrUsername: demoUser.email, password: demoUser.password, role: role });
    } catch (error) {
      return setCurrentUser(demoUser);
    }
  }

  /**
   * Đăng ký tài khoản người dùng mới qua api.js
   */
  async function register({ fullName, email, password, role, phone }) {
    if (!fullName || !fullName.trim()) {
      throw new Error("Họ và tên không được để trống.");
    }
    if (!email || !email.includes("@")) {
      throw new Error("Địa chỉ email không hợp lệ.");
    }
    if (!password || password.length < 6) {
      throw new Error("Mật khẩu phải có ít nhất 6 ký tự.");
    }

    const cleanEmail = email.trim().toLowerCase();
    const users = await fetchUsers();
    const exists = users.some(function (u) {
      return u && u.email && u.email.toLowerCase() === cleanEmail;
    });

    if (exists) {
      throw new Error("Email này đã tồn tại trong hệ thống. Vui lòng sử dụng email khác hoặc đăng nhập.");
    }

    const assignedRole = role || "WORKER";
    const roleLabels = {
      WORKER: "Công nhân hiện trường",
      SAFETY_OFFICER: "Cán bộ an toàn",
      SITE_MANAGER: "Quản lý công trường",
      ADMIN: "Quản trị viên",
    };

    const newUser = {
      fullName: fullName.trim(),
      email: cleanEmail,
      password: password.trim(),
      phone: phone ? phone.trim() : "",
      role: assignedRole,
      roleLabel: roleLabels[assignedRole] || assignedRole,
      status: "ACTIVE",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    };

    return getApi().saveUser(newUser);
  }

  /**
   * Xử lý Quên mật khẩu: Trả về thông báo TRUNG TÍNH (neutral response),
   * không để lộ email có tồn tại trong hệ thống hay không để bảo mật.
   */
  async function forgotPassword(email) {
    if (!email || !email.includes("@")) {
      throw new Error("Vui lòng nhập địa chỉ email hợp lệ.");
    }

    // Mô phỏng độ trễ kiểm tra hệ thống (400ms)
    await new Promise(function (resolve) {
      setTimeout(resolve, 400);
    });

    const cleanEmail = email.trim().toLowerCase();
    const users = await fetchUsers();
    const user = users.find(function (u) {
      return u && u.email && u.email.toLowerCase() === cleanEmail;
    });

    // Nếu user tồn tại, ghi nhận log hoặc cập nhật OTP demo
    if (user) {
      try {
        getApi().saveUser({
          ...user,
          resetRequestedAt: new Date().toISOString(),
        });
      } catch (e) {
        // bỏ qua
      }
    }

    // Luôn trả về thông điệp trung tính để bảo vệ quyền riêng tư người dùng
    return {
      success: true,
      message: "Nếu địa chỉ email này tồn tại trong hệ thống SiteSafe, hướng dẫn đặt lại mật khẩu đã được gửi đến hộp thư của bạn. Vui lòng kiểm tra hòm thư (kể cả thư mục Spam).",
    };
  }

  // Đặt lại mật khẩu mới (Reset Password)
  async function resetPassword(email, newPassword) {
    if (!newPassword || newPassword.length < 6) {
      throw new Error("Mật khẩu mới phải có ít nhất 6 ký tự.");
    }
    const cleanEmail = email.trim().toLowerCase();
    const users = await fetchUsers();
    const user = users.find(function (u) {
      return u && u.email && u.email.toLowerCase() === cleanEmail;
    });

    if (!user) {
      throw new Error("Không tìm thấy thông tin tài khoản để đặt lại mật khẩu.");
    }

    const updated = {
      ...user,
      password: newPassword.trim(),
    };
    getApi().saveUser(updated);
    return updated;
  }

  // Xuất các hàm ra namespace window.siteSafeAuth
  window.siteSafeAuth = {
    getCurrentUser,
    setCurrentUser,
    login,
    loginDemo,
    logout,
    register,
    forgotPassword,
    resetPassword,
    hasRole,
    requireAuth,
    fetchUsers,
  };

  // Đưa hàm Route Guard duy nhất ra global theo yêu cầu
  window.requireAuth = requireAuth;
})(window);

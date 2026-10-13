// Module nghiệp vụ dành cho Quản trị viên (Admin).
(function (window) {
  function getApi() {
    if (!window.siteSafeApi) {
      throw new Error("Cần nạp js/api.js trước admin.js");
    }
    return window.siteSafeApi;
  }

  function getDataPath(filename) {
    if (
      window.siteSafeMain &&
      typeof window.siteSafeMain.getProjectRootPrefix === "function"
    ) {
      return `${window.siteSafeMain.getProjectRootPrefix()}assets/data/${filename}`;
    }
    return `../../assets/data/${filename}`;
  }

  // Tải danh sách người dùng từ assets/data/users.json và đồng bộ LocalStorage.
  async function loadUsers() {
    try {
      const res = await fetch(getDataPath("users.json"));
      if (res.ok) {
        const users = await res.json();
        const api = getApi();
        const localUsers = api.getUsers();
        if (!localUsers || localUsers.length === 0) {
          users.forEach((u) => api.saveUser(u));
          return users;
        }
        const localIds = new Set(localUsers.map((u) => u.id));
        let added = false;
        users.forEach((u) => {
          if (!localIds.has(u.id)) {
            api.saveUser(u);
            added = true;
          }
        });
        return added ? api.getUsers() : localUsers;
      }
    } catch (e) {
      console.warn("Không thể tải users.json từ máy chủ/tệp cục bộ:", e);
    }
    return getApi().getUsers();
  }

  function getAllUsers() {
    return getApi().getUsers();
  }

  function saveUser(user) {
    return getApi().saveUser(user);
  }

  function deleteUser(id) {
    return getApi().deleteUser(id);
  }

  // Tải danh mục khu vực từ assets/data/zones.json và đồng bộ LocalStorage.
  async function loadZones() {
    try {
      const res = await fetch(getDataPath("zones.json"));
      if (res.ok) {
        const zones = await res.json();
        const api = getApi();
        const localZones = api.getZones();
        if (!localZones || localZones.length === 0) {
          zones.forEach((z) => api.saveZone(z));
          return zones;
        }
        const localCodes = new Set(localZones.map((z) => z.code || z.id));
        let added = false;
        zones.forEach((z) => {
          if (!localCodes.has(z.code) && !localCodes.has(z.id)) {
            api.saveZone(z);
            added = true;
          }
        });
        return added ? api.getZones() : localZones;
      }
    } catch (e) {
      console.warn("Không thể tải zones.json từ máy chủ/tệp cục bộ:", e);
    }
    return getApi().getZones();
  }

  function getAllZones() {
    return getApi().getZones();
  }

  function saveZone(zone) {
    return getApi().saveZone(zone);
  }

  function deleteZone(id) {
    return getApi().deleteZone(id);
  }

  // Tải danh mục mẫu checklist từ assets/data/checklists.json và đồng bộ LocalStorage.
  async function loadChecklists() {
    try {
      const res = await fetch(getDataPath("checklists.json"));
      if (res.ok) {
        const data = await res.json();
        const templates = Array.isArray(data) ? data : data.templates || [];
        const api = getApi();
        const localChecklists = api.getChecklists();
        if (!localChecklists || localChecklists.length === 0) {
          templates.forEach((t) =>
            api.saveChecklist({
              id: t.id,
              question: t.question,
              note: t.note,
              title: t.question,
              workType: t.workType,
              isRequired: t.isRequired,
              status: t.status || "ACTIVE",
            }),
          );
          return api.getChecklists();
        }
        const localIds = new Set(localChecklists.map((c) => c.id));
        let added = false;
        templates.forEach((t) => {
          if (!localIds.has(t.id)) {
            api.saveChecklist({
              id: t.id,
              question: t.question,
              note: t.note,
              title: t.question,
              workType: t.workType,
              isRequired: t.isRequired,
              status: t.status || "ACTIVE",
            });
            added = true;
          }
        });
        return added ? api.getChecklists() : localChecklists;
      }
    } catch (e) {
      console.warn("Không thể tải checklists.json từ máy chủ/tệp cục bộ:", e);
    }
    return getApi().getChecklists();
  }

  function getAllChecklists() {
    return getApi().getChecklists();
  }

  function saveChecklist(checklist) {
    return getApi().saveChecklist(checklist);
  }

  function deleteChecklist(id) {
    return getApi().deleteChecklist(id);
  }

  window.siteSafeAdmin = {
    loadUsers,
    getAllUsers,
    saveUser,
    deleteUser,
    loadZones,
    getAllZones,
    saveZone,
    deleteZone,
    loadChecklists,
    getAllChecklists,
    saveChecklist,
    deleteChecklist,
  };
})(window);


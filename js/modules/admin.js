// Module nghiệp vụ dành cho Quản trị viên (Admin).
(function (window) {
  function getApi() {
    if (!window.siteSafeApi) {
      throw new Error("Cần nạp js/api.js trước admin.js");
    }
    return window.siteSafeApi;
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

  function getAllZones() {
    return getApi().getZones();
  }

  function saveZone(zone) {
    return getApi().saveZone(zone);
  }

  function deleteZone(id) {
    return getApi().deleteZone(id);
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
    getAllUsers,
    saveUser,
    deleteUser,
    getAllZones,
    saveZone,
    deleteZone,
    getAllChecklists,
    saveChecklist,
    deleteChecklist,
  };
})(window);

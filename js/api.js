const SITE_SAFE_DATA_KEY = "siteSafeData";

// Đọc dữ liệu chung từ LocalStorage.
function getStoredData() {
  const savedData = localStorage.getItem(SITE_SAFE_DATA_KEY);

  if (!savedData) {
    return {
      users: [],
      hazards: [],
      zones: [],
      checklists: [],
      inspections: [],
      correctiveActions: [],
      checklistResults: [],
    };
  }

  try {
    const data = JSON.parse(savedData);
    return {
      users: Array.isArray(data.users) ? data.users : [],
      hazards: Array.isArray(data.hazards) ? data.hazards : [],
      zones: Array.isArray(data.zones) ? data.zones : [],
      checklists: Array.isArray(data.checklists) ? data.checklists : [],
      inspections: Array.isArray(data.inspections) ? data.inspections : [],
      correctiveActions: Array.isArray(data.correctiveActions)
        ? data.correctiveActions
        : [],
      checklistResults: Array.isArray(data.checklistResults)
        ? data.checklistResults
        : [],
    };
  } catch (error) {
    return {
      users: [],
      hazards: [],
      zones: [],
      checklists: [],
      inspections: [],
      correctiveActions: [],
      checklistResults: [],
    };
  }
}

// Lưu dữ liệu chung vào LocalStorage.
function saveStoredData(data) {
  localStorage.setItem(SITE_SAFE_DATA_KEY, JSON.stringify(data));
}

// Lấy danh sách sự cố đã lưu.
function getHazards() {
  return getStoredData().hazards;
}

// Thêm mới hoặc cập nhật một sự cố.
function saveHazard(hazard) {
  const data = getStoredData();
  const hazardToSave = {
    ...hazard,
    id: hazard.id || `HZ-${Date.now()}`,
  };
  const existingIndex = data.hazards.findIndex(
    (item) => item.id === hazardToSave.id,
  );

  if (existingIndex >= 0) {
    data.hazards[existingIndex] = hazardToSave;
  } else {
    data.hazards.push(hazardToSave);
  }

  saveStoredData(data);
  return hazardToSave;
}

// Xóa một sự cố theo id.
function deleteHazard(id) {
  deleteCollectionItem("hazards", id);
}

// Lấy danh sách tài khoản người dùng.
function getUsers() {
  return getStoredData().users;
}

// Thêm hoặc cập nhật một tài khoản.
function saveUser(user) {
  return saveCollectionItem("users", user, "USR");
}

// Xóa một tài khoản theo id.
function deleteUser(id) {
  deleteCollectionItem("users", id);
}

// Lấy một danh sách dữ liệu theo tên.
function getCollection(collectionName) {
  return getStoredData()[collectionName] || [];
}

// Thêm hoặc cập nhật một bản ghi trong danh sách.
function saveCollectionItem(collectionName, item, prefix) {
  const data = getStoredData();
  const collection = data[collectionName] || [];
  const itemToSave = { ...item, id: item.id || `${prefix}-${Date.now()}` };
  const index = collection.findIndex(
    (currentItem) => currentItem.id === itemToSave.id,
  );

  if (index >= 0) {
    collection[index] = itemToSave;
  } else {
    collection.push(itemToSave);
  }

  data[collectionName] = collection;
  saveStoredData(data);
  return itemToSave;
}

// Xóa một bản ghi theo id.
function deleteCollectionItem(collectionName, id) {
  const data = getStoredData();
  data[collectionName] = (data[collectionName] || []).filter(
    (item) => item.id !== id,
  );
  saveStoredData(data);
}

// Lấy danh sách các khu vực công trường.
function getZones() {
  return getCollection("zones");
}

// Lưu một khu vực công trường.
function saveZone(zone) {
  return saveCollectionItem("zones", zone, "ZONE");
}

// Xóa một khu vực công trường.
function deleteZone(id) {
  deleteCollectionItem("zones", id);
}

// Lấy danh sách mẫu checklist.
function getChecklists() {
  return getCollection("checklists");
}

// Lưu một mẫu checklist.
function saveChecklist(checklist) {
  return saveCollectionItem("checklists", checklist, "CL");
}

// Xóa một mẫu checklist.
function deleteChecklist(id) {
  deleteCollectionItem("checklists", id);
}

// Lấy lịch kiểm tra an toàn.
function getInspections() {
  return getCollection("inspections");
}

// Lưu một đợt kiểm tra.
function saveInspection(inspection) {
  return saveCollectionItem("inspections", inspection, "IN");
}

// Xóa một đợt kiểm tra theo id.
function deleteInspection(id) {
  deleteCollectionItem("inspections", id);
}

// Lấy các hành động khắc phục.
function getCorrectiveActions() {
  return getCollection("correctiveActions");
}

// Lưu hoặc cập nhật tiến độ khắc phục.
function saveCorrectiveAction(action) {
  return saveCollectionItem("correctiveActions", action, "ACT");
}

// Lưu kết quả checklist của một ca làm việc.
function saveChecklistResult(result) {
  return saveCollectionItem("checklistResults", result, "CHK");
}

window.siteSafeApi = {
  getHazards,
  saveHazard,
  deleteHazard,
  getUsers,
  saveUser,
  deleteUser,
  getZones,
  saveZone,
  deleteZone,
  getChecklists,
  saveChecklist,
  deleteChecklist,
  getInspections,
  saveInspection,
  deleteInspection,
  getCorrectiveActions,
  saveCorrectiveAction,
  saveChecklistResult,
};

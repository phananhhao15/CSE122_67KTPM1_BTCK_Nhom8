const storeProducts = [
  {
    id: "PPE-001",
    name: "Mũ bảo hộ ABS có núm vặn",
    category: "Bảo hộ cá nhân",
    price: 185000,
    stock: 24,
    seller: "Bảo hộ Thành Công",
    art: "ppe",
  },
  {
    id: "PPE-002",
    name: "Áo phản quang lưới 2 túi",
    category: "Bảo hộ cá nhân",
    price: 95000,
    stock: 42,
    seller: "Đồ bảo hộ Minh Phát",
    art: "ppe",
  },
  {
    id: "HGT-001",
    name: "Dây đai an toàn toàn thân 2 móc",
    category: "Làm việc trên cao",
    price: 890000,
    stock: 8,
    seller: "Thiết bị công nghiệp An Tâm",
    art: "height",
  },
  {
    id: "WRN-001",
    name: "Cọc tiêu giao thông phản quang",
    category: "Cảnh báo công trường",
    price: 125000,
    stock: 30,
    seller: "Bảo hộ Thành Công",
    art: "warning",
  },
  {
    id: "WRN-002",
    name: "Biển báo công trường đang thi công",
    category: "Cảnh báo công trường",
    price: 240000,
    stock: 15,
    seller: "Vật tư xây dựng Hưng Thịnh",
    art: "warning",
  },
  {
    id: "AID-001",
    name: "Tủ sơ cứu công trường 30 người",
    category: "Sơ cứu",
    price: 760000,
    stock: 6,
    seller: "Y tế công nghiệp An Tâm",
    art: "first-aid",
  },
];

const listingStorageKey = "siteSafeSafetyListings";
const cartStorageKey = "siteSafeSafetyCart";
const orderStorageKey = "siteSafeSafetyOrders";
const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0,
});

function readStoreItems(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value : [];
  } catch (error) {
    return [];
  }
}

function saveStoreItems(key, items) {
  localStorage.setItem(key, JSON.stringify(items));
}

function escapeStoreText(value) {
  return String(value).replace(/[&<>"']/g, function (character) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[character];
  });
}

function formatPrice(price) {
  return currencyFormatter.format(price);
}

function getAllProducts() {
  return [...storeProducts, ...readStoreItems(listingStorageKey)];
}

function renderProducts() {
  const searchTerm = document
    .getElementById("product-search")
    .value.trim()
    .toLocaleLowerCase("vi");
  const category = document.getElementById("category-filter").value;
  const products = getAllProducts().filter(function (product) {
    const matchesSearch =
      `${product.name} ${product.category} ${product.seller}`
        .toLocaleLowerCase("vi")
        .includes(searchTerm);
    return (
      matchesSearch && (category === "all" || product.category === category)
    );
  });

  document.getElementById("result-count").textContent =
    `${products.length} thiết bị`;
  document.getElementById("empty-products").hidden = products.length > 0;
  document.getElementById("product-grid").innerHTML = products
    .map(function (product) {
      const stock = Math.max(0, Number(product.stock) || 0);
      return `
        <article class="product-card">
          <div class="product-art product-art--${escapeStoreText(product.art || "ppe")}">
            <span>${escapeStoreText(product.category)}</span>
          </div>
          <div class="product-content">
            <p class="product-seller">${escapeStoreText(product.seller)}</p>
            <h3>${escapeStoreText(product.name)}</h3>
            <p class="product-stock">Còn ${stock} sản phẩm</p>
            <div class="product-bottom">
              <span class="product-price">${formatPrice(Number(product.price) || 0)}</span>
              <button class="btn" type="button" data-add-product="${escapeStoreText(product.id)}" ${stock < 1 ? "disabled" : ""}>
                Thêm vào giỏ
              </button>
            </div>
          </div>
        </article>`;
    })
    .join("");
}

function renderCart() {
  const products = getAllProducts();
  const cart = readStoreItems(cartStorageKey);
  const cartItems = cart
    .map(function (entry) {
      const product = products.find((item) => item.id === entry.id);
      return product ? { ...product, quantity: entry.quantity } : null;
    })
    .filter(Boolean);
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  document.getElementById("cart-count").textContent = `${itemCount} món`;
  document.getElementById("cart-total").textContent = formatPrice(total);
  document.getElementById("cart-empty").hidden = cartItems.length > 0;
  document.getElementById("checkout-button").disabled = cartItems.length === 0;
  document.getElementById("cart-items").innerHTML = cartItems
    .map(
      (item) => `
        <div class="cart-row">
          <strong>${escapeStoreText(item.name)}</strong>
          <span>${formatPrice(item.price * item.quantity)}</span>
          <div class="quantity-controls" aria-label="Số lượng ${escapeStoreText(item.name)}">
            <button type="button" data-cart-action="decrease" data-cart-id="${escapeStoreText(item.id)}" aria-label="Giảm số lượng">−</button>
            <span>${item.quantity}</span>
            <button type="button" data-cart-action="increase" data-cart-id="${escapeStoreText(item.id)}" aria-label="Tăng số lượng">+</button>
            <button class="remove-item" type="button" data-cart-action="remove" data-cart-id="${escapeStoreText(item.id)}">Xóa</button>
          </div>
        </div>`,
    )
    .join("");
}

function renderOrders() {
  const orders = readStoreItems(orderStorageKey);
  document.getElementById("order-count").textContent = `${orders.length} đơn`;
  document.getElementById("orders-empty").hidden = orders.length > 0;
  document.getElementById("recent-orders").innerHTML = orders
    .slice(-3)
    .reverse()
    .map(
      (order) => `
        <li><strong>${escapeStoreText(order.id)}</strong><span>${formatPrice(order.total)}</span></li>`,
    )
    .join("");
}

function updateCart(productId, action) {
  const cart = readStoreItems(cartStorageKey);
  const products = getAllProducts();
  const product = products.find((item) => item.id === productId);
  const entry = cart.find((item) => item.id === productId);

  if (action === "add" || action === "increase") {
    if (!product || (entry && entry.quantity >= product.stock)) {
      document.getElementById("store-status").textContent =
        "Số lượng trong giỏ đã đạt mức tồn kho.";
      return;
    }
    if (entry) {
      entry.quantity += 1;
    } else {
      cart.push({ id: productId, quantity: 1 });
    }
  } else if (action === "decrease" && entry) {
    entry.quantity -= 1;
    if (entry.quantity < 1) {
      cart.splice(cart.indexOf(entry), 1);
    }
  } else if (action === "remove") {
    saveStoreItems(
      cartStorageKey,
      cart.filter((item) => item.id !== productId),
    );
    renderCart();
    return;
  }

  saveStoreItems(cartStorageKey, cart);
  renderCart();
  document.getElementById("store-status").textContent =
    "Đơn hàng chỉ được mô phỏng, chưa phát sinh thanh toán.";
}

document
  .getElementById("product-search")
  .addEventListener("input", renderProducts);
document
  .getElementById("category-filter")
  .addEventListener("change", renderProducts);

document
  .getElementById("product-grid")
  .addEventListener("click", function (event) {
    const button = event.target.closest("[data-add-product]");
    if (button) {
      updateCart(button.dataset.addProduct, "add");
    }
  });

document
  .getElementById("cart-items")
  .addEventListener("click", function (event) {
    const button = event.target.closest("[data-cart-action]");
    if (button) {
      updateCart(button.dataset.cartId, button.dataset.cartAction);
    }
  });

document
  .getElementById("checkout-button")
  .addEventListener("click", function () {
    const cart = readStoreItems(cartStorageKey);
    const products = getAllProducts();
    if (cart.length === 0) {
      return;
    }

    const total = cart.reduce(function (sum, entry) {
      const product = products.find((item) => item.id === entry.id);
      return sum + (product ? product.price * entry.quantity : 0);
    }, 0);
    const orders = readStoreItems(orderStorageKey);
    const order = {
      id: `SS-${Date.now().toString().slice(-7)}`,
      total,
      createdAt: new Date().toISOString(),
    };
    orders.push(order);
    saveStoreItems(orderStorageKey, orders);
    saveStoreItems(cartStorageKey, []);
    renderCart();
    renderOrders();
    document.getElementById("store-status").textContent =
      `Đã tạo đơn ${order.id}. Đây là giao dịch mô phỏng, chưa thanh toán.`;
  });

document
  .getElementById("sell-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const currentUser = window.siteSafeMain.getCurrentUser();
    const listings = readStoreItems(listingStorageKey);
    const category = formData.get("category");
    const artworkByCategory = {
      "Bảo hộ cá nhân": "ppe",
      "Làm việc trên cao": "height",
      "Cảnh báo công trường": "warning",
      "Sơ cứu": "first-aid",
    };

    listings.push({
      id: `USR-${Date.now()}`,
      name: String(formData.get("name")).trim(),
      category,
      price: Number(formData.get("price")),
      stock: Number(formData.get("stock")),
      seller: currentUser?.fullName || "Nhà cung cấp SiteSafe",
      art: artworkByCategory[category] || "ppe",
    });
    saveStoreItems(listingStorageKey, listings);
    event.currentTarget.reset();
    renderProducts();
    document.getElementById("store-status").textContent =
      "Đã đăng sản phẩm và hiển thị trong danh sách thiết bị.";
    document
      .getElementById("catalog-title")
      .scrollIntoView({ behavior: "smooth" });
  });

renderProducts();
renderCart();
renderOrders();

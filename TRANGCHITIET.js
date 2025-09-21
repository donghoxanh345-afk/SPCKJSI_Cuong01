const queryParams = new URLSearchParams(window.location.search);
const productId = queryParams.get('id'); // giữ nguyên kiểu chuỗi

// Hàm hiển thị chi tiết sản phẩm
function showProduct(product, source) {
  document.getElementById('product-image').src = product.image || product.thumbnail;
  document.getElementById('product-name').textContent = product.title || product.shoeName;
  document.getElementById('product-description').textContent = product.description || "Không có mô tả";
  document.getElementById('product-type').textContent = `Phân loại: ${product.category || "Sneakers"}`;
  document.getElementById('product-price').textContent = `Giá: ${product.price || product.retailPrice || "N/A"} USD`;

  // 👉 Gắn sự kiện cho nút thêm vào giỏ
  const addBtn = document.getElementById('add-to-cart-btn');
  addBtn.addEventListener('click', function () {
    let Current_user_info = localStorage.getItem("Current User Info");
    let user = JSON.parse(Current_user_info);
    let username = user?.Name || "Khách";
    let key = `Cart_${username}`;

    let cart = JSON.parse(localStorage.getItem(key)) || [];

    let existing = cart.find(item => item.id === product.id || item.id === product.styleID);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: product.id || product.styleID,
        name: product.title || product.shoeName,
        img: product.image || product.thumbnail,
        price: product.price || product.retailPrice || "N/A",
        quantity: 1
      });
    }

    localStorage.setItem(key, JSON.stringify(cart));
    alert("Đã thêm vào giỏ hàng!");
  });

  // 👉 Gợi ý sản phẩm liên quan
  const relatedContainer = document.getElementById('related-list');
  relatedContainer.innerHTML = '';
  
if (source === 'fakestore') {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(products => {
        const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);
        renderRelated(related, 'fakestore');
      });
  } else if (source === 'sneaker') {
    fetch('http://localhost:3002/api/sneakers')
      .then(res => res.json())
      .then(products => {
        const related = products.filter(p => p.styleID !== product.styleID).slice(0, 3);
        renderRelated(related, 'sneaker');
      });
  }
}

// Hàm render sản phẩm liên quan
function renderRelated(list, source) {
  const relatedContainer = document.getElementById('related-list');
  for (let r of list) {
    const card = document.createElement('a');
    const id = source === 'fakestore' ? r.id : r.styleID;
    const title = r.title || r.shoeName;
    const img = r.image || r.thumbnail;
    const price = r.price || r.retailPrice || "N/A";

    card.href = `TRANGCHITIET.html?id=${id}`;
    card.className = 'related-card';
    card.innerHTML = `
      <img src="${img}" alt="${title}">
      <h4>${title}</h4>
      <p>${price} USD</p>
    `;
    relatedContainer.appendChild(card);
  }
}

// 👉 Kiểm tra loại sản phẩm theo định dạng ID
if (!isNaN(parseInt(productId))) {
  // Nếu là số → dùng FakeStore
  fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(products => {
      const product = products.find(p => p.id === parseInt(productId));
      if (product) showProduct(product, 'fakestore');
    });
} else {
  // Nếu là chuỗi (styleID) → dùng Sneaker API
  fetch('http://localhost:3002/api/sneakers')
    .then(res => res.json())
    .then(products => {
      const product = products.find(p => p.styleID === productId || p.shoeName === productId);
      if (product) showProduct(product, 'sneaker');
    });
}
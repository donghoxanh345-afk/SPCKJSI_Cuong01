let tatca = document.getElementById("btn-tatca");
let sneaker = document.getElementById("btn-sneakers");
let boot = document.getElementById("btn-boots");
let giaytay = document.getElementById("btn-giaytay");

let product_list = [];
let filtered_list = [];

fetch("http://localhost:3002/api/sneakers")
  .then(res => res.json())
  .then(data => {
    product_list = data.map(shoe => ({
      id: shoe.styleID || shoe.shoeName,
      title: shoe.shoeName,
      price: shoe.retailPrice || "N/A",
      image: shoe.thumbnail,
      category: getCategory(shoe.shoeName)
    }));
    filtered_list = product_list;
    render();
  });

function getCategory(name) {
  name = name.toLowerCase();
  if (name.includes("boot")) return "Boots";
  if (name.includes("oxford") || name.includes("dress")) return "Giày tây";
  return "Sneakers";
}

function render() {
  const container = document.getElementById('spnb');
  container.innerHTML = '';
  for (let i of filtered_list) {
    const a = document.createElement('a');
    a.href = `TRANGCHITIET.html?id=${i.id}`;
    a.className = 'trending-item';
    a.innerHTML = `
      <div class="featured-card">
        <div class="card-image">
          <img src="${i.image}" alt="${i.title}">
          <div class="card-actions">
            <button class="action-btn wishlist-btn"><i class="fas fa-heart"></i></button>
            <button class="action-btn quick-view-btn"><i class="fas fa-eye"></i></button>
          </div>
        </div>
        <div class="card-content">
          <div class="card-category">${i.category}</div>
          <h3>${i.title}</h3>
          <div class="card-rating">
            <div class="stars">
              <i class="fas fa-star"></i><i class="fas fa-star"></i>
              <i class="fas fa-star"></i><i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
            </div>
          </div>
          <div class="card-price">
            <span class="new-price">${i.price} USD</span>
          </div>
          <button class="add-to-cart-btn"><i class="fas fa-cart-plus"></i> Thêm vào giỏ</button>
        </div>
      </div>
    `;
    container.appendChild(a);
  }
}
////////////////

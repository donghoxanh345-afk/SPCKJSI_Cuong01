window.onload = function () {
let Current_user_info = localStorage.getItem("Current User Info")
let user = JSON.parse(Current_user_info)
let username = user.Name
let key = `Cart_${username}`

let san_pham_gio_hang = JSON.parse(localStorage.getItem(key)) || []

   let sanphamgiohang = document.getElementById("sanpham_giohang")

    let tongCong = 0
  
    san_pham_gio_hang.forEach((sp, index) => {
    let a =document.createElement('div')
    a.className='trending-item'
    a.innerHTML = `<div class="cart-item">
    <img id="anh_giohang" src="${sp.img}" alt="Sản phẩm" />
      <div class="item-details">
        <h3 id="tên_sanpham">${sp.name}</h3>
        <p id="gia_sanpham">Giá: ${sp.price} USD</p>
        <div id="so_luong">Số Lượng: ${sp.quantity}</div>
      </div>
      <button class="remove-btn" id="nut_xoa">Xóa</button>
      </div>`;

      tongCong += sp.price * sp.quantity
   

  let removeBtn = a.querySelector(".remove-btn")
  removeBtn.addEventListener("click", function () {
  let itemIndex = san_pham_gio_hang.findIndex(item => item.id === sp.id)

  if (itemIndex !== -1) {
    if (san_pham_gio_hang[itemIndex].quantity > 1) {
      san_pham_gio_hang[itemIndex].quantity -= 1
    } else {
      san_pham_gio_hang.splice(itemIndex, 1)
      a.remove()
    }
  }

  localStorage.setItem(key, JSON.stringify(san_pham_gio_hang))

  if (san_pham_gio_hang[itemIndex]) {
    a.querySelector("#so_luong").textContent = san_pham_gio_hang[itemIndex].quantity
  }
  location.reload()
});
sanphamgiohang.appendChild(a)
    })

    let tongCongDiv = document.querySelector(".TC")
    tongCongDiv.textContent = `Tổng Cộng: ${tongCong} USD`

}



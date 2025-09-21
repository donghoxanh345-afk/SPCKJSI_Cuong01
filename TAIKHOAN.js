let h1_login = document.getElementById("h1_login");
let h2_login = document.getElementById("h2_login");
let Dang_nhap = document.getElementById("Dangnhap");
let Dang_ky = document.getElementById("Dangky");

let thong_bao1 = document.getElementById("thong_bao1");

let thong_bao3 = document.getElementById("thong_bao3");
let thong_bao4 = document.getElementById("thong_bao4");
let thong_bao5 = document.getElementById("thong_bao5");

let thong_bao7 = document.getElementById("thong_bao7");

let name_dk = document.getElementById("ip1");

let ps_dk = document.getElementById("ip2");
let vps_dk = document.getElementById("ip4");

let name_dn = document.getElementById("ip5");

let ps_dn = document.getElementById("ip7");

let tai_khoan = document.getElementById("userDropdown")
let ten_nguoidung = document.getElementById("loginBtn")
function taikhoan1() {
            if (h1_login.innerHTML == "Đăng Ký") {
                Dang_ky.style.display = "none"
                Dang_nhap.style.display = "block"
            }
        }
        function taikhoan2() {
            if (h2_login.innerHTML == "Đăng Nhập") {
                Dang_ky.style.display = "block"
                Dang_nhap.style.display = "none" 
            }
        }

let savedUser = JSON.parse(localStorage.getItem("User Info"));

function check1(event) {
    event.preventDefault();
    let du_dk = true;

    if (name_dk.value.length < 8 || name_dk.value.length > 15) {
        thong_bao1.innerText = "**Tên phải từ 8 đến 15 kí tự**";
        name_dk.style.border = "2px solid red";
        du_dk = false;
    } else {
        thong_bao1.innerText = "";
        name_dk.style.border = "";
    }
    

    if (ps_dk.value.length < 8 || ps_dk.value.length > 15) {
        thong_bao3.innerText = "**Mật khẩu phải từ 8 đến 15 kí tự**";
        ps_dk.style.border = "2px solid red";
        du_dk = false;
    } else {
        thong_bao3.innerText = "";
        ps_dk.style.border = "";
    }

    if (ps_dk.value !== vps_dk.value) {
        thong_bao4.innerText = "**Mật khẩu xác nhận không đúng**";
        vps_dk.style.border = "2px solid red";
        du_dk = false;
    } else {
        thong_bao4.innerText = "";
        vps_dk.style.border = "";
    }

    if (du_dk) {
        let users = JSON.parse(localStorage.getItem("Users")) || [];
        users.push({
            Name: name_dk.value.trim(),
         
            Password: ps_dk.value
        });
        localStorage.setItem("Users", JSON.stringify(users));
        let userinfo = localStorage.getItem("Users");
        let savedUser = JSON.parse(userinfo);
        
        alert("Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.");
        

        Dang_ky.style.display = "none";
        Dang_nhap.style.display = "block";
        h1_login.innerText = "Đăng Nhập";
        h2_login.innerText = "Đăng Nhập";

        name_dk.value = "";
        
        ps_dk.value = "";
        vps_dk.value = "";
    }
}

function check2(event) {
    event.preventDefault();

    // Lấy danh sách người dùng đã đăng ký
    let users = JSON.parse(localStorage.getItem("Users")) || [];
    let du_dn = true;
    let thongbao = "";

    // Tìm người dùng trùng khớp
    let savedUser = users.find(u => 
        u.Name.toLowerCase() === name_dn.value.trim().toLowerCase() &&
        
        u.Password === ps_dn.value
    );

    if (!savedUser) {
        // Nếu không tìm thấy người dùng phù hợp
        thong_bao5.innerText = "**Tên đăng nhập không đúng**";
        
        thong_bao7.innerText = "**Mật khẩu đăng nhập không đúng**";
        name_dn.style.border = "2px solid red";
        
        ps_dn.style.border = "2px solid red";
        du_dn = false;
    } else {
        thong_bao5.innerText = "";
        
        thong_bao7.innerText = "";
        name_dn.style.border = "";
        
        ps_dn.style.border = "";
    }

    if (du_dn) {
        localStorage.setItem("Current User Info", JSON.stringify(savedUser));
        alert("Đăng nhập thành công!");
        window.location.href = "TRANGCHU.html";
    }


}
function check_currentuserinfo() {
    let check_current_user_info = localStorage.getItem("Current User Info")
    if (check_current_user_info.length > 0) {
        let user = JSON.parse(check_current_user_info);
        ten_nguoidung.innerHTML = user.Name
        document.getElementById("TAIKHOAN").href = "#"
        ten_nguoidung.href = "#"
    }
}
check_currentuserinfo() 
function logout() {//hàm logout
    localStorage.removeItem("Current User Info")
    document.getElementById("loginBtn").innerHTML = "Đăng nhập"
    location.reload()
}


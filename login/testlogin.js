// ✅ ถ้ามี jwt อยู่แล้ว → redirect ทันที
var jwt = localStorage.getItem('jwt');
if (jwt != null) {
    window.location.href = '/login/index.html';
}

// ✅ โหลดข้อมูลที่เคยจำไว้
window.onload = function () {
    const savedUsername = localStorage.getItem('savedUsername');
    const savedPassword = localStorage.getItem('savedPassword');
    const rememberMe = localStorage.getItem('rememberMe');

    if (rememberMe === "true") {
        document.getElementById('username').value = savedUsername || '';
        document.getElementById('email').value = savedPassword || '';
        document.getElementById('rememberMe').checked = true;
    }
};

function login() {
    const usernameEl = document.getElementById('username');
    const passwordEl = document.getElementById('email');  // ที่จริงคือ email
    const rememberMe = document.getElementById('rememberMe').checked;
    const errorMessage = document.getElementById('error-message');

    const username = usernameEl.value.trim();
    const email = passwordEl.value.trim();  // ชื่อผิดเป็น password แต่จริงคือ email

    // 📌 บันทึกถ้าเลือก Remember me
    if (rememberMe) {
        localStorage.setItem('savedUsername', username);
        localStorage.setItem('savedPassword', email);
        localStorage.setItem('rememberMe', true);
    } else {
        localStorage.removeItem('savedUsername');
        localStorage.removeItem('savedPassword');
        localStorage.removeItem('rememberMe');
    }

    // 📡 เรียก API user list
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://jsonplaceholder.typicode.com/users", true);
    xhttp.send();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            const users = JSON.parse(this.responseText);

            // หา user ที่ username และ email ตรง
            const user = users.find(u => u.username === username && u.email === email);

            if (this.status === 200 && user) {
                // ถ้าเจอ user → login สำเร็จ
                const fakeToken = btoa(user.username + ":" + user.email); // สร้าง token ปลอม

                localStorage.setItem("jwt", fakeToken);
                window.location.href = "/login/index.html";
            } else {
                // login fail
                errorMessage.innerText = "Username or Email incorrect.";
                errorMessage.style.display = "block";

                // shake animation
                [usernameEl, passwordEl].forEach(input => {
                    input.classList.add("shake");
                    setTimeout(() => input.classList.remove("shake"), 500);
                });
            }
        }
    };

    return false; // เพื่อไม่ให้ form reload หน้า
}
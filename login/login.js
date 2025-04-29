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
        document.getElementById('password').value = savedPassword || '';
        document.getElementById('rememberMe').checked = true;
    }
};

function login() {
    const usernameEl = document.getElementById('username');
    const passwordEl = document.getElementById('password');
    const rememberMe = document.getElementById('rememberMe').checked;
    const errorMessage = document.getElementById('error-message');

    const username = usernameEl.value;
    const password = passwordEl.value;

    // 📌 บันทึกถ้าเลือก Remember me
    if (rememberMe) {
        localStorage.setItem('savedUsername', username);
        localStorage.setItem('savedPassword', password);
        localStorage.setItem('rememberMe', true);
    } else {
        localStorage.removeItem('savedUsername');
        localStorage.removeItem('savedPassword');
        localStorage.removeItem('rememberMe');
    }

    // 📡 เรียก API login
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://jsonplaceholder.typicode.com/users");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({ username, password }));

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            const response = JSON.parse(this.responseText);
            if (this.status === 200 && response.token) {
                localStorage.setItem("jwt", response.token);
                window.location.href = "/login/login.html";
            } else {
                errorMessage.innerText = response.message || "Login failed";
                errorMessage.style.display = "block";

                // shake animation
                [usernameEl, passwordEl].forEach(input => {
                    input.classList.add("shake");
                    setTimeout(() => input.classList.remove("shake"), 500);
                });
            }
        }
    };

    return false;
}
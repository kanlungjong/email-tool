var jwt = localStorage.getItem('jwt');
    if (jwt != null) {
        window.location.href = 'index.html';
    }

    // ✅ โหลดข้อมูลที่เคยจำไว้
    window.onload = function () {
        const savedUsername = localStorage.getItem('savedUsername');
        const savedEmail = localStorage.getItem('savedEmail');
        const rememberMe = localStorage.getItem('rememberMe');

        if (rememberMe === "true") {
            document.getElementById('username').value = savedUsername || '';
            document.getElementById('email').value = savedEmail || '';
            document.getElementById('rememberMe').checked = true;
        }
    };

    function login() {
        const usernameEl = document.getElementById('username');
        const emailEl = document.getElementById('email');
        const rememberMe = document.getElementById('rememberMe').checked;
        const errorMessage = document.getElementById('error-message');

        const username = usernameEl.value.trim();
        const email = emailEl.value.trim();

        if (!username || !email) {
            errorMessage.innerText = "Please enter both username and email.";
            errorMessage.style.display = "block";
            return false;
        }

        // 📌 บันทึกถ้าเลือก Remember me
        if (rememberMe) {
            localStorage.setItem('savedUsername', username);
            localStorage.setItem('savedEmail', email);
            localStorage.setItem('rememberMe', true);
        } else {
            localStorage.removeItem('savedUsername');
            localStorage.removeItem('savedEmail');
            localStorage.removeItem('rememberMe');
        }

        // 📡 เรียก API user list
        const xhttp = new XMLHttpRequest();
        xhttp.open("GET", "https://jsonplaceholder.typicode.com/users", true);
        xhttp.send();

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                const users = JSON.parse(this.responseText);
                const user = users.find(u => u.username === username && u.email === email);

                if (this.status === 200 && user) {
                    const fakeToken = btoa(user.username + ":" + user.email); // fake JWT
                    localStorage.setItem("jwt", fakeToken);
                    window.location.href = "index.html";
                } else {
                    errorMessage.innerText = "Username or Email incorrect.";
                    errorMessage.style.display = "block";
                    [usernameEl, emailEl].forEach(input => {
                        input.classList.add("shake");
                        setTimeout(() => input.classList.remove("shake"), 500);
                    });
                }
            }
        };

        return false;
    }
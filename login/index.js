var jwt = localStorage.getItem('jwt')
if (jwt == null) {
    window.location.href = '/Users/kanlungjong/Desktop/web/login/textlogin.html'
}

function logout() {
    localStorage.removeItem("jwt");
    window.location.href = '/Users/kanlungjong/Desktop/web/login/textlogin.html'
}

// เมื่อคลิกที่เมนู sidebar
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function () {
      const page = this.getAttribute('data-page');
      fetch('/sidebar/' + page)
        .then(response => response.text())
        .then(html => {
          document.getElementById('main-content').innerHTML = html;
        })
        .catch(error => {
          console.error('Error loading page:', error);
          document.getElementById('main-content').innerHTML = "<p>Page not found</p>";
        });
    });
});
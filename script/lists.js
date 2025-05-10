var jwt = localStorage.getItem('jwt')
if (jwt == null) {
    window.location.href = '/login/textlogin.html'
}

function logout() {
    localStorage.removeItem("jwt");
    window.location.href = '/login/textlogin.html'
}
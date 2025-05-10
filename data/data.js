const userData = {
    email: "user@gmail.com",
    profile_picture: "https://htmlcolorcodes.com/assets/images/colors/silver-color-solid-background-1920x1080.png"
  };

document.getElementById("profile-picture").src = userData.profile_picture;
document.getElementById("user-email").innerText = userData.email;
const userData = {
    email: "user@gmail.com",
    profile_picture: "https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  };

document.getElementById("profile-picture").src = userData.profile_picture;
document.getElementById("user-email").innerText = userData.email;
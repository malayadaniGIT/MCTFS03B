document.getElementById("RightcontainerTOP").addEventListener("submit", function(event) {
    event.preventDefault();
    var email = document.getElementById("email").value;
    var password = document.getElementById("mailpassword").value;
    var username = document.getElementById("github_username").value;
    var Git_Passwaord = document.getElementById("git_password").value;
    fetch("https://api.github.com/users/" + username)
    .then(function(response) {
        console.log(response);
        return response.json();
    })
    .then(function(data) {
      localStorage.setItem("userData", JSON.stringify(data));
      window.location.href = "Home.html";
    })
    .catch(function(error) {
      console.error(error);
    });
})



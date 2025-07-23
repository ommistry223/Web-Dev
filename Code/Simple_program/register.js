var username = document.getElementById("Username");
var password = document.getElementById("password");
var confirmPassword = document.getElementById("confirm");
var email = document.getElementById("email");
var registerButton = document.getElementById("registerButton");
var errorMessage = document.getElementById("errorMessage");

registerButton.addEventListener("click", function(event) {
    event.preventDefault();
    
    if (username.value === "" || password.value === "" || confirmPassword.value === "" || email.value === "") {
        errorMessage.textContent = "All fields are required.";
        return;
    }

    if (password.value !== confirmPassword.value) {
        errorMessage.textContent = "Passwords do not match.";
        return;
    }

    // Simulate a successful registration
    errorMessage.textContent = "Registration successful!";
    console.log("Username:", username.value);
    console.log("Email:", email.value);
});
errorMessage.style.color = "red";
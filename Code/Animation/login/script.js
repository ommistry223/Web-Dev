let btn = document.getElementById("login-btn");
        function Content() {
            btn.innerText = "Logged In!";
            btn.style.backgroundColor = "lightblue";
            btn.style.color = "white";
            btn.style.border = "none";
            btn.style.cursor = "not-allowed";
            btn.disabled = true; // Disable the button after login
        }

javascript
document.querySelector('#loginForm').addEventListener('submit', function(e) {
 e.preventDefault();

 const email = document.querySelector('#email').value;
 const password = document.querySelector('#password').value;

 // Add your login validation and AJAX code here
});
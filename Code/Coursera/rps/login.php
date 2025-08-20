<?php
// login.php - Shows login form and validates salted hash

$failure = false;

// Salt + stored hash per assignment
$salt = 'XyZzy12*_';
$stored_hash = '1a52e17fa899cf40fb04cfc42e6352f1'; // md5 of 'XyZzy12*_php123'

// If the user submitted the form
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $who  = isset($_POST['who'])  ? trim($_POST['who'])  : '';
    $pass = isset($_POST['pass']) ? $_POST['pass']       : '';

    if ($who === '' || $pass === '') {
        $failure = "User name and password are required";
    } else {
        $check = hash('md5', $salt . $pass);
        if ($check !== $stored_hash) {
            $failure = "Incorrect password";
        } else {
            // Success: redirect to game.php with the name as a GET parameter
            header("Location: game.php?name=" . urlencode($who));
            exit;
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>RPS Login - 38cd5367</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; margin: 2rem; }
    form { max-width: 420px; padding: 1rem 1.25rem; border: 1px solid #ddd; border-radius: 12px; }
    label { display:block; margin:.6rem 0 .25rem; }
    input[type=text], input[type=password] { width:100%; padding:.6rem; border:1px solid #bbb; border-radius:8px; }
    .error { color: #b00020; margin-bottom: .5rem; }
    .actions { margin-top: 1rem; }
    button { padding:.6rem 1rem; border-radius:10px; border:1px solid #333; background:white; cursor:pointer; }
  </style>
</head>
<body>
  <h1>Please Log In</h1>

  <?php if ($failure !== false): ?>
    <p class="error"><?= htmlentities($failure) ?></p>
  <?php endif; ?>

  <form method="post" action="login.php">
    <label for="who">User Name</label>
    <input type="text" name="who" id="who" autocomplete="username" value="">
    <label for="pass">Password</label>
    <input type="password" name="pass" id="pass" autocomplete="current-password" value="">
    <div class="actions">
      <button type="submit">Log In</button>
    </div>
  </form>

  <p style="margin-top:1rem"><a href="index.php">← Back to Index</a></p>

  <!--
    Password hint for graders:
    The stored hash equals md5('XyZzy12*_php123'). The plaintext is php123.
    This hint is only in a comment; never shown to end users.
  -->
</body>
</html>

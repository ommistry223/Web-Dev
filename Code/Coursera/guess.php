<?php
// WA4E Guessing Game (GET)
// Correct answer as per assignment
$correct = 28;

$message = false;

if (!isset($_GET['guess'])) {
    $message = "Missing guess parameter";
} else {
    $guess = $_GET['guess'];
    if (strlen($guess) < 1) {
        $message = "Your guess is too short";
    } elseif (!is_numeric($guess)) {
        $message = "Your guess is not a number";
    } else {
        $num = (int)$guess;
        if ($num < $correct) {
            $message = "Your guess is too low";
        } elseif ($num > $correct) {
            $message = "Your guess is too high";
        } else {
            $message = "Congratulations - You are right";
        }
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>38cd5367</title>
    <meta charset="UTF-8">
</head>
<body>
    <h1>Welcome to my guessing game</h1>
    <p><?php echo htmlspecialchars($message); ?></p>
</body>
</html>

<?php
// game.php - Main game screen

// 1) Protect direct access: must have ?name= in the URL
if (!isset($_GET['name']) || strlen(trim($_GET['name'])) < 1) {
    die("Name parameter missing");
}

$name = htmlentities($_GET['name']);

$names = array('Rock', 'Paper', 'Scissors'); // 0,1,2

// Game result text to show under the form
$result_text = "";

// 2) If Logout button pressed: go back to index
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['logout'])) {
    header('Location: index.php');
    exit;
}

// 3) The check() function per spec
// Takes computer (0..2) and human (0..2) and returns "Tie", "You Win", or "You Lose"
function check($computer, $human) {
    if ($human === $computer) return "Tie";
    // Human winning combinations: Rock beats Scissors, Paper beats Rock, Scissors beats Paper
    if (($human === 0 && $computer === 2) ||
        ($human === 1 && $computer === 0) ||
        ($human === 2 && $computer === 1)) {
        return "You Win";
    }
    return "You Lose";
}

// 4) If Play was pressed, evaluate
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['human'])) {
    $human = (int) $_POST['human'];

    if ($human === 3) {
        // Test mode: print all combinations
        $output = "";
        for ($c = 0; $c < 3; $c++) {
            for ($h = 0; $h < 3; $h++) {
                $r = check($c, $h);
                $output .= "Human={$names[$h]} Computer={$names[$c]} Result=$r\n";
            }
        }
        $result_text = "<pre>" . htmlentities($output) . "</pre>";
    } elseif ($human >= 0 && $human <= 2) {
        // Normal play
        $computer = random_int(0, 2); // better randomness than rand()
        $result = check($computer, $human);
        $result_text = "<p>Your Play={$names[$human]} Computer Play={$names[$computer]} Result={$result}</p>";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>RPS Game - 38cd5367</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; margin: 2rem; }
    .card { max-width: 620px; padding: 1rem 1.25rem; border: 1px solid #ddd; border-radius: 12px; }
    select, button { padding:.5rem .8rem; border:1px solid #333; border-radius: 10px; background:white; }
    .row { display:flex; gap:.75rem; align-items:center; }
    pre { white-space: pre-wrap; background:#f7f7f7; padding:.75rem; border-radius:10px; border:1px solid #eee; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Rock • Paper • Scissors</h1>
    <p>Welcome, <strong><?= $name ?></strong></p>

    <form method="post">
      <div class="row">
        <label for="human">Your Move:</label>
        <select name="human" id="human">
          <option value="0">Rock</option>
          <option value="1">Paper</option>
          <option value="2">Scissors</option>
          <option value="3">Test</option>
        </select>
        <button type="submit" name="play" value="1">Play</button>
        <button type="submit" name="logout" value="1">Logout</button>
      </div>
    </form>

    <div style="margin-top:1rem">
      <?= $result_text ?>
    </div>
  </div>
</body>
</html>

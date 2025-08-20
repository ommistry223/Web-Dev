<?php
// index.php — WA4E MD5 Cracker (4-digit numeric PIN)

// Safe getter
function get_param($key, $default = '') {
    return isset($_GET[$key]) ? $_GET[$key] : $default;
}

$md5 = trim(get_param('md5'));
$start = microtime(true);
$found = false;        // false until we find the PIN
$tries = 0;            // how many hashes checked
$debug_left = 15;      // show first 15 attempts only
?>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>MD5 cracker</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
 body { font-family: Arial, Helvetica, sans-serif; margin: 20px; line-height: 1.4; }
 pre  { background:#f6f8fa; padding:12px; border-radius:6px; overflow:auto; }
 .ok  { color:#0a7; font-weight:700; }
 .bad { color:#c00; font-weight:700; }
</style>
</head>
<body>
<h1>MD5 cracker</h1>
<p>This application takes an MD5 hash of a four digit pin and checks all 10,000 possible four digit PINs to determine the PIN.</p>

<form method="get">
  <input type="text" name="md5" size="40"
         placeholder="Enter 32-char MD5 (e.g. 81dc9bdb52d04dc20036dbd8313ed055)"
         value="<?php echo htmlentities($md5); ?>">
  <input type="submit" value="Crack MD5">
  <a href="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>">Reset</a>
</form>

<p><strong>Debug Output:</strong></p>
<?php
if ($md5 !== '') {
    if (!preg_match('/^[a-f0-9]{32}$/i', $md5)) {
        echo '<p class="bad">Invalid MD5. Please enter exactly 32 hex characters.</p>';
    } else {
        echo "<pre>";
        // Nested loops for 0000..9999 — keep $pin as a STRING to preserve leading zeros
        for ($i = 0; $i <= 9; $i++) {
            for ($j = 0; $j <= 9; $j++) {
                for ($k = 0; $k <= 9; $k++) {
                    for ($l = 0; $l <= 9; $l++) {
                        $pin = (string)$i.(string)$j.(string)$k.(string)$l; // "0000".."9999"
                        $check = hash('md5', $pin); // hash the STRING (not an int)
                        $tries++;

                        if ($debug_left > 0) {
                            echo $check.' '.$pin."\n";
                            $debug_left--;
                        }

                        if ($check === strtolower($md5)) {
                            $found = $pin;
                            echo "</pre>";
                            break 4; // break all four loops immediately
                        }
                    }
                }
            }
        }

        if ($found === false) {
            echo "</pre>";
        }

        $elapsed = microtime(true) - $start;

        echo "<p><strong>PIN: </strong>" .
             ($found !== false ? "<span class='ok'>".htmlentities($found)."</span>"
                               : "<span class='bad'>Not found</span>")
             . "</p>";
        echo "<p>Elapsed time: ".htmlentities(number_format($elapsed, 6))." seconds</p>";
        echo "<p>Total checks: ".htmlentities($tries)."</p>";
    }
}
?>
</body>
</html>

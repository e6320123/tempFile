<meta charset="utf-8"> 
<?php
session_start();
if(!isset($_SESSION['member'])) header('Location: log.php');
$member = $_SESSION['member'];

$icon = base64_encode($member->icon);   //$icon原來已經decode了
?>

<h1>Company</h1>
<hr>
Welcome, <?php echo $member->rlname;#e
?>
<img src="data:image/jpeg;base64,<?php echo $icon; ?>">
<hr>
<a href="logout.php">logout</a>
<form action="t1.php">
<input type="text" name="x">
<input type="submit">
</form>
<?php

// $z=null;
// $z="1";
// $z="";
$z='x';
// $z=0;
// $z='x';
 

echo "isset($z)==>";
var_dump(isset($_GET['x']));
echo "<br>";
echo "empty($z)==>";
var_dump(empty($_GET['x']));
echo "<br>";
echo "isset($z)==>";
echo isset($_GET['x']);
echo "<br>";
echo "empty($z)==>";
echo empty($_GET['x']);
echo "<br>";
echo "$z==>";
echo$_GET['x'];
echo "<br>";
echo "type:$z==>";
echo gettype($_GET['x']);
 
?>
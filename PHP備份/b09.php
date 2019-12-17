<?php 
if(isset($_GET['x'])&&isset($_GET['y'])){
$x=$y=$t=$yu=' ';
$x=$_GET['x'];
$y=$_GET['y'];
$t=(int)($x/$y);
$u=$x%$y;
}
?>
<form action="b09.php">
    <input name='x'>
    /
    <input name ='y'>
      
    <input type="submit" value="=">
    <?="$t...$u"?>
</form>
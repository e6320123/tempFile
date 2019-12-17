<?php
$total=null;
if(isset($_GET['n'])){
    $n=$_GET['n'];
    $i=0;
    // for($i=0;$i<=$n;$i++){
    //     $total+=$i;
    // }
    // while($i<=$n)$total+=$i++;
    for(;$i<=$n;)$total+=$i++;
}



?>

<form action="b15.php">
    <input type="number" name="n">
    <input type="submit" value="=">
    <span><?=$total?></span>
</form>
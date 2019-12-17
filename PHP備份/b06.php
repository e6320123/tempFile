<?php
$r =$x =$y ="";
$op=1;
if(isset( $_GET['x']) && isset( $_GET['y'])){
    $x = $_GET['x'];
    $y = $_GET['y'];
    $op= $_GET['op'];
    
    switch ($op) {
        case '1':
        $r=(INT)$x+(INT)$y;
            break;
        case '2':
        $r=(INT)$x-(INT)$y;
            break;
        case '3':
        $r=(INT)$x*(INT)$y;
            break;
        case '4':
        $r=(INT)($x/$y);
            break;
    }
}
?>
<form action="b06.php">
    <input name="x" value="<?php echo $x;?>">
    <select name="op">
        <option value="1" <?= $op==1?'selected':'' ?>>+</option>
        <option value="2" <?= $op==2?'selected':'' ?>>-</option>
        <option value="3" <?= $op==3?'selected':'' ?>>x</option>
        <option value="4" <?= $op==4?'selected':'' ?>>/</option>
    </select>    
    <input name="y" value=<?php echo $y;?>>
    <input type="submit" value="=">
    <span><?php echo  $r; ?></span>
</form>


 
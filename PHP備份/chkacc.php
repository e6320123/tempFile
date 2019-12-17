<?php

include 'sql.php';#e

if(!isset($_POST['acc'])) return;#e

$acc=$_POST['acc'];#e
$sql="select acc from member where acc='{$acc}'";#e {$acc} 外沒加''會錯
$result = $mysqli->query($sql);#e   回傳物件    上一個insert into是傳boolean
echo $result->num_rows;#e   顯示有幾列

?>
<?php

$link=new mysqli('localhost','root','','class');
$link->set_charset('utf8');
 
// $sql='select cid,cname,cbirthday,csex from tb';
$sql='select cid,cname,cbirthday,csex from tb';
$stmt=$link->prepare($sql);
$stmt->execute();
$stmt->bind_result();
echo $stmt->num_rows.'<br>'; 



$stmt->free_result();
$stmt->close();

?>
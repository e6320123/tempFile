<?php



$link=new mysqli('localhost','root','','class');
$link->set_charset('utf8');
$cid=20;
//update t set Birthday = '1991-02-09' where cid=20
$sql='delete from tb where cid =?';
$stmt=$link->prepare($sql);
$stmt->bind_param('i',$cid)  ;  //綁定參數
$stmt->execute();
echo$stmt->affected_rows;



?>
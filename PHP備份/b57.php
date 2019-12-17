<?php

$link=new mysqli('localhost','root','','class');
$link->set_charset('utf8');
$cid=20;
$cname='ben';
$csex='M';
$cBirthday='1900-1-1';
$sql="insert into tb (cid,cname,csex,cbirthday) values "."(?,?,?,?)";
$stmt=$link->prepare($sql);
$stmt->bind_param('isss',$cid,$cname,$csex,$cBirthday)  ;  //綁定參數
$stmt->execute();
echo$stmt->affected_rows;
?>


<table width='100%' >
    <tr>
        <td width='50%'>    
        </td>
        <td width='50%'>
        </td>
    </tr>
</table>


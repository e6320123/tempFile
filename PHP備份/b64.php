<?php

$mysqli=new mysqli('localhost','root','','northwind');
$mysqli->set_charset('utf8');

if(isset($_GET['delpid'])){
    $pid = $_GET['delpid'];
    $sql ="delete from products where ProductID={$pid}";
    $result = $mysqli->query($sql);#e
}


$sql ="select * from products";
$result = $mysqli->query($sql);#e
$total = $result->num_rows;

$rpp=10;

$page=isset($_GET['page'])? $_GET['page']:1;
$start = ($page-1)*$rpp;
$pre=$page==1? 1:$page-1;
$totalpages = ceil($total/$rpp);
$next=$page==$totalpages? $totalpages: $page+1;


$sql = "select ProductID,ProductName,UnitPrice,UnitsInStock from products
        limit {$start},{$rpp}";
$result = $mysqli->query($sql);#e
?>
<script>
function isDel (pname){
    return confirm ("Delete "+pname+"?");
}
</script>
<table border="1" width="100%">
    <tr>
        <th>ProductID</th>
        <th>ProductName</th>
        <th>UnitPrice</th>
        <th>UnitsInStock</th>
        <th>Delete</th>
    </tr>
    <?php
    while($pdts = $result->fetch_object()){//$result->fetch_object()一次抓一列
        echo "<tr><td>{$pdts->ProductID}</td>
        <td>{$pdts->ProductName}</td>
        <td>{$pdts->UnitPrice}</td>
        <td>{$pdts->UnitsInStock}</td>";
        $pname=addslashes($pdts->ProductName);
        echo " <td><a onclick='return isDel(\"{$pname}\")' href='?delpid={$pdts->ProductID}'>Delete</a></td></tr>";#e
    }   //名字中有一個 " 會直接刪   id 41也不行
    ?>
</table>
<a href="?page=<?php echo $pre; ?>">上一頁</a>
<a href="?page=<?php echo $next; ?>">下一頁</a>
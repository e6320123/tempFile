<?php
$mysqli=new mysqli('localhost','root','','cy_cinemas');
$mysqli->set_charset('utf8');
$sql="select * from order_details where order_details_id = 1;";
$result = $mysqli->query($sql);
while ($pdts = $result->fetch_object()) {
    echo json_encode($pdts);
}
$result->close();
$mysqli->close();
?>
<?php
include "../lib/mysqllib.php";

$HOST = "192.168.201.61";
$USER = "testsearch";
$PSWD = "testsearch";
$DBNAME = "testMain";

$allAry = array();
$idAry = array();
$db = new proc_DB($HOST,$USER,$PSWD,$DBNAME);
$sql = "SELECT `id`,`username`,`password` FROM `members` order by id limit 65";
$db->query($sql);
$count = $db->num_rows(); 
while ($db->next_record()) {
    $tempAry = array();
    $code = $db->f("id");
    $tempAry["username"] = $db->f("username");
    $tempAry["passwd_safe"] = $db->f("password");
    $allAry[$code] = $tempAry;
    array_push($idAry,$code);
}
$jsonAry = json_encode($allAry);
print_r($jsonAry);
//print_r($idAry); 


// $sql = "SELECT * FROM `members` WHERE username = 'kudo1' LIMIT 1";
// $db->query($sql,1);
//  $username = $db->f("username");
// echo $username;
?>
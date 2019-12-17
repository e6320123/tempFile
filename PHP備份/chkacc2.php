<?php
include 'sql.php'; 
session_start();
if(!isset($_REQUEST['acc'])) header('Loaction: log.php');
$acc = $_REQUEST['acc'];
$pwd = $_REQUEST['pwd'];    //加密 aes    or   aes256   用在金流
$sql = "select * from member where acc = ?";
$stmt = $mysqli->prepare($sql);#e
$stmt->bind_param('s',$acc);#e
$stmt->execute();#e
// $mysqli->prepare($sql)->bind_param('s',$acc)->execute();

$result = $stmt->get_result();#e
if($result->num_rows>0){//
    $member = $result->fetch_object();#e    member object
    // $_SESSION['member'] = $member;
     
    echo $member->acc;#e
    echo"<br>";#e
    echo $member->pwd;#e
    // echo"<br>";#e
    if(password_verify($pwd,$member->pwd)){
        $_SESSION['member'] = $member;
        header('Location: main.php');
    }else{
        header('Location: log.php?errorMesg="pwd xx"');
    } 
}else{
    //account not exist
    header('Location: log.php?errorMesg="no acc"');
}


?>
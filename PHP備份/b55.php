<?php
include 'bradapis.php';
session_start();
// $rand2=$_SESSION['rand2'];
// echo$rand2;

$s1=$_SESSION['s1'];
echo$s1->sum().':'.$s1->avg().'<br>';
?>
<?php
include 'bradapis.php';
session_start();

$rand=rand(1,49);
// echo$rand;
$rand2=[1,2,3,4,5];
$_SESSION['rand']=$rand2;

//陣列跟數值不好session
//物件session不會數值不同步
$s1=new student(95,55,40);
echo$s1->sum().':'.$s1->avg().'<br>';
$_SESSION['s1']=$s1;
$s1->math=100;
echo$s1->sum().':'.$s1->avg().'<br>';
?>


<hr>
<a href="b55.php">Next Page</a>
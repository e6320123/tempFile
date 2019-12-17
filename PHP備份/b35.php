<?php
$acut=$_GET['account'];
$area=$_GET['area'];
$gender=$_GET['gender'];
$habit= isset($_GET['habit'])? $_GET['habit']:[];
$memo=$_GET['memo'];
$range=$_GET['range'];
$key=$_GET['key'];
echo $acut.'<br>';
echo $area.'<br>';
echo $gender.'<br>';
// echo $habit.'<br>';
foreach ($habit as $k => $v) {
    echo $k.'=>'.$v.'<br>';
}
echo $memo.'<br>';
echo $range.'<br>';
echo $key.'<br>';

?>
<?php
$rate=$_GET['rate'];
$width=400;
//1.canvas
$img=imageCreate(400,24);   //function呼叫無大小寫區分
//2.drawing...
$red=imagecolorallocate($img,255,0,0);
imagefilledrectangle ($img,0,0,$width*$rate/100,24,$red);
$yellow=imagecolorallocate($img,255,255,0);
imagefilledrectangle ($img,$width*$rate/100,0,400,24,$yellow);
//3.output 1.file  2.web
header('Content-Type: image/jpeg');
imagejpeg ($img);
//4.release
imagedestroy($img);

//用google charts
//Chart.js
?>
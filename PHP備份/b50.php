<?php
$img=imagecreatefromjpeg  ("v/im.jpg");
$yellow=imagecolorallocate($img,255,255,0);

imagettftext ($img, 36 , 0 , 100 , 200 ,$yellow, 'C:\xampp\htdocs\Ben\v\f.ttf' ,"Hellow") ;
//^^^^^^^^路徑不能用相對的^^^^^^^^


//3.output 1.file  2.web
// header('Content-Type: image/jpeg');
imagejpeg ($img,'newim.jpg');
//4.release
imagedestroy($img);

?>
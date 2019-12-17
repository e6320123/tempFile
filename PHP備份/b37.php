<?php
// $fp=opendir('.');   //本目錄
// $fp=opendir('v');   //本目錄的v資料夾
$fp=opendir('../');   //本目錄的上一層

while ($file = readdir($fp) ) {
    // echo $file.'<br>';
}
closedir($fp);
?>
<?php

$fp= fopen('v/northwind.sql', "r") or die('can\'t find');
while (($c =fgetc($fp))!==false) {
    // echo nl2br($c); //nl2br 換列轉<br>
}
@closedir($fp);
?>
<?php

$fp= fopen('v/Book1.csv', "r") or die('can\'t find');
while (($line =fgets($fp))!==false) {
    $row=explode(',',$line);
    echo  $row[1].'<br>';
}
@closedir($fp);
?>
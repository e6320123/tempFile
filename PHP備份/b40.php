<?php

$fp=fopen('https://shopping.pchome.com.tw','r');  //指標
$fpw=fopen('v/ben.html','w') ;   //指標2

while (($line =fgets($fp))!==false) {
    fwrite($fpw,$line);
}
fclose($fp);
fclose($fpw);
?>
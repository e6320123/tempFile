<?php
$year=2019;

if(($year%4 ==0 && $year%100 !=0) || $year%400 ==0){
    echo '閏年';
}else{
    echo '非閏年';
}




?>
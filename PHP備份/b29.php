<?php
$a=10;
function cha(&$a){  //&$a 傳位址   //$a 傳值
    $a=100;
}
cha($a);
echo$a;

//shuffle()及sort()都是傳位址進去
?>
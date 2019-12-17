<?php

$a1=array("qaaaa",55,55,"swww",55,55);
$a2[12]="13";
$var=123;
var_dump($a1);
echo "<br>";
var_dump($a2);
echo "<br>";
var_dump($var);
echo "<br>";
echo count($a1);
echo "<br>";

foreach($a2 as $i=>$j){
    echo"[$i]:$j<br>";
}

?>
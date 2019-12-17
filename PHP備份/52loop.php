<?php

$poker=array();

for ($i=0; $i <52 ; $i++) { 
    $poker[]=$i;
}

for ($i=0; $i <52 ; $i++) { 
    $rune=rand($i,51);
    $temp=$poker[$i];
    $poker[$i]=$poker[$rune];
    $poker[$rune]=$temp;
    //js:[$poker[$i],$poker[$rune]]=[$poker[$rune],$poker[$i]];
    //[a,b]=[b,a];
}
 
$players=[[],[],[],[]];
foreach($poker as $i=>$card){
    $players[$i%4][(int)($i/4)]=$card;
}
echo"<table border='1' width='60%'>";
for($i=0;$i<4;$i++){
    $j=$i+1;
    echo"<tr><td>玩家{$j}</td>";
    foreach($players[$i] as $j){
        echo"<td>";
        echo"$j";
        echo"</td>";
    }
    echo"</tr>";
}
echo"</table>";

?>
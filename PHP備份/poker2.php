<?php
$poker = range(0,51);
 
shuffle($poker);
foreach($poker as $k=>$v){
    // echo"[$k]=>$v";
    // if($k%10==0) echo"<br>";
}
echo"<hr>";
$players=[[],[],[],[]];
$flow =["&spades;","<font color='red'>&hearts;</font>",
"<font color='red'>&diams;</font>","&clubs;"];
$number =['A',2,3,4,5,6,7,8,9,10,'J','Q','K'];
foreach($poker as $i=>$card){
    $players[$i%4][(int)($i/4)]=$card;
}
echo"<table border='1' width='80%'>";
for($i=0;$i<4;$i++){
    sort($players[$i]);
    $j=$i+1;
    echo"<tr><td>玩家{$j}</td>";
    foreach($players[$i] as $j){
        echo"<td>";
        echo $flow[(int)($j/13)];
        echo $number[($j+1)%13];
        echo"</td>";
    }
    echo"</tr>";
}
echo"</table>";
?>
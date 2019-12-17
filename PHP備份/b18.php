<?php
$p=array(1=>0,0,0,0,0,0);      //$p[1]=0;

for($i=0;$i<10000;$i++){
    $point=rand(1,9);
    $p[$point>6?$point-3:$point]++;
    // if($dice==1) $p[1]++;
    // if($dice==2) $p[2]++;
    // if($dice==3) $p[3]++;
    // if($dice==4) $p[4]++;
    // if($dice==5) $p[5]++;
    // if($dice==6) $p[6]++;
}
foreach($p as $point=>$count){
    echo"{$point}點出現{$count} 次<br>";
}
// echo "1點出現{$p[1]} 次<br>";
// echo "2點出現{$p[2]} 次<br>";
// echo "3點出現{$p[3]} 次<br>";
// echo "4點出現{$p[4]} 次<br>";
// echo "5點出現{$p[5]} 次<br>";
// echo "6點出現{$p[6]} 次<br>";
?>
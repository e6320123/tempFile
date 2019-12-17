<?php
$poker = array();
for($i=0;$i<52;$i++){
    do{
        $temp = rand(0,51);
        $isRepeat=false;
        for($j=0;$j<$i;$j++){
            if($temp==$poker[$j]){
                $isRepeat=true;
                break;
            }
        }
    }while($isRepeat);
    $poker[$i]=$temp;
    echo"$temp<br>";
}
?>
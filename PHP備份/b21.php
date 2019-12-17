<?php

$a[0]=123;
$a[1][0]=10;
$a[1][1]='Ben';
$a[1][2][3] =456;
$a[2]=array(1,2,3,4,5);
var_dump($a);

echo count($a[0]);  //1
echo count($a[1]);  //3
echo count($a[2]);  //5
echo"<br>";echo"<br>";echo"<br>";
foreach($a as $k=>$v){
    if(getType($v)=='array'){
        foreach($v as $vv){
            if(getType($vv)=='array'){
                foreach($vv as $vvv){
                    echo $vvv;echo"<br>";
                }
            }else{
                echo $vv;echo"<br>";
            }
        }
    }else{
        echo $v;echo"<br>";
    }
}
?>
<?php
$str='xabcdexfg';

$find='x';
$w=strpos($str,$find);
if($w!==false){      //$w===0    //$w>=0不準確
    echo"有".$w;
}else{
    echo"沒有".$w;
}
?>
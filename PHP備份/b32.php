<?php

$str='A323454321';
$patt='/^[A-Z][12][0-9]{8}$/';     //    /g 全域    /i 不分大小寫
                    // 1$   結尾是1     ^A  開頭是A

if(preg_match($patt,$str)){
    echo'ok';
}else{
    echo 'xx';
}
?>
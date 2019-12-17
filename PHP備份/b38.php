<?php

$content=file('v/Book1.csv');
foreach ($content as $k => $v) {
    // echo "$k==>$v<br>";
}


$content=file_get_contents('v/Book1.csv');
 
echo $content;
?>
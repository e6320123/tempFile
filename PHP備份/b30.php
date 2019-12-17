<?php
function t1() {
    global $v;
    $v+=7;
}

$v = 100;
t1();
t1();
t1();
t1();
echo $v;
?>
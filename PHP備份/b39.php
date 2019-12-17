<?php


$fp=fopen('v/ben.txt','a+');//r+  w+  r+  w+
// fwrite($fp,'ben');  // windows 換列 \r(windows獨有)  \n(unix macs通用)
// fwrite($fp,"ben\n");   
fwrite($fp,"ben\nline1\nline2\n");   
fclose($fp);
?>
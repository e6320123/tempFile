<?php

if(isset($_GET['filename'])&&isset($_GET['content'])){
    $filename=$_GET['filename'];
    $content=$_GET['content'];

     $fpw=fopen("v/$filename",'w');
     fwrite($fpw,$content);

     fclose($fpw);

     header("Location: v/$filename");   //把人帶走    程式前面不能有其他轉向輸出
}

 
?>
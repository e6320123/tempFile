<?php
$file=$_FILES['upload'];
var_dump($_FILES['upload']);
echo'<br>';
echo'<br>';
echo'<br>';
echo'<br>';
echo'<br>';
echo gettype($_FILES['upload']);
if($file['error']==0){
    // if(copy($file['tmp_name'],"up/{$file['name']}")==0){
    if(move_uploaded_file($file['tmp_name'],"up/v/{$file['name']}")){
        echo"ok";
    }else{
        echo"fail";
    }
}


// ["tmp_name"]=> string(24) "C:\xampp\tmp\phpA71F.tmp"      apache暫存區
// ["error"]=> int(0)       0代表沒錯誤
// ?>
<?php

$file=$_FILES['upload'];
 foreach ($file as $k=> $v) {
    echo"$k<br>";
    
    foreach ($v as $kk => $vv) {
        echo"$kk==>$vv<br>";
    }
    echo '<hr>';
}

foreach ($file['error'] as $k => $v) {
    if($v==0){
        if(move_uploaded_file(
            "{$file['tmp_name'][$k]}",
            "v/up/{$file['name'][$k]}")){
            echo'ok';
        }else{
            echo'fail';
        }
    }
}

?>
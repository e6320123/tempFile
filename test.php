
<?php



function show_arr($arr){
    foreach ($arr as $key => $value) {
        if(is_array($value)){
            echo $key . ' => [<br>';
            foreach ($value as $key2 => $value2) {
                echo "&emsp;&emsp;";
                echo $key2 .' => ' . $value2 . '<br>';
            }
            echo "&emsp;&emsp;]<br>";
        }else{
            echo $key .' => ' . $value . '<br>';
        }
    }
}

$arr = ['123', '345', '678'];

show_arr($arr);

 
 






// 第一章、Linux是什麼與如何學習
// 1.1.3


?>
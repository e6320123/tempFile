
<?php



function show_arr($arr){
    $k_color = "<span style=\"color:#fc9e4f;\">";
    $v_color = "<span style=\"color:#21897e;\">";
    $span_end = "</span>";
    $i = 0;
    foreach ($arr as $key => $value) {
        $key_out = $k_color.$key.$span_end;
        if(is_array($value)){
            echo  $key_out . ' => [';
            echo "<br>"; 
            echo "&emsp;";
            foreach ($value as $key2 => $value2) {
                $key_out = $k_color.$key2.$span_end;
                $i++;
                echo "&emsp;";
                echo $key_out .' => ' . $v_color.$value2.$span_end;
                echo ",";
                if($i==5) {
                    echo "<br>";
                    $i = 0;
                }
            }
            echo "<br>";
            echo "]";
            echo "<br>";
        }else{
            echo $key_out .' => ' . $value;
            echo "<br>";
        }
    }
}

$arr = ['123', '345', '678'];

show_arr($arr);

 
 






// 第一章、Linux是什麼與如何學習
// 1.1.3


?>
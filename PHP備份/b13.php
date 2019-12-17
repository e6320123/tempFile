<?php
    $month = rand(1,12);
    switch ($month) {
        case 1:case 3:case 5:case 7:case 8:case 10:case 12:
            echo $month;
            echo '月大';
            break;
        case 2:case 4:case 6:case 9:case 11:
            echo $month;
            echo '月小';
            break;
        default:
            echo'X';
            break;
    }
?>
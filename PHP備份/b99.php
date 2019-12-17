
<table border="1" width=100%>
    <?php
    define("ROW",3);
    define("DPR",7);    //tds per row
    define("START",1);    
    for($k=0;$k<ROW;$k++){
        echo "<tr>";
        for($j=START;$j<START+DPR;$j++){
            $nj=$j+$k*DPR;
            if(($j+$k)%2==0){
                echo"<td bgcolor='white'>";
            }else{
                echo"<td bgcolor='pink'>";
            }
            for($i=1;$i<=9;$i++){
                $r=$nj*$i;
                echo "{$nj}x${i}=$r <br>";
            }
                echo"</td>";
        }
            echo "</tr>";
    }
    ?>  
</table>
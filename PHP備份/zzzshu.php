<form action="zzzshu.php">
<input type="text" name="num" placeholder="輸入要計算的數字">
<input type="text" name="row" placeholder="輸入要印幾列">
<input type="submit">
</form>
<?php
$num =$row =null;

if(!empty($_GET['num']) && !empty($_GET['row'])){
   
    $num = $_GET['num'];
    $row=$_GET['row'];
    $zzz=array();

for($i=1;$i<=$num;$i++){
        $iszz=true;
        for($j=1;$j<=$i;$j++){
            if($i%$j==0 && $j!=1 && $j!=$i){
                $iszz=false;
                break;
            }
        }
        if($iszz){
            $zzz[]=$i;
        }
    }  
    $npr=(int)(count($zzz)/$row)+1;
    $wid=($npr/2)*10;
    echo"<p>{$num}以內的所有質數</p>";
    echo"<table border='1' width='{$wid}%'>"; 
    foreach($zzz as $ind=>$v){
        if($ind%$npr==0){echo"<tr>";} 

        if(1){echo "<td>";}else{echo "<td bgcolor='pink'>";}
        echo $zzz[$ind];
        echo"</td>";

        if($ind%$npr==$npr-1){echo"</tr>";}
    }
    echo"</table>";

}elseif(isset($_GET['num']) && (empty($_GET['num'])|| empty($_GET['row']))){
    echo"兩欄都要輸入數字!!";
}
?>

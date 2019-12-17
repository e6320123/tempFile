<?php
function chktwid($id){
    $patt='/^[A-Z][12][0-9]{8}$/';// 1$   結尾是1     ^A  開頭是A
                                    //    /g 全域    /i 不分大小寫
    $letters='ABCDEFGHJKLMNPQRSTUVXYWZ';
     
    if(preg_match($patt,$id)){
         $c1=substr($id,0,1);
         $n12=strpos($letters,$c1)+10;
         $n1=(int)($n12/10);
         $n2=$n12%10;
         $n3=substr($id,1,1);
         $n4=substr($id,2,1);
         $n5=substr($id,3,1);
         $n6=substr($id,4,1);
         $n7=substr($id,5,1);
         $n8=substr($id,6,1);
         $n9=substr($id,7,1);
         $n10=substr($id,8,1);
         $n11=substr($id,9,1);
         $sum=$n1 *1+$n2 *9+$n3 *8+$n4 *7+$n5 *6+$n6 *5+$n7 *4+$n8 *3+$n9 *2+$n10 *1+$n11 *1;
        return $sum%10==0;
    }else{
        return false;
    }
}
function createTWid(){
    $en=str_split('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    $tempid=$en[rand(0,25)].rand(1,2);
    for ($i=0; $i <7 ; $i++) { 
        $tempid.=rand(0,9);
    }
    for ($i=0; $i <10 ; $i++) { 
        if(chktwid($tempid.$i;)){
            $tempid.=$i;
            break;
        }
    } 
    return $tempid;
}
?>
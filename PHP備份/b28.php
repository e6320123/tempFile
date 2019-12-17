<?php
saya();

function saya(){        //function 寫在任何php頁面看的到的地方都可以
    echo'aa<br><hr>';
}

function sayhiv2($n,$name){ 
    for ($i=0; $i <$n ; $i++) { 
        echo"hello ,{$name}<br>";
    }
}
function sayhiv3($n=1,$name='world'){ 
    for ($i=0; $i <$n ; $i++) { 
        echo"hello ,{$name}<br>";
    }
}
// sayhiv2(2,'sam');
// sayhiv2(1,'tom');
// sayhiv3();
// sayhiv3(3,'ben');
// sayhiv3(1,'ben');

function sayhiv4( ){
        // echo func_num_args().'<br>';
        $aaa=func_num_args();
        foreach ($aaa as  $k => $v) {
            echo "[$k]=>$v";
        }
}
sayhiv4();
sayhiv4(2,3,4,"g",'g','g','g',2);
sayhiv4(3241,4,'r','rg','gffg');
sayhiv4(1232,'sfdf',1,22);

?>
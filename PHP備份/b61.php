<?php

$pwd="123456";
$pwd1=password_hash($pwd,PASSWORD_DEFAULT);     #密碼加密($pwd,演算法)
echo $pwd1;
echo '<hr>';
if(password_verify('123456',$pwd1)){     #密碼驗證(明碼,hash碼)
    echo 'ok';
}else{
    echo'xx';
}
?>
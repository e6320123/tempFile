<?php
// if(isset())     die
//                 exit    
//                 return
//                 header('Location: ')
?>
<?php

$data['var1']=123;
$data['var2']=345;
$data['var3']='ben';
$query=http_build_query(array('data'=>$data));
echo $query;
?>

<?php
$data=$_GET['data'];
foreach($data as $k=>$v){
    $$k=$v;
}
?>


<h1><?php echo $title;?></h1>
<hr>

Hello,<?php echo $user;?><br>
... 
<hr>
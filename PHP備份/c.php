<?php

//1.Model
include 'bradapis.php';
//2.call view
function loadview($viewFile,$data){
    $query=http_build_query(array('data'=>$data));  //b51.php
    file_get_contents("http://localhost/ben/views/{$viewFile}.php?{$query}");
}


$data =processData();   //C->M   M->C
loadView('view1',$data);//C->V   V->前端
?>
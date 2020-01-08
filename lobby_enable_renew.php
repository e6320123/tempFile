<?php

include ("../../../conf/config_ctl.php");


$sql = "SELECT tbid,casino,name_c,lobby_enable,lobby_display,admin_enable FROM BA_lobby order by name_c ";
$dbr->query($sql);  
$tb_name_ary["OKADA"] = $tb_name_ary["RWM"] = $tb_name_ary["BA1"] = array();
while($dbr->next_record()){
    if($dbr->f("tbid") != 0) { 
        if($dbr->f("casino") == "OKADA") array_push($tb_name_ary["OKADA"],$dbr->f("name_c"));
        if($dbr->f("casino") == "RWM") array_push($tb_name_ary["RWM"],$dbr->f("name_c"));
        if($dbr->f("casino") == "BA1") array_push($tb_name_ary["BA1"],$dbr->f("name_c"));
        $key = $dbr->f("name_c");
        $tb_data[$key]["lobby_enable"] = $dbr->f("lobby_enable");
        $tb_data[$key]["lobby_display"] = $dbr->f("lobby_display");
        $tb_data[$key]["admin_enable"] = $dbr->f("admin_enable");
    }  
}  
$all_data["data"] = $tb_data;
$all_data["ary"] = $tb_name_ary; 
$php_data=json_encode($all_data);  

print_r($php_data);
exit();
?>


<?php

include ("../../../conf/config_ctl.php");

$tpl->define(array(main=>"v_live_switch.html")); 

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
if($_POST["renew"] != "Y") $memberUid = $_GET["uid"];
$all_data["data"] = $tb_data;
$all_data["ary"] = $tb_name_ary;
$php_data=json_encode($all_data);  
 
if($langx == "zh-tw") include ("../../../tpl/control/zh-tw/v_live_switch.html");
if($langx == "zh-cn") include ("../../../tpl/control/zh-cn/v_live_switch.html");


exit();
function switch(){ 
    $record_db = new proc_DB(DB_RECORD_HOST,DB_USER,DB_PWD,DB_RECORD_NAME);

    $uid = $_POST["uid"];
    $action = $_POST["action"];     //openTb    closeTB
    $tbAry = json_decode($_POST["tbAry"]);

    foreach ($tbAry as $key => $tableName) {
        $dbr->query("SELECT * FROM BA_lobby WHERE name_c='".$tableName."';");
        while ($dbr->next_record()) {
            $tbid = $dbr->f('tbid');
            $ip=$dbr->f("php_ip");
            $port=$dbr->f('server_port');
        } 
        //牌桌開放/關閉
        $flag=($action=='openTb')?"Y":"N";
        //javaConnnection("903,".$flag.",".$MEM_DATA["username"],$ip,$port,false);
    
        echo "901,closeGame,".$tbid.",".$flag.",".$MEM_DATA["username"]." ".$ip." ".$port;
        javaConnnection("901,closeGame,".$tbid.",".$flag.",".$MEM_DATA["username"],$ip,$port,false);
        Write_Ctl_Record($MEM_DATA["username"],"BA_lobby","lobby_enable_swtich.php","M","資訊頁牌桌開關 tbid=$tbid($tableName),table_sw=$flag",$record_db,$USER_IP);  
        
    } 
    exit();


    function javaConnnection($command,$ip,$port,$back=false) {
        //echo "<script>alert('".$command."');</script>";
            if (CASINO == "SI") {return "";}
            $get="";
            $fp =fsockopen($ip, $port, $errno, $errstr, 5);
            if (!$fp) {
                //echo "<script>alert('server error');</script>";
            } else {
            fwrite($fp, $command."\n");
            if ($back) {
                while (!feof($fp)) {

                    $get.= fgets($fp, 128);
                }
            }
            fclose($fp);
            }
            return $get;

    }
}
function renew(){ 
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
}
?>


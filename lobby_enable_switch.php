<?php
include("../../../conf/config_ctl.php");
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
?>

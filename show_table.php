<?php
include ("../../conf/config_admin.php");

$db = $db;

if ($action == "reload") {
	$sql = "SELECT tbid,name_c,lobby_enable,lobby_display,admin_enable,safe_sw,water_sw,exclusive_sw,vip_sw FROM BA_lobby  WHERE  tbid >= '1' and server_no='1' order by tbid";
	$db->query($sql);

	while($db->next_record()) {
        $out[$db->f("tbid")]["id"] = $db->f("tbid");
		$out[$db->f("tbid")]["name"] = $db->f("name_c");
		$out[$db->f("tbid")]["enable"] = $db->f("lobby_enable");
		$out[$db->f("tbid")]["display"] = $db->f("lobby_display");
		$out[$db->f("tbid")]["admin"] = $db->f("admin_enable");
		
		$out[$db->f("tbid")]["safe_sw"] = $db->f("safe_sw");
		$out[$db->f("tbid")]["water_sw"] = $db->f("water_sw");
		$out[$db->f("tbid")]["exclusive_sw"] = $db->f("exclusive_sw");
		$out[$db->f("tbid")]["vip_sw"] = $db->f("vip_sw");
	}
	$db->close();

	echo json_encode($out);
	exit;
} else if ($action == "modify") {

	$tempjson = str_replace("@", '"', $updateJson);
	$jsonData = json_decode($tempjson,true);
    $qstr = "";
    
	foreach ($jsonData as $key => $value) {
        $qstr = "UPDATE BA_lobby SET lobby_display = '".$jsonData[$key]["status"]."' WHERE tbid ='".$jsonData[$key]["id"]."' ;";
        $db->query($qstr);
        //寫紀錄
	    Write_Ctl_Record($MEM_DATA["username"],"BA_lobby","table_show/show_table.php","M","修改會員端顯示桌子 : ".preg_replace("/'/","",$qstr),$db,$_SERVER['REMOTE_ADDR']);
    }
    
	$db->close();

	$out["motion"] = "UPDATE_SUCCESS";
	// $out["sql"] = $qstr;
	echo json_encode($out);
	exit;
}
?>
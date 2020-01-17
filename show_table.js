// var langx = top.langx;
// var langStr = top.langStr;
var util = parent.util;
var listenEvt = parent.listenEvt;
// var usertype = top.usertype;
// var mid = top.mid;
var uid = parent.uid;
var SWobj = null;//存放other_set 資料

function init() {
	phpEvent = new phpEvent();
	listenEvent = new listenEvent();
	showView = new showView();

	phpEvent.getData();

}

function phpEvent() {
	var self = this;

	//取得預設資料
	self.getData = function () {
		var aPath = "../func/table_show/show_table.php";
		var parame = "uid=" + uid + "&action=reload";
		util.addPostPHP("reload_data", aPath, parame, this);
	}
    
	//修改資料
	self.setData = function () {
		var aPath = "../func/table_show/show_table.php";
		var parame = "uid=" + uid + "&action=modify";

		var parameObj = SWobj;
		for (var key in parameObj) {
			parameObj[key]["status"] = util.getSpan(document, parameObj[key]["id"]).value;
		}
		var tempStr = JSON.stringify(parameObj).replace(/"/gi, "@");
		parame += "&updateJson=" + tempStr;
        util.addPostPHP("update_data", aPath, parame, this);
        console.log(tempStr);
    }
    
    self.setSingleData = function(id){
        var sendObj = [];
        var aPath = "../func/table_show/show_table.php";
        var parame = "uid=" + uid + "&action=modify";
        
        var parameObj = SWobj;
		var key = id;
		parameObj[key]["status"] = util.getSpan(document, parameObj[key]["id"]).value;
        sendObj.push(parameObj[key]);
		var tempStr = JSON.stringify(sendObj).replace(/"/gi, "@");
		parame += "&updateJson=" + tempStr;
        util.addPostPHP("update_data", aPath, parame, this);
        console.log(tempStr);

    }

	//預設資料顯示
	self.phpDataCenter = function (eventName, phpData) {
		var obj = phpData;

		//顯示預設資料
		if (eventName == "reload_data") {
			SWobj = obj
			showView.showTable(SWobj);
		}

		//重新載入資料
		if (eventName == "update_data") {
			showMsg(obj["motion"]);
			self.getData();
		}
	}
}

function listenEvent() {
	var self = this;

	self.addHyperLink = function () {
        listenEvt.addOnClick("setData", util.getSpan(document, "editeBTN"), this, null);
        var sBtn = document.getElementsByName("single_edit");
        for(var i=0;i<sBtn.length;i++){
            listenEvt.addOnClick("setSingleData_"+i, sBtn[i], this, null);
        }
	}

	self.listenCenter = function (eventNameData, listenData) {
        var eventName = eventNameData.split("_")[0];
		if (eventName == "setData") {
			if (confirm("確定修改？")) {
				phpEvent.setData();
            }
            return;
        }
        
        if (eventName == "setSingleData"){
            var target = listenData;
            var  id =target.div.id.split("_")[0];
            var  name = SWobj[id]["name"];
            if (confirm("確定修改"+name+"？")) {
				phpEvent.setSingleData(id);
            }
            return;
        }
	}
}

function showView() {
	var self = this;

	self.showTable = function (data) { 
		console.log(JSON.stringify(data));
		//{"1":{"id":"1","name":"2001","enable":"N","display":"N","admin":"Y","safe_sw":"N","water_sw":"N","exclusive_sw":"Y","vip_sw":"N"},"2":{"id":"2","name":"2002","enable":"N","display":"N","admin":"Y","safe_sw":"Y","water_sw":"Y","exclusive_sw":"Y","vip_sw":"N"},"3":{"id":"3","name":"2003","enable":"N","display":"N","admin":"Y","safe_sw":"N","water_sw":"Y","exclusive_sw":"Y","vip_sw":"N"},"4":{"id":"4","name":"2004","enable":"N","display":"N","admin":"Y","safe_sw":"N","water_sw":"Y","exclusive_sw":"Y","vip_sw":"N"},"5":{"id":"5","name":"2101","enable":"N","display":"N","admin":"Y","safe_sw":"N","water_sw":"N","exclusive_sw":"N","vip_sw":"N"},"6":{"id":"6","name":"2102","enable":"N","display":"N","admin":"Y","safe_sw":"N","water_sw":"Y","exclusive_sw":"F","vip_sw":"N"},"7":{"id":"7","name":"2103","enable":"N","display":"N","admin":"Y","safe_sw":"N","water_sw":"Y","exclusive_sw":"F","vip_sw":"N"},"8":{"id":"8","name":"2104","enable":"N","display":"N","admin":"Y","safe_sw":"N","water_sw":"Y","exclusive_sw":"F","vip_sw":"N"},"9":{"id":"9","name":"2105","enable":"N","display":"N","admin":"Y","safe_sw":"N","water_sw":"Y","exclusive_sw":"Y","vip_sw":"N"},"10":{"id":"10","name":"2106","enable":"N","display":"N","admin":"Y","safe_sw":"Y","water_sw":"Y","exclusive_sw":"F","vip_sw":"N"},"11":{"id":"11","name":"2107","enable":"N","display":"N","admin":"Y","safe_sw":"N","water_sw":"Y","exclusive_sw":"F","vip_sw":"N"},"12":{"id":"12","name":"2108","enable":"N","display":"N","admin":"Y","safe_sw":"N","water_sw":"Y","exclusive_sw":"Y","vip_sw":"N"},"13":{"id":"13","name":"2109","enable":"N","display":"N","admin":"Y","safe_sw":"N","water_sw":"Y","exclusive_sw":"N","vip_sw":"N"},"14":{"id":"14","name":"2110","enable":"N","display":"N","admin":"Y","safe_sw":"N","water_sw":"Y","exclusive_sw":"N","vip_sw":"N"},"15":{"id":"15","name":"3001","enable":"N","display":"N","admin":"Y","safe_sw":"N","water_sw":"Y","exclusive_sw":"F","vip_sw":"N"},"16":{"id":"16","name":"3002","enable":"N","display":"N","admin":"Y","safe_sw":"N","water_sw":"Y","exclusive_sw":"F","vip_sw":"N"},"17":{"id":"17","name":"3003","enable":"N","display":"N","admin":"Y","safe_sw":"N","water_sw":"Y","exclusive_sw":"F","vip_sw":"N"},"18":{"id":"18","name":"3004","enable":"N","display":"N","admin":"Y","safe_sw":"N","water_sw":"Y","exclusive_sw":"F","vip_sw":"N"},"19":{"id":"19","name":"3005","enable":"N","display":"N","admin":"Y","safe_sw":"N","water_sw":"Y","exclusive_sw":"F","vip_sw":"N"},"20":{"id":"20","name":"3007","enable":"N","display":"N","admin":"Y","safe_sw":"N","water_sw":"Y","exclusive_sw":"F","vip_sw":"N"},"21":{"id":"21","name":"6601","enable":"Y","display":"Y","admin":"Y","safe_sw":"N","water_sw":"Y","exclusive_sw":"Y","vip_sw":"N"},"22":{"id":"22","name":"6602","enable":"N","display":"Y","admin":"Y","safe_sw":"N","water_sw":"Y","exclusive_sw":"F","vip_sw":"N"},"23":{"id":"23","name":"6603","enable":"Y","display":"Y","admin":"Y","safe_sw":"N","water_sw":"Y","exclusive_sw":"Y","vip_sw":"N"},"24":{"id":"24","name":"6604","enable":"Y","display":"Y","admin":"Y","safe_sw":"N","water_sw":"Y","exclusive_sw":"Y","vip_sw":"N"},"25":{"id":"25","name":"6605","enable":"Y","display":"Y","admin":"Y","safe_sw":"N","water_sw":"Y","exclusive_sw":"F","vip_sw":"N"},"26":{"id":"26","name":"6606","enable":"Y","display":"Y","admin":"Y","safe_sw":"N","water_sw":"Y","exclusive_sw":"Y","vip_sw":"N"},"27":{"id":"27","name":"6607","enable":"Y","display":"Y","admin":"Y","safe_sw":"N","water_sw":"Y","exclusive_sw":"Y","vip_sw":"N"},"28":{"id":"28","name":"6608","enable":"Y","display":"Y","admin":"Y","safe_sw":"N","water_sw":"Y","exclusive_sw":"N","vip_sw":"N"},"29":{"id":"29","name":"6701","enable":"Y","display":"Y","admin":"Y","safe_sw":"N","water_sw":"Y","exclusive_sw":"N","vip_sw":"N"},"30":{"id":"30","name":"6801","enable":"Y","display":"Y","admin":"Y","safe_sw":"N","water_sw":"Y","exclusive_sw":"N","vip_sw":"N"},"31":{"id":"31","name":"6901","enable":"Y","display":"Y","admin":"Y","safe_sw":"N","water_sw":"Y","exclusive_sw":"N","vip_sw":"N"},"32":{"id":"32","name":"5001","enable":"Y","display":"Y","admin":"Y","safe_sw":"N","water_sw":"Y","exclusive_sw":"N","vip_sw":"N"},"33":{"id":"33","name":"5002","enable":"Y","display":"Y","admin":"Y","safe_sw":"N","water_sw":"Y","exclusive_sw":"N","vip_sw":"N"},"34":{"id":"34","name":"5003","enable":"N","display":"Y","admin":"Y","safe_sw":"N","water_sw":"Y","exclusive_sw":"N","vip_sw":"N"},"35":{"id":"35","name":"5004","enable":"Y","display":"Y","admin":"Y","safe_sw":"N","water_sw":"Y","exclusive_sw":"N","vip_sw":"N"},"36":{"id":"36","name":"5005","enable":"Y","display":"Y","admin":"Y","safe_sw":"N","water_sw":"Y","exclusive_sw":"N","vip_sw":"N"},"37":{"id":"37","name":"5006","enable":"Y","display":"Y","admin":"Y","safe_sw":"N","water_sw":"Y","exclusive_sw":"N","vip_sw":"N"},"38":{"id":"38","name":"5007","enable":"Y","display":"Y","admin":"Y","safe_sw":"N","water_sw":"Y","exclusive_sw":"N","vip_sw":"N"},"39":{"id":"39","name":"5008","enable":"Y","display":"Y","admin":"Y","safe_sw":"N","water_sw":"Y","exclusive_sw":"N","vip_sw":"N"},"40":{"id":"40","name":"5301","enable":"Y","display":"Y","admin":"Y","safe_sw":"N","water_sw":"Y","exclusive_sw":"N","vip_sw":"N"},"41":{"id":"41","name":"7001","enable":"Y","display":"Y","admin":"Y","safe_sw":"N","water_sw":"Y","exclusive_sw":"N","vip_sw":"N"},"42":{"id":"42","name":"7002","enable":"Y","display":"Y","admin":"Y","safe_sw":"N","water_sw":"Y","exclusive_sw":"N","vip_sw":"N"},"43":{"id":"43","name":"7003","enable":"Y","display":"Y","admin":"Y","safe_sw":"N","water_sw":"Y","exclusive_sw":"N","vip_sw":"N"},"44":{"id":"44","name":"7004","enable":"Y","display":"Y","admin":"Y","safe_sw":"N","water_sw":"Y","exclusive_sw":"N","vip_sw":"N"},"45":{"id":"45","name":"7301","enable":"Y","display":"Y","admin":"Y","safe_sw":"N","water_sw":"Y","exclusive_sw":"N","vip_sw":"N"},"46":{"id":"46","name":"5201","enable":"Y","display":"Y","admin":"Y","safe_sw":"N","water_sw":"Y","exclusive_sw":"N","vip_sw":"N"},"47":{"id":"47","name":"7005","enable":"Y","display":"Y","admin":"Y","safe_sw":"N","water_sw":"Y","exclusive_sw":"N","vip_sw":"N"}}
		var show_main = util.getSpan(document, "show_main");
		var xmp_header = util.getSpan(document, "xmp_header").innerHTML;
		var xmp_footer = util.getSpan(document, "xmp_footer").innerHTML;
		var xmp_content = util.getSpan(document, "xmp_content").innerHTML;
		
		var dataStr = "";

		for (var key in data) {
			var tr = xmp_content;
			tr = tr.replace(/\*NAME\*/gi, data[key]["name"]);
			
			var alltd = repla(data,key,"enable",false)
						+repla(data,key,"display",false)
						+repla(data,key,"admin",false)
						//xxx_sw
						+repla(data,key,"safe_sw",false)
						+repla(data,key,"water_sw",false)
						+repla(data,key,"exclusive_sw",true)
						+repla(data,key,"vip_sw",false);

			tr = tr.replace(/\*TD\*/gi, alltd);

			dataStr += tr;
		}
		show_mainL.innerHTML = xmp_header + dataStr + xmp_footer;
		// show_mainR.innerHTML = xmp_header + dataStr + xmp_footer;
		listenEvent.addHyperLink();
	}
}
function repla(data,key,key2,hasF){
	var xmp_td = util.getSpan(document, "xmp_td").innerHTML;
	var xmp_opt = util.getSpan(document, "xmp_opt").innerHTML;
	var optF = "";
	if(hasF) optF = xmp_opt.replace(/\*char\*/gi, "F");
	var allopt = xmp_opt.replace(/\*char\*/gi, "Y") + optF + xmp_opt.replace(/\*char\*/gi,"N");
	allopt = allopt.replace("*SELECTED" + data[key][key2] + "*", "selected");
	var newTd =  xmp_td.replace(/\*ONAME\*/gi, key2+key).replace(/\*OPTION\*/gi, allopt);
	return newTd;
}
function showMsg(code) {
	if (code == "UPDATE_SUCCESS") {
		alert("修改成功!");
	}
}
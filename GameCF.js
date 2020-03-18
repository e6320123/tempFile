var _top = parent;
var util = _top.util;			//工具包
var listenEvt = _top.listenEvt;	//監聽動作
var langStr = _top.langStr;		//語系檔

//珠路圖變數
var roadView =null;
var table_data = _top.table_data;
var player = _top.playerData;
var tableNO = player.tableNO;
var gid = player.gid;
var linsetTranser = _top.linsetTranser || { "": "3", "p": "1", "c": "2", "f": "4", "k": "5" };
var isSecure = ('https:' == document.location.protocol);
var close_msg = null;			//關閉訊息
var marPCObj = {};
var marPHONEObj = {};

// var dataSort = ["MC", "MN", "MH", "OV", "UN", "HP", "CP"];
// var roadSort = ["ALL", "RE", "OT"];
// var roadIndex = 0;
// var roadImg = ["road_nocard", "road_big", "road_small"];
// var allInAry = { "MC": 0.5, "MH": 0.5, "MN": 0.05, "CP": 0.05, "HP": 0.05 };		//允許全下的額度
// var minChipAry = { "MC": 0.0025, "MH": 0.1, "MN": 0.01, "CP": 0.01, "HP": 0.01 };	//全下的最小籌碼

var close_betrecord_time = 5000;	//可取消時間(毫秒)
var close_msg_time = 3000;			//隱藏訊息時間(毫秒)
var moreGameAry;
var timerFlag;
var m_second;
var nowGidAry=[];	//存顯示賽事的gid

//初始化工具
function init(){
	player.exRate =1;	//預設幣值轉換率1
	//載入已下注注單
	var betAry = _top.singleBetAry;
	ch_bet_list(betAry); 

	//繪製珠路物件
	roadView = _top.roadView;
	//繪出路珠					
	roadView.cmdParseRoad(tableNO, util.getSpan(document, "road_img"), util.getSpan(document, "road_loading"), table_data[tableNO].roadGridAry, "BR");
	listenEvent = new listenEvent(); 
	//載入籌碼圖片
	calimage = new BetCalImage();
	calimage.loadimage("../../images/CF_ba_coin.png");
	
	//選桌區
	show_other_table("table_cnt","table_proto");
	//加上換桌事件
	listenEvent.setTableListen();
	frameInit();
	//donson end
	return;
	_top.chkViewWaitPrView(); //檢查是否要顯示縮小圖示
	betEvent = new betEvent();
	listenEvent = new listenEvent();
	phpEvent = new phpEvent();
	socketEvent = new socketEvent();
	tableEvent = new tableEvent();
	viewEvent = new viewEvent();

	video = new GameBA_videoView();	//視訊畫面含全螢幕按鈕
	video.init();

	calimage = new BetCalImage();
	calimage.init();
	//電腦版
	marPCObj = new marquee({
		trigger: "marquee",
		millisecond: 40,
	});
	//手機版
	marPHONEObj = new marquee({
		trigger: "marquee_ph",
		millisecond: 40,
	});

	_top.vanishCustomBtn(document.getElementsByName("parent"));
	if (player.username != "testm9999") {
		util.getSpan(document, "username").innerHTML = player.username;
		util.getSpan(document, "username_childPH").innerHTML = player.username;
	}

	//doSet
	viewEvent.openFunc();
	viewEvent.loadAllTableName(table_data);		//載入所有桌號
	viewEvent.show_line(_top.video_set);
	viewEvent.setGoodRoadType("chk");
	util.checkScale(document, true);

	var sec = 0;
	if (!player.nowTime) player.nowTime = 0;
	setInterval(function () {
		player.nowTime += 1000;					//現在時間
		viewEvent.setTimer(null, true);			//倒數
		if (sec % 60 == 0) phpEvent.getScoll();	//跑馬燈
		if (tmp_div = util.getSpan(document, "now_time")) tmp_div.innerHTML = util.paserStr(new Date(player.nowTime));	//test

		sec++;
	}, 1000);

	//allset done
	changeTable(tableNO);

	//建立監聽事件
	listenEvent.setStaticListen();

	document.addEventListener("visibilitychange", handleVisibilityChange, false);
}
function frameInit(){
	tableNO = player.tableNO;
	gid = player.gid; 

	//HLS視訊
	newHLSplayer();
	//設定視訊倒數計時
	clearInterval(timerFlag);
	var game = table_data[tableNO]["gameData"][gid];
	m_second = new Date(game.gamedate + " " + game.etime)-_top.serverTime;
	timerFlag = setInterval(function (){
		if(m_second>=0){
			if(table_data[tableNO]["gameData"][gid].gover == "Y"){//gover ="Y" 倒數計時歸零
				m_second = -1;
				getEle("video_time").innerText = "00:00:00";
				return;
			}
			m_second -= 1000;
			getEle("video_time").innerText = ms2hms(m_second);
		} 
		//隱藏已結束10分鐘賽事
		var topGame = table_data[tableNO]["gameData"][nowGidAry[0]];
		var EndDate = new Date(topGame.gamedate + " " + topGame.etime).getTime()+601000;
		if (_top.serverTime > EndDate){	
			nowGidAry.shift();
			reNewGame();
		}	
	},1000);
	//手機換桌鈕title
	getEle("ph_tb_title").innerText = table_data[tableNO]["tableName"];
	//顯示tbName
	getEle("vid_tbName").innerText = table_data[tableNO]["tableName"];
	getEle("now_tbName").innerText = table_data[tableNO]["tableName"];
	//顯示珠數
	getEle("rbead").innerText = table_data[tableNO]["HCM_ary"]["R"];
	getEle("gbead").innerText = table_data[tableNO]["HCM_ary"]["G"];
	getEle("bbead").innerText = table_data[tableNO]["HCM_ary"]["B"];
	//顯示使用者資料
	userData();
	//顯示底下資料 bottom_data(acc,money,currency)
	bottom_data(player.username,player.maxcredit,player.currency);
	
	reNewGame();
}
function reNewGame(){
	//載入更多賽事
	showMoreGame("more_game_list","more_game_proto");
	//載入更多賽事(手機)
	showMoreGame("ph_moreGame_list","ph_moreGame_proto");
	var haveMoreGame = document.getElementsByName("moreGame").length;
	if(haveMoreGame){
		//預設發亮框
		util.getSpan(document,"moreGame_"+gid).className += " active";
		//加上亮框事件
		listenEvent.lightMoreGame();
		//顯示下注區資料
		ch_main_data();
	}else{	//沒賽事回大廳 
		clearInterval(timerFlag);
		getEle("video_time").innerText = "00:00:00";
		// _top.changeMain("game", "LobbyCF", "");	
		return;
	}
	//關閉下注區
	if(table_data[player.tableNO]["gameData"][gid]["receive"] =="N"){
		cbet();
		getEle("betRate_MH").innerText = table_data[player.tableNO]["gameData"][gid]["realIoratio"]["MH"];
		getEle("betRate_MN").innerText = table_data[player.tableNO]["gameData"][gid]["realIoratio"]["MN"];
		getEle("betRate_MC").innerText = table_data[player.tableNO]["gameData"][gid]["realIoratio"]["MC"];
		return;
	}
	//預設開啟
	obet();
}
// ------新增4------
//毫秒轉hh:mm:ss
function ms2hms(ms){
	var s = Math.floor(ms/1000);
	var m = Math.floor(s/60);
	s = s%60;
	var h = Math.floor(m/60);
	m = m%60;
	if(s<10) s="0"+s;
	if(m<10) m="0"+m;
	if(h<10) h="0"+h;
	var hms = h+":"+m+":"+s;
	return hms;
}
//物件排序
function SortObj(obj) {
	var sort_obj = [];
	for (var key in obj) {
		sort_obj.push(obj[key]);
	}
	sort_obj.sort(function (a, b) { 
		return new Date(a["gamedate"] + " " + a["etime"]) - new Date(b["gamedate"] + " " + b["etime"]);
	});
	return sort_obj;
}
//換桌後取得第一個gid
function getFirstGid(tbno){
	for (var g in table_data[tbno]["gameData"]){
		var game = table_data[tbno]["gameData"][g]; 
		var StarDate = new Date(game.gamedate + " " + game.stime);
		if (_top.serverTime < StarDate) continue;	//隱藏時間未開放賽事
		var EndDate = new Date(game.gamedate + " " + game.etime).getTime()+600000;
		if (_top.serverTime > EndDate) continue;	//隱藏已結束10分鐘賽事
		if (game.gopen == "N") continue;			//隱藏賽事
		// if (game.gover != "N") continue;			//隱藏已結束賽事
		return g;
	}
	return "noGame";
}
function ch_bet_currency(){
	var cnt_MH = table_data[player.tableNO]["gameData"][gid]["betwagers"]["MH"]*1000*player.exRate/1000;
	var cnt_MN = table_data[player.tableNO]["gameData"][gid]["betwagers"]["MN"]*1000*player.exRate/1000;
	var cnt_MC = table_data[player.tableNO]["gameData"][gid]["betwagers"]["MC"]*1000*player.exRate/1000;
	//顯示下注區下注統計
	getEle("bet_MH").children[0].innerText = cnt_MH;
	getEle("bet_MN").children[0].innerText = cnt_MN;
	getEle("bet_MC").children[0].innerText = cnt_MC;
	//關閉下注區顯示下注統計
	getEle("bet_dragon").innerText = 	  addDot(cnt_MH);
	getEle("bet_ho").innerText = addDot(cnt_MN);
	getEle("bet_phoenix").innerText =  addDot(cnt_MC);
}
function ch_main_data(){
	ch_bet_currency();
	//改名稱
	getEle("g_name").innerText = table_data[player.tableNO]["gameData"][gid].title;
	//圖片
	var picID = _top.table_data[player.tableNO]["gameData"][gid]["team_h"]["id"];
	var picID2 = _top.table_data[player.tableNO]["gameData"][gid]["team_c"]["id"];
	var picSrc = _top.picture_data[picID];
	var picSrc2 = _top.picture_data[picID2];
	//變換顯示資料
	util.getSpan(document,"big_name1").innerText = moreGameAry[gid]["team_h"].name_c;
	util.getSpan(document,"big_name2").innerText = moreGameAry[gid]["team_c"].name_c;
	util.getSpan(document,"big_weight1").innerText = moreGameAry[gid]["team_h"].wt+".00g";
	util.getSpan(document,"big_weight2").innerText = moreGameAry[gid]["team_c"].wt+".00g";
	util.getSpan(document,"big_img1").src = picSrc;
	util.getSpan(document,"big_img2").src = picSrc2;
	//變換video資料
	getEle("vid_tbWid").innerText = gid;
	//變換倒數毫秒
	var game = table_data[player.tableNO]["gameData"][gid];
	if(game.gover != "Y"){		//gover !="Y" 不是Y 才更換倒數計時
		m_second = new Date(game.gamedate + " " + game.etime)-_top.serverTime;
		if(m_second>=0) getEle("video_time").innerText = ms2hms(m_second);
	}else{
		getEle("video_time").innerText = "00:00:00";
	}
}
//顯示個人下注統計 需先設定 setSingleBetwagers（）
function singleBetData(){
	var data = table_data[tableNO]["gameData"][gid]["singlebetwagers"];
	if(data == undefined) return 0;
	var total = (data["MN"] * 1)+(data["MC"] * 1)+(data["MH"] * 1);
	getEle("cnt_ho").innerHTML = data["MN"] * 1;
	getEle("cnt_phin").innerHTML = data["MC"] * 1;
	getEle("cnt_dra").innerHTML = data["MH"] * 1;	
	return total;
}
//數字每三位加逗號
function addDot(num){
	var dotAry = [];
	num = num + "";
	var ary = num.split("");
	if(num.indexOf(".") != -1){		//有小數點
		for (var i = num.length-1; i > 0; i--) {
			var temp = ary.pop();
			dotAry.unshift(temp);
			if(temp == ".") break;
		}
	}
	var newAry = new Array();
	var leng = ary.length;
	for (var i = 1; i <= leng; i++) {
		var ele = ary.pop();
		newAry.unshift(ele);
		if(i%3 == 0 && i!= leng) newAry.unshift(",");
	}
	if(dotAry.length != 0) newAry = newAry.concat(dotAry);
	return newAry.join("");
}
//減短function
function getEle(ele){
	return util.getSpan(document,ele);
}
//關閉下注區
function cbet(){
    util.getSpan(document,"close_bet_box").className = "close_bet_box active";
}
//開啟下注區
function obet(){
    util.getSpan(document,"close_bet_box").className = "close_bet_box";
}
//使用者資料
function userData(){
	util.getSpan(document, "username").innerText = player.username;
	util.getSpan(document, "userpoint").innerText = player.maxcredit;
	util.getSpan(document, "currency").innerText = player.currency;
	//手機版
	util.getSpan(document, "ph_user_id").innerText = player.username;
	util.getSpan(document, "ph_point").innerText = player.maxcredit;
	util.getSpan(document, "ph_currency").innerText = player.currency;
}
//更新下注列表
function ch_bet_list(betAry){
	if(betAry == undefined){
		getEle("bet_list").innerHTML = getEle("noData_proto").innerHTML;
		getEle("ph_bet_list").innerHTML = getEle("noData_proto").innerHTML;
		return;
	} 
	var tmpHtml = "";
	for (var i = 0; i < betAry.length; i++) {
		//one_bet_data  下注金額	 ,   下注種類	  ,	  下注編號
		tmpHtml += one_bet_data(betAry[i].gold,betAry[i].rtype,betAry[i].wid,betAry[i].title,betAry[i].wingold,betAry[i].result);
	}
	if(tmpHtml == ""){
		getEle("bet_list").innerHTML = getEle("noData_proto").innerHTML;
		getEle("ph_bet_list").innerHTML = getEle("noData_proto").innerHTML;
	}else{
		getEle("bet_list").innerHTML = tmpHtml;
		//手機版
		tmpHtml = tmpHtml.replace(/fz_16/g,"");	
		getEle("ph_bet_list").innerHTML = tmpHtml;	
	}
}
// one_bet_data(300,"龍","meron","21450");
function one_bet_data(betGold,betType,betNo,betTitle,betWinGold,betResult){
	if(betType == "MC"){
		var betWhat = "鳳";
		var betColor = "wala";
	}
	if(betType == "MH"){
		var betWhat = "龍";
		var betColor = "meron";
	}
	if(betType == "MN"){
		var betWhat = "和";
		var betColor = "light_tie";
	}
	var proto = util.getSpan(document,"bet_list_proto").innerHTML;
	var tmp = proto.replace(/\*betNo\*/,betNo);
		tmp = tmp.replace(/\*betNum\*/,betGold);	//下注金額
		tmp = tmp.replace(/\*betWhat\*/,betWhat);	//押哪	龍 鳳 和
		tmp = tmp.replace(/\*betColor\*/,betColor);	//顏色  和：light_tie  龍：meron  鳳：wala 
		//派彩顏色  綠:_win_color  紅:_loss_color
		if(betWinGold*1>=0){
			var clas = "_win_color";
		}else{
			var clas = "_loss_color";
		}
		tmp = tmp.replace(/\*piColorClass\*/,clas);	
		//派彩金額
		tmp = tmp.replace(/\*piColor\*/,"piColor_"+ betNo);	
		tmp = tmp.replace(/\*piNum\*/,"piNum_"+ betNo);	
		if(betResult==""){
			tmp = tmp.replace(/\*display\*/g, "display:none");
		}else{
			tmp = tmp.replace(/\*display\*/, "");
		}
		tmp = tmp.replace(/\*piGold\*/, betWinGold);	
		tmp = tmp.replace(/\*bet_title\*/,betTitle);	
	return tmp;
}
//其他賽事
function showMoreGame(listID,protoID){
	util.getSpan(document,listID).innerHTML = "";
	var proto = util.getSpan(document, protoID).innerHTML;
	moreGameAry = table_data[tableNO]["gameData"];
	var moGameAry =SortObj(moreGameAry);
	var tmp1 =new Array();
	var date =new Array();
	nowGidAry = [];			//清空gid陣列
	for (var key in moGameAry){
		var game = moGameAry[key];
		var StarDate = new Date(game.gamedate + " " + game.stime);
		if (_top.serverTime < StarDate) continue;	//隱藏時間未開放賽事
		var EndDate = new Date(game.gamedate + " " + game.etime).getTime()+600000;
		if (_top.serverTime > EndDate) continue;	//隱藏已結束10分鐘賽事
		if (game.gopen == "N") continue;			//隱藏賽事
		nowGidAry.push(game.gid);					//存顯示game的gid進陣列
		var teamA = game.team_h;//紅方(莊)
		var teamB = game.team_c;//藍方(閒)
		//圖片
		var picID = moGameAry[key]["team_h"]["id"];
		var picID2 = moGameAry[key]["team_c"]["id"];
		var picSrc = _top.picture_data[picID];
		var picSrc2 = _top.picture_data[picID2];
		var tmp = proto.replace(/\*title\*/g, game.title);   //取代所有變動內容
		tmp = tmp.replace(/\*gid\*/g, game.gid);
		tmp = tmp.replace(/\*weight1\*/g, teamA.wt);
		tmp = tmp.replace(/\*weight2\*/g, teamB.wt);
		tmp = tmp.replace(/\*name1\*/g, teamA.name_c);
		tmp = tmp.replace(/\*name2\*/g, teamB.name_c);
		tmp = tmp.replace(/\*img1\*/g, picSrc);
		tmp = tmp.replace(/\*img2\*/g,picSrc2);
		var etime = game["etime"].split(":").splice(0,2).join(":");
		date.push(etime);
		tmp = tmp.replace(/\*time\*/g,etime);
		tmp1.push(tmp); //依序放入list內
	}
	util.getSpan(document, listID).innerHTML = tmp1.join(""); 
}//donson
//館別
function show_other_table(listID,protoID){
	util.getSpan(document,listID).innerHTML = "";
	var proto = util.getSpan(document, protoID).innerHTML;
	//for (var i = 0; i < 20; i++){
	var tmp1 = "";
	for (var tNO in table_data) {
		// var char = String.fromCharCode(64+tNO);    //A~Z
		var tmp = proto.replace(/\*A\*/,table_data[tNO]["tableName"]);
		tmp = tmp.replace(/\*tbid\*/,"tbid_"+tNO);
		tmp1 += tmp; //依序放入list內
	}
	util.getSpan(document,listID).innerHTML = tmp1;
	util.getSpan(document,"tbid_"+tableNO).className = "table_up";
}//donson

function bottom_data(acc,money,currency){
	if(acc != null)util.getSpan(document,"his_account").innerHTML = acc;
	if(money != null)util.getSpan(document,"his_money").innerHTML = money;
	if(currency != null)util.getSpan(document,"his_currency").innerHTML = currency;
}
//左邊捕零PadLeft("123",5); => 00123
function PadLeft() {
	var str = String(arguments[0]);
	var len = arguments[1];
	if (str.length >= len) {
		return str;
	} else {
		var PadStr = arguments[2];
		return PadLeft(((PadStr != null) && (PadStr.length > 0) ? PadStr : "0") + str, len);
	}
}
//donson end

//下注製作圖片
function BetCalImage() {
    var self = this;
    //放籌碼陣列
	// self.coin_data = [1, 10, 50, 100, 500, 1000, 5000, 10000, 50000, 100000, 500000, 1000000, 5000000, 10000000];
	self.coin_data = 	[0,100,200, 500,1000, 2000];
    //圖片資訊物件
    self.imageObj = null;
    //籌碼尺寸
    self.coinSize = { width: 36, height: 30 };
    //籌碼偏移
	self.otherSize = { width: 10, height: 3 };
    //原點位置
    self.point = { x: 0, y: 0 };
    //籌碼堆疊限制
    self.limit = 10;    
	self.SourceImg = { position: self.point, size: self.coinSize, intersize: self.otherSize };//coinHight:3 , interWidth:10};
	self.DestImg = { position: self.point, size: self.coinSize, intersize: self.otherSize };

	var canvas = document.createElement("canvas");
	canvas.id = "ChipsCanvas";
	canvas.width = 739;
	canvas.height = 60;
	document.body.appendChild(canvas);

    //num:下注金額
    //image:要換的<img>元素
	self.BetMoneyImage = function (num, image){
        //datas = [{},{},{},{}]
        //計算要幾個籌碼
        var datas = self.calculate(num);
        //調整圖片寬度
		self.changeFrameSize(datas, image);
        if (num == 0) return;
        //裁剪圖片
        self.cutImage(datas);
        //把圖轉成 base 64
		image.src = self.retImage();
		canvas.style.display = "none";
    }

	//載入圖  把url存入自身物件中的src key中
	self.loadimage = function (urls) {
		self.imageObj = new Image();
		self.imageObj.src = urls;
	}

	//計算堆疊籌碼個數
	self.calculate = function (num) {
        //新陣列
        var datas = new Array();
        //由後往前跑loop
		for (var i = self.coin_data.length - 1; i >= 0; i--) {
        //coin_data = [1, 10, 50, 100, 500, 1000, 5000, 10000, 50000, 100000, 
        //              500000, 1000000, 5000000, 10000000];
            var tmp_val = self.coin_data[i];
            //輸入值為0 或 輸入值比籌碼陣列裡的值小 就跳下一迴圈
            if (num < tmp_val || num * 1 == 0) continue;
            //籌碼數量
            var count = Math.floor(num / tmp_val);
            //輸入值 減掉 籌碼值
            num -= count * tmp_val;
            //{count: , num: , index: }
            //籌碼數量 新輸入值 索引值 存入陣列後並回傳出去
			var obj = new Object();
			obj.count = count;
			obj.num = tmp_val;
			obj.index = i;
			datas.push(obj);
		}
        //回傳新陣列
		return datas;
	}
	//改變圖大小
	self.changeFrameSize = function (datas, coinImg) {
        var total = 0;
        //算出陣列中 每個物件的 count值總和
		for (var i = 0; i < datas.length; i++) {
			var obj = datas[i];
			total += obj.count;
		}
		var totalwidth = Math.ceil(total / self.limit) * self.coinSize.width;
		canvas.width = totalwidth;
		coinImg.style.width = totalwidth + "px";
	}
	//裁圖
	self.cutImage = function (datas) {
		var context = canvas.getContext('2d');
		context.clearRect(0, 0, canvas.width, canvas.height);
		var ycount = 0;
		var xcount = 0;
		for (var i = 0; i < datas.length; i++) {
			var obj = datas[i];
			for (var j = 0; j < obj.count; j++) {
				Source = { x: obj.index * self.coinSize.width + obj.index * self.otherSize.width, y: 0 };//,width:self.coinSize.width , height:self.coinSize.height};
				Dest = { x: xcount * self.coinSize.width, y: self.limit * self.otherSize.height - ycount * self.otherSize.height };//,width:self.coinSize.width , height:self.coinSize.height};
				ycount++;
				context.drawImage(self.imageObj, Source.x, Source.y, self.coinSize.width, self.coinSize.height, Dest.x, Dest.y, self.coinSize.width, self.coinSize.height);
				if (ycount % self.limit == 0) {
					ycount = 0;
					xcount++;
				}
			}
		}
    }
    
	//複制圖片到Image
	self.copyImage = function (imagename) {
		var pngData = canvas.toDataURL();
		var coin = util.getSpan(document, imagename);
		coin.src = pngData;
	}

	//返回圖片到Image
	self.retImage = function () {
		var pngData = canvas.toDataURL();
		return pngData;
	}
}

//監聽事件
function listenEvent() {
	var self = this;

	self.cxlChip = false;	//取消下注

	// ------新增1------	
	listenEvt.addOnClick("gotolobby", util.getSpan(document, "back_lobby"), this, "");
	
	//點擊籌碼 
	var chipAry = document.getElementsByName("chip");
    for (var i = 0; i < chipAry.length; i++) {
        listenEvt.addOnClick(chipAry[i].id,chipAry[i], this, "");
    }
	//增加所有點擊事件
	var evtAry = document.getElementsByName("clickEvt");
    for (var i = 0; i < evtAry.length; i++) {
		listenEvt.addOnClick(evtAry[i].id,evtAry[i], this, "");
	}
	
	//點擊賽事表 
	self.lightMoreGame = function(){
		var moreAry = document.getElementsByName("moreGame");
		for (var i = 0; i < moreAry.length; i++) {
			listenEvt.addOnClick(moreAry[i].id, moreAry[i] , this, "");
		}
		//手機版
		var moreAry = document.getElementsByName("ph_moreGame");
		for (var i = 0; i < moreAry.length; i++) {
			listenEvt.addOnClick(moreAry[i].id, moreAry[i] , this, "");
		}
	}
	
	// ------新增1end------

	//建立監聽事件(靜態)
	self.setStaticListen = function () {
		var buttonArr = document.getElementsByName("button");
		var parentArr = document.getElementsByName("parent");
		var textArr = document.getElementsByName("text");
		var gdTypeArr = document.getElementsByName("gdType");
		var chipArr = document.getElementsByName("chip");

		for (var i = 0; i < buttonArr.length; i++) listenEvt.addOnClick(buttonArr[i].id, buttonArr[i], this, buttonArr[i].getAttribute("data-func"));
		for (var i = 0; i < parentArr.length; i++) listenEvt.addOnClick(parentArr[i].id, parentArr[i], _top, parentArr[i].getAttribute("data-func"));
		for (var i = 0; i < gdTypeArr.length; i++) listenEvt.addOnClick(gdTypeArr[i].id, gdTypeArr[i], this, "gdType");
		for (var i = 0; i < chipArr.length; i++) listenEvt.addOnClick(chipArr[i].id, chipArr[i], this, "chip");
		for (var i = 0; i < textArr.length; i++) {
			listenEvt.addOnInput(textArr[i].id, textArr[i], this, textArr[i].getAttribute("data-text"));
			listenEvt.addOnFocus(textArr[i].id + "_focus", textArr[i], this, "input_select");			//選取輸入框
			listenEvt.addOnBlur(textArr[i].id + "_blur", textArr[i], this, "input_leave");				//離開輸入框
		}

		// self.setFullScreenListen();

		document.body.onresize = function () {
			self.listenCenter("resize", new Object());
		};
	}

	//建立監聽事件(換桌)
	self.setTableListen = function () {
		// var tableArr = document.getElementsByName("table");
		// for (var i = 0; i < tableArr.length; i++) listenEvt.addOnClick(tableArr[i].id, tableArr[i], this, "table");
		var tbBtnAry = document.getElementsByName("ch_table");
		for (var i = 0; i < tbBtnAry.length; i++) {
			listenEvt.addOnClick(tbBtnAry[i].id,tbBtnAry[i], this, "");
		}
	}

	//建立監聽事件(全螢幕)
	self.setFullScreenListen = function () {
		var obj = { "div1": util.getSpan(document, "zoom_In"), "div2": util.getSpan(document, "zoom_Out"), "event1": "zoom_In", "event2": "zoom_Out" };
		// _top.chgFullScreenButton(obj);
	}

	//建立監聽事件(最新投注)
	self.setBetRecordListen = function () {
		var betRecordArr = document.getElementsByName("betRecord");

		for (var i = 0; i < betRecordArr.length; i++) listenEvt.addOnClick(betRecordArr[i]["id"], betRecordArr[i], this, "betRecord");
	}

	//建立監聽事件(卡號)
	self.setCardListen = function () {
		var cardArr = document.getElementsByName("card");

		for (var i = 0; i < cardArr.length; i++) listenEvt.addOnClick(cardArr[i]["id"], cardArr[i], this, "card");
	}

	//建立監聽事件(好路)
	self.setGoodRoadListen = function () {
		var goodroadArr = document.getElementsByName("goodroad");

		for (var i = 0; i < goodroadArr.length; i++) listenEvt.addOnClick(goodroadArr[i]["id"], goodroadArr[i], this, "goodroad");
	}

	//處理監聽事件
	self.listenCenter = function (eventStr, obj) {
		if (eventStr != "resize") console.log(eventStr, obj.object || "");

		var tmp = eventStr.split("_");
		eventName = tmp[0];
		eventType = tmp[1];

		// ------新增2------
		//大路圖
		if(eventStr == "big_road"){
			getEle("bead_panel").className = "road_btn";
			obj.div.className = "road_btn active";
			roadView.cmdParseRoad(player.tableNO, util.getSpan(document, "road_img"), util.getSpan(document, "road_loading"), table_data[player.tableNO].roadGridAry, "BR");
		}
		//珠盤圖
		if(eventStr == "bead_panel"){
			getEle("big_road").className = "road_btn";
			obj.div.className = "road_btn active";
			roadView.cmdParseRoad(player.tableNO, util.getSpan(document, "road_img"), util.getSpan(document, "road_loading"), table_data[player.tableNO].roadGridAry, "RE");
		}
		//換桌
		if (eventName == "tbid") {
			var tbno = eventType;
			if(getFirstGid(tbno) == "noGame") return alert("此桌無任何賽事");
			//改變按鈕顏色
			var tbBtnAry = document.getElementsByName("ch_table");
			for (var i = 0; i < tbBtnAry.length; i++) {
				tbBtnAry[i].className = "table_out";
			}
			obj.div.className = "table_up";
			player.tableNO = tbno;
			player.gid = getFirstGid(tbno);
			tableNO = player.tableNO;
			gid = player.gid; 
			_top.connectGame();//重連 game server 其他桌
			frameInit();
			return;
		}
		
		//開啟分頁
		if (eventName == "plug") {
			getEle("menu_list").className = "menu_list";
			var folder = obj.div.getAttribute("data-folder");
			var file = obj.div.getAttribute("data-file");
			if (parent.UA["isMobile"] == false) {
				window.open(StrFormat("/www_new/app/{0}/{1}.php?uid={2}&langx={3}&username={4}", folder, file, player.uid, _top.langx, player.username), file, "resizable=no,depended=yes,location=no,width=1150,height=650");
			} else {
				_top.loadPlug(folder, file, null);
			}
			return;
		} 
		//確定下注
		if(eventStr == "bet_ok"){
			var bet1 = (getEle("bet_MH").children[1].style.display == "");
			var bet2 = (getEle("bet_MN").children[1].style.display == "");
			var bet3 = (getEle("bet_MC").children[1].style.display == "");
			var betNum = getEle("bet_detail_num").children[0].innerText;

			if(betNum==0) return;
			if(bet1) var betType = "MH";
			if(bet2) var betType = "MN";
			if(bet3) var betType = "MC";
			
			var msg = "323,betOrder,"+ _top.username +","+ _top.mid +","+_top.uid+","+betType+"*"+betNum+"|," + gid;
			_top.sendGame(msg);
			//扣除
			//清空籌碼數字
			getEle("bet_detail_num").children[0].innerText = 0;
			//隱藏籌碼圖
			getEle("bet_MH").children[1].style.display = "none";
			getEle("bet_MN").children[1].style.display = "none";
			getEle("bet_MC").children[1].style.display = "none";
			return;
		}
		if(eventStr =="bet_cancel"){
			getEle("bet_detail_num").children[0].innerText = 0;
			//清除籌碼圖
			getEle("bet_MH").children[1].style.display = "none";
			getEle("bet_MN").children[1].style.display = "none";
			getEle("bet_MC").children[1].style.display = "none";
			//清除玩法
			getEle("p_type").innerText = "";
			return;
		}
		//顯示下注統計
		if(eventStr =="bet_statistic"){ 
			util.getSpan(document,"bet_info_box").className = "bet_info_box active";
			return;
		}
		//下注
		if(eventName =="bet"){
			if(_top.betNum === undefined) return;
			var bet1 = (getEle("bet_MH").children[1].style.display == "");
			var bet2 = (getEle("bet_MN").children[1].style.display == "");
			var bet3 = (getEle("bet_MC").children[1].style.display == "");
			var detailNum = getEle("bet_detail_num").children[0].innerText*1;
			if(eventType =="MH") {
				if(bet2||bet3) return alert("只可下注一區");
				getEle("bet_detail_num").children[0].innerText = detailNum+(_top.betNum*1);
				//放置籌碼圖
				calimage.BetMoneyImage(getEle("bet_detail_num").children[0].innerText*1,getEle("bet_MH").children[1]);
				getEle("bet_MH").children[1].style.display = "";
				//顯示玩法
				getEle("p_type").innerText = "龍";
			}
			if(eventType =="MN") {
				if(bet1||bet3) return alert("只可下注一區");
				getEle("bet_detail_num").children[0].innerText = detailNum+(_top.betNum*1);
				//放置籌碼圖
				calimage.BetMoneyImage(getEle("bet_detail_num").children[0].innerText*1,getEle("bet_MN").children[1]);
				getEle("bet_MN").children[1].style.display = "";
				//顯示玩法
				getEle("p_type").innerText = "和";
			}
			if(eventType =="MC") {
				if(bet1||bet2) return alert("只可下注一區");
				getEle("bet_detail_num").children[0].innerText = detailNum+(_top.betNum*1);
				//放置籌碼圖
				calimage.BetMoneyImage(getEle("bet_detail_num").children[0].innerText*1,getEle("bet_MC").children[1]);
				getEle("bet_MC").children[1].style.display = "";
				//顯示玩法
				getEle("p_type").innerText = "鳳";
			}
			return;
		}
		if (eventName == "gotolobby") {
			_top.changeMain("game", "LobbyCF", "");
			return;
		}
		//籌碼放大
		var chipAry = document.getElementsByName("chip");
		var numAry = [0,100,200,500,"1k","2k"];
		if(eventName =="chip"){ 
			for (var i = 0; i < chipAry.length; i++) {
				chipAry[i].className = chipAry[i].className.replace(" chip_on","");
			}
			chipAry[eventType-1].className +=" chip_on";
			var numStr = numAry[eventType] +"";
			if(numStr =="0"){
				util.getSpan(document,"odds_box").style.cursor ="";
			}else{
				util.getSpan(document,"odds_box").style.cursor ="url('../../images/CF_money_"+numStr+".png') 6 0, pointer";
			}
			if(numAry[eventType] == "1k") return _top.betNum = 1000;
			if(numAry[eventType] == "2k") return _top.betNum = 2000;
			_top.betNum = numAry[eventType];	//存籌碼數字
			return;
		}
		//更多賽事發亮邊框 ＆ 替換資料
		var moreAry = document.getElementsByName("moreGame");
		if(eventName =="moreGame"){ 
			//更換全局gid
			player.gid = eventType;
			gid = eventType;
			//個人下注統計
			getEle("his_amount").innerText = singleBetData();
			if(obj.div.className == "re_more_game_border"){
				//清空下注區
				getEle("bet_detail_num").children[0].innerText = 0;
				getEle("bet_MH").children[1].style.display = "none";
				getEle("bet_MN").children[1].style.display = "none";
				getEle("bet_MC").children[1].style.display = "none";
				//清空玩法
				getEle("p_type").innerText = "";
			}
			//去除亮框
			for (var i in moreAry){
				moreAry[i].className = "re_more_game_border";
			}
			//按到的框保持亮起 
			obj.div.className = "re_more_game_border active";
			//變換顯示資料
			ch_main_data();
			//關閉下注區
			if(table_data[player.tableNO]["gameData"][gid]["receive"] =="N"){
				cbet();
				getEle("betRate_MH").innerText = table_data[player.tableNO]["gameData"][gid]["realIoratio"]["MH"];
				getEle("betRate_MN").innerText = table_data[player.tableNO]["gameData"][gid]["realIoratio"]["MN"];
				getEle("betRate_MC").innerText = table_data[player.tableNO]["gameData"][gid]["realIoratio"]["MC"];
				return;
			}
			//預設開啟
			obet();
			return;
		}
		//手機 更多賽事發亮邊框 ＆ 替換資料
		var phMoreAry = document.getElementsByName("ph_moreGame");
		if(eventName =="phMoreGame"){ 
			//更換全局gid
			player.gid = eventType;
			gid = eventType;
			//個人下注統計
			getEle("his_amount").innerText = singleBetData();
			if(obj.div.className == "re_more_game_border"){
				//清空下注區
				getEle("bet_detail_num").children[0].innerText = 0;
				getEle("bet_MH").children[1].style.display = "none";
				getEle("bet_MN").children[1].style.display = "none";
				getEle("bet_MC").children[1].style.display = "none";
				//清空玩法
				getEle("p_type").innerText = "";
			}
			//去除亮框
			for (var i in phMoreAry){
				phMoreAry[i].className = "re_more_game_border";
			}
			//按到的框保持亮起 
			obj.div.className = "re_more_game_border active";
			//變換顯示資料
			ch_main_data();
			
			return;
		}
		//顯示最新下注
		if(eventStr =="latest_bet"){ 
			util.getSpan(document,"bet_info_box").className = "bet_info_box";
			return;
		}
		//全螢幕
		if(eventStr =="zoom_In"){ 
			// var zoomDIV = obj.div;
			if (util.checkFullScreen()) {
				util.setFullScreen(false);
				// zoomDIV.setAttribute("class", "zoom_in");
			} else {
				util.setFullScreen(true);
				// zoomDIV.setAttribute("class", "zoom_out");
			}
			return;
		}
		//顯示限額
		if(eventStr == "limit_amount"){
			if(util.getSpan(document,"limit_amount").className == "")
				return util.getSpan(document,"limit_amount").className = "active";
			util.getSpan(document,"limit_amount").className = "";
			return;
		}
		//顯示桌次
		if(eventStr == "change_table_btn"){
			if(util.getSpan(document,"change_table_box").className == "change_table_box active")
				return util.getSpan(document,"change_table_box").className = "change_table_box";
			util.getSpan(document,"change_table_box").className = "change_table_box active";
			return;
		}
		//顯示menu
		if(eventStr == "menu_btn"){
			if(util.getSpan(document,"menu_list").className == "menu_list active")
				return util.getSpan(document,"menu_list").className = "menu_list";
			util.getSpan(document,"menu_list").className = "menu_list active";
			return;
		}
		//顯示手機更多賽事
		if(eventStr == "game_schedule_btn"){
			util.getSpan(document,"game_schedule_btn").className = "game_schedule_btn active";
			return;
		}
		//關閉手機賽事
		if(eventStr =="close_btn"){
			util.getSpan(document,"game_schedule_btn").className = "game_schedule_btn";
			return;
		}    
		//開關視訊區
		if(eventStr =="latest_btn"){
			if(util.getSpan(document,"latest_btn").className == "latest_btn active")
				return util.getSpan(document,"latest_btn").className = "latest_btn";
			util.getSpan(document,"latest_btn").className = "latest_btn active";
			return;
		}   
		//回大廳
		if(eventStr =="back_lobby"){
			_top.changeMain("game", "LobbyCF", "");
			// _top.closeGame();
			// _top.showMain();
			return;
		}
		//回大廳(手機)
		if(eventStr =="ph_back_lobby"){
			_top.changeMain("game", "LobbyCF", "");
			// _top.closeGame();
			// _top.showMain();
			return;
		}
		//登出
		if(eventStr =="logout_btn"){
			_top.logout();
			return;
		}
		//登出(手機)
		if(eventStr =="ph_logout"){
			_top.logout();
			return;
		}
		// ------新增2end------
		

		//選取輸入框
		if (obj.object == "input_select") {
			_top.enableRotate = false;
			util.selectText(obj.div);
			return;
		}

		//離開輸入框
		if (obj.object == "input_leave") {
			_top.enableRotate = true;
			setTimeout(function () { _top.chkRotate(); }, 500);
			return;
		}

		//切換桌
		if (eventName == "change") {
			util.getSpan(document, "alltable").style.display = "none";
			util.getSpan(document, "table_arrow").className = "arrow_down";

			var tableNO = eventType;
			if (tableNO == player.tableNO) {
				showMsg("ALREADY_IN_TABLE", table_data[tableNO].tableName);
			} else {
				changeTable(tableNO);
			}
			return;
		}

		//切換線路CH1 2 3
		if (eventName == "line") {
			var showdiv = util.getSpan(document, "linediv");

			if (eventStr == "line_btn") {
				showdiv.style.display = (showdiv.style.display != "block") ? "block" : "none";
			} else {
				if (showdiv.style.display == "block") showdiv.style.display = "none";

				_top.video_set = eventType;
				viewEvent.show_line(_top.video_set);
				video.init_video();
			}
			return;
		}

		//打賞
		if (eventName == "tip") {
			if (eventType == "gold") {
				var balance = util.getCustomized(util.getSpan(document, "money").innerText);
				var val = util.getCustomized(obj.div.value);

				val = val.replace(/[^0-9\.]/gi, "");
				while (val.replace(".", "").indexOf(".") > -1) val = val.replace(".", "");
				if (val.indexOf(".") > -1 && val.split(".")[1].length > 2) val = util.formatFloatF(val, 2);
				if (val > balance) val = balance;
				val = util.showCustomized(val);
				if (obj.div.value != val) obj.div.value = val;
			} else {
				var tip_goldObj = util.getSpan(document, "tip_gold");
				if (eventType == "chk") {
					tableEvent.tipMoney(tmp[2], util.getCustomized(tip_goldObj.value));
				}

				tip_goldObj.value = "";
				util.getSpan(document, "tipdiv").style.display = "none";
			}
			return;
		}

		//疑難排解
		if (eventName == "send") {
			if (eventType == "hostData") {
				phpEvent.sendHostData();
			}
			return;
		}

		//切換視訊全螢幕
		if (eventName == "video") {
			if (eventType == "In") {
				if (util.getSpan(document, "GameBA").className.match(" video_big") == null) util.getSpan(document, "GameBA").className += " video_big";
				util.getSpan(document, "video_In").style.display = "none";
				util.getSpan(document, "video_Out").style.display = "";
				video.partZoom(false);
			} else if (eventType == "Out") {
				util.getSpan(document, "GameBA").className = util.getSpan(document, "GameBA").className.replace(" video_big", "");
				util.getSpan(document, "video_In").style.display = "";
				util.getSpan(document, "video_Out").style.display = "none";
			}

			_top.listenCenter("resize", new Object());
			return;
		}

		//切換卡片
		if (eventName == "cardArea") {
			if (eventType == "In") {
				util.getSpan(document, "gameroom").className = util.getSpan(document, "gameroom").className.replace(" big_bet_close", "");
				util.getSpan(document, "cardArea_In").style.display = "none";
				util.getSpan(document, "cardArea_Out").style.display = "";
			} else {
				util.getSpan(document, "gameroom").className += " big_bet_close";
				util.getSpan(document, "cardArea_In").style.display = "";
				util.getSpan(document, "cardArea_Out").style.display = "none";
			}
			return;
		}

		//顯示開關 : 打賞/桌次切換/選項列
		if (eventName == "show") {
			var showid = eventType;

			var showdiv = util.getSpan(document, showid);
			if (showid == "goodroaddiv" || showid == "betrecorddiv" || showid == "redlimitdiv") {
				viewEvent.autoHideBetRecord = (showdiv.style.display == "");	//手動關閉時，開啟自動關閉開關
				viewEvent.showDivBoolean[showid] = !(showdiv.style.display == "");	//記錄手機版開關狀態
				viewEvent.showDiv(showid);
			} else {
				showdiv.style.display = (showdiv.style.display == "none") ? "" : "none";
			}

			util.getSpan(document, "table_arrow").className = (util.getSpan(document, "alltable").style.display == "") ? "arrow_up" : "arrow_down";
			return;
		}

		//切換顯示珠路統計
		if (eventName == "roadCount") {
			var showdiv = util.getSpan(document, "roadCount_num");

			showdiv.style.display = (showdiv.style.display == "none") ? "" : "none";
			return;
		}

		//選擇卡號
		if (eventName == "card") {
			betEvent.chgCard(eventType);
			return;
		}

		//切換籌碼
		if (eventName == "chip") {
			// betEvent.chgChip(obj.div);
			return;
		}

		//擺放籌碼
		if (obj.object == "betArea") {
			if (self.cxlChip) {
				self.cxlChip = false;
			}

			betEvent.putChip(eventStr);
			return;
		}

		//下注
		// if (eventName == "bet") {
			// if (eventType == "rpt") {
			// 	betEvent.rptBet();
			// } else {
			// 	if (eventType == "chk") betEvent.bet();
			// 	if (tmp[2]) self.cxlChip = true;

			// 	betEvent.clrBetArea(tmp[2]);
			// }
		// }

		// //取消下注
		// if (eventName == "cxlbet") {
		// 	betEvent.cxlBet(eventType);
		// }

		// //切換珠路
		// if (eventStr == "road_table") {
		// 	viewEvent.setRoadImage("next");
		// }

		// //關閉電子牌
		// if (eventStr == "pei_table") {
		// 	viewEvent.closePeiTable();
		// }

		// //選擇好路
		// if (obj.object == "gdType") {
		// 	var gdTypeArr = document.getElementsByName("gdType");

		// 	if (eventType == "all") {
		// 		for (var i = 0; i < gdTypeArr.length; i++) gdTypeArr[i].checked = obj.div.checked;
		// 	} else if (eventType == "chk" || eventType == "cxl") {
		// 		viewEvent.setGoodRoadType(eventType);
		// 		util.getSpan(document, "gdTypediv").style.display = "none";
		// 	} else if (eventType == "rule") {
		// 		_top.loadPlug("rule", "rule_goodroad", null);
		// 	} else {
		// 		var select_all = true;
		// 		for (var i = 0; i < gdTypeArr.length; i++) if (gdTypeArr[i].checked == false) select_all = false;
		// 		util.getSpan(document, "gdType_all").checked = select_all;
		// 	}
		// }

		//調整畫面大小
		if (eventStr == "resize") {
			viewEvent.resize();
			return;
		}
	}
}

//溝通管道
function frameCenter(eventName, frameData) {
	if (eventName == "sendCode") {
		console.log("frame_code: ",frameData);
		if (frameData == 100) {
			console.log("100");
		}
		if (frameData == 600) {
			console.log("600");
			var bType = (getEle("big_road").className == "road_btn")?"RE":"BR";
			roadView.cmdParseRoad(tableNO, util.getSpan(document, "road_img"), util.getSpan(document, "road_loading"),_top.table_data[tableNO].roadGridAry,bType);
			return;
		}
		//下注區下注統計
		if (frameData == 340) {
			ch_bet_currency();
			return;
		}
		//更新_top.table_data
		if (frameData == 444) {
			console.log("444");
			table_data = _top.table_data;
			reNewGame();
		}
		return;
	}
}

//Using String.Format like C# on Javascript
function StrFormat(){
	var str = arguments[0];
	if (str == null) return "";
	for (var i = 0; i < arguments.length - 1; i++) {
		var reg = new RegExp('({)?\\{' + i + '\\}(?!})', 'gm');
		str = str.replace(reg, (arguments[i + 1] == null ? "" : arguments[i + 1]));
	}
	str = str.replace(new RegExp('({)?\\{\\d+\\}(?!})', 'gm'), "");
	return str;
}
//提示訊息
//str_block = str_block.replace("*BET_TYPE*", langStr[data["type"]]);
//undefined //arr = ["322","betMasg","1X006|MH"];
//LangxAry["bet_1X006"] = "*CARDNO*[*BET_TYPE*]超過單局最高限額";
//showMsg("BET_RESPOND", arr[2]);

function showMsg(motion, data) {
	var str_alert = "";
	var str_block = "";
	// var block_class = "ba_systext";

	if (motion == null) {
		return;
	} else if (motion == "LOGOUT_ERROR") {
		str_alert += langStr["login_repeat_error"];
	} else if (motion == "ALREADY_IN_TABLE") {	//目前已在XX桌
		str_block += langStr["str_already_in_table"];
		str_block = str_block.replace("*TABLENAME*", data);
	} else if (motion == "BET_RESPOND") {	//下注成功！
		str_block = langStr[data];
	} else if (motion == "SHOW_WINGOLD") {	//派彩金額
		str_block += langStr["str_show_wingold"];
		str_block = str_block.replace("*WINGOLD*", data);
	} else if (motion == "CHANGE_TABLE") {
		str_block += langStr["caller_change_table"];
		str_block = str_block.replace("*TABLE*", table_data[data]["tableName"]);
	} else if (motion == "CHANGE_BOOT") {
		str_block = langStr["step_change_boot"];
	} else if (motion == "SEND_HOST_DATA") {	//已經訊息提交技術人員，請稍候
		str_block = langStr["send_host_data"];
	} else if (motion == "INTERVAL_TIME_LIMIT_ERROR") {
		str_block = langStr["interval_time_limit_error"];
		str_block = str_block.replace("*INTERVAL_TIME*", data);
	}

	if (str_alert != "") {
		alert(str_alert);
	} else if (str_block != "") {
		// console.log(str_block);
		util.getSpan(document, "msg_txt").innerHTML = str_block;
		// util.getSpan(document, "msg_txt").className = block_class;
		util.getSpan(document, "msg_txt").style.display = "";
		// util.getSpan(document, "game_msg").style.display = "";
		clearTimeout(close_msg);
		close_msg = setTimeout(function () { util.getSpan(document, "msg_txt").style.display = "none"; }, close_msg_time);
	}
}

function newHLSplayer(){
	var ismobile = "N";
	// var tableName = tableObj.Name[player.tableNO];
	var tableName = "testTbName";
	// self.tableName = tableName;
	var ivideo = getEle("iVideo");
	var ishttps = "Y";
	ivideo.src = "../../../www_new/js/lib/videoHLS.html?ismobile=" + ismobile + "&tablename=" + tableName + "&ishttps=" + ishttps;
	ivideo.contentWindow.onunload = function (e) { /* console.log(e); */ try { ivideo.contentWindow.player.destroy(); } catch (e) { } }
}

// _top.ishttps undefined
// tableObj = 遊戲室資訊
// tableObj.Name : str = 桌號(名字)
// tableObj.tableNO : str = 桌
// tableObj.boots : str = 靴
// tableObj.inning : str = 局
// tableObj.gid : str = 流水號
// tableObj.showBet : str = 注額顯示 “One”/“All”
// tableObj.betName : Array = 各玩法代碼
// tableObj.enabledNC : str = 免傭開驗 true/false
// tableObj.ncType : str = 免傭模式 “T”/“NC”
// tableObj.roadNO : str = 選擇房間之珠路號碼
// tableObj.newIP : str = 選擇房間之 IP
// tableObj.newPort : str = 選擇房間之 port 值
// tableObj.gameRoomStatus : str = 各桌開放狀態
// tableObj.diffRoad : boolean = 不同的road

function GameCF_cmd(who) {
	var self = this;
	var _top = who;
	var util = _top.util;
	var gameV = null;
	var st = null;
	var idx = "0";
	var table_data = _top.table_data;
	var player = _top.playerData;

	self.init = function () {
	}

	self.setDelegate = function (d) {
		gameV = d;
	}
	self.setIndex = function (index) {
		idx = index;
	}
	self.setSocketTool = function (sokcettool) {
		st = sokcettool;
	}

	self.socketOpen = function (socketname, msg) {
		// if ((_top.onesocket)) {
		// 	var startconnect = "001,connect,CF,Game," + player.tableNO;
		// 	if (st != null) st.send(idx + "," + startconnect);
		// } else {
		// 	var device = _top.UA["isMobile"] ? "M" : "S"; //M=手機, S=電腦
		// 	var regeditstr = "111,register," + _top.username + "," + _top.mid + "," + _top.uid + "," + player.tableNO + "," + _top.grp + "," + _top.langx + "," + "N" + "," + "N" + "," + device;
		// 	self.send(regeditstr);
		// }
	}
	self.socketClose = function (socketname, msg) {
	}
	self.socketError = function (socketname, msg) {
	}
	self.socketMessage = function (socketname, msg) {
		if (msg.indexOf(",") == -1) msg = st.decode(msg);
		var arr;
		var obj;
		if (_top.onesocket) {
			arr = msg.split(",");
			if (idx != arr[0]) return;//不是自己idx的code不處理
			msg = arr[1];
			if (msg.indexOf(",") == -1) msg = st.decode(msg);
			if (msg.substr(0, 1) != "{") arr = msg.split(",");
			else obj = JSON.parse(msg);
		} else {
			arr = msg.split(",");
		}
		var code;
		if (obj != null) {
			code = obj["cmdNo"];
		} else {
			code = arr[0];
		}
		console.log(socketname, idx, "GameCF_cmd", msg);
		if ((_top.onesocket && code == "002")) {
			var device = _top.UA["isMobile"] ? "M" : "S"; //M=手機, S=電腦
			var regeditstr = "111,register," + _top.username + "," + _top.mid + "," + _top.uid + "," + player.tableNO + "," + _top.grp + "," + _top.langx + "," + "N" + "," + "N" + "," + device;
			self.send(regeditstr);
			return;
		}


		if(_top.nowPage != "GameCF")return;

		//註冊成功 112,registerOK,1,免傭開關(Y/N)
		if (code == "112") {
			// var water_sw = (arr.length > 3) ? arr[3] : "N";	//免傭
			_top.closeLoading();
			return;
		}

		//桌面資料 210,gameId,流水號,桌,靴,局
		if (code == "210") {
			// tableEvent.setGameId(arr[2]);	//設定桌子的流水號
			// viewEvent.setTableData(arr[3], arr[4], arr[5]);	//設定桌/靴/局資料
			return;
		}

		//時間 220,timer,剩餘時間,現在時間
		if (code == "220") {
			// viewEvent.setTimer(arr[2] * 1);
			// tableEvent.setNowTime(arr[3]);
			return;
		}

		//時間 230
		if (code == "230") {
			if(gameV.contentWindow ==null) return;
			player.maxcredit = arr[2];
			player.currency = arr[3];
			//換算幣值
			player.exRate = 10000 / (arr[4]*1);
			gameV.contentWindow.ch_bet_currency();
			// player["amount"] = 
			// player["win"] = 
			//使用者資料
			gameV.contentWindow.userData();
			//底下資料 bottom_data(acc,money,currency,amount,win)
			gameV.contentWindow.bottom_data(player.username,player.maxcredit,player.currency);
			return;
		}

		//投注資訊 250,bet,賠率,最小注額,最大注額(順序 : 閒|和|莊|大|小|莊對|閒對)
		if (code == "250") {
			// viewEvent.setBetData(arr[2], arr[3], arr[4]);
			return;
		}

		//全下資訊 252,allinchip,allIn@MN*0.05|MC*0.5|HP*0.05|MH*0.5|CP*0.05^minChip@MN*0.01|MC*0.0025|HP*0.01|MH*0.1|CP*0.01
		if (code == "252") {
			// betEvent.setAllInChip(arr[2]);
		}

		//視訊來源 272,adjustVideoChannel,DCBDD5CDDCC7BCBDD3DDDCBDD5CDDD....
		if (code == "272") {
			// var json = util.decode(arr[2]);
			// var obj = JSON.parse(json);
			// var keys = Object.keys(obj);
			// for (var i = 0; i < keys.length; i++) {
			// 	var key = keys[i];
			// 	for (var k in obj[key]) {
			// 		if (obj[key][k] == "P") obj[key][k] = 1;
			// 		if (obj[key][k] == "C") obj[key][k] = 2;
			// 		if (obj[key][k] == "S") obj[key][k] = 3;
			// 	}
			// 	if (key = "COD") cod = obj[key];
			// 	if (key = "OKADA") okada = obj[key];
			// 	if (key = "RWM") rwm = obj[key];
			// }
			// video.setVideoChannel(cod, okada, rwm);
			// video.init_video();
			return;
		}

		//各桌開放狀態 280,AllGameRoom,桌號_狀態|桌號_狀態...
		if (code == "280") {
			// tableEvent.setAllTableData(arr[2]);
			return;
		}

		//開始下注 300,startBet,Y
		if (code == "300") {
			if (arr[2] == "Y") {
				// tableEvent.init();		//清空桌面
				// tableEvent.startBet();	//開始下注
			}
			return;
		}

		//卡號 304,cashcard,0x000
		if (code == "304") {
			// betEvent.setCardData(arr[2]);
			return;
		}

		//各玩法的下注狀態 312,betstatus,MH|Y,MN|Y,MC|Y,OV|Y,UN|Y,HP|Y,CP|Y
		if (code == "312") {
			// betEvent.setBetStatus(arr[2] + "," + arr[3] + "," + arr[4] + "," + arr[5] + "," + arr[6] + "," + arr[7] + "," + arr[8]);
			return;
		}

		//下注成功 322, BetSuccessful
		if (code == "322") {
			// ["322", "betMasg", "1X012|MN"]
			//undefined //arr = ["322","betMasg","1X006|MH"];
			// GameCF_cmd 322,betMasg,0X001
			if(arr[2].indexOf("|") != -1) arr[2] = arr[2].split("|")[0];
			gameV.contentWindow.showMsg("BET_RESPOND", arr[2]);
			console.log(arr);
			console.log(arr[2]);
			//LangxAry["bet_1X006"] = "*CARDNO*[*BET_TYPE*]超過單局最高限額";
			
			return;
		}

		//未登入 324,noLogin
		if (code == "324") {
			// if (typeof self.logout == "undefined") {
			// 	self.logout = true;
			gameV.contentWindow.showMsg("LOGOUT_ERROR");
				_top.logout();
			// }
			return;
		}
		//下注統計
		if(code == "330"){
			if(gameV.contentWindow ==null) return;
			//把收到JSON的["betwagers"]存入table_data的新欄位["singlebetwagers"]裡
			setSingleBetwagers(obj);

			// 若無派彩 存入未結算金額
			if(gameV.contentWindow.getEle("his_winAmount").innerText == 0){
				console.log("無派彩");
				gameV.contentWindow.getEle("his_amount").innerText = gameV.contentWindow.singleBetData();
			}else{
				console.log("有派彩");
				gameV.contentWindow.getEle("his_amount").innerText = 0;
				gameV.contentWindow.singleBetData();
			}
			return;
		}
		//打賞結果 332,tipMoney
		if (code == "332") {
			// var data = new Object();

			// switch (arr[2]) {
			// 	case "0X000":
			// 	case "1X002":
			// 		data = arr[2];
			// 		break;
			// 	default:
			// 		data = "1X001";
			// }
			// showMsg("TIP_RESPOND", data);
			return;
		}

		//下注結果 334,betGold
		if (code == "334") {
			// betEvent.setBetGold(arr[2]);
			return;
		}

		if(code == "382"){
			if(gameV.contentWindow == null)return;
			var betAry = obj.data;
			//存組資料進 _top.singleBetAry
			_top.singleBetAry = betAry;
			//更新最新下注表
			gameV.contentWindow.ch_bet_list(betAry);
			return;
		}

		//最新投注 382,newestRec,wid|time|桌|靴|局|rtype|gold|status|cardno@wid|桌|靴|局|rtype|gold|status|cardno
		// if (code == "382") {
			// viewEvent.setBetRecord(arr[2]);
			// return;
		// }

		//刷牌 402,scanPei,card1|card2|card3|card4|card5|card6,真牌/假牌
		if (code == "402") {
			// viewEvent.removeCxlBtn(true);
			// viewEvent.setTimer(0);
			// tableEvent.setPeiList(arr[2], arr[3]);
			return;
		}

		//開新局 412,calResult,???,新局數
		if (code == "412") {
			// tableEvent.setGameId(arr[3]);
			return;
		}

		//派彩金額 420,winGole,wingold
		if (code == "420") {
			// if (arr[2] * 1 > 0 && player.gmod * 1 != 0) showMsg("SHOW_WINGOLD", util.showCustomized(arr[2]));
			//未結算金額歸零
			gameV.contentWindow.getEle("his_amount").innerText = 0;
			//顯示派彩金額  本金+獎金
			gameV.contentWindow.getEle("his_winAmount").innerText = obj.data[gameV.contentWindow.player.gid];
			//{"data":{"88":0,"89":0,"90":0,"91":0,"94":0,"87":2520},"cmdName":"winGole","cmdNo":"420","tableNO":1}

			return;
		}

		//珠路統計 430,resultHistory,閒|和|莊|大|小|莊對|閒對
		if (code == "430") {
			// viewEvent.setRoadCount(arr[2]);	//設定珠路統計
			return;
		}

		//結果 450,result,大小|結果|莊對|閒對
		if (code == "450") {
			// viewEvent.removeCxlBtn(true);
			// viewEvent.setTimer(0);
			// betEvent.clrBetGold();
			// tableEvent.setResult(arr[2]);
			return;
		}

		//倒數 590,timer,剩餘時間,無意義參數
		if (code == "590") {
			// if (arr[2] * 1 == 0) viewEvent.removeCxlBtn(true);
			// viewEvent.setTimer(arr[2] * 1);
			return;
		}

		//更新珠路
		if (code == "600") {
			// table_data[gymNo].roadGridAry = arr[6];
			// roadView.cmdParseRoad(gymNo, util.getSpan(document, "road_img_" + gymNo), util.getSpan(document, "road_loading_" + gymNo), table_data[gymNo].roadGridAry, "BR");
			// table_data[player.tableNO]["roadGridAry"] = arr[6];
			// viewEvent.setRoadImage();
			// socketEvent.sendToSocket("631,QRoad,QB," + player.tableNO);
			// socketEvent.sendToSocket("631,QRoad,QP," + player.tableNO);
			return;
		}

		//換靴
		if (code == "610") {
			// tableEvent.init();
			// showMsg("CHANGE_BOOT");
		}

		//問路 630,QB/QP,1,RE|D*^BR|R*^BE|^SR|^CK|
		if (code == "630") {
			// viewEvent.showQBtn(arr[1], arr[3]);
			return;
		}

		//好路提示
		if (code == "645") {
			// tableEvent.setGoodRoadData(arr[2], arr[3] * 1, arr[4]);
			return;
		}

		// 公關位置
		if (code == "708") {
			// viewEvent.setPRSeat(arr[5]);
			return;
		}

		// 公關換位置 只有遊戲室才會有，遊戲大廳不會有
		if (code == "742") {
			// showMsg("CHANGE_TABLE", arr[3]);
		}

		//關桌 902,closeGame
		if (code == "902") {
			_top.changeMain("game", "LobbyBA", "");
		}

		//關桌 993,closeGame
		if (code == "993") {
			_top.changeMain("game", "LobbyBA", "");
		}

		//斷線(重連)
		if (code == "888") {
			_top.showLoading(langStr["str_reconnecting"]);
			return;
		}

		//優化
		if (code == "995") {
			if (arr[2] == "Y" || arr[2] == "P") _top.changeMain("game", "LobbyBA", "");
			return;
		}
	}

	//當局全體下注訊息
	function setSingleBetwagers(obj) {
		var tableno = obj["tableNO"];
		for (var key in obj["data"]) {
			table_data[tableno]["gameData"][key]["singlebetwagers"] = obj["data"][key]["betwagers"];
		}
	}
	
	self.registermulit = function () {
		var startconnect = "001,connect,CF,Game," + player.tableNO;
		console.log(idx, "registermulit", startconnect);
		if (st != null) st.send(idx + "," + startconnect);
	}
	self.dissconnectmulit = function () {
		var closeconnect = "001,connect";
		console.log(idx, "dissconnectmulit", closeconnect);
		if (st != null) st.send(idx + "," + closeconnect);
	}
	self.register = function () {
		var device = _top.UA["isMobile"] ? "M" : "S"; //M=手機, S=電腦
		var regeditstr = "111,register," + top.username + "," + top.mid + "," + top.uid + "," + player.tableNO + "," + top.grp + "," + _top.langx + "," + "N" + "," + "N" + "," + device;
		self.send(regeditstr);
	}
	self.send = function (msg) {
		console.log(idx, "send", msg);
		if (st != null) {
			msg = st.encode(msg);
			if (_top.onesocket) msg = idx + "," + msg;
			st.send(msg);
		}
	}
}
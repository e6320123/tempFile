function Util() {
  var self = this;
  //系統訊息
	self.log = function(msg) {
		if (window.console) console.log(msg);
	}

	//切換全螢幕/視窗模式
	self.setFullScreen = function(On) {

		if (On) {
			var el = top.document.documentElement;

			if (el.requestFullscreen) {
				el.requestFullscreen();
			} else if (el.msRequestFullscreen) {
				el.msRequestFullscreen();
			} else if (el.mozRequestFullScreen) {
				el.mozRequestFullScreen();
			} else if (el.webkitRequestFullscreen) {
				el.webkitRequestFullscreen();
			} else {
				this.log("Fullscreen API is not open supported");
			}
		} else {
			var el = top.document;

			if (el.requestFullscreen) {
				el.exitFullscreen();
			} else if (el.cancelFullScreen) {
				el.cancelFullScreen();
			} else if (el.exitFullscreen) {
				el.exitFullscreen();
			} else if (el.msExitFullscreen) {
				el.msExitFullscreen();
			} else if (el.mozCancelFullScreen) {
				el.mozCancelFullScreen();
			} else if (el.webkitCancelFullScreen) {
				el.webkitCancelFullScreen();
			} else if (el.webkitExitFullscreen) {
				el.webkitExitFullscreen();
			} else {
				this.log("Fullscreen API is not close supported");
			}
		}

	}
  self.checkScale = function() {
    //if (self.checkFullScreen()) {
      var dataObj={};
      dataObj.dow=document.body.children[0].clientWidth*1;
      dataObj.doh=document.body.children[0].clientHeight*1;
      dataObj.bow=document.body.clientWidth*1;
      dataObj.boh=document.body.clientHeight*1;
      dataObj.hscale = dataObj.boh/dataObj.doh*1;
      dataObj.wscale = dataObj.bow/dataObj.dow*1;

      var hw = ( dataObj.wscale > dataObj.hscale )?"h":"w";
      if (hw="h") {
        dataObj.scale=dataObj.hscale;
      } else {
        dataObj.scale=dataObj.wscale;
      }
      if (dataObj.scale<1)dataObj.scale=1;
      dataObj.top = dataObj.boh/2*(dataObj.scale-1);
      dataObj.left = dataObj.bow/2*(dataObj.scale-1);

      parent.document.body.style.transform="scale("+dataObj.scale+","+dataObj.scale+")";
      parent.document.body.style.position="absolute";
      parent.document.body.style.top = dataObj.top+"px";
      parent.document.body.style.left = "0px";

      parent.document.body.style.overflow = "hidden";
    //} else {
    //  parent.document.body.style.cssText="";
    //  parent.document.body.style ="";
    //}
  }

	//檢查全螢幕／視窗模式 : 全螢幕回傳 true, 視窗模式回傳 false
	self.checkFullScreen = function() {
		if (top.document.fullScreenEnabled || top.document.msFullscreenElement || top.document.mozFullScreen || top.document.webkitIsFullScreen) {
			return true;
		} else {
			return false;
		}
	}

	//切換按鈕 : document, 原按鈕, 變更按鈕, 原事件, 新事件, listenEvent, delegate, obj
	self.setRepeatButton = function(doc, div1, div2, event1, event2, listenEvt, delegate, obj) {
		var btn1 = self.getSpan(doc, div1);
		var btn2 = self.getSpan(doc, div2);

		if (btn1) self.setHidden(btn1, true);
		if (btn2) self.setHidden(btn2, false);

		if (event1 != "" && event1 != null) listenEvt.removeListener(event1, MouseEvent.CLICK);
		if (event2 != "" && event2 != null) listenEvt.addOnClick(event2, btn2, delegate, obj);
	}

	//切換顯示元件 : document, 新元件, 原元件
	self.chgRepeatSpan = function(doc, div1, div2) {
		var span1 = self.getSpan(doc, div1);
		var span2 = self.getSpan(doc, div2);

		self.setHidden(span1, false);
		self.setHidden(span2, true);
	}

	//隱藏物件
	self.setHidden = function(el, oks) {
		if (el == null) return;
		el.style.display = (oks) ? "none" : "";
	}

	self.setClassName = function(div, classStr) {
		if (div.className) {
			div.className = classStr;
		} else {
			div.setAttribute("class", classStr);
		}
	}

  self.getClassName = function(targetObj) {
    if (targetObj.className!=undefined) {
        return targetObj.className;
    } else {
        return targetObj.getAttribute("class");
    }
  }

  self.appendClassName = function(targetObj,classStr) {
      var cStr = self.getClassName(targetObj);
      cStr = cStr+" "+classStr;
      self.setClassName(targetObj,cStr);
  }
  self.removeClassName = function(targetObj,classStr) {
      var cStr = self.getClassName(targetObj);
      var ary=cStr.split(" ");
      var cStr = "";
      for (var k in ary) {
        if (ary[k] != classStr) cStr += ary[k];
      }
      self.setClassName(targetObj,cStr);
  }

  self.setClassNameOnOff = function(div,isOn) {
    var classname = self.getClassName(div);
    classname = classname.replace(/_on/g,"");
    if (isOn) classname = classname+"_on";
    self.setClassName(div,classname);
  }

  self.showAndHidden=function(titleObj) {
    var targetObj = titleObj.targetObj;
    var classname = titleObj.className;
    var newClassname = "";
    var types = "";

    if (classname.search("_on") == -1) {
      newClassname = classname+"_on";
      types = "";
    } else {
      newClassname = classname.replace("_on","");
      types = "none";
    }

    self.setClassName(titleObj,newClassname);

    if (targetObj.length == undefined) {
      targetObj.style.display = types;
    } else {
      for (var i=0; i<targetObj.length; i++) {
        targetObj[i].style.display = types;
      }
    }
  }

  self.getStyle=function(oElm,strCssRule) {
    var strValue = "";
    if (document.defaultView && document.defaultView.getComputedStyle) {
        strValue = document.defaultView.getComputedStyle(oElm,"").getPropertyValue(strCssRule);
    } else if (oElm.currentStyle) {
        strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1) {
            return p1.toUpperCase();
        });
        strValue = oElm.currentStyle[strCssRule];
    } else {
        return "error";
    }
    return strValue;
  }

	//取得物件
	self.getSpan = function(doc, Name) {
		var span = doc.getElementById(Name);
		return (span == null) ? null : span;
	}

	self.getSameNameSpan = function(template, SameName) {
		var list = new Array();
		if (template.children.length > 0) {
			var i = template.children.length;
			while (i-- > 0) {
				var tmp = template.children[i].id;
				if (tmp.indexOf(SameName) > -1 ) {
					list.push(template.children[i]);
				} else {
					var tmp = self.getSameNameSpan(template.children[i], SameName);
					list = list.concat(tmp);
				}
			}
		}
		return list;
	}

	self.addPostPHP = function(eventName , url , parame, delegate) {
		//console.log(delegate);
		var xmlhttp = new  XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			//console.log("postPHP >"+url+" readyState:"+xmlhttp.readyState+"  status:"+xmlhttp.status)
			if (xmlhttp.readyState==4 && xmlhttp.status==200) {
				//eval(requests.xmlhttp.responseText);
				//console.log(xmlhttp.responseText);
					//console.log("-----------");
   	 		var phpData = self.strToObj(xmlhttp.responseText);
				if (delegate.phpDataCenter)delegate.phpDataCenter(eventName,phpData);
				//if (eventName == "showScoll" && delegate.phpDataCenter)delegate.phpDataCenter(eventName,phpData);
				//if (eventName != "showScoll" && delegate.getImageUrl)delegate.getImageUrl(eventName,phpData);
			} else {

			}
		};
		xmlhttp.open("POST", url, true );
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send(parame);
	}

	self.strToObj = function(str) {
		//console.log(str);
		if (str.match("window.open")) {
			str = str.replace("<script>", "");
			str = str.replace("</script>", "");
			//eval(str);
			//return;
		}

		try {
			//console.log("++++++++");
			return (new Function("return " + str + ";"))();
		} catch(e) {
			//console.log("-----------");
			return str;
		}
	}

	self.moneyCheck = function(val) {
		var ret = "";
		if (val == 0) return ret;

		var patt1 = new RegExp(/[^0-9]/);
		var t = patt1.test(val);
		if (t) val = val.replace(/[^0-9]/, '');
		return val;
	}

	self.in_array = function(txt, ary) {
		for (var i = 0; i < ary.length; i++) {
			if (ary[i] == txt) return true;
		}
		return false;
	}

	//by key
	self.in_array_key = function(txt, ary) {
		for (var key in ary) {
			if (ary[key] == txt) return true;
		}
		return false;
	}

	self.array_indexOf = function(txt, ary, isMatch) {
		for (var i = 0; i < ary.length; i++) {
			if (isMatch) {
				if (ary[i] == txt) return i;
			} else {
				if (ary[i].indexOf(txt) != -1) return i;
			}
		}
		return -1;
	}

	self.addZero = function(val,b) {
		val = val.toString();
		if (val == "" || b == "") return val;

		val += "";
		if (b == 0) {
			var index = val.indexOf(".");
			if (index == -1) return val;
			return val.replace(".", "");
		}

		var str = "";
		var index = val.indexOf(".");

		if (index == -1) {
			val += ".";
			index = val.length - 1;
		}

		var r = b * 1 - (val.length - index - 1);
		for (i = 0; i < r; i++) str += "0";
		str = val + str;

		return str;
	}

	self.formatFloat = function(num, pos) {
	  var size = Math.pow(10, pos);
	  var ok = Math.round(num * size) / size;
	  var ret = self.addZero(ok, pos);

	  return ret;
	}

	self.formatFloatF = function(num, pos) {
	  var size = Math.pow(10, pos);
	  var ok;
	  if (num > 0) {
	  	ok = Math.floor(num * size) / size;
	  } else {
	  	ok = Math.ceil(num * size) / size;
	  }
	  var ret = self.addZero(ok, pos);

	  return ret;
	}

	self.accAdd = function (arg1, arg2) {
		var r1, r2, m, c;
		try {r1 = arg1.toString().split(".")[1].length} catch (e) {r1 = 0}
		try {r2 = arg2.toString().split(".")[1].length} catch (e) {r2 = 0}
		c = Math.abs(r1 - r2);
		m = Math.pow(10, Math.max(r1, r2))
		if (c > 0) {
			var cm = Math.pow(10, c);
			if (r1 > r2) {
				arg1 = Number(arg1.toString().replace(".", ""));
				arg2 = Number(arg2.toString().replace(".", "")) * cm;
			} else {
				arg1 = Number(arg1.toString().replace(".", "")) * cm;
				arg2 = Number(arg2.toString().replace(".", ""));
			}
		} else {
			arg1 = Number(arg1.toString().replace(".", ""));
			arg2 = Number(arg2.toString().replace(".", ""));
		}
		return (arg1 + arg2) / m
	}

	self.accSub = function(arg1,arg2) {
		var r1,r2,m,n;
		try {r1 = arg1.toString().split(".")[1].length} catch(e) {r1 = 0}
		try {r2 = arg2.toString().split(".")[1].length} catch(e) {r2 = 0}
		m = Math.pow(10, Math.max(r1,r2));
		n = (r1 >= r2) ? r1 : r2;
		return ((arg1 * m - arg2 * m) / m).toFixed(n);
	}

	self.accMul = function(arg1, arg2) {
		var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
		try {m += s1.split(".")[1].length} catch (e) { }
		try {m += s2.split(".")[1].length} catch (e) { }
		return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
	}

	self.accDiv = function(arg1, arg2) {
		var t1 = 0, t2 = 0, r1, r2;
		try {t1 = arg1.toString().split(".")[1].length} catch (e) { }
		try {t2 = arg2.toString().split(".")[1].length} catch (e) { }
		with (Math) {
			r1 = Number(arg1.toString().replace(".", ""));
			r2 = Number(arg2.toString().replace(".", ""));
			return (r1 / r2) * pow(10, t2 - t1);
		}
	}

	//轉換籌碼格式
	self.parseChip = function(chip) {
		if (chip >= 1000000) {
			chip = chip / 1000000 + "M";
		} else if (chip >= 1000) {
			chip = chip / 1000 + "K";
		}

		return chip;
	}

	//轉換時間格式
	self.paserStr = function(d) {
		var date = d.getFullYear() + "-" + (((d.getMonth() + 1) < 10) ? "0" : "") + (d.getMonth() + 1) + "-" + ((d.getDate() < 10) ? "0" : "") + d.getDate();
		var time = ((d.getHours() < 10) ? "0" : "") + d.getHours() + ":" + ((d.getMinutes() < 10) ? "0" : "") + d.getMinutes() + ":" + ((d.getSeconds() < 10) ? "0" : "") + d.getSeconds();
		return date + " " + time;
	}

	// For todays date;
	Date.prototype.today = function() {
		return this.getFullYear() + "/" + (((this.getMonth() + 1) < 10) ? "0" : "") + (this.getMonth()+1) + "/" + ((this.getDate() < 10) ? "0" : "") + this.getDate();
	}

	// For the time now
	Date.prototype.timeNow = function() {
		return ((this.getHours() < 10) ? "0" : "") + this.getHours() + ":" + ((this.getMinutes() < 10) ? "0" : "") + this.getMinutes() + ":" + ((this.getSeconds() < 10) ? "0" : "") + this.getSeconds();
	}

	//--------------------------------local storage--------------------------------
	//get localStorage
	self.getLocalStorage = function () {
		var tmp_storage = null;
		try {
			tmp_storage = (window.localStorage) ? window.localStorage : window.globalStorage[strDomain];
			tmp_storage["init"] = "true";
		} catch(e) {
			//showErrorMsg(classname, "getLocalStorage", e.toString());
			return "initFail";
		}
		return tmp_storage;
	}

	//get localStorage item
	self.getLocalStorageItem =function(_key) {
		//if (!checkPrivate()) return "initFail";
		_top =parent._top;
		var tmp_value = null;
		if (_top.local_storage) {
			if (_top.local_storage[_key.toString()]) {
				tmp_value = _top.local_storage[_key.toString()];
				return tmp_value;
			}
		}
		return null;
	}

	//set localStorage item
	self.setLocalStorageItem = function(_key,_value) {
		//if (!checkPrivate()) return "initFail";
		_top =parent._top;
		if (_top.local_storage) {
			try {
				_top.local_storage[_key.toString()] = _value;
				return true;
			} catch(err) {
				//showErrorMsg(classname, "setLocalStorageItem", e.toString());
			}
		}

		return false;
	}

	//remove localStorage item
	self.removeLocalStorageItem = function(_key) {
		_top =parent._top;
		if (!checkPrivate()) return "initFail";

		if (_top.local_storage) {
			if (_top.local_storage[_key.toString()]) {
				try {
					_top.local_storage.removeItem(_key.toString());
					return true;
				} catch(err) {
					//showErrorMsg(classname, "removeLocalStorageItem", e.toString());
				}
			}
		}
		return false;
	}

	self.getObjAry = function(tmpScreen, aryStr, attribute, isOnly) {
		var newAry = new Array();
		var _attribute = attribute;

		if (tmpScreen != null & aryStr != null) {
			if (_attribute == null) _attribute = "id";
			newAry = self.getChildAry(tmpScreen.children, aryStr, newAry, _attribute, isOnly);
		}
		return newAry;
	}

	self.getChildAry = function(objAry, aryStr, newAry, attribute, isOnly) {
		for (var i = 0; i < objAry.length; i++) {
			var obj = objAry[i];
			var _id = obj.getAttribute(attribute);

			if (_id != null) {
				if (aryStr.indexOf("," + _id + ",") != -1) {
					if (attribute == "id") {
						newAry[_id] = obj;
					} else {
						newAry.push(obj);
					}
					if (isOnly) return newAry;
				}
			}

			if (obj.children.length > 0) self.getChildAry(obj.children, aryStr, newAry, attribute, isOnly);
		}
		return newAry;
	}

	self.mergeArray = function() {
		var newArray = new Object();

		for (i = 0; i < arguments.length; i++) {
			for (var key in arguments[i]) {
				newArray[key] = arguments[i][key];
			}
		}
		return newArray;
	}
  //主domain
  self.getMainDomain = function(obj) {

    var domain="";
    var host="";
    if (obj!=null) {
      if (typeof obj == "string") {
        obj = obj.replace("https://","");
        obj = obj.replace("http://","");
        obj = obj.split("?")[0];
        obj = obj.split("/")[0];
        host=obj;
      }
      if (obj===window || obj===top.window) {
        host = obj.location.host;
      }
    }
    if (host=="") {
      host=window.location.host;
    }
    if (self.checkIsIPV4(host)) {
      return host;
    }
    var ary =host.split(".");
    var len = ary.length;
    domain = ary[len-2]+"."+ary[len-1];
    return domain
  }
  self.checkIsIPV4 = function(str) {
    var blocks = str.split(".");
    if (blocks.length === 4) {
      return blocks.every(function(block) {
        return parseInt(block,10) >=0 && parseInt(block,10) <= 255;
      });
    }
    return false;
  }

  self.clearWinOpen = function() {
			_top =parent._top;
			for (var keys in _top.winOpen) {
					_top.winOpen[keys].close();
			}
	}
  self.detectIE = function() {
      var ua = window.navigator.userAgent;

      var msie = ua.indexOf('MSIE ');
      if (msie > 0) {
          // IE 10 or older => return version number
          return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
      }

      var trident = ua.indexOf('Trident/');
      if (trident > 0) {
          // IE 11 => return version number
          var rv = ua.indexOf('rv:');
          return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
      }

      var edge = ua.indexOf('Edge/');
      if (edge > 0) {
         // Edge (IE 12+) => return version number
         return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
      }

      // other browser
      return false;
  }
  self.removeElement = function(obj) {
    var parNode = obj.parentNode
    if (parNode != null) {
      parNode.removeChild(obj);
    }
  }
  self.getObjLoop = function(divObj, tagID,isDFS) {
    if (divObj.id == tagID)return divObj;
    if (divObj.children.length>0) {
      for (var i=0;i<divObj.children.length;i++) {
        if (divObj.children[i].id == tagID) return divObj.children[i];
        if (isDFS)if (divObj.children[i].children.length > 0) {
          ret = self.getObjLoop(divObj.children[i],tagID);
          if (ret)return ret;
        }
      }
      if (!isDFS) {
        for (var i=0;i<divObj.children.length;i++) {
          if (divObj.children[i].children.length > 0) {
            ret = self.getObjLoop(divObj.children[i],tagID);
            if (ret)return ret;
          }
        }
      }
    } else {
      if (divObj.id == tagID)return divObj;
    }
    return null;
	}


	//千分位
	self.formatThousand=function(num) {
		num = num + "";
		var re = /(-?\d+)(\d{3})/;
		while (re.test(num)) {
				num = num.replace(re, "$1,$2");
		}
		return num;
	}

	//編碼
	self.encode = function (Str) {
		var trans = "";
		var rev = "";
		var getcode = "";

		for (var i = 0; i < Str.length; i++) trans += (255 - Str.charCodeAt(i)).toString(16).toUpperCase();
		for (var i = 0; i < trans.length; i++) rev = trans.substr(i, 1) + rev;

		getcode = rev.substr(5, rev.length - 5) + rev.substr(0, 5);

		return getcode;
	}

	//解碼
	self.decode = function (getstr) {
		//若 Server 回傳訊息無編碼，則不解碼
		if (getstr.indexOf(",") > -1) return getstr;

		var gettrans = "";
		var destr = "";
		var getrev = "";
		getrev = getstr.substr(getstr.length - 5, 5) + getstr.substr(0, getstr.length - 5);

		for (var i = 0; i < getrev.length; i++) gettrans = getrev.substr(i, 1) + gettrans;
		for (var i = 0; i < gettrans.length; i += 2) destr += String.fromCharCode(255 - Number("0x" + gettrans.substr(i, 2)));
		return destr;
	}
}

//計時器
function timeThread() {
	var self = this;
	self.sec = 1000;
	self.List = new Array();
	self.internal = null;

	self.run = function() {
		if (self.List.length == 0) return;

		for (var i = 0; i < self.List.length; i++) {
			var obj = self.List[i];
			obj.timerCount++;
			if (obj.timerCount > obj.limitCount) {
				if (obj.loop) {
					obj.timerCount = 0;
					obj.retFunction();
				} else {
					obj.timerCount = 0;
					obj.retFunction();
					self.List.splice(i, 1);
				}
			} else {
			}
		}
	}

	self.Start = function() {
		if (self.internal == null) self.internal = setInterval(self.run, self.sec);
	}

	self.addObject = function(Obj) {
		Obj.timerCount = 0;
		self.List.push(Obj);
	}

	self.removeObject = function(Name) {
		for (var i = 0; i < self.List.length; i++) {
			var obj = self.List[i];
			if (obj.Name == Name) self.List.splice(i, 1);
		}
	}

}
//訊息
function trace(str) {
	//console.log(str);
}
//socket
function Socket(socketNO) {
	var self = this;
	self.socketNO = (socketNO) ? socketNO : "";
	self.conn = null;
	self.IP = "";//"127.0.0.1";
	self.Port = "";//"9999";
	self.ws_open = false;
  self.reconn_sec = 10*1000;// 0 = not do
  self.reconn_internal = 0;
  self.ping_sec = 5*1000;
  self.ping_internal = 0;
  self.ping_str = "541,pingRequest";
  self.ishttps = ('https:' == document.location.protocol) ? true: false;
	self.isValidate = function() {
		return (window.WebSocket) ? true : false;
	}

	self.connect = function(IP, Port) {
		self.IP = IP;
		self.Port = Port;
		//console.log("ws://" + IP + ":" + Port);
    if (self.ishttps) {
      self.conn = new WebSocket("wss://" + IP + ":" + Port);
    } else {
      self.conn = new WebSocket("ws://" + IP + ":" + Port);
    }


    clearInterval(self.reconn_internal);
    self.reconn_internal = setInterval(self.reconnect,self.reconn_sec);
    clearInterval(self.ping_internal);
    self.ping_internal = setInterval(self.ping,self.ping_sec);

		//console.log(self.conn);
		self.conn.onopen = function() {
			var str = "000,connectSuccess";
			self.ws_open = true;
			//console.log("Socket" + self.socketNO + " GetCode : " + str);
			if (self.socketNO != "") str = self.socketNO + "," + str;
			cmd.Data_proc(str);
		}

		self.conn.onmessage = function(evt) {
			var str = evt.data;
			var ary = str.split("\n");
			for (var i = 0; i < ary.length; i++) {
				var str = self.decode(ary[i]);
				//console.log("Socket" + self.socketNO + " GetCode : " + str);
				if (self.socketNO != "") str = self.socketNO + "," + str;
				cmd.Data_proc(str);
			}
		}

		self.conn.onerror = function(error) {
			console.log("error");
			self.ws_open = false;
			var str = "999,connectLoss";
			if (self.socketNO != "") str = self.socketNO + "," + str;
			cmd.Data_proc(str);
		}
    self.conn.onclose = function() {
			console.log("close");
			self.ws_open = false;
		}
	}

	self.sendToServer = function(str) {
		//console.log("Socket" + self.socketNO + " SendToServer : " + str);
		var encode = self.encode(str);
		//console.log(encode);
    try{
        self.conn.send(encode + "");
    }catch(e) {
      console.log(e.toString());
    }
	}

	self.closeSocket = function() {
		console.log("Socket" + self.socketNO + " : close socket");
		self.ws_open = false;
		self.conn.close();
    self.IP="";
    self.Port="";
	}
  self.reconnect = function() {
    if (self.reconn_sec==0) {
      return;
    }
    /*
    if (self.ws_open == true) {
      return;
    }
    */
    if ( self.conn.readyState == self.conn.CLOSED ) {
      if (self.IP !="" && self.Port != "") self.connect(self.IP,self.Port);
      return;
    }
  }
  self.ping = function() {
    if (self.ping_str == "") {
      return;
    }
    /*
    if (self.ws_open == false) {
      return;
    }
    */
    if ( self.conn.readyState == self.conn.OPEN ) {
      self.sendToServer(self.ping_str);
    }
  }
	//編碼
	self.encode = function(Str) {

    if (top.encodelog) {
      console.log(self.socketNO+","+Str);
      trace(self.socketNO+","+Str);
    }
		var trans = "";
		var rev = "";
		var getcode = "";

		for (var i = 0; i < Str.length; i++) trans += (255 - Str.charCodeAt(i)).toString(16).toUpperCase();
		for (var i = 0; i < trans.length; i++) rev = trans.substr(i, 1) + rev;

		getcode = rev.substr(5, rev.length - 5) + rev.substr(0, 5);

		return getcode;
	}

	//解碼
	self.decode = function(getstr) {
		//若 Server 回傳訊息無編碼，則不解碼
		if (getstr.indexOf(",") > -1) return getstr;

		var gettrans = "";
		var destr = "";
		var getrev = "";
		getrev = getstr.substr(getstr.length - 5, 5) + getstr.substr(0, getstr.length - 5);

		for (var i = 0; i < getrev.length; i++) gettrans = getrev.substr(i, 1) + gettrans;
		for (var i = 0; i < gettrans.length; i+=2) destr += String.fromCharCode(255 - Number("0x" + gettrans.substr(i, 2)));
		if (top.decodelog) {
      if(destr.indexOf("pingResponse") >= 0 ) return destr;
      console.log(self.socketNO+","+destr);
      trace(self.socketNO+","+destr);
    }
		return destr;
	}


}

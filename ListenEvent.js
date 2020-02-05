/*
v1.0 by Ice. 2016-03-31

How to use?
var listenEvt = new ListenEvent();
listenEvt.addOnClick("gologin",loginbtn,this,null);   //null可是放任何object當參數傳遞

//請實作 listenCenter  在自己判斷 eventName 來做動作
function listenCenter(eventName,listenData){
  var div = listenData.div;      //loginbtn
  var obj = listenData.object;   //null
  var e = listenData.e;          //onclicke
	if(eventName=="gologin")login();
}

請勿重複eventName 就算是相同div要監聽不同事件

*/
function ListenEvent() {
	var self = this;
	self.listenAry = new Array();

	self.init = function() {
		//alert("Listener init");
	}

	self.addOnClick = function(eventName, div, delegate, obj) {
		var act = "MouseEvent.CLICK";
		self.removeListener(eventName, act);
		var listenData = new Object();
		listenData.div = div;
		listenData.object = obj;
		div.onclick = function(e) {
			listenData.e = e;
			if (delegate.listenCenter) delegate.listenCenter(eventName, listenData);
		}
		self.listenAry[eventName] = listenData;
	}

	self.addMouseEnter = function(eventName, div, delegate, obj) {
		var act = "MouseEvent.MOUSEENTER";
		self.removeListener(eventName, act);
		var listenData = new Object();
		listenData.div = div;
		listenData.object = obj;
		div.onmouseenter = function(e) {
			listenData.e = e;
			if (delegate.listenCenter) delegate.listenCenter(eventName, listenData);
		}
		self.listenAry[eventName] = listenData;
	}

	self.addMouseOut = function(eventName, div, delegate, obj) {
		var act = "MouseEvent.MOUSEOUT";
		self.removeListener(eventName, act);
		var listenData = new Object();
		listenData.div = div;
		listenData.object = obj;
		div.onmouseout = function(e) {
			listenData.e = e;
			if (delegate.listenCenter) delegate.listenCenter(eventName, listenData);
		}
		self.listenAry[eventName] = listenData;
	}

	self.addMouseLeave = function(eventName, div, delegate, obj) {
		var act = "MouseEvent.MOUSEMOVE";
		self.removeListener(eventName, act);
		var listenData = new Object();
		listenData.div = div;
		listenData.object = obj;
		div.onmouseleave = function(e) {
			listenData.e = e;
			if (delegate.listenCenter) delegate.listenCenter(eventName, listenData);
		}
		self.listenAry[eventName] = listenData;
	}

	self.addMouseOver = function(eventName, div, delegate, obj) {
		var act = "MouseEvent.MOUSEOVER";
		self.removeListener(eventName, act);
		var listenData = new Object();
		listenData.div = div;
		listenData.object = obj;
		div.onmouseover = function(e) {
			listenData.e = e;
			if (delegate.listenCenter) delegate.listenCenter(eventName, listenData);
		}
		self.listenAry[eventName] = listenData;
	}

	self.addMouseMove = function(eventName, div, delegate, obj) {
		var act = "MouseEvent.MOUSEMOVE";
		self.removeListener(eventName, act);
		var listenData = new Object();
		listenData.div = div;
		listenData.object = obj;
		div.onmousemove = function(e) {
			listenData.e = e;
			if (delegate.listenCenter) delegate.listenCenter(eventName, listenData);
		}
		self.listenAry[eventName] = listenData;
	}

	self.addMouseDown = function(eventName, div, delegate, obj) {
		var act = "MouseEvent.MOUSEDOWN";
		self.removeListener(eventName, act);
		var listenData = new Object();
		listenData.div = div;
		listenData.object = obj;
		div.onmousedown = function(e) {
			listenData.e = e;
			if (delegate.listenCenter) delegate.listenCenter(eventName, listenData);
		}
		self.listenAry[eventName] = listenData;
	}

	self.addMouseUp = function(eventName, div, delegate, obj) {
		var act = "MouseEvent.MOUSEUP";
		self.removeListener(eventName, act);
		var listenData = new Object();
		listenData.div = div;
		listenData.object = obj;
		div.onmouseup = function(e) {
			listenData.e = e;
			if (delegate.listenCenter) delegate.listenCenter(eventName, listenData);
		}
		self.listenAry[eventName] = listenData;
	}

	self.addSelectOnChange = function(eventName, div, delegate, obj) {
		var act = "SelectEvent.ONCHANGE";
		self.removeListener(eventName, act);
		var listenData = new Object();
		listenData.div = div;
		listenData.object = obj;
		div.onchange = function(e) {
			listenData.e = e;
			if (delegate.listenCenter) delegate.listenCenter(eventName, listenData);
		}
		self.listenAry[eventName] = listenData;
	}

	self.addKeyUp = function(eventName, div, delegate, obj) {
		var act = "KeyEvent.KEYUP";
		self.removeListener(eventName, act);
		var listenData = new Object();
		listenData.div = div;
		listenData.object = obj;
		div.onkeyup = function(e) {
			e = (e||window.event);
			listenData.e = e;
			if (delegate.listenCenter) delegate.listenCenter(eventName, listenData);
		}
		self.listenAry[eventName] = listenData;
	}

	self.addKeyDown = function(eventName, div, delegate, obj) {
		var act = "KeyEvent.KEYDOWN";
		self.removeListener(eventName, act);
		var listenData = new Object();
		listenData.div = div;
		listenData.object = obj;
		div.onkeydown = function(e) {
			e = (e||window.event);
			listenData.e = e;
			if (delegate.listenCenter) delegate.listenCenter(eventName, listenData);
		}
		self.listenAry[eventName] = listenData;
	}

	self.addKeyPress = function(eventName, div, delegate, obj) {
		var act = "KeyEvent.KEYPRESS";
		self.removeListener(eventName, act);
		var listenData = new Object();
		listenData.div = div;
		listenData.object = obj;
		div.onkeypress = function(e) {
			e = (e||window.event);
			listenData.e = e;
			if (delegate.listenCenter) delegate.listenCenter(eventName, listenData);
		}
		self.listenAry[eventName] = listenData;
	}

	self.addOnFocus = function(eventName, div, delegate, obj) {
		var act = "Event.ONFOCUS";
		self.removeListener(eventName, act);
		var listenData = new Object();
		listenData.div = div;
		listenData.object = obj;
		div.onfocus = function(e) {
			listenData.e = e;
			if (delegate.listenCenter) delegate.listenCenter(eventName, listenData);
		}
		self.listenAry[eventName] = listenData;
	}

	self.addOnBlur = function(eventName, div, delegate, obj) {
		var act = "Event.ONBLUR";
		self.removeListener(eventName, act);
		var listenData = new Object();
		listenData.div = div;
		listenData.object = obj;
		div.onblur = function(e) {
			listenData.e = e;
			if (delegate.listenCenter) delegate.listenCenter(eventName, listenData);
		}
		self.listenAry[eventName] = listenData;
	}

	self.addOnScroll = function(eventName, div, delegate, obj) {
		var act = "Event.ONSCROLL";
		self.removeListener(eventName, act);
		var listenData = new Object();
		listenData.div = div;
		listenData.object = obj;
		div.onscroll = function(e) {
			listenData.e = e;
			if (delegate.listenCenter) delegate.listenCenter(eventName, listenData);
		}
		self.listenAry[eventName] = listenData;
	}

	self.addOnPaste = function(eventName, div, delegate, obj) {
		var act = "Event.ONPASTE";
		self.removeListener(eventName, act);
		var listenData = new Object();
		listenData.div = div;
		listenData.object = obj;
		div.onpaste = function(e) {
			listenData.e = e;
			if (delegate.listenCenter) delegate.listenCenter(eventName, listenData);
		}
		self.listenAry[eventName] = listenData;
	}

	self.removeListener = function(eventName, act) {
		if (self.listenAry[eventName] == null) return;
		var targetObj = self.listenAry[eventName].div;
		var ret = "";
		try {
			switch(act) {
				case "MouseEvent.CLICK":
					targetObj.onclick = null;
					break;
				case "MouseEvent.MOUSEENTER":
					targetObj.onmouseenter = null;
					break;
				case "MouseEvent.MOUSEOUT":
					targetObj.onmouseout = null;
					break;
				case "MouseEvent.MOUSELEAVE":
					targetObj.onmouseleave = null;
					break;
				case "MouseEvent.MOUSEOVER":
					targetObj.onmouseover = null;
					break;
				case "MouseEvent.MOUSEMOVE":
					targetObj.onmousemove = null;
					break;
				case "MouseEvent.MOUSEDOWN":
					targetObj.onmousedown = null;
					break;
				case "MouseEvent.MOUSEUP":
					targetObj.onmouseup = null;
					break;
				case "SelectEvent.ONCHANGE":
					targetObj.onchange = null;
					break;
				case "KeyEvent.KEYUP":
					targetObj.onkeyup = null;
					break;
				case "KeyEvent.KEYDOWN":
					targetObj.onkeydown = null;
					break;
				case "KeyEvent.KEYPRESS":
					targetObj.onkeypress = null;
					break;
				case "Event.ONFOCUS":
					targetObj.onfocus = null;
					break;
				case "Event.ONBLUR":
					targetObj.onblur = null;
					break;
				case "Event.ONSCROLL":
					targetObj.onscroll = null;
					break;
				case "Event.ONPASTE":
					targetObj.onpaste = null;
					break;
				default:
					break;
			}
		} catch(e) {
			ret = e.toString();
		}

		self.listenAry[eventName] = null;
		return ret;
	}
}
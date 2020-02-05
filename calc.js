var util = new Util();
var listener = new ListenEvent();
var fieldNum = 5;
var saveObj = {
    "1":{"str":"","num":5},
    "2":{"str":"","num":5},
    "3":{"str":"","num":5},
    "4":{"str":"","num":5},
    "5":{"str":"","num":5},
    "6":{"str":"","num":5},
    "7":{"str":"","num":5},
    "8":{"str":"","num":5},
    "9":{"str":"","num":5},
    "10":{"str":"","num":5},
    "11":{"str":"","num":5},
    "12":{"str":"","num":5}
};
function showRight(){
    for (let i = 1; i <= 12; i++) {
        right.innerHTML += save_proto.innerHTML.replace(/\*/g,i);
    }
}
function chgField(){
    //計算現在欄位數
    var nowFieldNum = 0;
    if(inputArea.innerHTML != "") nowFieldNum = document.getElementsByName("input").length;
    //儲存欄位資料
    var dataAry = [];
    for (var i = 1; i <= nowFieldNum; i++) {
        var data = util.getSpan(document,"i"+i).value;
        dataAry.push(data);
    }
    //清除欄位與列表
    showList.innerHTML = "";
    inputArea.innerHTML = "";

    //新增輸入欄位與運算列表
    for (var i = 1; i <= fieldNum; i++) {
        var list = util.getSpan(document,"list_proto");
        var proto = util.getSpan(document,"input_proto");
        showList.innerHTML += list.innerHTML.replace(/\*/g,i);
        inputArea.innerHTML += proto.innerHTML.replace(/\*/g,i);
    }
    //載回欄位資料 
    var count = dataAry.length;
    for (var i = 1; i <= count; i++) {
        var data = dataAry.shift();
        if(data != "") util.getSpan(document,"i"+i).value = data;
    }
    //掛上事件
    var inputSet = document.getElementsByName("input");
    for (var i = 0; i < inputSet.length; i++){
        listener.addSelectOnChange("input"+i,inputSet[i],this,null);
    }
    equal.click();
} 
function initAddEvent(){
    listener.addOnClick("equal",util.getSpan(document,"equal"),this,null);
    listener.addOnClick("clear",util.getSpan(document,"clear"),this,null);
    listener.addOnClick("addField",util.getSpan(document,"addField"),this,null);
    listener.addOnClick("subField",util.getSpan(document,"subField"),this,null);
    for (var i = 1; i <= 12; i++) {
        listener.addOnClick("save_"+i,util.getSpan(document,"save_"+i),this,null);
        listener.addOnClick("load_"+i,util.getSpan(document,"load_"+i),this,null);
    }
}
showRight()
chgField();
initAddEvent();

function listenCenter(eventName,listenData){
    var div = listenData.div;      //loginbtn
    var obj = listenData.object;   //null
    var e = listenData.e;          //onclicke

    var inputSet = document.getElementsByName("input");
    for (var i = 0; i < inputSet.length; i++) {
        if(eventName=="input"+i) equal.click();
    }
    
    if(eventName=="equal"){
        var listSet = document.getElementsByName("list");
        var inputSet = document.getElementsByName("input");
        for (var i = 0; i < listSet.length; i++) {
            //欄1輸入
            var inputNum = inputSet[i].value;
            //k轉成千
            if(inputNum.indexOf("k") != -1) inputNum = inputNum.replace("k","000")*1;
            //把值列到清單 加正負號
            listSet[i].innerHTML = (i==0)? "&ensp;"+inputNum:"-"+inputNum;
            if(listSet[i].innerHTML.trim() == "-") listSet[i].innerHTML ="";
        }
        var total = listSet[0].innerHTML*1;
        for (var i = 1; i < listSet.length; i++) {
            if(listSet[i].innerHTML.trim() != "") total += listSet[i].innerHTML*1;
        }
        util.getSpan(document,"showTotal").innerHTML = total;
    }
    if(eventName=="clear"){
        var listSet = document.getElementsByName("list");
        var inputSet = document.getElementsByName("input");

        for (var i = 0; i < inputSet.length; i++) {
            inputSet[i].value = "";
            listSet[i].innerHTML = "";
        }

        showTotal.innerHTML = "&emsp;";
    }
    if(eventName=="addField"){
        fieldNum++;
        chgField();
    }
    if(eventName=="subField"){
        if(fieldNum >=5) fieldNum--;
        chgField();
    }
    //產生12個存讀事件
    for (var k = 1; k <= 12; k++) {

        if(eventName=="save_"+k){
            if(confirm("即將覆蓋已有的存檔,確認執行？")){
                saveObj[k].str = left.innerHTML;
                saveObj[k].num = fieldNum;
                console.log(left.innerHTML);
            }
        }
        if(eventName=="load_"+k){
            left.innerHTML = saveObj[k].str;
            fieldNum = saveObj[k].num;
            var listSet = document.getElementsByName("list");
            var inputSet = document.getElementsByName("input");
            for (var i = 1; i <= listSet.length; i++) {
                util.getSpan(document,"i"+i).value = (i==1)?
                    util.getSpan(document,"l"+i).innerHTML.trim()
                    :util.getSpan(document,"l"+i).innerHTML.replace("-","");
            }
            initAddEvent();

            //掛上onChange事件
            var inputSet = document.getElementsByName("input");
            for (var i = 0; i < inputSet.length; i++){
                listener.addSelectOnChange("input"+i,inputSet[i],this,null);
            }
            equal.click();
        }
    }
}


 
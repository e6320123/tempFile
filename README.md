記錄現在位於樓層  var nowFloor;

按下 上下 發亮 通知抵達樓層 與 要上樓或下樓

按電梯按鈕 發亮通知抵達樓層

記錄電梯是往上 還是往下

往上時
遇到第一個要往上的就停
遇到最後一個要往下的才停

往下時
遇到第一個要往下的就停
遇到最後一個要往上的才停

停下後就取消該層亮光 light(可輸入陣列嗎?) 
[“to”,”up”,”down”]
[  1   ,  0   ,     1   ]

parseTypeLayer(id) -> 回傳 樓層 與 動作

Var upStairArray =[1,0,0,0,0,0,1,1,0];

Var downStairArray =[1,0,0,0,0,0,1,1,0];

Var toArray =[1,0,0,0,0,0,1,1,0];

Function moveUp(){
	遇到to就要停

}
Function moveDown(){
	遇到to就要停

}
分離css 與 js 檔
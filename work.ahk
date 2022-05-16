; ~	不抑制原按鍵，原按鍵功能繼續保留
; $	用Send指令送出相同按鍵時要加 $
;!---------Alt鍵--------
;^---------ctrl----------
;+---------shift----------
;#---------windows鍵----------
;^D-------- ctrl + shift + d (大寫D代表多加shift)(只有在send後面如此)------------

fix_dash = 0 
temp_copy = 0
windows1 = 0
windows2 = 0
windows3 = 0
windows4 = 0
windows5 = 0
;------------------------------------檔案路徑變數區----------------------------
vscode_unsave := "● test.ahk - AHK (工作區) - Visual Studio Code"
vscode := "test.ahk - AHK (工作區) - Visual Studio Code"
ahk_edit := "C:\Users\Ben\Desktop\vscode連結\AHK.code-workspace"
 
xampp_title := "XAMPP Control Panel v3.3.0   [ Compiled: Apr 6th 2021 ]"
molin_routine := "C:\Users\ben\Desktop\molin.vbs"
kill_vbs := "C:\Users\ben\Desktop\kill.vbs"
Evernote := "C:\Users\ben\AppData\Local\Programs\Evernote\Evernote.exe"
chrome := "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"

stop_xampp := "%A_ScriptDir%\vbs\stop_xampp.vbs"

;------------------------------------檔案路徑變數區----------------------------
;------------------------------------Youtube----------------------------
; 橫幅廣告
blbX:= -960 ; 左 大廣告
blbY:= 930 ; 左 大廣告
blsX:=0 ;左 小廣告
blsY:=0 ;左 小廣告
brbX := 1246 ; 右 大廣告
brbY := 940 ; 右 大廣告
brsX := 1226 ; 右 小廣告
brsY := 938 ; 右 小廣告

; 影片廣告
vlfX := -60 * 0.8 ; 左 全螢幕 
vlfY := 1475 * 0.8 ; 左 全螢幕 
vlX := -1047 * 0.8 ; 左 網頁 
vlY := 1221 * 0.8 ; 左 網頁 
vrfX := 2450 ; 右 全螢幕 
vrfY := 1231 ; 右 全螢幕  
vrX = 1475 ; 右 網頁 
vrY := 938 ; 右 網頁 
  
; 空白鍵快捷
slbX:= -477 * 0.8 ; 左 大廣告
slbY:= 1379 * 0.8 ; 左 大廣告
slsX:= -1044 * 0.8 ;左 小廣告
slsY:= 1440 * 0.8 ;左 小廣告
srbX := 2003 ; 右 大廣告
srbY := 1147 ; 右 大廣告
srsX := 1736 ; 右 小廣告
srsY := 1208 ; 右 小廣告 

;------------------------------------Youtube----------------------------

:*?:+xx::
  pause
return 

; :*?:+qq::
;   run E:\21h1\ahk\self_kill.vbs
; return 

F9::
  send ^s
  sleep 100
  Reload
return 

#c::Run calc
#n::Run Notepad

; :*?:+nt::
;   WinGetActiveTitle, oTitle

;   loop,20{      ;chk 200ms
;     sleep 10
;     WinActivate, ahk_exe notion.exe
;     WinGetActiveTitle, Title
;     if(oTitle != Title){    ; notion視窗已喚出
;       return
;     }
;   } 

;   run C:\Users\Ben\AppData\Local\Programs\Notion\Notion.exe
;   loop,50{      ;wait 5000ms
;     sleep 100
;     WinGetActiveTitle, Title
;     if(oTitle != Title){    ; notion視窗已開啟
;       WinMaximize, A
;       return
;     }
;   } 
; return
 
; :*?:+sn::
;   run E:\21h1\SnipastePortable64\Snipaste.exe
; return

; :*?:-sn::
;   run E:\21h1\ahk\vbs\kill_sni.vbs
; return


~F1::
  WinGetActiveTitle, Title
  if Title contains Visual Studio Code
  {
    sendInput {BackSpace}
    sendInput :
    sleep 1500
    sendInput {enter}
  }
return
 
 
^-::  
  send --------------------
return


;標點符號快捷
:*?:,,::
  sendInput {right}
  sendInput `,
  sendInput {space}
return


:*?:-=::-> 
:*?:=-::=>  



:*?:;;::
  sendInput {end};
return 


!9::sendInput ()
![::sendInput [] 


; 補償沒有--
!-::
  sendInput --
return 

:*?:--:: 
  SetFormat, Integer, H ; format 67699721 into 0x4090409
  WinGet, WinID,, A
  ThreadID := DllCall("GetWindowThreadProcessId", "Int", WinID, "Int", "0")
  InputLocaleID := DllCall("GetKeyboardLayout", "Int", ThreadID)
  if(fix_dash = 1 and InputLocaleID = 0x4090409){ 
    fix_dash = 0
    sendInput $_
    return
  }
  if(InputLocaleID = 0x4090409){
    sendInput _
  }else{
    sendInput --
  }
return

:*b0?:4-:: 
  SetFormat, Integer, H ; format 67699721 into 0x4090409
  WinGet, WinID,, A
  ThreadID := DllCall("GetWindowThreadProcessId", "Int", WinID, "Int", "0")
  InputLocaleID := DllCall("GetKeyboardLayout", "Int", ThreadID)
  if(InputLocaleID = 0x4090409){
    sendInput {BackSpace 2}
    sendInput $
    fix_dash = 1
  } 
return 


; shift 延遲 150毫秒  適合快速切換大小寫
; shift 延遲 300毫秒  適合直接打兩個&&
; $LShift::
; $Shift::
;   sendInput {shift down}
;   sleep 150
;   sendInput {shift up}
; return


;游標快速位移 

+space:: 
  WinGetActiveTitle, Title
  if Title contains Visual Studio Code
  {
    sendInput {right} 
  }
return 
^space:: 
  WinGetActiveTitle, Title
  if Title contains Visual Studio Code
  {
    sendInput {left}
  }
return 
 
  
^up::sendInput {up 5}
^down::sendInput {down 5}

 
;跳到上一個相同字
!b:: 
  WinGetActiveTitle, Title
  if Title contains Visual Studio Code
  {   
    sendInput ^f
    sendInput +{F3}
    sendInput {esc}
  }
Return


;書籤設定
:*?:bkbk:: 
  SendInput {BackSpace}
  SendInput `>bookmarks:list from all file
return

^[::^!j
^]::^!l
^\::^!k


:*?:+wg::
  sleep 200
  run %A_ScriptDir%\vbs\kill_wg.vbs
  sleep 2000
  run "C:\Program Files (x86)\WGestures\WGestures.exe"
return



SetDefaultKeyboard(LocaleID) {
  Global SPI_SETDEFAULTINPUTLANG := 0x005A
  SPIF_SENDWININICHANGE := 2
  Lan := DllCall("LoadKeyboardLayout", "Str", Format("{:08x}", LocaleID), "Int", 0)
  VarSetCapacity(Lan%LocaleID%, 4, 0)
  NumPut(LocaleID, Lan%LocaleID%)
  ;Lan := 0xE0090404
  DllCall("SystemParametersInfo", "UInt", SPI_SETDEFAULTINPUTLANG, "UInt", 0, "UPtr", &Lan%LocaleID%, "UInt", SPIF_SENDWININICHANGE)
  WinGet, windows, List
  Loop %windows% {
    PostMessage 0x50, 0, %Lan%, , % "ahk_id " windows%A_Index%
  }
}
 
:*?:www::
  WinGetActiveTitle, Title
  if Title contains Visual Studio Code
    sendInput ^{home}
  if Title contains Edge
    sendInput {home}
return
:*?:sss::
  WinGetActiveTitle, Title
  if Title contains Visual Studio Code
    sendInput ^{end}
  if Title contains Edge
    sendInput {end}
    ; msgbox edge
return

+WheelUp::send {Volume_Up}
+WheelDown::send {Volume_Down}
^Numpad0::send {Volume_Mute}


:*?:w..::www

:O?:bg::ben780618@gmail.com

:*?:b..::ben
:*?:ms..::microsoft


:O?:.h::.html
:O?:.j::.js
:O?:.p::.php

::btw::
  Loop{
    if (A_Index > 25){ 
         send %A_Index%{enter}
         break  ; 终止循环 
      }
   }
return
 

 
;------------------------------------網址快捷----------------------------

:*?:+ko::
  run https://www.kobo.com/tw/zh
return
:*?:+tl::
  run https://www.tenlong.com.tw/
return
:*?:+ba::
  run https://www.blizzard.com/zh-tw/
return
:*?:+bo::
  run https://www.books.com.tw/
return
:*?:+yt::
  run https://www.youtube.com/
return
:*?:+rt::
  run https://www.ruten.com.tw/
return
:*?:+sh::
  run https://shopee.tw/
return
:*?:+pc::
  run https://24h.pchome.com.tw/
return
:*?:+mo::
  run https://www.momoshop.com.tw/
return
:*?:+yh::
  run https://tw.buy.yahoo.com/
return
:*?:+pt::
  run https://briian.com/ptt-search.htm
return
:*?:+tz::
  run https://www.taaze.tw/index.html
return
:*?:+lo::
  run http://localhost/
return  
:*?:+st::
  run https://store.steampowered.com/
return 
:*?:+zh::
  run https://www.zhihu.com/topic/19553437/hot
return 

:*?:+oo::
  run "C:\Program Files\Google\Chrome\Application\chrome.exe"
  ; run "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
return
:*?:+yati::
  run https://eshop.aptg.com.tw/orderlist
return
   
:*?:+gv:: 
  WinGetActiveTitle, Title 
  sleep 200 
  UniqueID := WinActive(Title)
  sleep 200
  run Notepad
  sleep 2000

  ; WinGet, active_class, class, A
  ; WinMaximize,  %active_class%
  sendInput  %Title%  
  ; sleep 100
  ; sendInput {enter}
  ; sleep 100 
  ; MsgBox, %UniqueID%
return

 

:O:\c::
  run c:\
return
:O:\d::
  run d:\
return
:O:\e::
  run e:\
return 
:O:\cmd::
  run %windir%\system32\cmd.exe
return 
:O:\dc::
  run C:\xampp\htdocs
return 
:O:\hk::
  run %A_ScriptDir% 
return 
:O:\ad::
  sendInput admin
  sleep 100
  sendInput {tab}
  sleep 100
  sendInput admin  
return 
   
:*?:sese::
  sleep 200
  InputBox, innn, Google搜尋 
  auto_search(innn)
return

!s::
  sendInput ^c
  sleep 50
  innn = %Clipboard%
  auto_search(innn)
return

auto_search(innn)
{
  edgeIsOpen = 0
  ;must have Input
  if(innn != ""){
    WinGetActiveTitle, oldTitle 

    ;this Window Is Edge
    if oldTitle contains - 個人 - Microsoft​ Edge
    {
      ;open new page and search
      sendInput ^t
      sleep 100 
      SetDefaultKeyboard(0x0409)  ;; 切換為英文輸入
      sleep 100
      sendInput %innn% 
      sendInput {enter}
      sleep 100
      WinMaximize, A
      return
    }
 
    ;this Window is not Edge -> isEdgeOpened?  loop check 500ms
    loop,50{
      sleep 10
      WinActivate , ahk_exe msedge.exe
      WinGetActiveTitle, Title
      if(oldTitle != Title)   ;edge is opened
      {  
        edgeIsOpen = 1
        break
      } 
    }

    if(edgeIsOpen != 1)  ;open edge
    {
      run "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
      loop,50{        ;wait edge open for 5000ms
        sleep 100 
        WinGetActiveTitle, Title
        if(oldTitle != Title){    ;edge is ready
          break
        } 
      }
    } 

    ;edge is open and activate
    sleep 1000   ;activate buffer
    if(edgeIsOpen = 1){
      sendInput ^t
      sleep 100 
    }
    SetDefaultKeyboard(0x0409)  ;; 切換為英文輸入
    sleep 100
    sendInput %innn% 
    sendInput {enter}
    sleep 100
    WinMaximize, A
  }
}



; --------------------------易經----------------------------------
 
:*?:bb::
WinGetActiveTitle, Title
if Title contains YouTube
  { 
    CoordMode, Mouse , Screen
    MouseGetPos, OutputVarX, OutputVarY
    if (OutputVarX > 0){
      CoordMode, Mouse , Window
      click %brbX% , %brbY%    ;橫幅大廣告
      sleep 100 
      click %brsX% , %brsY%    ;橫幅小廣告
      sleep 100
      sendInput {space}
    }else{ 
      blbX := blbX * 0.8
      blbY := blbY * 0.8
      click, %blbX%, %blbY%   ;橫幅大廣告
    } 
  }
return 
:*?:gs::
  CoordMode, Mouse , Screen
  MouseGetPos, OutputVarX, OutputVarY
  msgbox, %OutputVarX%, %OutputVarY%  
  Clipboard = click, %OutputVarX%, %OutputVarY% 
return  
:*?:gw::
  CoordMode, Mouse , Window
  MouseGetPos, OutputVarX, OutputVarY
  msgbox, %OutputVarX%, %OutputVarY%  
  Clipboard = click, %OutputVarX%, %OutputVarY% 
return    
:*?:vv::
WinGetActiveTitle, Title
if Title contains YouTube
  {  
    CoordMode, Mouse , Screen
    MouseGetPos, OutputVarX, OutputVarY
    if (OutputVarX > 0){
      CoordMode, Mouse , Window
        sleep 3000
        click %vrfX%, %vrfY%   ;yt full 略過廣告 
        sleep 100
        click %vrX%, %vrY%   ;yt  略過廣告 
        sleep 100 
        sendInput {space}  

        sleep 1800
        click %vrfX%, %vrfY%   ;yt full 略過廣告 
        sleep 100
        click %vrX%, %vrY%   ;yt  略過廣告 
        sleep 100 
        sendInput {space}  
    }else{
      sleep 5000  
      click, %vlfX%, %vlfY%   ;yt full 略過廣告 
      sleep 100  
      click, %vlX%, %vlY%   ;yt small 略過廣告 
      sleep 100
      sendInput {space}
    }
  }
return 

:*Zb0?:  ::
WinGetActiveTitle, Title
if Title contains YouTube
  { 
    CoordMode, Mouse , Screen
    MouseGetPos, OutputVarX, OutputVarY
    if (OutputVarX > 0){
      CoordMode, Mouse , Window
      click %srbX%, %srbY%   ;橫幅大廣告
      sleep 100
      click %srsX%, %srsY%   ;橫幅小廣告
      sleep 100
      sendInput {space}
    }else{  
      click, %slbX%, %slbY%   ;橫幅大廣告
      sleep 100    
      click, %slsX%, %slsY%   ;橫幅小廣告
      sleep 100    
      sendInput {space}
      sleep 100  
    }
  }
return   
 

~!WheelDown:: 
    WinGetClass, class, A
  if class not contains illustrator
  {
     sendInput  {WheelDown 6}
  }
return
~!WheelUp:: 
  WinGetClass, class, A
  if class not contains illustrator
  {
     sendInput  {WheelUp 6}
  }
return
  
  

#Include, %A_ScriptDir%\click.ahk 
#Include, %A_ScriptDir%\lara.ahk
; #Include, %A_ScriptDir%\win_ctl.ahk
; #Include, %A_ScriptDir%\sa.ahk
; #Include, %A_ScriptDir%\br.ahk
; #Include, %A_ScriptDir%\keyword_hotkey.ahk

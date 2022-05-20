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
; 

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
 

:*?:+sn::
  run C:\Users\Administrator\Desktop\Snipaste-1.16.2-x64\Snipaste.exe
return

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

^-::  
  send --------------------
return
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
  ; sleep 200
  ; run %A_ScriptDir%\vbs\kill_wg.vbs
  ; sleep 2000
  ; run "C:\Program Files (x86)\WGestures\WGestures.exe"
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
return
 

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



  
  

;#Include, %A_ScriptDir%\click.ahk 
#Include, %A_ScriptDir%\lara.ahk
#Include, %A_ScriptDir%\win_ctl.ahk
#Include, %A_ScriptDir%\keyword_php.ahk

; Neil Liu
; 帳號 e6320123
; 密碼 25652565
; ben780618@gmail.com


; 參考
; admin/page/excel.php

; git 分支
; 學習 Git 版本控管：新手上路篇 (命令列操作)
; https://www.youtube.com/watch?app=desktop&v=WxFSad6II34
; Git 新手上路 AMA (Ask Me Anything)
; https://www.facebook.com/will.fans/videos/1806894692673000/
; 30 天精通 Git 版本控管
; https://github.com/doggy8088/Learn-Git-in-30-days/blob/master/zh-tw/README.md
; Git 新手上路 AMA 實作練習腳本
; https://gist.github.com/doggy8088/e39cfa2f28cd6da43fcf1689cee3f5ff

; 鳥哥Linux教學
; https://linux.vbird.org/linux_basic/centos7/


; 練習linux

; Copy.sh
; https://copy.sh/v86/?profile=linux26


; dark reader
; GoodNotes
; 自我工作安排
; 工作進度管理
; 了解公司網站 程式架構
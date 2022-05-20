
;:O:---------點TAB或空白鍵或enter--------
;:*:---------直接變----------
;:?:---------可混入字串內----------

:O?:.b.::.blade.php
;:O:pam::php artisan migrate
;:O:pas::php artisan db:seed 
; :O:ss::php artisan serve{enter} 
;:O:com u::composer update{enter} 

:O:pac::php artisan make:controller NameController
:O:pacr::php artisan make:controller NameController --resource
:O:g+::git add .
:O:gc::git commit -m '
:O:gh::git push
 
:O:gst::git status



~shift::
  SetDefaultKeyboard(0x0409)  ;; 切換為英文輸入
return
:*?:cc ::
  SetDefaultKeyboard(0x0404)  ;; 切換為中文輸入
return



; :*?:\ftp::
;   sendInput benliu.site
;   sleep 200
;   sendInput {tab}
;   sleep 200
;   sendInput ph11433690445
;   sleep 200
;   sendInput {tab}
;   sleep 200
;   sendInput 14741474ftp
;   sleep 200
;   sendInput {tab}
;   sleep 200
;   sendInput 21
;   sleep 250
;   sendInput {tab}
;   sleep 250
;   sendInput {enter}
; return
; :*?:\sq1::
;   sendInput cd c:\xampp\mysql\bin
;   sleep 100
;   sendInput {enter}
;   sleep 100
;   sendInput mysql -u root
;   sleep 100
;   sendInput {enter}
;   sleep 100
;   sendInput use test;
;   sleep 100
;   sendInput {enter}
;   sleep 100
;   sendRaw show tables;
;   sleep 100
;   sendInput {enter}
;   sleep 100
; return
; :*?:\sq2::
;   sendInput cd c:\xampp\mysql\bin
;   sleep 300
;   sendInput {enter}
;   sleep 300
;   sendInput mysql -h sg2nlmysql39plsk.secureserver.net -u benliu -p
;   sleep 300
;   sendInput {enter}
;   sleep 300
;   sendInput 14741474sql
;   sleep 300
;   sendInput {enter}
;   sleep 300
;   sendInput use ph11433690445_;
;   sleep 300
;   sendInput {enter}
;   sleep 300
; return 


:*?:\dex::
  ; ClickPicture("C:\Users\ben\Desktop\xx.png", 1, 0,false,1)
  ; sleep 1000
  ; ClickPicture("C:\Users\ben\Destop\x.png", 1, 0,false,1)
  ; click, 1495 926
  ; sleep 200
  ; click, 1600 980

; ---------測試位置-----------
; Array := Array("1025", "880", "740", "600", "460", "320")
; For Key, Value in array
; {
; WinActivate, Samsung DeX
; sleep 300
; click, 560 %Value% 0 ;第n個
; sleep 300
; }
; click, 560 320   ;最下一個
; sleep 300
; click, 727 214  ;複製鈕
; sleep 500
; click, 334 214 ;返回鈕
; sleep 500

; click, 560 320 0  ;最下一個
; sleep 300
; Send {LButton Down}
; sleep 500
; Send {LButton Up}
; sleep 200
; click, 564 1077 ;刪除
; sleep 300
; click, 731 688 0 ;確定刪除
; sleep 500
; WinActivate, ahk_id 0x490a4c
; sleep 200
; sendInput ^v
; ---------測試位置-----------
 


; Array := Array("1025", "880", "740", "600", "460", "320")
; Array := Array("1025", "880", "740", "600", "460")
; click, 560 320 ;點第1個
; click, 560 460 ;點第2個
; click, 560 600 ;點第3個
; click, 560 740 ;點第4個
; click, 560 880 ;點第5個
 
loop,0{   
  For Key, Value in array
  {
    ; ---------複製-----------
    WinActivate, Samsung DeX
    sleep 100
    ; click, 560 1025 ;點最下一個
    click, 560 %Value% ;點第n個
    sleep 500
    click, 727 214  ;複製鈕
    sleep 1000
    click, 334 214  ;返回鈕
    sleep 100 
    ; ---------貼到筆記本-----------
    WinActivate, ahk_id 0x490a4c
    sleep 100
    sendInput ^v
    sleep 100
    sendInput {enter}
    sleep 100
    sendInput {enter}
    sleep 100
    sendInput {enter}
    sleep 100
    sendInput {enter}
    sleep 100
  }
  ; ---------下拉-----------
  ; WinActivate, Samsung DeX
  ; sleep 200
  ; click, 560 285 0 ;到最上面一個
  ; sleep 100
  ; Send {LButton Down}
  ; sleep 800
  ; click, 560 995 0 ;到最下一個
  ; sleep 300
  ; Send {LButton Up}
  ; sleep 300
  ; click, 725 1060 ;點取消
  ; sleep 200
}
return
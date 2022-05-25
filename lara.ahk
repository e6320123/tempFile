
;:O:---------點TAB或空白鍵或enter--------
;:*:---------直接變----------
;:?:---------可混入字串內----------

:O?:.b.::.blade.php
;:O:pam::php artisan migrate
;:O:pas::php artisan db:seed 
;:O:ss::php artisan serve{enter} 
;:O:com u::composer update{enter} 

:O:pac::php artisan make:controller NameController
:O:pacr::php artisan make:controller NameController --resource
:O:g+::git add .
:O:gc::git commit -m '
:O:gh::git push
 
:O:gst::git status

:O:gpu::
  sendInput git add .
  sleep 200
  sendInput {enter}
  sleep 3000
  sendInput git commit -m '123'
  sleep 200
  sendInput {enter}
  sleep 3000
  sendInput git push
  sleep 200
  sendInput {enter}
return


~shift::
  SetDefaultKeyboard(0x0409)  ;; 切換為英文輸入
return
:*?:cc ::
  SetDefaultKeyboard(0x0404)  ;; 切換為中文輸入
return


 
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

 
:O?:ff::
  sendInput +{home}
  sleep 100
  sendInput ^x
  sleep 100
  sendRaw function
  sleep 100
  sendInput {space} 
  sleep 100
  sendRaw (){
  sleep 300
  sendInput {left 3}
  sleep 100
  sendInput ^v
  sleep 100
  sendInput {right 3} 
  sleep 100
  sendInput {enter 3} 
  sleep 100
  sendInput {up 2} 
  sleep 100
  sendInput {tab}
return
 
; :O?:ec::
;   sendInput echo
;   sleep 100
;   sendInput {space}
; return

; :O?:es::
;   sendInput echo
;   sleep 100
;   sendInput {space}
;   sleep 100
;   sendInput "
;   sleep 100 
; return

:O?:vd::
  sendInput var_dump`(`)
  sleep 100
  sendInput {left}
return

 
 
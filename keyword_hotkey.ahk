:O:bd::border: 1px solid red
:O:bdr::border-radius: 100%

:O?:aaa::
  sendInput {end}
  sleep 100
  sendInput +{home}
  sleep 100
  sendInput ^x
  sleep 100
  sendInput aa
  sleep 100
  sendInput {tab}
  sleep 100
  sendInput ^v
  sleep 100
  sendInput {tab}
  sleep 100
  sendInput ^v
  sleep 100 
return

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

:O:mix::
 sendInput @mixin func_name()
 sleep 100
 sendInput {left 2}
 sleep 100
 sendInput ^d
return 

:O?:hh::
  sendInput +{home}
  sleep 100
  sendInput ^x
  sleep 100
  sendInput height: 
  sleep 100
  sendInput {space}
  sleep 100
  sendInput ^v
  sleep 100
  sendInput px
return

:O?:ww:: 
  sendInput +{home}
  sleep 100
  sendInput ^x
  sleep 100
  sendInput width: 
  sleep 100
  sendInput {space}
  sleep 100
  sendInput ^v
  sleep 100
  sendInput px
return
 
:O?:rr:: 
  sendInput +{home}
  sleep 100
  sendInput ^x
  sleep 100
  sendRaw right: 
  sleep 100
  sendInput {space}
  sleep 100
  sendInput ^v
  sleep 100
  sendInput px
return
 
:O?:ll:: 
  sendInput +{home}
  sleep 100
  sendInput ^x
  sleep 100
  sendRaw left: 
  sleep 100
  sendInput {space}
  sleep 100
  sendInput ^v
  sleep 100
  sendInput px
return

:O:ar::
  sendRaw margin: 
  sleep 100
  sendInput {space}
return

:O:ad::
  sendRaw padding: 
  sleep 100
  sendInput {space}
return

:O:bc::
  sendRaw background-color: 
  sleep 100
  sendInput {space}
return
 
:O:dnb::
  sendRaw display: inline-block 
  sleep 100
  sendInput {space}
return

:O:\cv::
  run "C:\Users\Ben\Desktop\my_cv"
return 
:O:\cvv::
  run "C:\Users\Ben\Desktop\my_cv"
  sleep 1000
  ClickPicture("E:\21h1\ahk\ahk_pic\stycss.png", 0, 0,false,true)
  sleep 100
  MouseClick, right
  sleep 500
  ClickPicture("E:\21h1\ahk\ahk_pic\vscode.png", 1, 0,false,true)
return 
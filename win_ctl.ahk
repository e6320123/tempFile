
#1:: 
  WinGetActiveTitle, Title 
  sleep 100
  UniqueID := WinActive(Title)
  sleep 100
  windows1 = %UniqueID%
return 
#2:: 
  WinGetActiveTitle, Title 
  sleep 100
  UniqueID := WinActive(Title)
  sleep 100
  windows2 = %UniqueID%
return 
#3:: 
  WinGetActiveTitle, Title 
  sleep 100
  UniqueID := WinActive(Title)
  sleep 100
  windows3 = %UniqueID%
return 
#4:: 
  WinGetActiveTitle, Title 
  sleep 100
  UniqueID := WinActive(Title)
  sleep 100
  windows4 = %UniqueID%
return
#5:: 
  WinGetActiveTitle, Title 
  sleep 100
  UniqueID := WinActive(Title)
  sleep 100
  windows5 = %UniqueID%
return 

 
:*?:w1::
  WinGetActiveTitle, Title 
  UniqueID := WinActive(Title)
  if (UniqueID = windows1 )
  {
      WinMinimize, A 
  } 
  else
  {
    sleep 50
    WinActivate, ahk_id %windows1%  
    sleep 50 
    WinMove, A, ,0, 0, 2568, 1383 
    WinMaximize, A
  }
return 
:*?:w2::
  WinGetActiveTitle, Title 
  UniqueID := WinActive(Title)
  if (UniqueID = windows2 )
  {
      WinMinimize, A 
  } 
  else
  {
    sleep 50
    WinActivate, ahk_id %windows2%  
    sleep 50 
    WinMove, A, ,0, 0, 2568, 1383 
    WinMaximize, A
  }
return 
:*?:w3::
  WinGetActiveTitle, Title 
  UniqueID := WinActive(Title)
  if (UniqueID = windows3 )
  {
      WinMinimize, A 
  } 
  else
  {
    sleep 50
    WinActivate, ahk_id %windows3% 
    sleep 50 
    WinMove, A, ,0, 0, 2568, 1383 
    WinMaximize, A
  }
return 
:*?:w4::
  WinGetActiveTitle, Title 
  UniqueID := WinActive(Title)
  if (UniqueID = windows4 )
  {
      WinMinimize, A 
  } 
  else
  {
    sleep 50
    WinActivate, ahk_id %windows4% 
    sleep 50 
    WinMove, A, ,0, 0, 2568, 1383 
    WinMaximize, A
  }
return 
:*?:w5::
  WinGetActiveTitle, Title 
  UniqueID := WinActive(Title)
  if (UniqueID = windows5 )
  {
      WinMinimize, A 
  } 
  else
  {
    sleep 50
    WinActivate, ahk_id %windows5% 
    sleep 50 
    WinMove, A, ,0, 0, 2568, 1383 
    WinMaximize, A
  }
return 
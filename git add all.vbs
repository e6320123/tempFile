Set WshShell = WScript.CreateObject("WScript.Shell")

Set objShell = CreateObject("Wscript.Shell") 

wscript.sleep(100)
objShell.sendkeys ("%{ESC}")

wscript.sleep(100)
WshShell.SendKeys "git add ."

wscript.sleep(100)
WshShell.SendKeys "{ENTER}" 
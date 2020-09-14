send %1%
send {Enter}
send 1
send {Enter}
send 4
send {Enter}{Enter}

processName := "reaper.exe"
if (WinExist("ahk_exe " . processName)){
	WinGetTitle, title, ahk_exe %processName%
  FileAppend, %Title%, window_title.txt
}
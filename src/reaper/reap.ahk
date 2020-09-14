send %1%
send {Enter}
send 1
send {Enter}
send 4
send {Enter}{Enter}
WinGetTitle, Title
FileAppend, %Title%, window_title.txt
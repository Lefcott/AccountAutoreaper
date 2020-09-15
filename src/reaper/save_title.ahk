processName := "._cache_reaper.exe"
if (WinExist("ahk_exe " . processName)) {
    WinGetTitle, title, ahk_exe %processName%
    FileDelete, window_title.txt
    FileAppend, %Title%, window_title.txt
}
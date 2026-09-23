$gitExe = "$env:LOCALAPPDATA\Programs\MinGit\cmd\git.exe"
if (-not (Test-Path $gitExe)) {
    $gitExe = "git"
}
& $gitExe $args

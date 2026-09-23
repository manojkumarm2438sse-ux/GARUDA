$url = "https://github.com/git-for-windows/git/releases/download/v2.44.0.windows.1/MinGit-2.44.0-64-bit.zip"
$targetDir = "$env:LOCALAPPDATA\Programs\MinGit"
$zipFile = "$env:TEMP\mingit.zip"

Write-Host "[GIT SETUP] Downloading official MinGit portable..."
Invoke-WebRequest -Uri $url -OutFile $zipFile

Write-Host "[GIT SETUP] Extracting to $targetDir..."
New-Item -ItemType Directory -Force -Path $targetDir | Out-Null
Expand-Archive -Path $zipFile -DestinationPath $targetDir -Force
Remove-Item $zipFile -Force

$gitExe = "$targetDir\cmd\git.exe"
if (Test-Path $gitExe) {
    Write-Host "[GIT SETUP] Git verified:"
    & $gitExe --version

    # Add to User PATH
    $userPath = [Environment]::GetEnvironmentVariable("Path", "User")
    $gitCmdDir = "$targetDir\cmd"
    if ($userPath -notlike "*$gitCmdDir*") {
        [Environment]::SetEnvironmentVariable("Path", "$gitCmdDir;$userPath", "User")
        Write-Host "[GIT SETUP] Added $gitCmdDir to User PATH."
    }
} else {
    Write-Host "[GIT SETUP] Failed to locate git.exe at $gitExe"
}

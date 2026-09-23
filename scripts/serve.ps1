# ==========================================================================
# GARUDA OS - High Performance Local HTTP & REST Server (PowerShell Launcher)
# Runs production server.js with SQLite & JWT Auth using bin/node.exe
# ==========================================================================

$rootPath = (Resolve-Path "$PSScriptRoot\..").Path
$nodeExe = [System.IO.Path]::Combine($rootPath, "bin", "node.exe")
$serverJs = [System.IO.Path]::Combine($rootPath, "server.js")

if (-not (Test-Path $nodeExe)) {
    Write-Host "[GARUDA] Downloading Node.js runtime..."
    New-Item -ItemType Directory -Force -Path (Split-Path $nodeExe) | Out-Null
    Invoke-WebRequest -Uri "https://nodejs.org/dist/v22.11.0/win-x64/node.exe" -OutFile $nodeExe
}

Write-Host "[GARUDA] Launching GARUDA OS with SQLite & JWT Authentication..."
& $nodeExe --experimental-sqlite $serverJs

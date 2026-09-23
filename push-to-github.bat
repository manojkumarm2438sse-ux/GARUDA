@echo off
echo ===================================================
echo   GARUDA OS - PUSHING TO GITHUB
echo ===================================================
echo.
"%LOCALAPPDATA%\Programs\MinGit\cmd\git.exe" push -u origin main
echo.
if %ERRORLEVEL% EQU 0 (
    echo ===================================================
    echo   SUCCESS! Pushed to https://github.com/manojkumarm2438sse-ux/GARUDA
    echo ===================================================
) else (
    echo.
    echo If authentication failed, ensure you sign in to GitHub in the prompt.
)
pause

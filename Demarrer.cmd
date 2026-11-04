@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if not errorlevel 1 goto start
if exist "D:\mon app\.tools\node\node-v24.21.0-win-x64\node.exe" set "PATH=D:\mon app\.tools\node\node-v24.21.0-win-x64;%PATH%"
if exist "%USERPROFILE%\Desktop\monapp\.tools\node\node-v24.21.0-win-x64\node.exe" set "PATH=%USERPROFILE%\Desktop\monapp\.tools\node\node-v24.21.0-win-x64;%PATH%"
:start
where node >nul 2>nul
if errorlevel 1 goto missing
if not exist "node_modules" call npm.cmd install
call npm.cmd run dev
pause
exit /b
:missing
echo Installez Node.js 24 puis relancez ce fichier.
pause

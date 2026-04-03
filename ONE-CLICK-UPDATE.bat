@echo off
setlocal
echo 🗿 SRM BUZZ PRESTIGE: Starting Automated Deployment... 🗿
echo --------------------------------------------------------

:: 1. Navigate to the project root
cd /d "%~dp0"

:: 2. Get current timestamp for commit
for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /value') do set datetime=%%I
set commit_msg=SRM Prestige Automated Update: %datetime:~0,4%-%datetime:~4,2%-%datetime:~6,2% %datetime:~8,2%:%datetime:~10,2%

:: 3. Prepare the files
echo 📦 Saving latest changes and preparing the update...
git add .

:: 4. Commit (Local)
echo 💎 Building the Prestige Update...
git commit -m "%commit_msg%"

:: 5. Push (Live)
echo 🚀 Sending to the Cloud (GitHub Proxy)...
git push origin main

echo --------------------------------------------------------
echo ✅ MISSION COMPLETE! Your site is now updating in the cloud.
echo 📜 You can close this window now.
pause

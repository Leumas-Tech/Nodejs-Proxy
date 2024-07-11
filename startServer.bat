@echo off
:: Set the path to your server directory
set server_dir=C:\Users\sqwillyum\Desktop\LeumasAI\x\nodejs-proxy

:: Navigate to the server directory
cd /d "%server_dir%"

:: Start the server
node proxy.js

:: Pause to keep the command prompt open
pause

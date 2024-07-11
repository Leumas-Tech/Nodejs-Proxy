@echo off
setlocal

:: Set the source and destination directories
set src_dir="C:\Users\sqwillyum\Desktop\LeumasAI\x\nodejs-proxy"
set dest_dir="D:\ServerBackups\nodejs-proxy_backup"

:: Create the backup directory if it doesn't exist
if not exist %dest_dir% (
    mkdir %dest_dir%
)

:: Copy files excluding node_modules
robocopy %src_dir% %dest_dir% /MIR /XD node_modules

endlocal
echo Backup of nodejs-proxy completed.
pause

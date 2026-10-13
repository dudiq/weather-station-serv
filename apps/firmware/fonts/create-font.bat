@echo off
python "%~dp0build-fonts.py" %*
exit /b %errorlevel%

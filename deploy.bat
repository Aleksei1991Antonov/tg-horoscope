@echo off
echo Building...
call npm run build
if %errorlevel% neq 0 (
    echo Build failed!
    exit /b %errorlevel%
)

set DIST_DIR=dist
if not exist "%DIST_DIR%\index.html" (
    echo dist/index.html not found. Build may have failed silently.
    exit /b 1
)

echo Deploying to gh-pages...

if exist "%TEMP%\gh-pages-deploy" rmdir /s /q "%TEMP%\gh-pages-deploy"

git clone --depth 1 --branch gh-pages https://github.com/Aleksei1991Antonov/tg-horoscope.git "%TEMP%\gh-pages-deploy" 2>nul
if %errorlevel% neq 0 (
    echo No gh-pages branch yet, creating orphan...
    mkdir "%TEMP%\gh-pages-deploy"
    cd "%TEMP%\gh-pages-deploy"
    git init
    git checkout --orphan gh-pages
    git remote add origin https://github.com/Aleksei1991Antonov/tg-horoscope.git
)

xcopy /e /y "%CD%\dist\*" "%TEMP%\gh-pages-deploy\"

cd /d "%TEMP%\gh-pages-deploy"

git add -A
git commit -m "deploy %DATE% %TIME%"
git push origin gh-pages --force

cd /d "%CD%"

echo Done!

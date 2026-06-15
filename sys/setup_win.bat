@echo off

chcp 65001 > nul
cd /d "%~dp0"

echo =======================================================================================
echo [LYNX-Studio] Environment initialization wizard
echo               Мастер инициализации среды разработки
echo =======================================================================================
echo.

:: Step 1: Checking Node.js (роверка Node.js)
echo Environment check: Node.js runtime detection... (Проверка среды: поиск окружения Node.js...)

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo               ERROR: Node.js is not installed! Please download and install it from https://nodejs.org
    echo               ОШИБКА: Node.js не установлен! Пожалуйста, скачайте и установите его с сайта https://nodejs.org
    echo.
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%i in ('node -v') do set node_ver=%%i
    echo               SUCCESS: Detected version -^> %node_ver%
    echo               УСПЕШНО: Обнаружена версия -^> %node_ver%
)
echo.

:: Step 2: Installing Gulp CLI globally (Установка Gulp CLI глобально)
echo CLI setup: global deployment of gulp-cli...
echo Настройка CLI: глобальное развертывание gulp-cli...
echo.
call npm install --global gulp-cli
echo.

:: Step 3: Installing local dependencies (Установка локальных зависимостей)
echo Packages download: installing project dependencies from package.json...
echo Загрузка пакетов: скачивание зависимостей проекта из package.json...
echo.
call npm install
echo.

:: Step 4: Verification & Completion (Проверка и завершение)
echo               SETUP COMPLETED SUCCESSFULLY! To start the project, type: npm run dev
echo               НАСТРОЙКА УСПЕШНО ЗАВЕРШЕНА! Для запуска проекта введите: npm run dev
echo.
pause

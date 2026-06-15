@echo off
chcp 65001 > nul
title LYNX-Studio Project Generator

echo =======================================
echo     LYNX-Studio Project Generator
echo =======================================
echo.

:: 1. Запрашиваем название нового проекта (Ask for project name)
set /p PROJECT_NAME="Введите название нового репозитория (например, LYNX-Studio.Web): "

:: Проверяем, что название введено (Check if name is not empty)
if "%PROJECT_NAME%"=="" (
    echo.
    echo Ошибка: Название не может быть пустым!
    timeout /t 5 > nul
    exit /b 1
)

echo.
echo Разворачиваем проект %PROJECT_NAME% из шаблона LYNX-Studio.Core...
echo.

:: 2. Клонируем базовый шаблон в папку с новым именем (Clone core template)
git clone https://github.com "%PROJECT_NAME%"

:: Переходим в созданную папку (Navigate to new directory)
cd "%PROJECT_NAME%"

:: 3. Перенастраиваем Git на новый репозиторий (Reset Git origin to new repo)
git remote set-url origin "https://github.com"

:: 4. Автоматически устанавливаем все плагины (Install npm packages)
echo.
echo Устанавливаем зависимости Gulp...
echo.
call npm install

echo.
echo Проект %PROJECT_NAME% успешно развернут и готов к работе в VS Code!
echo Это окно закроется автоматически через 5 секунд.
timeout /t 5 > nul

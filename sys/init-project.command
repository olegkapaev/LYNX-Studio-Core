#!/bin/bash

# Переходим в папку, где лежит сам скрипт (Navigate to script directory)
cd "$(dirname "$0")"

# 1. Запрашиваем название нового проекта (Ask for project name)
echo "=== LYNX-Studio Project Generator ==="
echo "Введите название нового репозитория (например, LYNX-Studio.Web):"
read PROJECT_NAME

# Проверяем, что название введено (Check if name is not empty)
if [ -z "$PROJECT_NAME" ]; then
    echo "Ошибка: Название не может быть пустым!"
    sleep 3
    exit 1
fi

echo "Разворачиваем проект $PROJECT_NAME из шаблона LYNX-Studio.Core..."

# 2. Клонируем базовый шаблон в папку с новым именем (Clone core template)
git clone https://github.com "$PROJECT_NAME"

# Переходим в созданную папку (Navigate to new directory)
cd "$PROJECT_NAME" || exit

# 3. Перенастраиваем Git на новый репозиторий (Reset Git origin to new repo)
git remote set-url origin "https://github.com"

# 4. Автоматически устанавливаем все плагины (Install npm packages)
echo "Устанавливаем зависимости Gulp..."
npm install

echo "Проект $PROJECT_NAME успешно развернут и готов к работе в VS Code!"
echo "Это окно можно закрыть."
sleep 5

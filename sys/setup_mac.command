#!/bin/bash

cd "$(dirname "$0")/.."
echo "======================================================================================="
echo "[LYNX-Studio] Environment initialization wizard"
echo "              Мастер инициализации среды разработки"
echo "======================================================================================="
echo ""

# Step 1: Checking Node.js (Шаг 1: Проверка Node.js)
echo "Environment check: Node.js runtime detection... (Проверка среды: поиск окружения Node.js...)"

if ! command -v node &> /dev/null
then
	echo ""
	echo "              ERROR: Node.js is not installed! lease download and install it from https://nodejs.org"
	echo "              ОШИБКА: Node.js не установлен! Пожалуйста, скачайте и установите его с сайта https://nodejs.org"
	echo ""
	exit 1
else
	echo "              SUCCESS: Detected version -> $(node -v)"
	echo "              УСПЕШНО: Обнаружена версия -> $(node -v)"
fi
echo ""

# Step 2: Installing Gulp CLI globally (Шаг 2: Установка Gulp CLI глобально)
echo "CLI setup: global deployment of gulp-cli. Enter Mac password if prompted..."
echo "Настройка CLI: глобальное развертывание gulp-cli. Введите пароль от Mac..."
echo ""
sudo npm install --global gulp-cli
echo ""

# Step 3: Installing local dependencies (Шаг 3: Установка локальных зависимостей)
echo "Packages download: installing project dependencies from package.json..."
echo "Загрузка пакетов: скачивание зависимостей проекта из package.json..."
echo ""
npm install
echo ""

# Step 3: Verification & Completion (Шаг 5: Проверка и завершение)
echo "              SETUP COMPLETED SUCCESSFULLY! To start the project, type: npm run dev"
echo "              НАСТРОЙКА УСПЕШНО ЗАВЕРШЕНА! Для запуска проекта введите: npm run dev"
echo ""

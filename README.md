# STANDARDS.LYNX-STUDIO.RU


## ABOUT THE PROJECT (О проекте)

**EN:** This project serves as the official website for ordering printed editions of German DVS 2205 standards translated into Russian (structural design of thermoplastic tanks, vessels, and apparatus). The platform features a comprehensive inventory of the regulatory documentation, an interactive order processing system, and all required legal agreements.
  
**RU:** Данный проект — это официальный сайт для заказа переведенных на русский язык печатных изданий немецких стандартов серии DVS 2205 (расчет конструкций, резервуаров и аппаратов из термопластов). На платформе представлены перечень нормативной документации, интерактивная форма оформления заказа и необходимые юридические соглашения.


## KEY FEATURES (Ключевые особенности)

**EN:**
- **Printed Edition Details**: Brief information about the printed volume of translated standards.
- **Order Form**: Simple interactive checkout for physical and legal entities with integrated **CDEK API** calculation for the printed book delivery.
- **Legal Hub**: Public offer contract, privacy policy, and data processing consent pages required for selling physical goods.

**RU:**
- **Описание продукта**: Информация о печатном сборнике переведенных стандартов.
- **Форма заказа**: Интерактивная форма для физ. и юр. лиц с автоматическим расчетом стоимости доставки печатного издания через **API СДЭК**.
- **Юридический хаб**: Обязательные страницы документов: договор публичной оферты, политика конфиденциальности и согласие на обработку данных для продажи физических товаров.


## TARGET AUDIENCE (Для кого этот сайт)

**EN:** The materials are designed for companies and engineering specialists involved in the design, calculation, and manufacturing of industrial plastic tanks and thermoplastic process equipment.

**RU:** Издание предназначено для компаний и инженерно-технических специалистов, занимающихся проектированием, расчетом и изготовлением промышленных пластиковых емкостей и технологического оборудования из термопластов.


## TECHNICAL PROJECT STRUCTURE (Техническая структура проекта)

```
standards.lynx-studio.ru/
│
├── .vscode/								# VS Code workspace options (Настройки рабочей области VS Code)
│   ├── extensions.json						# Recommended workspace plugins (Список рекомендуемых плагинов проекта)
│   ├── keybindings.json					# Custom hotkeys storage (Файл кастомных горячих клавиш проекта)
│   └── settings.json						# Workspace editor overrides (Индивидуальные настройки редактора)
│
├── dist/									# Production build (Готовый сайт для хостинга)
│   ├── css/								# Production CSS path (Папка готовых стилей)
│   │   └── style.min.css					# Production CSS bundle (Рабочий бандл стилей)
│   ├── docs/								# Downloadable PDFs (Папка готовых PDF для скачивания)
│   ├── errors/								# Production error pages (Рабочие страницы ошибок)
│   ├── img/								# Production images path (Рабочий путь графики)
│   │   ├── content/						# Site page illustrations and graphics (Иллюстрации и графика страниц сайта)
│   │   ├── favicon/						# Icon assets subfolder (Подпапка для мобильных фавиконов)
│   │   └── interface/						# UI elements and icons (Элементы интерфейса и декоративные иконки)
│   ├── js/									# Production JS path (Папка готовых JS скриптов)
│   │   └── main.min.js						# Production JS bundle (Рабочий бандл скриптов)
│   ├── pages/								# Production inner pages (Рабочие внутренние страницы)
│   ├── video/								# Streamable processed video files (Готовые к стримингу видеофайлы)
│   ├── .htaccess							# Apache server config (Конфигурация сервера Apache)
│   ├── favicon.svg							# Master vector icon (Главная векторная иконка)
│   ├── index.html							# Production main page (Рабочая главная страница)
│   ├── robots.txt							# Search indexing rules (Инструкции индексации роботов)
│   ├── site.webmanifest					# Mobile PWA manifest (Манифест PWA-приложения)
│   └── sitemap.xml							# Search sitemap URL (Поисковая карта сайта)
│
├── src/									# Workzone sources (Рабочая зона: Исходные файлы проекта)
│   ├── assets/								# Static media directory (Каталог статичных ресурсов)
│   │   ├── css/							# Custom CSS container (Папка кастомных стилей)
│   │   ├── img/							# Images and vectors (Изображения и векторная графика)
│   │   │   ├── content/					# Site page illustrations and graphics (Иллюстрации и графика страниц сайта)
│   │   │   ├── favicon/					# Icon assets subfolder (Подпапка для мобильных фавиконов)
│   │   │   └── interface/					# UI elements and icons (Элементы интерфейса и декоративные иконки)
│   │   ├── js/								# Client logic scripts (Папка скриптов логики)
│   │   │   ├──  main.js					# Custom logic source (Исходный файл кастомной логики)
│   │   │   └──  manifest.json				# JS bundle build manifest (Манифест сборки и порядка JS файлов)
│   │   ├── md/								# Raw markdown texts (Юридические документы в Markdown)
│   │   └── video/							# Video files: MP4, WEBM, MOV (Видеофайлы проекта)
│   ├── design/								# UI/UX design sources (Папка исходников и дизайн-макетов)
│   ├── docs/								# Downloadable raw PDFs (Оригиналы документов PDF для скачивания)
│   ├── emails/								# Automated email layouts (Шаблоны писем о заказах)
│   ├── meta/								# Root configuration files (Корневые файлы конфигурации и метаданных)
│   │   ├── .htaccess						# Apache server config (Конфигурация сервера Apache)
│   │   ├── robots.txt						# Search indexing rules (Инструкции индексации роботов)
│   │   ├── site.webmanifest				# Mobile PWA manifest (Манифест PWA-приложения)
│   │   └── sitemap.xml						# Search sitemap URL (Поисковая карта сайта)
│   └── njk/								# Nunjucks components (Компоненты шаблонизатора Nunjucks)
│       ├── errors/							# System error sources (Исходники страниц ошибок)
│       ├── md/								# Compiled MD HTML pieces (HTML-фрагменты из MD)
│       ├── modals/							# Pop-up overlay layouts (Шаблоны всплывающих окон)
│       ├── pages/							# Full web view sources (Исходники файлов целых страниц)
│       └── templates/						# Base environment wrappers (Базовые шаблоны каркаса)
│
├── sys/									# System automation files (Системные файлы автоматизации)
│   ├── setup_win.bat						# Windows automatic setup (Авто-настройка для Windows)
│   └── setup_mac.command					# macOS automatic setup (Авто-настройка для macOS)
│
├── .gitignore								# Git exclusion settings (Настройки исключений для Git)
├── gulpfile.js								# Gulp automation scenario (Сценарий автоматизации Gulp)
├── package.json							# Node.js dependencies list (Список зависимостей проекта)
├── package-lock.json					  	# Node.js lockfile configuration (Фиксация версий плагинов)
└── README.md								# Project documentation (Документация проекта)
```


## ENVIROMENT SETUP (Подготовка окружения)

**EN:**
1. **Install Node.js.** Download and install the LTS version [nodejs.org](https://nodejs.org)

2. **Automated Setup.** To fully initialize the environment, download all plugins, and clear the cache, run the script for your OS:
- macOS: Double-click the file `sys/setup_mac.command`
- Windows: Double-click the file `sys/setup_win.bat`

3. **Start Project.** To boot up the local live-reloading development server, open your terminal in the project root and run:
`npm run dev`

4. **Editor Configuration VS Code.** To install the exact extension stack required for the design system:
- Open the project folder in Visual Studio Code.
- Open the Extensions tab via `Cmd + Shift + X` on Mac or `Ctrl + Shift + X` on Windows.
- Type `@recommended:workspace` in the search bar.
- Install all listed tools to get proper Nunjucks template engine highlighting.
  
  
**RU:**
1. **Установка Node.js.** (Скачайте и установите версию LTS): [nodejs.org](https://nodejs.org)

2. **Автоматическая настройка.** Для полной инициализации среды, загрузки всех плагинов и очистки кэша запустите скрипт для вашей ОС:
- macOS: Кликните дважды по файлу `sys/setup_mac.command`
- Windows: Кликните дважды по файлу `sys/setup_win.bat`

3. **Запуск проекта.** Для запуска локального сервера разработки в режиме реального времени откройте терминал в корне проекта и выполните:
`npm run dev`

4. **Настройка редактора VS Code.** Чтобы установить точный набор расширений, необходимый для работы с дизайн-системой:
- Откройте папку проекта в Visual Studio Code.
- Перейдите во вкладку Расширения с помощью `Cmd + Shift + X` на Mac или `Ctrl + Shift + X` на Windows.
- В строке поиска введите `@recommended:workspace`.
- Установите все предложенные инструменты для получения корректной подсветки движка шаблонов Nunjucks.


## DEVELOPMENT CONTROL COMMANDS (Управляющие команды разработки проекта)

### NPM scripts management (Управление через системные скрипты NPM)

* `npm run dev`					# Local environment live startup (Запуск локального сервера и слежения)
* `npm run build`				# Production distribution build (Запуск финальной промышленной сборки сайта)

### Gulp CLI task runners (Низкоуровневый запуск изолированных задач Gulp)

* `gulp compileMarkdown`		# Standalone markdown conversion (Изолированная конвертация Markdown текстов)
* `gulp compileStyles`			# Stylesheets bundle optimization (Склейка, сжатие и минификация CSS стилей)
* `gulp compileScripts`			# JavaScript hybrid manifest assembly (Гибридная сборка и сжатие JS скриптов)
* `gulp compileNunjucks`		# Dynamic Nunjucks templates rendering (Сборка и рендер всех страниц сайта из Nunjucks)
* `gulp compileHTML`			# Advanced HTML asset compression sequence (Жесткое сжатие и оптимизация всех HTML файлов в dist)
* `gulp compileImages`			# Vector and raster graphics tuning (Оптимизация SVG и веб-сжатие картинок)
* `gulp compileVideo`			# Standalone video media deployment (Копирование тяжелых видеофайлов в dist/video/)
* `gulp default`				# Core pipeline execution with file watching (Основной запуск сборки с включением слежения)
* `gulp build`					# Complete project assets compilation sequence (Последовательный запуск полной сборки проекта)


---

*Contact: legal@lynx-studio.ru*

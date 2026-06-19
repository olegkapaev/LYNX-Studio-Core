// =========================================================================================
//                                     MODULES (Модули)                                     
// =========================================================================================

const gulp = require('gulp');								// Gulp core toolkit (Ядро автоматизации Gulp)
const prettyHtml = require('gulp-pretty-html');				// HTML code formatter plugin (Форматер и выравниватель HTML кода)
const markdown = require('gulp-markdown').default;			// Markdown to HTML converter (Конвертер Markdown в HTML текст)
const replace = require('gulp-replace');					// Text string replacer (Инструмент замены текста и строк)
const browserSync = require('browser-sync').create();		// Local server plugin (Плагин локального сервера для автообновления страниц)
const nunjucksRender = require('gulp-nunjucks-render');		// Nunjucks template engine (Шаблонизатор Nunjucks для генерации HTML-страниц)
const concat = require('gulp-concat');						// File concatenator plugin (Инструмент объединения файлов в один архив)
const cleanCSS = require('gulp-clean-css');					// CSS minifier tool (Инструмент сжатия и оптимизации CSS кода)
const rename = require('gulp-rename');						// File renaming tool (Инструмент для переименования файлов)
const terser = require('gulp-terser');						// JavaScript minifier tool (Инструмент сжатия и оптимизации JS кода)
const fs = require('fs');									// File system module (Модуль Node.js для работы с файловой системой)
const path = require('path');								// Path utility module (Встроенный модуль Node.js для работы с путями)
const svgmin = require('gulp-svgmin');						// SVG optimizer plugin (Плагин оптимизации векторной графики SVG)
const htmlmin = require('gulp-htmlmin');					// HTML minifier plugin (Плагин для минификации и оптимизации HTML)



// =========================================================================================
//                              BUILD COMMANDS (Команды сборки)
// =========================================================================================


// MARKDOWN CONVERSION AND PROCESSING (Конвертация и обработка Markdown)

function compileMarkdown() {
	return gulp.src('./src/assets/md/**/*.{md,MD}')
		.pipe(markdown())
		.pipe(replace(/^<hr>[\s\S]*?status:[\s\S]*?<\/h2>/i, ''))
		.pipe(replace(/\[!subtitle\]/g, ''))
		.pipe(prettyHtml({
			indent_size: 4,
			indent_char: ' ',
			preserve_newlines: false,
			max_preserve_newlines: 0,
			wrap_line_length: 0,
			unformatted: ['code', 'pre', 'span', 'strong']
		}))
		.pipe(replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/i, function (match, content) {
			let cleanContent = content.replace(/<\/p>\s*<p>/gi, '<br>').replace(/<\/?p[^>]*>/gi, '').trim();
			return `<p class="blockquote">${cleanContent}</p>`;
		}))
		.pipe(gulp.dest('./src/njk/md'));
}


// COPY FILES (Копирование файлов)

function moveMetaFiles(done) {
	gulp.src('src/meta/**/*', { allowEmpty: true })
		.pipe(gulp.dest('dist/'))
		.on('end', done);
}

function moveDocumentFiles(done) {
	gulp.src('src/docs/**/*', { allowEmpty: true })
		.pipe(gulp.dest('dist/docs/'))
		.on('end', done);
}

function moveRootFavicons(done) {
	gulp.src('src/assets/img/favicon/favicon.{ico,svg}', { allowEmpty: true })
		.pipe(gulp.dest('dist/'))
		.on('end', done);
}

function moveSubFavicons(done) {
	gulp.src([
		'src/assets/img/favicon/**/*',
		'!src/assets/img/favicon/favicon.{ico,svg}'
	], { allowEmpty: true })
		.pipe(gulp.dest('dist/img/favicon/'))
		.on('end', done);
}

function moveFontFiles() {
	// Возвращаем поток напрямую, Gulp сам поймет, когда файлы докопируются
	return gulp.src('src/assets/fonts/**/*', { allowEmpty: true })
		.pipe(gulp.dest('dist/fonts/'));
}


// COMPILE STYLES (Сборка стилей)

function compileStyles() {
	return gulp.src([
		'src/assets/css/style.css',
		'src/assets/css/**/*.css'
	], { allowEmpty: true })
		.pipe(concat('style.css'))
		.pipe(cleanCSS({ level: 2 }))
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('dist/css/'));
}


// COMPILE SCRIPTS (Сборка скриптов)

function compileScripts(done) {
	const jsDir = 'src/assets/js';
	const manifestPath = path.join(jsDir, 'manifest.json');
	let orderedFiles = [];
	if (fs.existsSync(manifestPath)) {
		try {
			const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
			if (Array.isArray(manifest)) {
				orderedFiles = manifest.map(file => path.join(jsDir, file));
			}
		} catch (e) {
			console.error('Ошибка чтения manifest.json:', e.message);
		}
	}
	if (fs.existsSync(jsDir)) {
		const allFiles = fs.readdirSync(jsDir)
			.filter(file => file.endsWith('.js'))
			.map(file => path.join(jsDir, file));

		const remainingFiles = allFiles.filter(file => !orderedFiles.includes(file));

		orderedFiles = [...orderedFiles, ...remainingFiles];
	}
	if (orderedFiles.length === 0) {
		return done();
	}
	return gulp.src(orderedFiles, { allowEmpty: true })
		.pipe(concat('main.js'))
		.pipe(terser())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('dist/js/'));
}


// NUNJUCKS COMPILATION (Компиляция шаблонов Nunjucks)

function compileNunjucks(done) {
	const indexPage = gulp.src('src/njk/pages/index.njk', { allowEmpty: true })
		.pipe(nunjucksRender({ path: ['src/njk/templates'] }))
		.pipe(gulp.dest('dist/'));

	const errorPages = gulp.src('src/njk/errors/**/*.njk', { allowEmpty: true })
		.pipe(nunjucksRender({ path: ['src/njk/templates'] }))
		.pipe(gulp.dest('dist/errors/'));

	const normalPages = gulp.src([
		'src/njk/pages/**/*.njk',
		'!src/njk/pages/index.njk'], { allowEmpty: true })
		.pipe(nunjucksRender({ path: ['src/njk/templates'] }))
		.pipe(gulp.dest('dist/pages/'));

	Promise.all([
		new Promise(resolve => indexPage.on('end', resolve)),
		new Promise(resolve => errorPages.on('end', resolve)),
		new Promise(resolve => normalPages.on('end', resolve))
	]).then(() => done());
}


// HTML OPTIMIZATION (Оптимизация HTML)

function compileHTML(done) {
	return gulp.src('dist/**/*.html', { base: 'dist' })
		.pipe(htmlmin({
			collapseWhitespace: true,
			removeComments: true,
			collapseBooleanAttributes: true,
			minifyJS: true,
			minifyCSS: true
		}))
		.pipe(gulp.dest('dist'))
		.on('end', done);
}


// IMAGE OPTIMIZATION (ОПТИМИЗАЦИЯ ИЗОБРАЖЕНИЙ)

const sharp = require('sharp');
const through2 = require('through2');

const imgPaths = {
	src: 'src/assets/img/**/*',
	dest: 'dist/img/'
};

// Optimize raster files JPG, JPEG, PNG (Оптимизация растровых файлов JPG, JPEG, PNG)
const optimizeRasterFiles = () => {
	return gulp.src([`${imgPaths.src}.jpg`, `${imgPaths.src}.jpeg`, `${imgPaths.src}.png`], { encoding: false })
		.pipe(through2.obj(async function (file, enc, cb) {
			if (file.isBuffer()) {
				try {
					const ext = path.extname(file.path).toLowerCase();
					let pipeline = sharp(file.contents);

					if (ext === '.png') {
						pipeline = pipeline.png({ compressionLevel: 6, adaptiveFiltering: true });
					} else if (ext === '.jpg' || ext === '.jpeg') {
						pipeline = pipeline.jpeg({ quality: 80, progressive: true });
					}

					file.contents = await pipeline.toBuffer();
				} catch (err) {
					this.emit('error', new Error(`Sharp failed on ${file.path}: ${err.message}`));
				}
			}
			cb(null, file);
		}))
		.pipe(gulp.dest(imgPaths.dest));
};

// Optimize vector files SVG (Оптимизация векторных файлов SVG)
const optimizeVectorFiles = () => {
	return gulp.src(`${imgPaths.src}.svg`)
		.pipe(svgmin({
			plugins: [
				{
					name: 'preset-default',
					params: {
						overrides: {
							removeViewBox: false,
							cleanupIDs: true,
							removeComments: true
						}
					}
				}
			]
		}))
		.pipe(gulp.dest(imgPaths.dest));
};

function compileImages(done) {
	return gulp.parallel(optimizeRasterFiles, optimizeVectorFiles)(done);
}


//  VIDEO COMPILATION AND TRANSFER (Компиляция и перенос видеофайлов)

const videoPaths = {
	src: 'src/assets/video/**/*',
	dest: 'dist/video/'
};

function compileVideo() {
	return gulp.src([`${videoPaths.src}.mp4`, `${videoPaths.src}.webm`, `${videoPaths.src}.mov`], { encoding: false })
		.pipe(gulp.dest(videoPaths.dest));
}



// =========================================================================================
// REALTIME WATCH AUTOMATION (Настройка локального сервера и слежение за изменениями файлов)
// =========================================================================================

function watchFiles() {
	browserSync.init({
		server: { baseDir: './dist' },
		port: 3000,
		open: false,
		notify: false
	});

	gulp.watch('src/assets/css/**/*.css', gulp.series(compileStyles)).on('change', browserSync.stream);
	gulp.watch('src/assets/js/**/*', gulp.series(compileScripts)).on('change', browserSync.reload);
	gulp.watch('./src/assets/md/**/*.{md,MD}', gulp.series(compileMarkdown)).on('change', browserSync.reload);
	gulp.watch('src/njk/**/*.njk', gulp.series(compileNunjucks)).on('change', browserSync.reload);
	gulp.watch('src/meta/**/*', gulp.series(moveMetaFiles)).on('change', browserSync.reload);
	gulp.watch('src/docs/**/*', gulp.series(moveDocumentFiles)).on('change', browserSync.reload);
	gulp.watch('src/assets/img/**/*', gulp.series(compileImages)).on('change', browserSync.reload);
	gulp.watch('src/assets/video/**/*', gulp.series(compileVideo)).on('change', browserSync.reload);
	gulp.watch('src/assets/img/favicon/**/*', gulp.series(moveRootFavicons, moveSubFavicons)).on('change', browserSync.stream);
}




// =========================================================================================
//                         COMMAND REGISTRATION (Регистрация команд)                        
// =========================================================================================

// MD TO HTML COMPILATION REGISTRATION (Регистрация компиляции документов MD в HTML)
exports.compileMarkdown = compileMarkdown;

// STYLES COMPILATION REGISTRATION (Регистрация компиляции стилей)
exports.compileStyles = compileStyles;

// SCRIPTS COMPILATION REGISTRATION (Регистрация компиляции скриптов)
exports.compileScripts = compileScripts;

// NUNJUCKS TO HTML REGISTRATION (Регистрация сборки HTML страниц из Nunjucks)
exports.compileNunjucks = compileNunjucks;

// HTML OPTIMIZATION REGISTRATION (Регистрация оптимизации HTML)
exports.compileHTML = compileHTML;

// VIDEO COMPILATION REGISTRATION (Регистрация задачи компиляции видео)
exports.compileVideo = compileVideo;

// IMAGE COMPILATION REGISTRATION (Регистрация задачи компиляции изображений)
exports.compileImages = compileImages;

// DEFAULT COMMAND REGISTRATION (Регистрация дефолтной команды)
exports.default = gulp.series(
	compileMarkdown,
	gulp.parallel(
		compileStyles,
		compileScripts,
		compileImages,
		compileVideo,
		compileNunjucks,
		moveMetaFiles,
		moveDocumentFiles,
		moveRootFavicons,
		moveSubFavicons
	),
	watchFiles
);

// PRODUCTION BUILD REGISTRATION (Регистрация команды сборки)
exports.build = gulp.series(
	compileMarkdown,
	gulp.parallel(
		compileStyles,
		compileScripts,
		compileImages,
		compileVideo,
		moveMetaFiles,
		moveDocumentFiles,
		moveRootFavicons,
		moveSubFavicons,
		moveFontFiles,
		compileNunjucks,
	),
	compileHTML
);



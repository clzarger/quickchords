const gulp = require('gulp');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const babel = require('babelify');
const clean = require('gulp-clean');
const sequence = require('gulp-sequence');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('clean', () =>
	gulp.src('./dist/*', { read: false }).pipe(clean())
);

gulp.task('bundle', () =>
	browserify('./src/js/root.js')
		.transform(babel, { presets: ['es2015'] })
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./dist'))
);

gulp.task('copyStatic', () => {
	gulp.src([
		'./src/index.html',
    './src/about.html',
		'./src/works.html',
		'./src/donate.html',
    './src/css/styles.css',
		'./src/favicon.png',
		'./src/logo.png',
	]).pipe(gulp.dest('./dist'));
});

gulp.task('build', sequence('clean', 'bundle', 'copyStatic'));

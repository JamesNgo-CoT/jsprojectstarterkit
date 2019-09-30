const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const eslint = require('gulp-eslint');
const gulp = require('gulp');
const less = require('gulp-less');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');

sass.compiler = require('node-sass');

function clean() {
	return del(['dist/**']);
}

function buildJs() {
	return gulp.src('src/**/*.js')
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(babel())
		.pipe(gulp.dest('dist/'))
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('dist/'));
}

function buildCss() {
	return gulp.src('src/**/*.css')
		.pipe(autoprefixer({ cascade: false }))
		.pipe(gulp.dest('dist/'))
		.pipe(cleanCSS())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('dist/'));
}

function buildLess() {
	return gulp.src('src/**/*.scss')
		.pipe(autoprefixer({ cascade: false }))
		.pipe(less())
		.pipe(gulp.dest('dist/'))
		.pipe(cleanCSS())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('dist/'));
}

function buildSass() {
	return gulp.src('src/**/*.less')
		.pipe(autoprefixer({ cascade: false }))
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('dist/'))
		.pipe(cleanCSS())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('dist/'));
}

const buildStyle = gulp.parallel(buildCss, buildLess, buildSass);

function buildHtml() {
	return gulp.src(['src/**/*.html', 'src/**/*.htm'])
		.pipe(gulp.dest('dist/'));
}

const build = gulp.parallel(buildJs, buildStyle, buildHtml);

exports.default = gulp.series(clean, build);
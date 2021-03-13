const gulp = require('gulp');
const {series, parallel} = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const prefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const image = require('gulp-image');
const del = require('del');
const fonter = require('gulp-fonter');

const html = () => {
    return gulp.src('src/pug/*.pug')
        .pipe(pug({pretty:true}))
        .pipe(gulp.dest('build'))
}

const styles = () => {
    return gulp.src('src/styles/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(prefixer())
        .pipe(cssnano())
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest('build/css'))
}

const images = () => {
    return gulp.src('src/styles/basic/images/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/css/basic/images'))
}

const extensions = () => {
    return gulp.src('src/styles/basic/extensions/*.*')
        .pipe(image())
        .pipe(gulp.dest('build/css/basic/extensions'))
}

const fonts = () => {
    return gulp.src('src/styles/basic/fonts/*.ttf')
        .pipe(fonter())
        .pipe(gulp.dest('build/css/basic/fonts'))
}


const deleteBuild = (cb) => {
    return del('build/**/*.*').then(()=> {
        cb();
    })
}

exports.default = series(
    deleteBuild,
    parallel(html, styles, images, extensions, fonts)
)
var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    sass        = require('gulp-sass'),
    prefix      = require('gulp-autoprefixer'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify');

gulp.task('browser-sync', ['sass', 'build'], function() {
    browserSync({
        server: { baseDir: 'build' }
    });
});

gulp.task('rebuild', ['build'], function() {
    browserSync.reload();
});

gulp.task('build', function() {
    return gulp.src('site/*.html')
        .pipe(gulp.dest('build'));
});

gulp.task('scripts', function() {
    return gulp.src(['site/assets/js/*.js'])
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/assets/js'))
});

gulp.task('sass', function () {
    return gulp.src('site/assets/css/main.scss')
        .pipe(sass({
            includePaths: ['css'],
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('build/assets/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('site/assets/css'));
});

gulp.task('watch', function () {
    gulp.watch('site/assets/**', ['sass', 'scripts']);
    gulp.watch(['site/*.html'], ['rebuild']);
});

gulp.task('default', ['browser-sync', 'watch']);

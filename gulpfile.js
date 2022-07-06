var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    jade = require('gulp-jade')
    ;

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('reload', function () {
    browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass'], function () {
    browserSync({
        proxy: 'http://localhost:5000/'
    });
});

/**
 * Compile files from _scss into both public/css (for live injecting) and site (for future deployment)
 */
gulp.task('sass', function () {
    return gulp.src('_webdev/sass/main.scss')
        .pipe(sass({
            includePaths: ['scss'],
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('public/styles'))
        .pipe(browserSync.reload({ stream: true }))
        .pipe(gulp.dest('_webdev/sass'));
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch('_webdev/jade/**/*.jade', ['jade']);
    gulp.watch('_webdev/sass/**/*.scss', ['sass']);
    gulp.watch('public/**/*.js', ['reload']);
    gulp.watch('public/**/*.html', ['reload']);
});

/**
 * Compile Jade
 */
gulp.task('jade', function() {
    return gulp.src('_webdev/jade/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('public/views'));
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch', 'build']);
gulp.task('build', ['jade', 'sass']);

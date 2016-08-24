var gulp = require('gulp'),
    zip = require('gulp-zip'),
    sass = require('gulp-sass'),
    ts = require('gulp-typescript'),
    tsProject = ts.createProject('tsconfig.json'),
    browserSync = require('browser-sync').create(),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    gulpIf = require('gulp-if'),
    cssnano = require('gulp-cssnano'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    del = require('del'),
    runSequence = require('run-sequence'),
    mainBowerFiles = require('main-bower-files'),
    sourcemaps = require('gulp-sourcemaps'),
    fileSize = require('gulp-size'),
    cleanCSS = require('gulp-clean-css'),
    htmlmin = require('gulp-htmlmin');

// Files to be added to the zip folder use "<directory goes here>/*" for all files inside the directory
var zip_files = ['dist/*/*', 'dist/*']; 

// Zip up the JS/HTML required for the game
gulp.task('zip', ['build'], function() {
    return gulp.src(zip_files, {
        base: "."
    }).pipe(fileSize({showFiles: true}))
        .pipe(zip('release.zip'))        
        .pipe(fileSize({showFiles: true}))
        .pipe(gulp.dest('.'));
});

gulp.task('sass', function() {
    return gulp.src("app/scss/**/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.reload({ stream: true }))
})

gulp.task('minify-css', function() {
  return gulp.src('app/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('minify-html', function() {
  return gulp.src('index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: "app"
        },
        open: false
    })  
})

gulp.task('useref', function() {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist'))
})

gulp.task('images', function() {
    return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
        .pipe(cache(imagemin()))
        .pipe(gulp.dest('dist/images'))
})

gulp.task('fonts', function() {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
})

gulp.task('clean:dist', function() {
    return del.sync('dist');
})

gulp.task('cache:clear', function(callback) {
    return cache.clearAll(callback)
})

gulp.task('typescript', function() {
    var tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject));
    return tsResult.js
        .pipe(sourcemaps.write({
            sourceRoot: '/ts',
            includeContent: false
        }))
        .pipe(gulp.dest('app/js'));
})

gulp.task('bower', function() {
    // add bower dependencies with
    // bower install <endpoint> --save
    gulp.src(mainBowerFiles())
        .pipe(gulp.dest('app/js/vendor'));
})

gulp.task('watch', ['browserSync', 'sass', 'typescript'], function() {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/ts/**/*.ts', ['typescript']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
})

gulp.task('build', function(callback) {
    runSequence(
        'clean:dist', 
        'typescript',
        'sass',
        ['useref', 'images', 'fonts', 'minify-css', 'minify-html'],
        callback)
})

gulp.task('default', ['build', 'watch']);
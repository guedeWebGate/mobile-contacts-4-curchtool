var gulp = require('gulp');
var install = require('gulp-install');
var zip = require('gulp-zip');
var del = require('del');


gulp.task('clean', function() {
    return del(['dist', 'build']);
});

gulp.task('install_dependencies', function() {
    gulp.src('index.js').pipe(gulp.dest('./build'));
    gulp.src('./functions/*').pipe(gulp.dest('./build/functions/'));
    return gulp.src('./package.json')
        .pipe(gulp.dest('./build'))
        .pipe(install({
            production: true
        }));
});

gulp.task('prepare_zip', function() {
    del.sync('build/package.json');
    return gulp.src(['build/**/*'])
        .pipe(zip('archive.zip')).pipe(gulp.dest('./dist'));
});

gulp.task('default', gulp.series('clean', 'install_dependencies', 'prepare_zip'));
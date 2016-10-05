(function() {

    'use strict';

    function RegisterTasks(gulp, config) {

        var ts = require('gulp-typescript'),
            tsConfig = ts.createProject('tsconfig.json'),
            path = require('path'),
            watch = require('gulp-watch'),
            batch = require('gulp-batch'),
            uglify = require('gulp-uglify'),
            rename = require('gulp-rename'),
            //tslint = require('gulp-tslint'),
            inject = require('gulp-inject'),
            runSequence = require('run-sequence'),
            concat = require('gulp-concat'),
            cleanCss = require('gulp-clean-css'),
            sass = require('gulp-sass'),
            sourcemaps = require('gulp-sourcemaps'),
            Builder = require('systemjs-builder'),
            server = require('gulp-server-livereload'),
            minimist = require('minimist');

            var knownOptions = {
                string: 'port',
                default: { port: 8000 }
            };

            var options = minimist(process.argv.slice(2), knownOptions)


        gulp.task('prepare-and-copy-main', function() {
            var injectableSources = gulp.src(config.source.files.injectables);
            return gulp.src(config.source.files.main)
                .pipe(inject(injectableSources, { addRootSlash: false, ignorePath: 'dist' }))
                .pipe(gulp.dest(path.join(config.targets.buildFolder)));
        });

        /*gulp.task('lint-app-code', () =>
            gulp.src(config.source.files.app.ts)
            .pipe(tslint({
                formatter: 'verbose'
            }))
            .pipe(tslint.report())
        );*/

        gulp.task('bundle-vendor-scripts', function() {
            var builder = new Builder();
            gulp.src(config.source.files.angular2rc1deps)
                .pipe(gulp.dest(path.join(config.targets.buildFolder, 'scripts')));

            return builder.loadConfig(config.systemJsConfig)
                .then(function() {
                    var promises = [];

                    config.source.files.vendorJs.forEach(function(jsFile) {
                        promises.push(builder.bundle(jsFile, path.join(config.targets.buildFolder, 'scripts/bundles/', path.basename(jsFile))));
                    });

                    return Promise.all(promises);
                })
        });


        gulp.task('copy-ng2-node-modules', function() {
            return gulp.src(config.source.files.angular2)
                .pipe(gulp.dest(path.join(config.targets.buildFolder, '@angular')));
        });

        gulp.task('copy-rxjs-node-modules', function() {
            return gulp.src(config.source.files.rxjs)
                .pipe(gulp.dest(path.join(config.targets.buildFolder, 'rxjs')));
        });

        gulp.task('copy-systemjs-node-modules', function() {
            return gulp.src(config.source.files.systemJs)
                .pipe(uglify())
                .pipe(rename(config.targets.systemMinJs))
                .pipe(gulp.dest(path.join(config.targets.buildFolder, 'scripts/')))
        });

        gulp.task('copy-systemjs-script', function() {
            return gulp.src(config.source.files.systemScript)
                .pipe(uglify())
                .pipe(gulp.dest(path.join(config.targets.buildFolder, 'scripts/')))
        });

        gulp.task('copy-app-html', function() {
            return gulp.src(config.source.files.app.html)
                .pipe(gulp.dest(path.join(config.targets.buildFolder, config.targets.appFolder)));
        });

        gulp.task('copy-app-assets', function() {
            return gulp.src(config.source.files.app.assets)
                .pipe(gulp.dest(path.join(config.targets.buildFolder, config.targets.appFolder)));
        });

        gulp.task('copy-app-styles', function() {
            return gulp.src(config.source.files.app.css)
                .pipe(sass().on('error', sass.logError))
                .pipe(cleanCss())
                .pipe(gulp.dest(path.join(config.targets.buildFolder, config.targets.stylesFolder)));
        });

       gulp.task('vendor-css', function() {
            return gulp.src(config.source.files.vendorStylesheets)
                .pipe(concat(config.targets.vendorMinCss))
                .pipe(cleanCss())
                .pipe(gulp.dest(path.join(config.targets.buildFolder, config.targets.stylesFolder)));
        });


        gulp.task('build-app-scripts', function() {
            return gulp.src(config.source.files.app.ts)
                .pipe(sourcemaps.init())
                .pipe(tsConfig())
                .pipe(sourcemaps.write('.', {
                    sourceRoot: '.'
                }))
                .pipe(gulp.dest(path.join(config.targets.buildFolder, config.targets.appFolder)));
        });

        gulp.task('build', function(callback) {
            return runSequence(
                'clean', [
                    'bundle-vendor-scripts',
                    'copy-ng2-node-modules',
                    'copy-rxjs-node-modules',
                    'copy-systemjs-node-modules',
                    'copy-systemjs-script',
                    'build-app-scripts',
                    'vendor-css',
                    'copy-app-html',
                    'copy-app-styles',
                    'copy-app-assets'
                ],
                'prepare-and-copy-main',
                callback
            );
        });

        gulp.task('start-live-server', ['build'], function() {
            return gulp.src(config.targets.buildFolder)
                .pipe(server({
                    livereload: true,
                    open: true,
                    port: options.port
                }));
        });

        gulp.task('watch-web', ['start-live-server'], function() {
            return watch(config.source.files.app.everything, batch(function(events, callback) {
                console.log(arguments);
                runSequence('copy-systemjs-script', 'copy-app-html', 'copy-app-styles', 'build-app-scripts', callback);
            }));
        });

        gulp.task('run', ['watch-web']);
    }

    module.exports = {
        init: RegisterTasks
    }
})();
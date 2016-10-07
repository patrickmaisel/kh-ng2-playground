(function() {
    'use strict';

    var config = require('./gulp.config'),
        gulp = require('gulp'),
        del = require('del'),
        runSequence = require('run-sequence'),
        gulpTasks = require('require-dir')('./gulpTasks');

    for (var gulpTask in gulpTasks) {
        gulpTasks[gulpTask].init(gulp, config);
    }

    gulp.task('clean', function() {
        return del(config.targets.buildFolder + '/**/*', { force: true });
    });
})();
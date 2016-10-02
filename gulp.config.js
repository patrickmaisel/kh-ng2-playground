'use strict';

module.exports = {
    systemJsConfig: './system.config.js',
    source: {
        folder: './app/',
        files: {
            injectables: [
                './dist/scripts/vendor.min.js',
                './dist/scripts/system.min.js',
                './dist/scripts/system.js',
                './dist/css/vendor.min.css',
                './dist/css/app.css',
                './dist/scripts/shim.min.js',
                './dist/scripts/zone.js',
                './dist/scripts/reflect.js'

                // script imports replacing comment-placeholders in index.html
            ],
            main: [
                './app/index.html'
            ],
            systemScript: './system.js',
            app: {
                everything: ['./app/**/*', './styles/**/*', './app/system.js'],
                ts: [
                    './app/**/*.ts'
                ],
                html: [
                    './app/**/*.html'
                ],
                css: [
                    './styles/**/*.scss'
                ],
                assets: [
                    './assets/**/*.*'
                ]
            },
            vendorStylesheets: [

            ],
            shim: [

            ],
            vendorJs: [

            ],
            angular2rc1deps: [
                './node_modules/core-js/client/shim.min.js',
                './node_modules/zone.js/dist/zone.js',
                './node_modules/reflect-metadata/reflect.js'
            ],
            angular2: './node_modules/@angular/**/*',
            rxjs: './node_modules/rxjs/**/*',
            systemJs: './node_modules/systemjs/dist/system.src.js'
        }
    },
    ts: {
        config: './tsconfig.json'
    },
    targets: {
        systemMinJs: 'system.min.js',
        vendorMinJs: 'vendor.min.js',
        vendorMinCss: 'vendor.min.css',
        buildFolder: './dist',
        resourcesFolder: './resources/',
        appFolder: 'app',
        stylesFolder: 'css',
        minified: {
            js: 'app.js',
            css: 'app.css',
            templateCache: 'ng-templates.js'
        }
    }
};
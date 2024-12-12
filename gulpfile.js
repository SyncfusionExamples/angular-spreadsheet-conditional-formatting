'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync').create('Essential JS 2');
const ts = require('gulp-typescript');
const protractor = require('gulp-protractor').protractor;
const webdriver_standalone = require('gulp-protractor').webdriver_standalone;
const webdriver_update = require('gulp-protractor').webdriver_update_specific;

// Function to report changes
function reportChanges(path) {
    console.log(`File changed: ${path}`);
    browserSync.reload();
}

// Compile TypeScript files
function compileTask() {
    const tsProject = ts.createProject('tsconfig.json', { typescript: require('typescript') });
    return gulp.src(['./src/**/*.ts'], { base: '.' })
        .pipe(tsProject())
        .pipe(gulp.dest('./'))
        .on('error', (e) => {
            console.error('Compilation error:', e.message);
            process.exit(1);
        });
}

// Start task with BrowserSync
function startTask(done) {
    const options = {
        server: {
            baseDir: ['./src', './']
        },
        ui: false
    };
    browserSync.init(options, done);
    gulp.watch('src/**/*.ts', gulp.series(compileTask)).on('change', reportChanges);
}

// E2E testing tasks
function e2eServeTask() {
    return webdriver_standalone();
}

function e2eWebdriverUpdateTask(done) {
    return webdriver_update({
        webdriverManagerArgs: ['--ie', '--edge']
    })(done);
}

function e2eTestTask(done) {
    const options = {
        server: {
            baseDir: [
                './src/app/',
                './src/resource/',
                './node_modules/@syncfusion/ej2/'
            ],
            directory: true
        },
        ui: false,
        open: false,
        notify: false
    };
    browserSync.init(options, () => {
        gulp.src(['./spec/**/*.spec.js'])
            .pipe(protractor({ configFile: 'e2e/protractor.conf.js' }))
            .on('error', (e) => {
                console.error('Error:', e.message);
                process.exit(1);
            })
            .on('end', () => {
                done();
                process.exit(0);
            });
    });
}

// Gulp task definitions
gulp.task('compile', compileTask);
gulp.task('start', gulp.series('compile', startTask));
gulp.task('e2e-serve', e2eServeTask);
gulp.task('e2e-webdriver-update', e2eWebdriverUpdateTask);
gulp.task('e2e-test', gulp.series('compile', e2eTestTask));

// Default task
exports.default = gulp.series('start');

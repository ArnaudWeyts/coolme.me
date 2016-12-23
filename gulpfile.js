"use strict";

var gulp = require("gulp"),
rename = require("gulp-rename"),
browserify = require("browserify"),
source = require("vinyl-source-stream"),
buffer = require("vinyl-buffer"),
sourcemaps = require("gulp-sourcemaps"),
gutil = require("gulp-util"),
htmlmin = require("gulp-htmlmin"),
sass = require("gulp-sass"),
autoprefixer = require("gulp-autoprefixer"),
cssnano = require("gulp-cssnano"),
uglify = require("gulp-uglify"),
browserSync = require("browser-sync").create();

var SRC = "./src";
var DEST = "./_site";

gulp.task("html", function() {
    return gulp.src(SRC + "/html/*.html")
    //.pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(DEST));
});

gulp.task("sass", function () {
    return gulp.src(SRC + "/sass/styles.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer({
        browsers: [">1%"],
        cascade: false
    }))
    .pipe(cssnano())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(DEST + "/assets/css/"))
    .pipe(browserSync.stream());
});

gulp.task("scripts", function() {
    // set up the browserify instance on a task basis
    var b = browserify({
        entries: SRC + "/js/scripts.js",
        debug: true
    });

    return b.bundle()
    .pipe(source("main.js"))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on("error", gutil.log)
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(DEST + "/assets/js/"));
});

gulp.task("browser-sync", () => {
    browserSync.init({
        server: {
            baseDir: DEST,
            index: "index.html"
        },
        notify: false
    });
});

gulp.task("copy", function () {
    gulp.src(SRC + "/fonts/*")
    .pipe(gulp.dest(DEST + "/assets/fonts"))
    gulp.src(SRC + "/html/google*.html")
    .pipe(gulp.dest(DEST))
    gulp.src(SRC + "/favicons/*")
    .pipe(gulp.dest(DEST + "/assets/favicons"))
});

gulp.task("watch", function () {
    gulp.watch(SRC + "/html/**/*.html", ["html"]).on("change", browserSync.reload);
    gulp.watch(SRC + "/sass/**/*.scss", ["sass"]);
    gulp.watch(SRC + "/js/**/*.js", ["scripts"]).on("change", browserSync.reload);
});

gulp.task("default", ["watch", "html", "copy", "scripts", "sass", "browser-sync"]);
gulp.task("compile", ["html", "copy", "scripts", "sass"]);


var gulp        = require("gulp"),
    gulpif      = require("gulp-if"),
    webpack     = require("gulp-webpack"),
    preprocess  = require("gulp-preprocess"),
    runSequence = require("run-sequence"),
    browserSync = require("browser-sync");

var packageInfo = require("./package.json");
var banner      = "Riceball " + packageInfo.version + "\n\
copyright (c) 2015 Susisu | MIT License\n\
https://github.com/susisu/Riceball";

gulp.task("debug-build-js", function () {
    return gulp.src("./src/js/riceball.js")
        .pipe(webpack({
            "output": {
                "libraryTarget": "var",
                "library"      : "riceball",
                "sourcePrefix" : "    ",
                "filename"     : "riceball.js"
            },
            "externals": {
                "window"      : true,
                "electronvolt": true,
                "iceball"     : true,
                "pixi"        : "PIXI"
            },
            "plugins": [
                new webpack.webpack.BannerPlugin(
                    banner,
                    { "entryOnly": true }
                ),
                new webpack.webpack.DefinePlugin({
                    "DEBUG": true
                })
            ]
        }))
        .pipe(gulp.dest("./debug/js"));
});

gulp.task("debug-build-css", function () {
    return gulp.src("./src/css/*.css")
        .pipe(gulp.dest("./debug/css"));
});

gulp.task("debug-build-pages", function () {
    return gulp.src("./src/pages/**/*")
        .pipe(gulpif("*.html", preprocess({ "context": { "DEBUG": true } })))
        .pipe(gulp.dest("./debug"));
});

gulp.task("browser-sync-up", function () {
    browserSync.init({
        "server": {
            "baseDir": "debug",
            "routes": {
                "/bower_components": "bower_components",
                "/assets"          : "assets"
            }
        }
    });
});

gulp.task("browser-sync-reload", function () {
    browserSync.reload();
});

gulp.task("debug-build", ["debug-build-js", "debug-build-css", "debug-build-pages"]);

gulp.task("watch", function () {
    gulp.watch("./src/js/**/*", function () { runSequence("debug-build-js", "browser-sync-reload"); });
    gulp.watch("./src/css/**/*", function () { runSequence("debug-build-css", "browser-sync-reload"); });
    gulp.watch("./src/pages/**/*", function () { runSequence("debug-build-pages", "browser-sync-reload"); });
});

gulp.task("debug", function () { runSequence("debug-build", "browser-sync-up", "watch"); });

gulp.task("default", ["debug-build"]);

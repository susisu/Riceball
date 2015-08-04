var gulp       = require("gulp"),
    gulpif     = require("gulp-if"),
    webpack    = require("gulp-webpack"),
    preprocess = require("gulp-preprocess");

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
                "window" : true,
                "iceball": true,
                "pixi"   : "PIXI"
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

gulp.task("debug-build", ["debug-build-js", "debug-build-css", "debug-build-pages"]);

gulp.task("watch", function () {
    gulp.watch("./src/js/**/*", ["debug-build-js"]);
    gulp.watch("./src/css/**/*", ["debug-build-css"]);
    gulp.watch("./src/pages/**/*", ["debug-build-pages"]);
});

gulp.task("debug", ["debug-build", "watch"]);

gulp.task("default", ["debug-build"]);

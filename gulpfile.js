var gulp    = require("gulp"),
    webpack = require("gulp-webpack");

var packageInfo = require("./package.json");
var banner      = "Riceball " + packageInfo.version + "\n\
copyright (c) 2015 Susisu | MIT License\n\
https://github.com/susisu/Riceball";

gulp.task("webpack", function () {
    return gulp.src("./src/riceball.js")
        .pipe(webpack({
            "output": {
                "libraryTarget": "var",
                "library"      : "riceball",
                "sourcePrefix" : "    ",
                "filename"     : "riceball.js"
            },
            "externals": {
                "loquat": true
            },
            "plugins": [
                new webpack.webpack.BannerPlugin(
                    banner,
                    { "entryOnly": true }
                )
            ]
        }))
        .pipe(gulp.dest("./dist/js"));
});

gulp.task("webpack-min", function () {
    return gulp.src("./src/riceball.js")
        .pipe(webpack({
            "output": {
                "libraryTarget": "var",
                "library"      : "riceball",
                "sourcePrefix" : "    ",
                "filename"     : "riceball.min.js",
            },
            "externals": {
                "loquat": true
            },
            "plugins": [
                new webpack.webpack.optimize.UglifyJsPlugin(),
                new webpack.webpack.BannerPlugin(
                    banner,
                    { "entryOnly": true }
                )
            ]
        }))
        .pipe(gulp.dest("./dist/js"));
});

gulp.task("build", ["webpack", "webpack-min"]);

gulp.task("default", ["build"]);

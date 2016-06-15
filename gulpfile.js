/*
 * Created by Kevo on 6/13/2016.
 */

const gulp         = require("gulp"),
	  gutil        = require("gulp-util"),
	  gulpif       = require("gulp-if"),
	  autoprefixer = require("gulp-autoprefixer"),
	  cssmin       = require("gulp-cssmin"),
	  less         = require("gulp-less"),
	  concat       = require("gulp-concat"),
	  plumber      = require("gulp-plumber"),
	  buffer       = require("vinyl-buffer"),
	  source       = require("vinyl-source-stream"),
	  babelify     = require("babelify"),
	  browserify   = require("browserify"),
	  watchify     = require("watchify"),
	  uglify       = require("gulp-uglify"),
	  sourcemaps   = require("gulp-sourcemaps"),
	  eslint       = require("gulp-eslint");

const logger = require("./cfgs/logger"),
	  fs     = require("fs"),
	  moment = require("moment"),
	  now    = moment().format();

const production = process.env.NODE_ENV === "production";

const dependencies = [
	"alt",
	"react",
	"react-dom",
	"react-router",
	"underscore"
];

gutil.log("Gulp Started!");
// logger.info("Gulp Started!");

/*
 |--------------------------------------------------------------------------
 | Check/Watch if Winston logfolder/file exists, if not then create it
 |--------------------------------------------------------------------------
 */

// gulp.task("logs1", function() {
// 	fs.stat("logs", function(err, stat) {
// 		if (err == null) {
// 			gutil.log("LogFolder Exists");
// 		}
//
// 		else {
// 			gutil.log("LogFolder Does Not Exist, Creating Now");
// 			fs.mkdir("logs", { mode: "666" });
// 			gutil.log("LogFolder Created!");
// 		}
// 	});
// });

// currently watches for files changes, make it so it only watches for a delete? also mkdir for logs if doesn't exist
gulp.task("logs", function() {
	fs.stat("logs/all-logs.log", function(err, stat) {
		if (err == null) {
			gutil.log("LogFile Exists");
		}

		else {

			gutil.log("LogFile Does Not Exist, Creating Now");
			fs.writeFile("logs/all-logs.log", "LogFile Created @ " + now + "\r\n", { mode: "666" });
			gutil.log("LogFile Created!");

		}
	});
});

/*
 |--------------------------------------------------------------------------
 | Combine all JS libraries into a single file for fewer HTTP requests.
 |--------------------------------------------------------------------------
 */
gulp.task("vendor", function() {
	return gulp.src([
		"bower_components/jquery/dist/jquery.js",
		"bower_components/bootstrap/dist/js/bootstrap.js",
		"bower_components/magnific-popup/dist/jquery.magnific-popup.js",
		"bower_components/toastr/toastr.js"
	]).pipe(concat("vendor.js"))
		.pipe(gulpif(production, uglify({ mangle: false })))
		.pipe(gulp.dest("public/js"));
});

/*
 |--------------------------------------------------------------------------
 | Compile third-party dependencies separately for faster performance.
 |--------------------------------------------------------------------------
 */
gulp.task("browserify-vendor", function() {
	return browserify()
		.require(dependencies)
		.bundle()
		.pipe(source("vendor.bundle.js"))
		.pipe(buffer())
		.pipe(gulpif(production, uglify({ mangle: false })))
		.pipe(gulp.dest("public/js"));
});

/*
 |--------------------------------------------------------------------------
 | Compile only project files, excluding all third-party dependencies.
 |--------------------------------------------------------------------------
 */
gulp.task("browserify", ["browserify-vendor"], function() {
	return browserify({ entries: "app/main.js", debug: true })
		.external(dependencies)
		.transform(babelify, { presets: ["es2015", "react"] })
		.bundle()
		.pipe(source("bundle.js"))
		.pipe(buffer())
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(gulpif(production, uglify({ mangle: false })))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest("public/js"));
});

/*
 |--------------------------------------------------------------------------
 | Same as browserify task, but will also watch for changes and re-compile.
 |--------------------------------------------------------------------------
 */
gulp.task("browserify-watch", ["browserify-vendor"], function() {
	var bundler = watchify(browserify({ entries: "app/main.js", debug: true }, watchify.args));
	bundler.external(dependencies);
	bundler.transform(babelify, { presets: ["es2015", "react"] });
	bundler.on("update", rebundle);
	return rebundle();

	function rebundle() {
		var start = Date.now();
		return bundler.bundle()
			.on("error", function(err) {
				gutil.log(gutil.colors.red(err.toString()));
			})
			.on("end", function() {
				gutil.log(gutil.colors.green("Finished rebundling in", (Date.now() - start) + "ms."));
			})
			.pipe(source("bundle.js"))
			.pipe(buffer())
			.pipe(sourcemaps.init({ loadMaps: true }))
			.pipe(sourcemaps.write("."))
			.pipe(gulp.dest("public/js/"));
	}
});

/*
 |--------------------------------------------------------------------------
 | Compile LESS stylesheets.
 |--------------------------------------------------------------------------
 */
gulp.task("styles", function() {
	return gulp.src("app/stylesheets/main.less")
		.pipe(plumber())
		.pipe(less())
		.pipe(autoprefixer())
		.pipe(gulpif(production, cssmin()))
		.pipe(gulp.dest("public/css"));
});

gulp.task("watch", function() {
	gulp.watch("app/stylesheets/**/*.less", ["styles"]);
	gulp.watch("logs/**/*.log", ["logs"]);
});

gulp.task("default", ["logs", "styles", "vendor", "browserify-watch", "watch"]);
gulp.task("build", ["logs", "styles", "vendor", "browserify"]);
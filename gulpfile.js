const gulp = require("gulp")
const concat = require("gulp-concat")

gulp.task("build-script", function() {
	return gulp
		.src("./build/static/js/*.js")
		.pipe(concat("batchrestapi.js"))
		.pipe(gulp.dest("./dist/js"))
})

gulp.task("build-css", function() {
	return gulp
		.src("./build/static/css/*.css")
		.pipe(concat("batchrestapi.css"))
		.pipe(gulp.dest("./dist/css"))
})

gulp.task("default", gulp.parallel(["build-script", "build-css"]))

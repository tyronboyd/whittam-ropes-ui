/*
 * USAGE : gulp --env stage|dev|prod
 *
 */

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const typescript = require('gulp-typescript');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
var minify = require('gulp-uglify');
var concat = require('gulp-concat');
var gutil = require('gulp-util');
var tslint = require('gulp-tslint');
var sass = require('gulp-sass');
var sasslint = require('gulp-sass-lint')

var argv = require('yargs').default('env', 'LOCAL').argv;
var environment = argv.env;
console.log('Building env : %s', argv.env);

// clean the contents of the distribution directory (distjs)
gulp.task('clean', function() {
	return del(['src/main/webapp/distjs/**/*', 'src/main/typescript/app/resources/envConfig.ts']);
});


// Copy the config file to app directory based on the env
gulp.task('copy:config', ['clean'], function() {
	return gulp.src('src/main/resources/' + environment + '.ts')
			.pipe(rename('envConfig.ts')).pipe(gulp.dest('src/main/typescript/app/resources'))
});

//Copy required js files into distjs
gulp.task('copy:jquery', ['copy:config'], function() {
  return gulp.src([ 'node_modules/jquery/dist/jquery.min.js',]).
      pipe(gulp.dest('src/main/webapp/distjs/lib/jquery'))
});

gulp.task('copy:bootstrap', ['copy:jquery'], function() {
  return gulp.src([ 'node_modules/bootstrap/dist/js/bootstrap.min.js',
                    'node_modules/bootstrap/dist/css/bootstrap.min.css']).pipe(
      gulp.dest('src/main/webapp/distjs/lib/bootstrap'))
});

gulp.task('copy:system', ['copy:bootstrap'], function() {
  return gulp.src([ 'node_modules/systemjs/dist/system.js',]).
      pipe(gulp.dest('src/main/webapp/distjs/lib/systemjs'))
});

gulp.task('copy:moment', ['copy:system'], function() {
  return gulp.src([ 'node_modules/moment/min/moment.min.js',]).
      pipe(gulp.dest('src/main/webapp/distjs/lib/moment'))
});

gulp.task('copy:moment-timezone', ['copy:moment'], function() {
  return gulp.src([ 'node_modules/moment-timezone/builds/moment-timezone-with-data.min.js',]).
      pipe(gulp.dest('src/main/webapp/distjs/lib/moment'))
});

gulp.task('copy:angular', ['copy:moment-timezone'], function() {
	return gulp.src(['node_modules/@angular/common/bundles/common.umd.min.js',
	                  'node_modules/@angular/compiler/bundles/compiler.umd.min.js',
	                  'node_modules/@angular/core/bundles/core.umd.min.js',
	                  'node_modules/@angular/forms/bundles/forms.umd.min.js',
	                  'node_modules/@angular/http/bundles/http.umd.min.js',
	                  'node_modules/@angular/platform-browser/bundles/platform-browser.umd.min.js',
	                  'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.min.js',
	                  'node_modules/@angular/router/bundles/router.umd.min.js',
	                  'node_modules/@angular/upgrade/bundles/upgrade.umd.min.js'])
	                  .pipe(gulp.dest('src/main/webapp/distjs/lib/@angular'))
});

gulp.task('copy:angular-in-memory', ['copy:angular'], function() {
	return gulp.src([ 'node_modules/angular-in-memory-web-api/**/*.js' ])
			.pipe(gulp.dest('src/main/webapp/distjs/lib/angular-in-memory-web-api'))
});

gulp.task('copy:ng2-translate', ['copy:angular-in-memory'], function() {
	return gulp.src([ 'node_modules/ng2-translate/bundles/ng2-translate.js' ]).pipe(
			gulp.dest('src/main/webapp/distjs/lib/ng2-translate'))
});

gulp.task('copy:libs', ['copy:ng2-translate'], function() {
	return gulp.src(
			[ 'node_modules/core-js/client/shim.min.js',
					'node_modules/zone.js/dist/zone.js',
					'node_modules/reflect-metadata/Reflect.js',
					'node_modules/systemjs/dist/system.src.js', ])
					.pipe(gulp.dest('src/main/webapp/distjs/lib'))
});

gulp.task('copy:angular2-jwt', ['copy:libs'], function() {
	return gulp.src([ 'node_modules/angular2-jwt/**/*.js' ]).pipe(
			gulp.dest('src/main/webapp/distjs/lib/angular2-jwt'))
});

gulp.task('copy:js-base64', ['copy:angular2-jwt'], function() {
	return gulp.src([ 'node_modules/js-base64/**/*.js' ]).pipe(
			gulp.dest('src/main/webapp/distjs/lib/js-base64'))
});

/*
 * CSP header should include "connect-src" only for LOCAL (npm start)
 */
gulp.task('update-csp', ['copy:js-base64'], function(){
  var csp_local = '<meta http-equiv="Content-Security-Policy" content=\"default-src \'self\' js-agent.newrelic.com bam.nr-data.net \'unsafe-inline\' \'unsafe-eval\'; child-src https://maps.google.com/ https://www.google.com/; connect-src *\" >';
  var csp_deploy = '<meta http-equiv="Content-Security-Policy" content=\"default-src \'self\' js-agent.newrelic.com bam.nr-data.net \'unsafe-inline\' \'unsafe-eval\'; child-src https://maps.google.com/ https://www.google.com/;" >';
  if(environment == 'LOCAL')
    {
        gulp.src(['src/main/webapp/index.html'])
          .pipe(replace(/<meta http-equiv="Content-Security-Policy" content=.*>/g,
                  csp_local))
          .pipe(gulp.dest('src/main/webapp'));
    }
  else
    {
        gulp.src(['src/main/webapp/index.html'])
        .pipe(replace(/<meta http-equiv="Content-Security-Policy" content=.*>/g,
                csp_deploy))
        .pipe(gulp.dest('src/main/webapp'));
    }
});

// TypeScript compile
gulp.task('compile', [ 'tslint', 'sasslint', 'update-csp', 'sass', 'compressRxjs'], function() {
	var tsProject = typescript.createProject('./tsconfig.json');
	var tsresult =  tsProject.src()
	    .pipe(sourcemaps.init())
	    .pipe(tsProject(tsProject))
	 return tsresult.js
	    .pipe(sourcemaps.write("."))
	    .pipe(gulp.dest('./src/main/webapp/distjs/src'));
});
gulp.task('compress', [ 'compile' ], function() {
  gulp.src(['src/main/webapp/distjs/**/*.js', '!*.min.js'])
    .pipe(minify({mangle: false}))
    .pipe(gulp.dest('src/main/webapp/distjs/'))
});

gulp.task('tslint', () => {
    return gulp.src("src/main/typescript/app/**/*.ts")
		.pipe(tslint({
		    formatter: "prose"
		}))

		.pipe(tslint.report({
            emitError: false
    }));
});

gulp.task('sasslint', () => {
  return gulp.src('src/main/webapp/style/sass/**/*.s+(a|c)ss')
  .pipe(sasslint({
    configFile: '.sass-lint.yml'
  }))
  .pipe(sasslint.format())
  .pipe(sasslint.failOnError());
});

gulp.task('compressRxjs', function() {
 const Builder = require("systemjs-builder");
 var builder = new Builder('./');
 builder.config({
		 paths: {"rxjs/*": "node_modules/rxjs/*.js"},
		 map: {"rxjs": "node_modules/rxjs"},
		 packages: { "rxjs": {main: 'Rx.js', defaultExtension: "js"} }
 });

 builder.bundle('rxjs', 'src/main/webapp/distjs/lib/rxjs/bundles/Rx.js', {
		 sourceMaps: true,
		 minify: true,
		 mangle: true
 });
});


gulp.task('sass', () => {
    return gulp.src('src/main/webapp/style/sass/common.scss')
				.pipe(sass({ includePaths : ['src/main/webapp/style/sass/'] }))
        .pipe(gulp.dest('src/main/webapp/style/'))
});

gulp.task('watch', function() {
    return gulp.watch('src/main/webapp/style/sass/**.scss', ['sass'])
});

gulp.task('build', [ 'compile']);
gulp.task('default', [ 'build' ]);

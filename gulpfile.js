

var gulp = require('gulp')
,   sourcemaps = require('gulp-sourcemaps')
,   sass = require('gulp-sass')
,   babel = require('gulp-babel')
,   concat = require('gulp-concat')
,   CacheBuster = require('gulp-cachebust') //capitalized because it is a constructor function
,   print = require('gulp-print').default
,   uglify = require('gulp-uglify')

var cachebust = new CacheBuster();  //need this constructor function


function buildCSS(){
    console.log("Gulp: Rebuilding CSS with your changes");
    return gulp.src(['./styles/**/*']) //tell gulp to get EVERYTHING inside the styles folder.
    .pipe(sourcemaps.init()) //pipe (take the results from the previous thing and do something). PIPE results to sourcemaps.init() function.
    .pipe(sass()) //process SASS. Turn sass into CSS.
    .pipe(cachebust.resources()) //Keep a copy of something and don't get the new thing. Blow up the old stuff, put in the new stuff!
    .pipe(concat('style.css')) //put all the sass files into ONE long file. Makes things faster
    .pipe(sourcemaps.write('./maps')) //write out sourcemaps
    .pipe(gulp.dest('./dist')); //stick the sourcemaps into the dist folder.
}

//Make sure to install all the tools listed above.
// npm install --save gulp-sourcemaps gulp-sass gulp-concat -gulp-cachebust



function buildJS() {
    console.log("Gulp: Rebuilding JavaScript with your changes");
    return gulp.src(['./js/**/*.js'])              
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(sourcemaps.init())
    .pipe(print())                        
    .pipe(concat('bundle.js'))
    // .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/js'));
  }
  
  function buildViews(){
    console.log("Gulp: Rebuilding HTML with your changes");
    return gulp.src('./views/**/*.html')
    .pipe(gulp.dest('./dist/views'));
  }
  
  function buildImages(){
    console.log("Gulp: Rebuilding Images with your changes");
    return gulp.src('./assets/**/*')
    .pipe(gulp.dest('./dist/assets'));
  }

  
  function build() {
    return gulp.src('./index.html')
    .pipe(cachebust.references())
    .pipe(gulp.dest('./dist'));
  };
  
  function watch() {
    gulp.watch(['./index.html','./views/**/*.html'], buildViews);
    gulp.watch(['./styles/**/*'], buildCSS);
    gulp.watch(['./js/**/*'], buildJS);
    gulp.watch('./images/**/*', buildImages);
};

// gulp.task(series(build, watch));

gulp.task('default', gulp.series(buildViews, buildCSS, buildJS, buildImages, build, watch));

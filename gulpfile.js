const gulp = require('gulp')
const browserify = require('browserify')
const tsify = require('tsify')
const uglify = require('gulp-uglify')
const ts = require('gulp-typescript')
const sourcemaps = require('gulp-sourcemaps')
const sass = require('gulp-sass')
const nodemon = require('gulp-nodemon')
const runSequence = require('run-sequence')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')

const tsProject = ts.createProject('tsconfig.json')

gulp.task('bundle', () => {
  return browserify({
    basedir: '.',
    debug: true,
    entries: ['client/src/index.ts'],
    cache: {},
    packageCache: {}
  })
  .plugin(tsify)
  .transform('babelify', {
    presets: ['es2015'],
    extensions: ['.ts']
  })
  .bundle()
  .pipe(source('bundle.min.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(uglify()) // Uncomment = minified bundle, comment = browser debugger.
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('public/js'))
})

gulp.task('copy-html', function() {
  return gulp.src('client/html/*.html')
    .pipe(gulp.dest('public'))
})

gulp.task('sass', () => {
  return gulp.src('client/sass/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./public/css'))
})

gulp.task('scripts', () => {
  const tsResults = tsProject.src()
  .pipe(tsProject())

  return tsResults.js.pipe(gulp.dest('dist'))
})

function watchServer() {
  nodemon({
    script: 'dist/index.js',
    watch: ['dist/index.js']
  })
}

gulp.task('watch', () => {
  watchServer()

  gulp.watch('client/src/**/*.ts', ['bundle'])
  gulp.watch('client/sass/**/*.scss', ['sass'])
  gulp.watch('server/**/*.ts', ['scripts'])
})

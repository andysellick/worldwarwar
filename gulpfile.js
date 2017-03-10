'use strict'
// File paths
const paths = {
	templates: {
		src: 'src/',
		dest: 'dist/'
	},
	images: {
	  src:  'src/static/img/',
	  dest: 'dist/static/img/'
	},
	scripts: {
		src:  'src/static/js/',
		dest: 'dist/static/js/'
	},
	styles: {
		src:  'src/static/less/',
		dest: 'dist/static/css/'
	},
	assets: {
		src:  'src/static/assets/',
		dest: 'dist/static/assets/'
	},
	bower: {
  	src:  'src/static/bower_components/',
  	dest: 'dist/static/bower_components/'
	}
};

// Initialization
const gulp = require('gulp'),
			fs = require('fs'),
			$ = require('gulp-load-plugins')({
			    pattern: '*',
			    camelize: true
			}),
			browserSync = $.browserSync.create(),
			prefix = new $.lessPluginAutoprefix({ browsers: [
				'iOS >= 8',
				'Chrome >= 30',
				'Explorer >= 11',
				'Last 2 Edge Versions',
				'Firefox >= 25'
			]});

// CSS - LESS 
gulp.task('styles', () => {
	const onError = function(err) {
		$.notify.onError({
			title: 'CSS Error',
			subtitle: 'Syntax error in CSS!',
			message:  err.message,
			sound: 'Beep'
		})(err);
		this.emit('end');
	};
  return gulp.src(paths.styles.src + 'styles.less')
  	.pipe($.plumber({errorHandler: onError}))
  	.pipe($.newer(paths.styles.dest))
  	.pipe($.sourcemaps.init())
  	.pipe($.less({ 
  		paths: [$.path.join(__dirname, 'less', 'includes')],
  		plugins: [prefix] 
  	}))
  	.pipe($.rename({suffix: '.min'}))
  	.pipe($.cssnano())
  	.pipe(gulp.dest(paths.styles.dest))
  	.pipe(browserSync.stream({match: '*.css'}));
});

// JS - Scripts 
gulp.task('scripts', () => {
	const onError = function(err) {
		$.notify.onError({
			title: 'Javascript Error',
			subtitle: 'Syntax error in script!',
			message:  $.util.colors.yellow(err.message),
			sound: 'Beep'
		})(err);
		this.emit('end');
	};
  return gulp.src(paths.scripts.src + '*.js', [], { base: './static/js/' })
  	.pipe($.plumber({errorHandler: onError}))
    .pipe($.newer(paths.scripts.dest))
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.concat('main.js'))
    .pipe($.bytediff.start())
    .pipe($.rename({suffix: '.min'}))
    .pipe($.babel({presets: ['es2015']}))
    //.pipe($.ngAnnotate())
    .pipe($.uglify())
    .pipe($.bytediff.stop())
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.stream());
});

// HTML 
gulp.task('html', () => {
  return gulp.src(paths.templates.src + '**/*.html')
  	.pipe($.htmlmin({collapseWhitespace: true, minifyJS: true, minifyCSS: true}))
  	.pipe($.newer(paths.templates.dest))
    .pipe(gulp.dest(paths.templates.dest))
    .pipe(browserSync.stream());
});

// Images
gulp.task('images', () => {
  return gulp.src(paths.images.src + '**/*',{base: paths.images.src})
    .pipe($.plumber(function(error) {
        $.util.log($.util.colors.red('Error (' + error.plugin + '): ' + error.message));
        this.emit('end');
    }))
    .pipe($.newer(paths.images.dest))
    .pipe($.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest(paths.images.dest))
});

// Assets
gulp.task('assets', () => {
  return gulp.src(paths.assets.src + '**/*') 
  	.pipe($.newer(paths.assets.dest))
  	.pipe(gulp.dest(paths.assets.dest));
});

// Bower
gulp.task('bower',() => {
  return gulp.src(paths.bower.src + '**/*')
   	.pipe(gulp.dest(paths.bower.dest));
});

// Clear Cache
gulp.task('clear', () => $.cache.clearAll());

// Clean destination dir and clear cache
gulp.task('clean', ['clear'], (done) => {
	$.del.sync([paths.templates.dest + '*']);
	done();
});

// BrowserSync 
gulp.task('browser-sync', ['styles', 'scripts', 'images', 'html', 'assets', 'bower'], () => {
	browserSync.init(paths.styles.dest + '*.css', {
		server: './dist/'
		// notify: false Will not show notify banner on reload or injected
		// open: false; Will not open a browser window automatically
		// online: false; Will not attempt to determine your network status
	});
	// Watchers
	gulp.watch(paths.styles.src + '**/*.less', ['styles']);
	gulp.watch(paths.scripts.src + '**/*.js', ['scripts']);
	gulp.watch(paths.templates.src + '**/*.html', ['html']);
	gulp.watch(paths.images.src + '**/*', ['images']).on('change', browserSync.reload);
	gulp.watch(paths.assets.src + '**/*', ['assets']).on('change', browserSync.reload);
});

// Default task 
gulp.task('default', ['clean'], () => {
  gulp.start('browser-sync');
});
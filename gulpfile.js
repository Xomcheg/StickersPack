const {
    src,
    dest,
    watch,
    parallel,
    series
} = require('gulp');




const scss = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const del = require('del');

function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'app/'
        }
    });
}


function cleanDist() {
    return del('dist')
}


function images() {
    return src('app/images/**/*') // получаем все файлы в папке images
        .pipe(imagemin([
            imagemin.gifsicle({
                interlaced: true
            }),
            imagemin.mozjpeg({
                quality: 75,
                progressive: true
            }),
            imagemin.optipng({
                optimizationLevel: 5
            }),
            imagemin.svgo({
                plugins: [{
                        removeViewBox: true
                    },
                    {
                        cleanupIDs: false
                    }
                ]
            })
        ]))
        .pipe(dest('dist/images'))
}

function scripts() {
    return src([
            'node_modules/jquery/dist/jquery.js',
            'app/js/main.js' // файл который создаем мы, обычно подключается самым последним, 
        ])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js'))
        .pipe(browserSync.stream());
}

function styles() {
    return src('app/scss/style.scss') //получаем фаил style.scss
        .pipe(scss({
            outputStyle: 'compressed'
        })) //минимфицируем style.scss 'expanded' - наоборот устанавливает все пробелы и табы
        .pipe(concat('style.min.css')) //объединяет и переименовывает файлы
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 version']
        }))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream());
}


function build() {
    return src([
            'app/css/style.min.css',
            'app/fonts/**/*',
            'app/js/main.min.js',
            'app/*.html'
        ], {
            base: 'app'
        })
        .pipe(dest('dist'))
}



function watching() {
    watch(['app/scss/**/*.scss'], styles); // отслеживает все файлы в папке scss с расширением .scss
    watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts); // отслеживает все файлы в папке scss с расширением .scss
    watch(['app/*.html']).on('change', browserSync.reload);
}
exports.styles = styles;
exports.watching = watching;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.images = images;
exports.cleanDist = cleanDist;

exports.build = series(cleanDist, images, build);


exports.default = parallel(styles, scripts, browsersync, watching);
// parallel('browsersync', 'watching');
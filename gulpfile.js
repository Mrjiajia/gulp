var gulp = require('gulp');
var cleancss = require('gulp-clean-css'),  //压缩CSS文件
 	uglify = require('gulp-uglify'),  //压缩JS文件
	rename = require('gulp-rename'),  //重命名文件
	del = require('del'),             //删除文件和文件夹
	imagemin = require('gulp-imagemin'),   //压缩图片
	autoprefixer = require('gulp-autoprefixer'),  //浏览器前缀
	livereload = require('gulp-livereload'),   //监听
    pump = require('pump');   //更容易找到代码错误位置


// 压缩css并重命名
gulp.task('gulp-clean-css', function(cb) {
    pump([
        gulp.src(['css/*.css', '!css/*.min.css']),
        cleancss({
            keepSpecialComments: '*'
        }),
        rename({suffix: '.min'}),
        gulp.dest('css/')
    ])
});

// 压缩js并重命名
gulp.task('uglify', function() {
    pump([
        gulp.src(['js/*.js', '!js/*.min.js']),
        rename({suffix: '.min'}),
        gulp.dest('js/')
    ])
});

// 删除css文件和css文件夹
gulp.task('del-css', function () {
  del(['css/*.css', '!css/*.min.css']);
});

// 删除js文件和js文件夹
gulp.task('del-js', function () {
  del(['js/*.js', '!js/*.min.js']);
});

//压缩图片
gulp.task('imagemin', function () {
    gulp.src('images/*.{png,jpg,gif,ico}')
        .pipe(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: false, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: false, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: false //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest('images/'));
});

//加上浏览器前缀
gulp.task('autoprefixer', function () {
    gulp.src('css/index.css')
        .pipe(autoprefixer({
            browsers: ['last 3 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true //是否去掉不必要的前缀 默认：true 
        }))
        .pipe(gulp.dest('dist/css'));
});

//监听css文件
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('css/*.css',['gulp-clean-css']);
});


gulp.task('default', ['gulp-clean-css','uglify','imagemin'])   //定义默认任务



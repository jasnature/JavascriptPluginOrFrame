//gulp当前目录安装 npm install gulp --save-dev
/*
 导入工具包 require('node_modules里对应模块')
 前端常用gulp模块：
 gulp-less: less解析
 gulp-sass: sass 解析
 gulp-concat：js文件合并
 gulp-uglify：压缩javascript文件，减小文件大小
 gulp-imagemin：压缩图片文件（包括PNG、JPEG、GIF和SVG图片）
 gulp-rev-append：给页面的引用添加版本号，清除页面引用缓存
 gulp-htmlmin：压缩html，可以压缩页面javascript、css，去除页面空格、注释，删除多余属性等操作
 gulp-minify-css：压缩css文件，减小文件大小，并给引用url添加版本号避免缓存。重要：gulp-minify-css已经被废弃，请使用gulp-clean-css，用法一致。
 gulp-autoprefixer：根据设置浏览器版本自动处理浏览器前缀
 gulp-sourcemaps:生成来源标签
 
 * */
var gulp = require('gulp'), //本地安装gulp所用到的地方
	less = require('gulp-less'), //less解析
	concat = require('gulp-concat'); //js文件合并

/*
gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
gulp.dest(path[, options]) 处理完后文件生成路径
*/

//less解析
gulp.task('translateLess', function() {
	gulp.src('css/test.less') //该任务针对的文件
		.pipe(less()) //该任务调用的模块，后面可以接其他功能，比如自动前缀，然后压缩css
		.pipe(gulp.dest('css')); //将会在src/css下生成index.css
});

//文件合并
gulp.task('packjs', function() {

	gulp.src('js/*.js').pipe(concat('all.js')).pipe(gulp.dest('js'));

});

//直接命令gulp，默认执行含有default的任务，后面可以跟其他其他任务
gulp.task('default', ['translateLess'], function() {

	console.log("end.............");

}); //定义默认任务 elseTask为其他任务，该示例没有定义elseTask任务
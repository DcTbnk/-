const gulp = require("gulp");
// const sass = require("gulp-sass");
const connect = require("gulp-connect");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const babel = require("gulp-babel");
// 复制图片
gulp.task("copyImg",function(done){
    gulp.src("./images/*.{jpg,png}").pipe(gulp.dest("dist/images"));
    done();
});

// 两个文件夹同时拷贝到某一个文件夹下
// gulp.task("data",function(done){
//     gulp.src(["a/a.json","b/b.xml"]).pipe(gulp.dest("dist/data"));
//     done();
// });

// 排除其他文件拷贝  !json/b.json 排除某个文件
// gulp.task('data',(done) =>{ 
// 	gulp.src(["xml/*.xml","json/*.json","!json/b.json"]).pipe(gulp.dest("dist/data"));
// 	done();
//  });

 // 修改文件后页面自动刷新
gulp.task("copyHtml",function(done){
    gulp.src("pages/*.html").pipe(gulp.dest("dist/pages")).pipe(connect.reload());
    gulp.src("js/*.js").pipe(gulp.dest("dist/js")).pipe(connect.reload());
    gulp.src("css/*.css").pipe(gulp.dest("dist/css")).pipe(connect.reload());
    gulp.src("lib/*.js").pipe(gulp.dest("dist/lib")).pipe(connect.reload());
    gulp.src("images/*.*").pipe(gulp.dest("dist/images")).pipe(connect.reload());
    
    done();
});
//  侦测文件变化  关键字 watch("监听的文件",执行对应的任务)
gulp.task("watch",function(done){
    // 可以写 *.html 监听所有的html文件的变化
    gulp.watch("pages/*.html",gulp.series("copyHtml"));
    gulp.watch(["css/*.css"],gulp.series("copyHtml"));
    gulp.watch("js/*.js",gulp.series("copyHtml"));
    gulp.watch("lib/*.js",gulp.series("copyHtml"));
    gulp.watch("images/**",gulp.series("copyImg"));
    // gulp.watch("sass/*.scss",gulp.series("sass"));
    done();
});

// sass  将scss文件转换成css文件
// gulp.task("sass",function(done){
//     gulp.src("sass/*.scss").pipe(sass()).pipe(gulp.dest("dist/css"));
//     done();
// });

// 搭建本地服务
gulp.task("server",function(done){
    connect.server({
        root:"dist",
        livereload:true  //页面实时更新
    });
    done();
});


// 合并压缩并且保留两个文件
// gulp.task("uglify",function(done){
//     gulp.src(["json/a.js","json/b.js"])
//     // concat(要合并成什么文件名)
//     .pipe(concat("main.js"))
//     .pipe(gulp.dest("dist/js"))
//     .pipe(uglify())
//     .pipe(rename("main.min.js"))
//     .pipe(gulp.dest("dist/js"));
//     done();
// });
// ES6 转 ES5
gulp.task("babel",function(done){
    gulp.src("json/a.js")
    .pipe(babel({presets: ["@babel/preset-env"]}))
    .pipe(gulp.dest("dist/lib"));
    done();
});


gulp.task("default",gulp.series("watch","server"));













// 引入 gulp
var gulp = require('gulp'); 

// 引入组件
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// 检查脚本
/*gulp.task('lint', function() {
    gulp.src('./js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});*/



// 合并，压缩文件
gulp.task('scripts', function() {
    gulp.src([
       //    "editor-app/libs/jquery_1.11.0/jquery.min.js",
      //     "editor-app/libs/jquery-ui-1.10.3.custom.min.js",
           
       //  "editor-app/libs/angular_1.2.13/angular.min.js",
 /*          "editor-app/libs/angular_1.2.13/angular-animate.min.js",
           
           "editor-app/libs/bootstrap_3.1.1/js/bootstrap.min.js",
           
           "editor-app/libs/angular-resource_1.2.13/angular-resource.min.js",
           "editor-app/libs/angular-cookies_1.2.13/angular-cookies.min.js",
           "editor-app/libs/angular-sanitize_1.2.13/angular-sanitize.min.js",
           "editor-app/libs/angular-route_1.2.13/angular-route.min.js",
           "editor-app/libs/angular-translate_2.4.2/angular-translate.min.js",
           "editor-app/libs/angular-translate-storage-cookie/angular-translate-storage-cookie.js",
           "editor-app/libs/angular-translate-loader-static-files/angular-translate-loader-static-files.js",
           "editor-app/libs/angular-strap_2.0.5/angular-strap.min.js",
           "editor-app/libs/angular-strap_2.0.5/angular-strap.tpl.min.js",
           "editor-app/libs/momentjs_2.5.1/momentjs.min.js",
           
           "editor-app/libs/ui-utils.min-0.0.4.js",
           "editor-app/libs/ng-grid-2.0.7-min.js",
           "editor-app/libs/angular-dragdrop.min-1.0.3.js",
           "editor-app/libs/mousetrap-1.4.5.min.js",
           "editor-app/libs/jquery.autogrow-textarea.js",
           "editor-app/libs/prototype-1.5.1.js",
           "editor-app/libs/path_parser.js",
           "editor-app/libs/angular-scroll_0.5.7/angular-scroll.min.js",*/
           
      //     "editor-app/app-cfg.js?v=1",
           "editor-app/editor-config.js",
           "editor-app/configuration/url-config.js",
           
           "editor-app/editor/i18n/translation_en_us.js",
           "editor-app/editor/i18n/translation_signavio_en_us.js",
          // "editor-app/editor/oryx.debug.js",
           
         //  "editor-app/app.js",
           "editor-app/eventbus.js",
           
         /*  "../assets/js/common/base/baseService.js",
           "../assets/js/common/base/baseDirective.js",*/
           "editor-app/configuration/custom/nodeDefService.js",
           
           "editor-app/editor-controller.js",
           "editor-app/stencil-controller.js",
           "editor-app/toolbar-controller.js",
           "editor-app/header-controller.js",
           "editor-app/select-shape-controller.js",
           
           "editor-app/editor-utils.js",
           "editor-app/configuration/toolbar-default-actions.js",
           
           "editor-app/configuration/properties-default-controllers.js",
           "editor-app/configuration/properties-execution-listeners-controller.js",
           "editor-app/configuration/properties-event-listeners-controller.js",
           "editor-app/configuration/properties-assignment-controller.js",
           "editor-app/configuration/properties-fields-controller.js",
           "editor-app/configuration/properties-form-properties-controller.js",
           "editor-app/configuration/properties-in-parameters-controller.js",
           "editor-app/configuration/properties-multiinstance-controller.js",
           "editor-app/configuration/properties-out-parameters-controller.js",
           "editor-app/configuration/properties-task-listeners-controller.js",
           "editor-app/configuration/properties-sequenceflow-order-controller.js",
           "editor-app/configuration/properties-condition-expression-controller.js",
           "editor-app/configuration/properties-signal-definitions-controller.js",
           "editor-app/configuration/properties-signal-scope-controller.js",
           "editor-app/configuration/properties-message-definitions-controller.js",
           "editor-app/configuration/properties-message-scope-controller.js",
           
           "editor-app/configuration/toolbar.js",
           "editor-app/configuration/toolbar-custom-actions.js",
           
           "editor-app/configuration/properties.js",
           "editor-app/configuration/properties-custom-controllers.js",
           
           //节点 流程控制器 
           "editor-app/configuration/custom/node-conf-controller.js",
           "editor-app/configuration/custom/flow-conf-controller.js",
           "editor-app/configuration/custom/flow-plugins-controller.js",
           "editor-app/configuration/custom/inclusive-conditions.js",
           
           "../assets/js/common/tools/dialogCreator.js",
           "../assets/js/plugins/toastr/toastr.min.js",
           
           "../assets/js/plugins/easyui-layout/jquery.parser.js",
           "../assets/js/plugins/easyui-layout/jquery.resizable.js",
           "../assets/js/plugins/easyui-layout/jquery.panel.js",
           "../assets/js/plugins/easyui-layout/jquery.layout.js",
           
           "../assets/js/plugins/jquery-qtip/jquery.qtip.js"
              ])
        .pipe(concat('mian.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./build/js'));
});


gulp.task('oryx', function() {
    gulp.src([
           "editor-app/editor/oryx.debug.js",
              ])
        .pipe(concat('oryx.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./build/js'));
});

gulp.task('app', function() {
    gulp.src([
           "editor-app/app.js",
              ])
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./build/js'));
});

// 默认任务
gulp.task('default', function(){
    gulp.run('scripts');
    gulp.run('oryx');
    gulp.run('app');

    // 监听文件变化
   /* gulp.watch('./js/*.js', function(){
        gulp.run('lint', 'scripts');
    });*/
});

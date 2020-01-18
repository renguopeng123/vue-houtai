 npm install --global gulp
 npm install --save-dev gulp   //npm install --save-dev jshint gulp-jshint
 gulp
 npm install gulp-jshint gulp-sass gulp-concat gulp-uglify gulp-rename --save-dev
 

 
#### 商业版 设计器源码说明
商业版 流程设计器前端项目仅仅  flow-editor 保持最新源码

##### 开发调试说明
部署前端项目 bpm-explorer
访问该前端的 设计器地址如：  /flow-editor/modeler.html?modelId=408369004959498249
改地址是打包压缩后的地址。

调试开发地址：/flow-editor/back.html?modelId=408369004959498249
改地址可以调试源码

发布：
1、gulp 命令打包后生成 build 目录压缩源码内容/
2、并将代码复制至 
springboot 项目中，agilebpm-ui模块
agilebpm 基础项目的 bpm-explorer 模块
 
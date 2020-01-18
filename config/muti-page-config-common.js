//生产环境需要的页面
var prodPage = {
    index: {
        // page 的入口
        entry: "src/main.js",
        // 模板来源（源html）
        template: "public/index.html",
        // 在 dist/home.html 的输出（编译后的地址）
        filename: "index.html",
        //描述，不是vue-cli的配置项
        title: "首页",
        // 在这个页面中包含的块，默认情况下会包含
        // 提取出来的通用 chunk 和 vendor chunk，下面队列为默认的配置。
        chunks: ['chunk-vendors', 'chunk-common', 'index']
            // chunks: ['chunk-libs', 'chunk-elementUI', 'chunk-commons', 'index']
    },
    test: {
        entry: "src/views/test/main.js",
        template: "public/test.html",
        filename: "test.html",
        title: "测试页面",
        chunks: ['chunk-vendors', 'chunk-common', 'test']

    },
    page: {
        entry: "src/bpm/views/page/main.js",
        template: "public/page.html",
        filename: "page.html",
        title: "表单编辑器",
        chunks: ['chunk-vendors', 'chunk-common', 'page']

    },
    preview: {
        entry: "src/bpm/views/pagePreview/main.js",
        template: "public/preview.html",
        filename: "preview.html",
        title: "表单预览",
        chunks: ['chunk-vendors', 'chunk-common', 'preview']

    },
    start: {
        entry: "src/bpm/views/myFlow/start/main.js",
        template: "public/start.html",
        filename: "start.html",
        title: "流程流转",
        chunks: ['chunk-vendors', 'chunk-common', 'start']

    },
    draftStart: {
        entry: "src/bpm/views/myFlow/draftStart/main.js",
        template: "public/draftStart.html",
        filename: "draftStart.html",
        title: "我的草稿",
        chunks: ['chunk-vendors', 'chunk-common', 'draftStart']

    },
    instanceDetail: {
        entry: "src/bpm/views/myFlow/instanceDetail/main.js",
        template: "public/instanceDetail.html",
        filename: "instanceDetail.html",
        title: "流程详情",
        chunks: ['chunk-vendors', 'chunk-common', 'instanceDetail']

    },
    taskComplete: {
        entry: "src/bpm/views/myFlow/taskComplete/main.js",
        template: "public/taskComplete.html",
        filename: "taskComplete.html",
        title: "流程办理",
        chunks: ['chunk-vendors', 'chunk-common', 'taskComplete']

    },
    businessObject: {
        entry: "src/bpm/views/businessObject/main.js",
        template: "public/businessObject.html",
        filename: "businessObject.html",
        title: "模型编辑器",
        chunks: ['chunk-vendors', 'chunk-common', 'businessObject']
    },
    model: {
        entry: "src/bpm/views/model/main.js",
        template: "public/model.html",
        filename: "model.html",
        title: "模型编辑器",
        chunks: ['chunk-vendors', 'chunk-common', 'model']

    },
    flow: {
        entry: "src/bpm/views/flow/main.js",
        template: "public/flow.html",
        filename: "flow.html",
        title: "流程编辑器",
        chunks: ['chunk-vendors', 'chunk-common', 'flow']

    }
};

//dev模式的页面
var devPage = {};

//一起打包
var pages = Object.assign({}, prodPage, devPage);

module.exports = pages;
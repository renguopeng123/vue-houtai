'use strict'
const path = require('path')
const pkg = require('./package.json')

function resolve(dir) {
    return path.join(__dirname, dir)
}

const name = pkg.name || 'gwssi-portal' // page title
const port = 8088 // dev port

//多页面配置
let mutilPageConfig = require("./config/muti-page-config-common");

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
    //部署应用包时的基本 URL，默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上，例如 https://www.my-app.com/。
    //如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。
    //例如，如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app/。
    publicPath: process.env.NODE_ENV === "production" ? process.env.VUE_APP_CONTEXT_PATH : "/",
    outputDir: 'dist',
    assetsDir: 'static',
    //设置为false则取消ESLint 校验
    // lintOnSave: process.env.NODE_ENV === 'development' ? 'error' : false,
    lintOnSave: false,
    //设置为true之后会打包源文件的map
    //map文件的作用在于帮助调试：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错，如果生成map有助于帮助调试，但是资源文件会更大。
    productionSourceMap: false,
	//vue分为 runtime-only 运行版本和 compiler-included 编译版本
	//如果使用动态组件（动态的template）需要使用编译版本，运行版本是不能编译动态组件的
	//1.Runtime Only我们在使用 Runtime Only 版本的 Vue.js 的时候，通常需要借助如 webpack 的 vue-loader 工具把 .vue 文件编译成 JavaScript，因为是在编译阶段做的，所以它只包含运行时的 Vue.js 代码，因此代码体积也会更轻量。 在将 .vue 文件编译成 JavaScript的编译过程中会将组件中的template模板编译为render函数，所以我们得到的是render函数的版本。所以运行的时候是不带编译的，编译是在离线的时候做的。
	//2.Runtime+Compiler我们如果没有对代码做预编译，但又使用了 Vue 的 template 属性并传入一个字符串，则需要在客户端编译模板
	//只有以下情况会用到compiler：
	//1.有指定template;
	//2.没指定template，也没指定render（这时候使用的就是被挂载元素的outerHtml）。
	//这里指定编译版本 否则无法动态构建template
	runtimeCompiler: true,

    //在 multi-page 模式下构建应用。每个“page”应该有一个对应的 JavaScript 入口文件。
    //设置多页面之后很多默认配置失效
    //官方： 当在 multi-page 模式下构建时，webpack 配置会包含不一样的插件 (这时会存在多个 html-webpack-plugin 和 preload-webpack-plugin 的实例)。
    //如果你试图修改这些插件的选项，请确认运行 vue inspect。

    //通过运行npm run inspect看到最终的webpack的配置信息 
    //下属设置的 config.plugins.delete('preload') 在多页面无效（还是会生成preload插件，单页面就没有preload插件）
    //多页面的preload插件会造成下述错误
    //RangeError: Maximum call stack size exceeded
    //[portal]/[_@vue_preload-webpack-plugin@1.1.0@@vue]/preload-webpack-plugin/src/lib/extract-chunks.js:44:21
    pages: mutilPageConfig,

    //开发模式配置
    devServer: {
        port: port,
        open: true,
        overlay: {
            warnings: false,
            errors: true
        },
        //不检查域名
        disableHostCheck: true,
        //配置代理，开发模式接口由mock接管
        proxy: {
            // change xxx-api/login => mock/login
            // detail: https://cli.vuejs.org/config/#devserver-proxy
            // 以[process.env.VUE_APP_BASE_API]开头的请求，则代理访问到http://localhost:${port}/mock，之后由mock生产模拟数据
            // [process.env.VUE_APP_BASE_API]: {
            ['/dev-api']: {
                target: `http://localhost:${port}/mock`,
                changeOrigin: true,
                pathRewrite: {
                    // ['^' + process.env.VUE_APP_BASE_API]: ''
                    ['^' + '/dev-api']: ''
                }
            }
        },
        //before after,前置后置处理
        //将所有请求交由apiMocker处理
        after(app) {
            require('@babel/register')
            const bodyParser = require('body-parser')

            // parse app.body
            // http://expressjs.com/en/4x/api.html#req.body
            app.use(bodyParser.json())
            app.use(bodyParser.urlencoded({
                extended: true
            }))

            const {
                default: mocks
            } = require('./mock')
            for (const mock of mocks) {
                app[mock.type](mock.url, mock.response)
            }
        }
    },
    //会通过 webpack-merge 合并到最终的配置中
    configureWebpack: {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        name: name,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },


    //配置webpack
    chainWebpack(config) {

        // prefetch
        // <link rel="prefetch" ></link>
        // 这段代码告诉浏览器，这段资源将会在未来某个导航或者功能要用到，但是本资源的下载顺序权重比较低。也就是说prefetch通常用于加速下一次导航，而不是本次的。
        // 被标记为prefetch的资源，将会被浏览器在空闲时间加载。

        // preload
        // <link rel="preload" ></link>
        // preload通常用于本页面要用到的关键资源，包括关键js、字体、css文件。preload将会把资源得下载顺序权重提高，使得关键数据提前下载好，优化页面打开速度。

        // 单页面删除方式
        // config.plugins.delete('preload') // TODO: need test
        // config.plugins.delete('prefetch') // TODO: need test

        // webpack 配置会包含不一样的插件 (这时会存在多个 html-webpack-plugin 和 preload-webpack-plugin 的实例)
        // 多页面插件中只有html和preload会生成多个实例，上述的 delete preload多页面会失效
        // 运行vue inspect 对比单页面和多页面的结果能看出来（搜索 preload）

        // 在 @vue/cli-service/lib/config/app.js 中有下面一段，里面已经考虑了多页的情况
        // const multiPageConfig = options.pages
        // if (!multiPageConfig) {

        // 这里删除prefetch和 preload插件 用于解决使用preload多页面的情况下产生的 Maximum call stack size exceeded错误
        // 多页面的删除方式
        Object.keys(mutilPageConfig).forEach(entryName => {
            config.plugins.delete(`prefetch-${entryName}`);
        });
        Object.keys(mutilPageConfig).forEach(entryName => {
            config.plugins.delete(`preload-${entryName}`);
        });

        // set svg-sprite-loader
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()

        // set preserveWhitespace
        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap(options => {
                options.compilerOptions.preserveWhitespace = true
                return options
            })
            .end()

        config
            .when(process.env.NODE_ENV === 'development',
                config => config.devtool('cheap-source-map')
            )

        config
            .when(process.env.NODE_ENV !== 'development',
                config => {


                    // script-ext-html-webpack-plugin 用于对 <script> 标签添加 async，defer,module 属性，或者内联这些属性
                    config
                        .plugin('ScriptExtHtmlWebpackPlugin')
                        .after('html')
                        .use('script-ext-html-webpack-plugin', [{
                            // `runtime` must same as runtimeChunk name. default is `runtime`
                            inline: /runtime\..*\.js$/
                        }])
                        .end()


                    // //暂时不做代码抽取工作 有问题
                    // //使用 SplitChunks 抽取公有代码
                    // config
                    //     .optimization.splitChunks({
                    //         // chunks：表示从哪些chunks里面抽取代码，除了三个可选字符串值 initial、async、all 之外，还可以通过函数来过滤所需的 chunks；
                    //         // minSize：表示抽取出来的文件在压缩前的最小大小，默认为 30000；
                    //         // maxSize：表示抽取出来的文件在压缩前的最大大小，默认为 0，表示不限制最大大小；
                    //         // minChunks：表示被引用次数，默认为1；
                    //         // maxAsyncRequests：最大的按需(异步)加载次数，默认为 5；
                    //         // maxInitialRequests：最大的初始化加载次数，默认为 3；
                    //         // automaticNameDelimiter：抽取出来的文件的自动生成名字的分割符，默认为 ~；
                    //         // name：抽取出来文件的名字，默认为 true，表示自动生成文件名；
                    //         // cacheGroups: 缓存组。（这才是配置的关键）


                    //         //chunks 值为async（默认）,all（推荐），initial
                    //         // async：分割异步打包的代码，打包出b和vue两个chunk
                    //         // all: 分割异步同步代码（需要定义新规则，将同步的代码打包）
                    //         // initial: 同时打包异步同步，但是异步内部的引入将不再考虑，直接打包一起，会将vue和b的内容打在一起
                    //         chunks: 'all',
                    //         // name: utils.assetsPath('[name].[chunkhash].js'),
                    //         // minSize: 10,
                    //         // maxInitialRequests: 100,
                    //         // maxAsyncRequests: 100,
                    //         cacheGroups: {
                    //             // name : 打包的chunks的名字
                    //             // test: 表示要过滤 modules，默认为所有的 modules，可匹配模块路径或 chunk 名字，当匹配的是 chunk 名字的时候，其里面的所有 modules 都会选中；
                    //             // priority：表示抽取权重，数字越大表示优先级越高。因为一个 module 可能会满足多个 cacheGroups 的条件，那么抽取到哪个就由权重最高的说了算；
                    //             // reuseExistingChunk：表示是否使用已有的 chunk，如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的。
                    //             libs: {
                    //                 name: 'chunk-libs',
                    //                 test: /[\\/]node_modules[\\/]/,
                    //                 priority: 10,
                    //                 chunks: 'initial' //chunks将覆盖上面的配置
                    //             },
                    //             elementUI: {
                    //                 name: 'chunk-elementUI', // elementUI单独打包
                    //                 priority: 20, //  重量需要大于libs和app，否则将打包成libs或app。 
                    //                 test: /[\\/]node_modules[\\/]element-ui[\\/]/
                    //                     // test: /[\\/]element-ui[\\/]/
                    //             },
                    //             commons: {
                    //                 name: 'chunk-commons',
                    //                 test: resolve('src/components'), // can customize your rules
                    //                 minChunks: 2, //  最小引用次数（可以设置比如2次引用以上才打到chunk-commons包里）
                    //                 priority: 5,
                    //                 reuseExistingChunk: true
                    //             }
                    //         }
                    //     })
                    //     // optimization.runtimeChunk 就是告诉 webpack 是否要把这部分单独打包出来，来优化缓存问题
                    //     // 值 "single" 会创建一个在所有生成 chunk 之间共享的运行时文件。
                    // config.optimization.runtimeChunk('single')
                }
            )
    }
}
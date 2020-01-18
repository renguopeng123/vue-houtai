<!--by 19~-->
<template>
  <div class="tinymce-container editor-container">
    <textarea :id="tinymceId" class="tinymce-textarea">
    </textarea>
  </div>
</template>

<script>
  import plugins from './plugins'
  import toolbar from './toolbar'
  import Cookies from 'js-cookie'
  import {
    editorOBserver,
    editorSetup
  } from '@/bpm/views/page/tinymce/editorUtils'

  import {
    //自定义元素支持
    customElements,
    extended_valid_elements
  } from '@/bpm/views/page/global'

  export default {
    //  Tinymce API https://www.tiny.cloud/docs-4x/
    name: 'Tinymce',
    data() {
      return {
        tinymceId: "vue-tinymce",
        languageTypeList: {
          'en': 'en',
          'zh': 'zh_CN'
        },
        menubar: "file edit insert view format table"
      }
    },
    computed: {
      language() {
        var language = Cookies.get('language') || 'zh';
        return this.languageTypeList[language];
      }
    },
    mounted() {
      //父页面加载完调用
      //this.initTinymce()
    },
    methods: {
      initTinymce() {
        const _this = this
        window.tinymce.init({
          language: this.language,
          selector: "#" + _this.tinymceId,
          //编辑器的自定义class 用于重写样式等
          //在编辑器编辑框的iframe中，可以尝试在这里定义自定义标签样式
          body_class: 'tinymce-editor-body ',
          //编辑器加载后自动设置焦点，能解决很多莫名其妙的bug，如果不设置焦点第一次点击进来编辑器貌似要检查dom，可能会有某些删除重新插入的操作导致组件编辑出bug
          auto_focus: _this.tinymceId,
          //皮肤插件
          //skin_url: '/static/tinymce4.9.2/skins/lightgray',
          //表格插件的object_resizing
          object_resizing: false,
          //快捷按钮
          toolbar: toolbar,
          //菜单
          menubar: this.menubar,
          //插件
          plugins: plugins,
          //粘贴word参数，可以是propmt, merge, clear
          powerpaste_word_import: 'clean',
          //几个窗口的宽度设置,插件扩展属性配置可以具体查看源码
          //源码窗口
          code_dialog_width: 1000,
          //插入代码窗口
          codesample_dialog_height: 400,
          codesample_dialog_width: 1000,
          //预览窗口
          plugin_preview_width: 1200,
          //插入模板窗口
          template_popup_width: 1000,
          //autosave插件通过菜单的“恢复最后的草稿”实现
          //关闭页面提示保存
          autosave_ask_before_unload: true,
          //第一次打开页面为空的时候是否自动带入上次编辑的内容
          autosave_restore_when_empty: false,
          //自动保存触发时间
          autosave_interval: "30s",
          //项目编号默认配置，列表菜单下拉选择项
          advlist_bullet_styles: 'default,circle,disc,square',
          advlist_number_styles: 'default,lower-alpha,lower-greek,lower-roman,upper-alpha,upper-roman',
          //添加链接默认新窗口打开
          default_link_target: '_blank',
          //是否默认显示元素块，可在菜单中修改
          visualblocks_default_state: true,
          //网格线开关,如果表格border为0，TinyMCE会在编辑区内的表格周围添加虚线框作为视觉辅助。
          //visual:true,
          //template插件，可以直接使用模板创建页面，需要提供模板功能。
          //编辑器的CSS样式
          content_css: "/static/tinymce4.9.2/editor.css,/static/tinymce4.9.2/icon/iconfont.css",
          templates: [{
              title: '普通多行模板',
              description: '普通多行模板',
              url: '/static/templates/demo.html'
            },
            {
              title: '审批单模板',
              description: '通用公文模板',
              url: '/static/templates/demo1.html'
            }
          ],
          link_title: false,
          //表格插入行的时候会插入什么样的元素
          table_clone_elements: "em b i span strong font h1 h2 h3 h4 h5 h6 p div",
          //用于显示在段落下拉列表中的选项，比如插入div和p，光标在某个元素中通过此选项也可以重新设置当前元素
          block_formats: 'Paragraph=p;DIV=div;Heading 1=h1;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;Heading 6=h6;Preformatted=pre',
          //强制使用跟节点，每次创建元素默认的标签，比如直接回车会创建p标签则设置 forced_root_block : 'p'，设置未false则始终不会创建标签，可以改成默认使用div
          //如果设置了p和div如果想要回车后不创建新容器则使用shift+回车
          // forced_root_block: false,
          //原版本的bpm 模板必须只能又一个root 这里先使用div处理
          forced_root_block: "div",
          //table的复制行复制组件会造成重复的情况 这里删除，使用插入行即可
          //tablecopyrow
          //只能去除一级目录 而且右键菜单去不了 针对于table菜单 这里改插件的源码
          removed_menuitems: 'preview',
          //插入空格字符&nbsp;
          nonbreaking_force_tab: true,
          // 用于验证插入编辑框的元素，可以这里增加自定义标签
          // valid_elements
          // extended_valid_elements   
          // 配置元素对应支持的属性       
          "extended_valid_elements": extended_valid_elements,
          //自定义元素
          custom_elements: customElements,
          //控制哪些内容在传递到编辑器中应受到保护而不进行编辑(不太好用 直接使用css display none)
          // protect: [
          // /\<\/?(gw\-text)\>/g, // Protect <gw-text> & </gw-text>
          // ],
          //可以使用的class
          // valid_classes: {
          // },
          //无效的元素，编辑器会删除的元素(加入模板和编辑源码的时候)
          //invalid_elements:
          //无效样式
          //invalid_styles: 
          //初始化事件
          init_instance_callback: editor => {
            //编辑器dom监听
            editorOBserver(_this, editor);
            //插入内容
            _this.setContent();
            // 更新编辑器状态为完成 之后才开始加载字段数据 防止异步顺序不一致导致字段对应不上
            // 总感觉setContent是异步操作 这里用延时 防止字段加载的时候setContent中的事件没有执行完毕
            setTimeout(function () {
              _this.$store.dispatch('page/changeEditor', "inited")
            }, 1000);

          },

          //用于注册编辑器事件
          setup: function (editor) {
            editorSetup(_this, editor);
          }

        })
      },
      setContent() {
        var content = (this.$store.state.page.pageObject.html + "").trim();
        //之前编辑器的一个bug 空内容生成<p><br/></p> 这样可能会造成没有根节点的bug
        if (content == "<p><br/></p>") {
          content = "";
        }
        window.tinymce.get(this.tinymceId).setContent(content)
      }
    }
  }
</script>

<style lang="scss">
  @import "../layout/style.scss";

  /**和el menu的高度一致**/
  .app-form-wrapper-19 {
    .el-menu--horizontal>.el-menu-item {
      line-height: 40px !important;
      height: 40px !important;
    }
  }

  .tinymce-container {
    position: relative;
    line-height: normal;
    height: 100%;
  }

  /**一些样式调整**/
  .tinymce-container .mce-tinymce {
    width: auto !important;
    -moz-box-shadow: none !important;
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
    height: 100%;
  }

  .tinymce-container .mce-tinymce .mce-container-body {
    height: 100%;
  }

  .tinymce-container .mce-tinymce .mce-container-body .mce-menubar {
    height: 37px;
    padding-top: 3px;
  }

  .tinymce-container .mce-tinymce .mce-container-body .mce-edit-area {
    //减去上面菜单的高  按钮的高 底部一小段的高
    height: calc(100% - 110px)
  }

  .tinymce-container .mce-tinymce .mce-container-body .mce-edit-area iframe {
    height: 100% !important;
  }

  .tinymce-textarea {
    visibility: hidden;
    z-index: -1;
  }

  span.mce-flow-layout-item.mce-last {
    display: none;
  }

  .mce-container-body .mce-resizehandle {
    display: none;
  }

  .editor-custom-btn-container {
    position: absolute;
    right: 4px;
    top: 4px;
  }

  .editor-upload-btn {
    display: inline-block;
  }
</style>
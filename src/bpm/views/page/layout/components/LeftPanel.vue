<template>
  <div id="left-panel" class="left-panel">

    <el-menu :default-active="activeIndex" class="el-menu" mode="horizontal">
      <el-menu-item index="com">组件列表</el-menu-item>
    </el-menu>

    <el-scrollbar wrap-class="scrollbar-wrapper">
      <div class="attribute-panel">

        <el-collapse :accordion="false" v-model="componentsActiveNames">

          <el-collapse-item name="model" class="el-collapse-item-model">
            <template slot="title">
              <svg-icon :style="{color:color}" class="svg-icon" icon-class="component" /> 对象组件
            </template>
            <components-tree formID="components_biz_main" :biz_obj="biz_main" ref="biz_main"></components-tree>
            <components-tree formID="components_biz_sub" :biz_obj="biz_sub" ref="biz_sub"></components-tree>
          </el-collapse-item>

          <el-collapse-item name="extends" class="el-collapse-item-extends">
            <template slot="title">
              <svg-icon :style="{color:color}" class="svg-icon" icon-class="nested" /> 扩展功能
            </template>
            <!--扩展按钮全部组件化，功能写在对应组件中-->
            <el-form ref="extendsComponents" class="extends-components-form" size="mini">
              <el-form-item>
                <build-page :span="11" type="primary" buttonClass="extends-components-btn" buttonName="构建页面"
                  icon="page"></build-page>
                <sub-table :span="11" :biz_sub="biz_sub" type="primary" :offset="2" buttonClass="extends-components-btn"
                  buttonName="构建子表" icon="file">
                </sub-table>
              </el-form-item>
              <el-form-item>
                <vue-script :span="11" type="primary" buttonClass="extends-components-btn" buttonName="vue脚本"
                  icon="encoding"></vue-script>
                <extends-btn :span="11" type="info" :offset="2" buttonClass="extends-components-btn" buttonName="柱状图"
                  icon="page">
                </extends-btn>
              </el-form-item>
              <el-form-item>
                <extends-btn :span="11" type="info" buttonClass="extends-components-btn" buttonName="饼状图" icon="page">
                </extends-btn>
                <extends-btn :span="11" type="info" :offset="2" buttonClass="extends-components-btn" buttonName="线型图"
                  icon="page">
                </extends-btn>
              </el-form-item>
              <el-form-item>
                <extends-btn :span="11" type="info" buttonClass="extends-components-btn" buttonName="选部门" icon="page">
                </extends-btn>
                <extends-btn :span="11" type="info" :offset="2" buttonClass="extends-components-btn" buttonName="选人"
                  icon="page">
                </extends-btn>
              </el-form-item>
              <el-form-item>
                <extends-btn :span="11" type="info" buttonClass="extends-components-btn" buttonName="级联选择器" icon="page">
                </extends-btn>
                <extends-btn :span="11" type="info" :offset="2" buttonClass="extends-components-btn" buttonName="多语言文本"
                  icon="page">
                </extends-btn>
              </el-form-item>
            </el-form>
          </el-collapse-item>
        </el-collapse>

      </div>
    </el-scrollbar>

  </div>
</template>

<script>
  //右键菜单
  //demo https://vmaimone.github.io/vue-context-menu/
  // import contextMenu from 'vue-context-menu'

  import {
    mapGetters
  } from 'vuex'

  import {
    boTreeData,
    businessTable
  } from '@/bpm/api/page'

  import {
    attr_id,
    arrt_column_comment,
    arrt_column_key,
    arrt_column_type,
    arrt_column_length,
    arrt_column_placeholder,
    arrt_column_defaultValue,
    arrt_column_options,
    arrt_column_eheight,
    arrt_column_ewidth,
    arrt_column_dickey,
    arrt_column_alias,
    arrt_column_format,
    arrt_column_validRule

  } from '@/bpm/views/page/global'


  import ComponentsTree from './leftpanel/ComponentsTree'
  import BuildPage from './leftpanel/BuildPage'
  import SubTable from './leftpanel/SubTable'
  import VueScript from './leftpanel/VueScript'
  import ExtendsBtn from './leftpanel/ExtendsBtn'

  var loading;

  export default {
    name: 'left-panel',

    data() {
      return {
        hasInit: false,
        activeIndex: 'com',
        componentsActiveNames: ["model", "extends"],

        //所有主表
        biz_main: [],
        //所有子表
        biz_sub: []
        //右键菜单
        // contextMenuTarget: null,
        // contextMenuVisible: true
      };
    },

    computed: {
      color() {
        return this.$store.state.settings.theme;
      },
      ...mapGetters([
        'editorState'
      ])
    },

    watch: {
      //appmain获取到数据以及编辑器初始化完毕才加载字段
      editorState(val) {
        console.log("editorState change = " + val);
        if (val != null && val != "" && val == "inited") {
          this.init();
        }
      }
    },

    components: {
      // contextMenu
      ComponentsTree,
      BuildPage,
      SubTable,
      VueScript,
      ExtendsBtn
    },

    mounted() {
      // this.contextMenuTarget = document.getElementById("left-panel");
      if (this.editorState != null && this.editorState != "" && this.editorState == "inited") {
        this.init();
      }

      loading = this.$loading({
        lock: true,
        text: '加载组件',
        spinner: 'el-icon-loading',
        target: '#left-panel',
        body: false
      })

    },

    methods: {

      addColumn(column, tableKey) {
        //表名
        column.tableKey = tableKey;
        //是否被编辑器使用
        if (this.$store.state.component.editorColumn[column.id] == null) {
          column.used = false;
        } else {
          column.used = true;
        }
        //是否能更改组件类型
        column.editable = false;
        //默认值
        if (!column.defaultValue) {
          column.defaultValue = "";
        }
        //主键
        if (column.primary) {
          column.ctrl = {
            "columnId": column.id,
            "config": "{}",
            "type": "hidden",
            "validRule": "[]",
          }
        }

        //如果编辑器已经添加标签则覆盖配置
        if (this.$store.state.component.editorColumn[column.id] != null && column.ctrl.type != null && column.ctrl
          .type != "") {

          var config = {};
          var dom = this.$store.state.component.editorColumn[column.id];

          //类型有可能变化
          column.ctrl.type = dom.getAttribute(arrt_column_type);

          //默认值
          column.defaultValue = dom.getAttribute(arrt_column_defaultValue);

          if (column.ctrl.type == "hidden") {}
          if (column.ctrl.type == "onetext") {
            config.placeholderText = dom.getAttribute(arrt_column_placeholder);
          }
          if (column.ctrl.type == "multitext") {
            config.placeholderText = dom.getAttribute(arrt_column_placeholder);
            config.eheight = dom.getAttribute(arrt_column_eheight);
            config.ewidth = dom.getAttribute(arrt_column_ewidth);
          }
          if (column.ctrl.type == "select") {
            config.placeholderText = dom.getAttribute(arrt_column_placeholder);
            config.options = JSON.parse(dom.getAttribute(arrt_column_options));
          }
          if (column.ctrl.type == "checkbox") {
            config.placeholderText = dom.getAttribute(arrt_column_placeholder);
            config.options = JSON.parse(dom.getAttribute(arrt_column_options));
          }
          if (column.ctrl.type == "radio") {
            config.placeholderText = dom.getAttribute(arrt_column_placeholder);
            config.options = JSON.parse(dom.getAttribute(arrt_column_options));
          }
          if (column.ctrl.type == "dic") {
            config.placeholderText = dom.getAttribute(arrt_column_placeholder);
            config.key = dom.getAttribute(arrt_column_dickey);
          }
          if (column.ctrl.type == "serialno") {
            config.placeholderText = dom.getAttribute(arrt_column_placeholder);
            config.alias = dom.getAttribute(arrt_column_alias);
          }
          if (column.ctrl.type == "date") {
            config.placeholderText = dom.getAttribute(arrt_column_placeholder);
            config.format = dom.getAttribute(arrt_column_format);

          }
          if (column.ctrl.type == "file") {
            config.placeholderText = dom.getAttribute(arrt_column_placeholder);
          }

          column.ctrl.config = JSON.stringify(config)

        }

        this.$store.dispatch('component/addColumn', column)

      },

      async init() {

        if (this.hasInit) {
          return;
        }

        console.log("加载字段，boKey = " + this.$store.state.page.pageObject.boKey);
        this.hasInit = true;

        //要查询的key
        const query = {
          boKey: this.$store.state.page.pageObject.boKey
        }

        boTreeData(query).then(response => {

          for (const data of response) {
            //主表
            if (data.relationType == "main") {
              data.columns = [];
              //一般只有一个主表
              this.biz_main.push(data);
            }
            //子表
            if (data.relationType != "main" && data.nodeType == "table") {
              data.columns = [];
              this.biz_sub.push(data);
            }
          }

          //查询主表字段
          const queryTable = {
            key: this.biz_main[0].key,
            fill: true
          }

          businessTable(queryTable).then(response => {

            //循环添加字段
            for (const column of response.data.columns) {
              column.relationType = "main";
              this.addColumn(column, this.biz_main[0].key);
            }

            //页面增加组件
            this.biz_main[0].columns = response.data.columns

            loading.close();
          }).catch(error => {

            this.$message({
              message: '加载组件错误' + error,
              type: 'error'
            })

            console.error(error);
            loading.close();
          })

          //子表字段循环查询（不控制loading显示）
          for (const subTab of this.biz_sub) {

            //查询子表字段
            const queryTable = {
              key: subTab.key,
              fill: true
            }

            businessTable(queryTable).then(response => {

              //循环添加字段
              for (const column of response.data.columns) {
                column.relationType = "sub";
                this.addColumn(column, subTab.key);
              }

              //页面增加组件
              subTab.columns = response.data.columns

            }).catch(error => {
              this.$message({
                message: '加载子组件错误' + error,
                type: 'error'
              })
              console.error(error);
            })
          }
        }).catch(error => {
          this.$message({
            message: '加载组件错误' + error,
            type: 'error'
          })
          console.error(error);
          loading.close();
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "../style.scss";

  .el-collapse-item-extends {
    .extends-components-form {
      .el-form-item--mini.el-form-item {
        margin-bottom: 10px;

        .extends-components-btn {
          padding: 7px;
          width: 100%;
          text-align: left;

          .svg-icon {
            margin-right: 5px;
          }
        }
      }
    }
  }

  //所有弹窗统一修改
  .left-panel {
    .el-dialog__header {
      padding: 10px;

      .el-dialog__title {
        font-size: 16px;
      }
    }

    .el-dialog__body {
      padding: 20px;

      .el-form-item__label {
        font-size: 12px;
      }

      .el-radio {
        margin-right: 10px;
      }

      .el-form-item--mini.el-form-item {
        margin-bottom: 18px;
      }

    }

    .el-dialog__footer {
      padding: 10px;
    }
  }
</style>

<style lang="scss" scoped>
  @import "../style.scss";

  .app-form-wrapper-19 {
    .left-panel {
      width: $barWidth;
      height: calc(100% - #{$offsetH});
      overflow: hidden;
      border-top: solid 1px #c5c5c5;
      // border-right: solid 1px $border-bg-color;
      position: absolute;
      background-color: #{$side-background-color};
      top: $offsetH;
      left: 0;

      .el-menu {
        text-align: center;
        position: relative;
        overflow: hidden;

        .el-menu-item {
          float: left;
          position: relative;
          left: 25%;
          width: 50%;
        }
      }
    }
  }
</style>
<template>
  <el-button type="primary" @click="save()">保存</el-button>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'

  import {
    getConfig,
    getValue,
    onetext_attr,
    multitext_attr,
    select_attr,
    checkbox_attr,
    radio_attr,
    dic_attr,
    serialno_attr,
    date_attr,
    file_attr
  } from '@/bpm/views/page/function'

  import {
    attr_id,
    arrt_column_comment,
    arrt_column_key,
    arrt_column_type,
    arrt_column_length,
    arrt_column_placeholder,
    arrt_column_options,
    arrt_column_eheight,
    arrt_column_ewidth,
    arrt_column_dickey,
    arrt_column_alias,
    arrt_column_format,
    arrt_column_validRule,
    arrt_column_defaultValue

  } from '@/bpm/views/page/global'

  export default {
    name: 'save-button',
    computed: {
      ...mapGetters([
        "activeComponent", "businessColumn", "componentPanel"
      ])
    },

    //每次切换和激活的时候都需要重置componentPanel
    mounted() {
      this.init();
    },

    activated() {
      this.init();
    },

    data() {
      return {}
    },
    methods: {
      save() {

        console.log(JSON.stringify(this.componentPanel));

        this.$store.dispatch('component/setColumnCtrlConfig', {
          "id": this.activeComponent,
          "config": JSON.stringify(this.componentPanel)
        });

        //直接修改即可 不用调用action 这里不需要通知其它组件
        this.businessColumn[this.activeComponent].defaultValue = this.componentPanel.defaultValue;

        var type = this.businessColumn[this.activeComponent].ctrl.type;
        var defaultValue = this.componentPanel.defaultValue;
        var dom = this.$store.state.component.editorColumn[this.activeComponent];

        //更新dom
        if (dom != null) {
          if (type == "hidden") {
            dom.setAttribute(arrt_column_defaultValue, defaultValue);
          }
          if (type == "onetext") {
            onetext_attr(dom, this.componentPanel.placeholderText, defaultValue);
          }
          if (type == "multitext") {
            multitext_attr(dom, this.componentPanel.placeholderText, this.componentPanel.eheight, this.componentPanel
              .ewidth, defaultValue);
          }
          if (type == "select") {
            select_attr(dom, this.componentPanel.placeholderText, JSON.stringify(this.componentPanel.options),
              defaultValue);
          }
          if (type == "checkbox") {
            checkbox_attr(dom, this.componentPanel.placeholderText, JSON.stringify(this.componentPanel.options),
              defaultValue);
          }
          if (type == "radio") {
            radio_attr(dom, this.componentPanel.placeholderText, JSON.stringify(this.componentPanel.options),
              defaultValue);
          }
          if (type == "dic") {
            dic_attr(dom, this.componentPanel.placeholderText, this.componentPanel.key, defaultValue);
          }
          if (type == "serialno") {
            serialno_attr(dom, this.componentPanel.placeholderText, this.componentPanel.alias, defaultValue);
          }
          if (type == "file") {
            file_attr(dom, this.componentPanel.placeholderText, defaultValue);
          }
          if (type == "date") {
            date_attr(dom, this.componentPanel.placeholderText, this.componentPanel.format, defaultValue);
          }
        }

        this.$message({
          message: '组件属性保存成功。',
          type: 'success'
        })

      },
      init() {

        var conf = JSON.parse(this.businessColumn[this.activeComponent].ctrl.config);

        if (conf == null || conf == "") {
          this.$store.dispatch('component/setPanel', {
            //占位符
            placeholderText: "",
            //选择类型的选择项目
            options: [],
            //多行的高宽
            eheight: 0,
            ewidth: 0,
            //字典的key
            key: "",
            //序列号类型
            alias: "",
            //日期格式
            format: "",
            //默认值
            defaultValue: ""
          });
        }

        var placeholderText = getValue(conf, "placeholderText");
        var eheight = getValue(conf, "eheight");
        var ewidth = getValue(conf, "ewidth");
        var key = getValue(conf, "key");
        var alias = getValue(conf, "alias");
        var format = getValue(conf, "format");
        var options = getValue(conf, "options");
        var defaultValue = this.businessColumn[this.activeComponent].defaultValue;

        if (options == null || options == "") {
          options = []
        }

        this.$store.dispatch('component/setPanel', {
          //占位符
          placeholderText: placeholderText,
          //选择类型的选择项目
          options: options,
          //多行的高宽
          eheight: eheight,
          ewidth: ewidth,
          //字典的key
          key: key,
          //序列号类型
          alias: alias,
          //日期格式
          format: format,
          //默认值
          defaultValue: defaultValue
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
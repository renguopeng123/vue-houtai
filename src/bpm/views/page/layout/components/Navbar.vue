<template>
  <div id="navbar" class="navbar" :style="{background:color}">

    <el-row>
      <el-col :span="12" class="left-col">
        <svg-icon class="svg-icon" icon-class="edit" />
        <span class="welcome"
          :style="{'border-right': '1px solid ' + theme.border, 'box-shadow': '1px 0px 0px ' + theme.shadow }">表单设计器</span>

        <el-form :inline="true" class="navbar-form" size="mini">
          <el-form-item class="navbar-form-item" label="表单名称">
            <el-input v-model="pageObject.name" placeholder="表单名称"></el-input>
          </el-form-item>

          <el-form-item class="navbar-form-item" label="业务对象">
            <el-input v-model="pageObject.boName" placeholder="业务对象" :disabled="true">
            </el-input>
          </el-form-item>

          <el-form-item class="navbar-form-item autoSave" label="自动保存">
            <el-switch v-model="autoSave"></el-switch>
          </el-form-item>

        </el-form>

      </el-col>

      <el-col :span="12" class="right-col">
        <span class="welcome"
          :style="{'border-right': '1px solid ' + theme.border, 'box-shadow': '1px 0px 0px ' + theme.shadow }">{{$t('navbar.welcome')}}
          ~ {{ user.name }} ~</span>

        <el-button type="" @click="preview()" size='mini' title="预览" icon="el-icon-view">预览</el-button>
        <el-button type="" @click="doSave(true)" size='mini' title="保存" icon="el-icon-document">保存</el-button>
        <screenfull :button="true" class="screenfull-item" />
        <!--保证颜色统一-->
        <theme-picker @change="themeChange" />

      </el-col>
    </el-row>

  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import Screenfull from '@/components/Screenfull'
  import ThemePicker from '@/components/ThemePicker'
  import tools from '@/utils/tools'
  import {
    deepClone
  } from '@/utils'

  import {
    saveFormDef
  } from '@/bpm/api/page'


  export default {
    name: 'Navbar',
    data() {
      return {
        color: "#2365A3",
        theme: {
          color: this.color,
          border: 'rgb(15, 81, 143)',
          shadow: 'rgb(55, 121, 183)'
        },
        autoSave: true,
        timer: ""
      }
    },

    components: {
      Screenfull,
      ThemePicker
    },
    computed: {
      ...mapGetters([
        'user',
        'pageObject',
        "editorState",
        "editorSaved"
      ])
    },
    mounted() {

      //每一分钟保存一次
      var that = this;
      this.timer = setInterval(function () {
        if (that.editorState != null && that.editorState == "inited" && that.editorSaved == "change") {
          if (that.autoSave) {
            //不为空才保存
            var editor = window.tinymce.activeEditor;
            var content = editor.getContent();
            if (content != null && content != "") {
              that.doSave(false);
            }
          }
        }
      }, 60000)

    },

    methods: {

      preview() {
        window.open("./preview.html?key=" + this.pageObject.key);
      },

      themeChange(val) {
        this.color = val;
        var border = this.color;
        var shadow = this.color;
        try {
          border = tools.getItemColors(border, 20);
          shadow = tools.getItemColors2(shadow, 20);
        } catch (e) {
          console.log(e);
        }
        this.theme = {
          color: this.color,
          border: border,
          shadow: shadow
        };
      },

      doSave(loadTips) {

        if (this.editorState == null || this.editorState == "" || this.editorState != "inited") {
          this.$message('编辑器还未初始化成功，数据未加载完成。');
          return
        }

        if (this.editorSaved != "change") {
          this.$message('编辑器内容未修改');
          return
        }

        var loading;
        if (loadTips) {
          loading = this.$loading({
            lock: true,
            text: '正在保存表单',
            body: true
          })
        }

        //编辑器
        var editor = window.tinymce.activeEditor;
        var content = editor.getContent();

        //克隆之后提交
        var data = deepClone(this.pageObject);
        data.html = content;

        saveFormDef(data).then(response => {

          console.log(response);

          //{"code":"200","data":"410773850321846273","isOk":true,"msg":"更新自定义表单成功"}
          if (response.code == "200" && response.isOk) {

            this.$message({
              message: '表单保存成功',
              type: 'success'
            });

            //调用编辑器的save方法 从而可以通知autosave插件已经保存 save方法也可以激活其它save相关事件
            editor.save();
            if (loading) {
              loading.close();
            }
            this.$store.dispatch('page/saveEditor', 'saved')

          } else {

            this.$message.error('表单保存失败：' + response.msg);
            if (loading) {
              loading.close();
            }
          }

        }).catch(error => {

          this.$message.error('表单保存失败：' + error);
          console.error(error);
          if (loading) {
            loading.close();
          }
        })
      }
    }
  }
</script>


<style lang="scss">
  /**这部分需要全局替换**/
  .app-form-wrapper-19 {
    .navbar-form {
      .navbar-form-item {
        .el-form-item__label {
          color: #ffffff;
          font-weight: normal;
        }
      }

      .el-form-item__content {
        width: 180px;
      }

      .el-switch__core {
        border-color: #ffffff !important;
      }

      .el-input__inner {
        padding: 0 10px;
      }

      .autoSave {
        .el-form-item__content {
          line-height: 25px;
        }
      }
    }
  }
</style>

<style lang="scss" scoped>
  @import "../style.scss";

  .navbar {
    height: $navbarH;
    width: 100%;
    color: #ffffff;
    overflow: hidden;
    border-bottom: 1px solid $border-bg-color;

    .svg-icon {
      color: #ffffff;
    }

    .navbar-form {
      position: absolute;
      left: 150px;
      top: 9px;
    }

    .theme-picker {
      top: 8px;
    }


    .el-col {
      height: $navbarH;
    }

    .el-col .screenfull-item {
      margin-left: 10px;
    }

    .el-col div,
    .el-col .welcome {
      display: inline-block;
      font-size: 14px;
      margin-right: 10px;
    }

    .el-col .welcome {
      line-height: $navbarH;
      padding-right: 20px;
      margin-right: 20px;
    }

    .right-col {
      text-align: right;
      padding-right: 20px;
    }

    .left-col {
      text-align: left;
      padding-left: 20px;
    }

  }
</style>
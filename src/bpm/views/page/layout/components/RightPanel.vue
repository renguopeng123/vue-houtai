<template>
  <div id="right-panel" class="right-panel">
    <el-menu :default-active="activeIndex" class="el-menu" mode="horizontal" @select="nemuHandleSelect">
      <el-menu-item index="com">组件属性</el-menu-item>
      <el-menu-item index="flow">关联流程</el-menu-item>
    </el-menu>

    <el-scrollbar wrap-class="scrollbar-wrapper">
      <div v-show="activeIndex=='com'">
        <component-panel></component-panel>
      </div>

      <div v-show="activeIndex=='flow'">
        <flow-panel></flow-panel>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
  import componentPanel from './rightpanel/componentPanel'
  import flowPanel from './rightpanel/flow'

  export default {
    name: 'right-panel',
    data() {
      return {
        activeIndex: 'com'
      };
    },
    components: {
      flowPanel,
      componentPanel
    },
    mounted() {

      const loading2 = this.$loading({
        lock: true,
        text: '加载扩展信息',
        spinner: 'el-icon-loading',
        target: '#right-panel',
        body: false
      })
      setTimeout(function () {
        loading2.close();
      }, 500);

    },

    methods: {
      nemuHandleSelect(key, keyPath) {
        this.activeIndex = key;
      }
    }
  }
</script>

<style lang="scss">
  // 统一设置所有组件的表单样式
  .app-form-wrapper-19 {
    .right-panel {
      .attribute-panel {
        .el-form {
          font-size: 12px;

          .el-collapse-item__wrap {
            .el-collapse-item__content {
              padding-bottom: 5px;
            }
          }

          .el-form-item__label {
            font-size: 12px;
            color: #777;
            padding: 0 5px 0 0;
            font-weight: normal;
          }

          .el-form-item {
            margin-bottom: 5px;

            .el-input.is-disabled {
              .el-input__inner {
                background: none;
                border: none;
                color: #303133;
                padding: 0 5px;
              }
            }
          }
        }
      }
    }
  }
</style>

<style lang="scss" scoped>
  @import "../style.scss";

  .right-panel {
    width: $barWidth;
    height: calc(100% - #{$offsetH});
    overflow: hidden;
    position: absolute;
    border-top: solid 1px #c5c5c5;
    // border-left: solid 1px $border-bg-color;
    background-color: #{$side-background-color};
    top: $offsetH;
    right: 0;

    .el-menu {
      text-align: center;
      overflow: hidden;

      .el-menu-item {
        width: 50%;
      }
    }
  }
</style>
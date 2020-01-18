<template>
  <div id="app" class="app-form-wrapper-19">
    <navbar />
    <div id="gl~19~" class="main">
      <left-panel />
      <app-main />
      <right-panel />
    </div>
  </div>
</template>

<script>
  //单页面权限
  import auth from '@/bpm/utils/auth'
  import api from '@/bpm/api/page'
  import Navbar from './layout/components/Navbar'
  import LeftPanel from './layout/components/LeftPanel'
  import AppMain from './layout/components/AppMain'
  import RightPanel from './layout/components/RightPanel'

  export default {
    name: 'App',
    components: {
      Navbar,
      LeftPanel,
      AppMain,
      RightPanel
    },

    data() {
      return {}
    },

    mounted() {
      //判断权限 并且获取用户(如果没有权限这里直接踢出)
      this.getUser();
    },

    methods: {
      async getUser() {
        const user = await auth.getUser();
        if (user != null) {
          this.$store.dispatch('settings/setUser', user);
        }
      }
    }

  }
</script>

<style lang="scss">
  @import "./layout/style.scss";

  // 左右两侧的样式，各类组件都使用el-collapse展示，这里统一配置
  .app-form-wrapper-19 {

    .right-panel,
    .left-panel {

      .el-collapse {
        border: 0px;
      }

      .el-collapse-item__header {
        border: none;
        background: none;
        height: 35px;
      }

      .el-collapse-item__wrap {
        border: none;
        background: none;
        border-top: 1px solid $border-bg-color;
        padding-top: 10px;
      }

      .el-collapse-item__content {
        padding-bottom: 15px;
      }

      .attribute-panel {
        padding: 10px;
        font-size: 12px;

        .svg-icon {
          margin-right: 10px;
        }
      }
    }
  }
</style>

<style lang="scss" scoped>
  @import "./layout/style.scss";

  .app-form-wrapper-19 {
    height: 100%;
    width: 100%;
  }

  .main {
    height: calc(100% - #{$offsetH});
    clear: both;
  }
</style>
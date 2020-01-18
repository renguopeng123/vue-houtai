<template>
  <div id="app" class="app-wrapper">
    <navbar :user="user" />
    <div class="main">
        <iframe :src="src" frameborder="0" height="100%" width="100%"></iframe>
      <!--<sidebar />
      <app-main />
      <right-panel />-->
    </div>
  </div>
</template>

<script>
  //单页面权限
  import auth from '@/bpm/utils/auth'
  import api from '@/bpm/api/flow'
  import Navbar from './layout/components/Navbar'
  import Sidebar from './layout/components/Sidebar'
  import AppMain from './layout/components/AppMain'
  import RightPanel from './layout/components/RightPanel'

  export default {
    name: 'App',
    components: {
      Navbar,
      Sidebar,
      AppMain,
      RightPanel
    },

    data() {
      return {
        user: "",
        pageList: [],
        page: {},
        src: "/designer/flow-editor/modeler.html?modelId=410478131715768321"
      }
    },

    computed: {},

    created() {},

    mounted() {

      //判断权限 并且获取用户
      this.getUser();
      //装载数据

    },

    methods: {

      async getUser() {
        this.user = await auth.getUser();
      }

    }

  }
</script>

<style lang="scss" scoped>
  @import "./layout/style.scss";

  .app-wrapper {
    height: 100%;
    width: 100%;
  }

  .main {
    overflow: hidden;
    height: calc(100% - #{$offsetH});
    clear: both;
  }
</style>
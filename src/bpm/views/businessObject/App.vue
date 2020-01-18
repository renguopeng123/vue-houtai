<template>
  <div id="app" class="app-wrapper">
    <navbar :user="user" />
    <div class="main">
      <sidebar />
      <app-main />
    </div>
  </div>
</template>

<script>
  //单页面权限
  import auth from '@/bpm/utils/auth'
  import Navbar from './layout/components/Navbar'
  import Sidebar from './layout/components/Sidebar'
  import AppMain from './layout/components/AppMain'

  export default {
    name: 'App',
    components: {
      Navbar,
      Sidebar,
      AppMain,
    },

    data() {
      return {
        user: "",
        pageList: [],
        page: {}
      }
    },

    computed: {},

    created() {
      //TODO 从后端获取到对象分类的树形结构；用于主面板的左侧的树形展示
      this.getTreeNode();
    },

    mounted() {
      //判断权限 并且获取用户
      this.getUser();
      //装载数据
    },

    methods: {
      async getUser() {
        this.user = await auth.getUser();
      },
      getTreeNode() {
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
    height: calc(100% - 78px);
    clear: both;
  }
</style>

<template>
  <div id="app" class="app-wrapper">
    <navbar :user="user" />
    <div class="main">
      <sidebar :entities-category="entitiesCategory"/>
      <app-main :entities-category="entitiesCategory" :all-entities-tree="allEntitiesTree" />
    </div>
  </div>
</template>

<script>
  //单页面权限
  import auth from '@/bpm/utils/auth'
  import Navbar from './layout/components/Navbar'
  import Sidebar from './layout/components/Sidebar'
  import AppMain from './layout/components/AppMain'
  import {getAllEntities, getTreeNodesFromSvr} from "../../api/model";
  import {parseFlatArrayToTree} from "../common/business/commonUtil";

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
        page: {},
        entitiesCategory:[],
        allEntitiesTree:[]
      }
    },

    computed: {},

    created() {
      //后端获取到实体分类的树形结构；1.用于主面板的左侧的树形展示；2.新建实体时选择分类；
      this.getEntitiesCategory();
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
      getEntitiesCategory() {
        let data = {
          treeKey:"ywbfl",  //需要负责系统配置的tx保证不能修改；
          rootName: "ROOT_NODE" //前端传什么，树的root节点显示什么；
        }
        let param = {limit: 9999, offset: 0}; //TODO 硬编码成9999貌似不太好。
        Promise.all([getTreeNodesFromSvr(data), getAllEntities(param)]).then(res => {
          let data = [];
          data = res[0].filter(item => {
            return item.name != "ROOT_NODE";
          });
          this.entitiesCategory = _.cloneDeep(parseFlatArrayToTree(data));
          let temp = res[1];
          if (temp.code == 200 && temp.isOk) {
            data = data.concat(temp.rows);
          }
          this.allEntitiesTree =  parseFlatArrayToTree(data);
        });
      },
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

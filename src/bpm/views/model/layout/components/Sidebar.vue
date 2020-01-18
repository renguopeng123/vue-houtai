<template>
  <div class="sidebar-container">
    <div class="sidebar-right-panel">
      <el-menu class="panel-title" :default-active="activeIndex" mode="horizontal">
        <el-menu-item index="1">实体分类</el-menu-item>
      </el-menu>
      <i class="right el-icon-s-tools"></i>
    </div>
    <div class="tree">
      <el-input clearable class="search-tree"
                placeholder="输入分类或表单名查找"
                suffix-icon="el-icon-search"
                v-model="searchTree">
      </el-input>
      <el-tree
        :data="treeData"
        :props="defaultProps"
        :highlight-current="true"
        :expand-on-click-node="false"
        @node-click="handleNodeClick"></el-tree>
    </div>
  </div>
</template>

<script>
  import {eventBus} from "../../main";

  export default {
    name: 'sidebar',
    props:{
      entitiesCategory:{
        type:Array,
        default:[]
      }
    },
    computed:{
      treeData() {
        return this.entitiesCategory;
      }
    },
    data() {
      return {
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        activeIndex: '1',
        searchTree: ''
      };
    },

    methods: {
      handleNodeClick(data) {
        eventBus.$emit("treeNodeClick", {nodeId:data.id, nodeName:data.name});
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../style.scss";

  .sidebar-right-panel {
    display: flex;
    border-bottom:1px solid #dcdfe6;
    padding:0 10px;
    justify-content: flex-end;
    align-items: center;
  }

  /**和el menu的高度一致**/
  .el-menu--horizontal>.el-menu-item {
    line-height: 39px !important;
    height: 39px !important;
  }
  .panel-title {
    margin:auto;
  }
  .el-menu-vertical {
    /*border: 1px;*/
  }

  .sidebar-container {
    width: $leftSideBarW;
    height: calc(100% - #{$offsetH});
    border-right:1px solid #dcdfe6;
    overflow: hidden;
    position: absolute;
    top: $offsetH;
    left: 0;
  }

  .search-tree {
    margin-top:10px;
  }
  .tree {
    padding:0 10px;
  }
  .search-tree {
    border-radius:20px;
    /deep/ .el-input__inner {
      border-radius: 20px;
    }
  }
</style>

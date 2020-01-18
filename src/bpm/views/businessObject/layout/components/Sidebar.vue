<template>
  <div class="sidebar-container">
    <div class="sidebar-right-panel">
      <el-menu class="panel-title" :default-active="activeIndex" mode="horizontal">
        <el-menu-item index="1">对象分类</el-menu-item>
      </el-menu>
      <i class="right el-icon-s-tools"></i>
    </div>
    <div class="tree">
      <el-input clearable class="search-tree"
                placeholder="输入分类或表单名查找"
                suffix-icon="el-icon-search"
                v-model="searchTree">
      </el-input>
      <el-tree ref="objTree" :data="treeData"
               node-key="id"
               :props="defaultProps"
               @node-click="handleNodeClick"
               :expand-on-click-node="false"
               default-expand-all :highlight-current="true">
        <span class="span-ellipsis" slot-scope="{ node, data }">
		      <span :title="node.label">{{ node.label }}</span>
	      </span>
      </el-tree>
    </div>
  </div>
</template>

<script>
  import {getTreeNodesFromSvr, getBusinessObjects} from "@/bpm/api/model";
  import {getURIParam, parseFlatArrayToTree} from "../../../common/business/commonUtil";
  import {busObjEventBus} from "../../main";

  export default {
    name: 'sidebar',

    data() {
      return {
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        treeData: [],
        activeIndex: '1',
        searchTree: ''
      };
    },
    mounted() {
      //获取业务对象左树；
      this.getLeftTree(this.setCurrentNodeByKey);
      busObjEventBus.$on('refreshTree', (treeId) => {
        this.getLeftTree();
      });
    },
    methods: {
      setCurrentNodeByKey() {
        let param = getURIParam();
        if (param.id) {
          this.$nextTick(() => {
            this.$refs["objTree"].setCurrentKey(param.id); //选中节点
          })
        }
      },
      getLeftTree(callback) {
        let data = {
          treeKey: "ywdxfl",  //需要负责系统配置的tx保证不能修改；
          rootName: "ROOT_NODE" //前端传什么，树的root节点显示什么；
        };
        Promise.all([getTreeNodesFromSvr(data),getBusinessObjects({})]).then(res => {
          let temp = [];
          //res数组中的次序就是输入的次序，即使调用返回有先后
          res.forEach((item, index) => {
            if (0 == index) { //getTreeNodesFromSvr返回结果；

              let data = item.filter(item => {
                return item.name != "ROOT_NODE";
              });
              temp = data;
            } else if (1 == index && item.code == 200 && item.isOk) {
              temp = temp.concat(item.rows);
            }
          });
          this.treeData = parseFlatArrayToTree(temp);
          if (callback) {
            callback();
          }
        });
      },
      handleNodeClick(data) {
        busObjEventBus.$emit("busObjTreeNodeClick", data);
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
  .span-ellipsis {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>

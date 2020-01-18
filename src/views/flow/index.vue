<template>
  <div class="views-container">
    <el-container style="height:100%">
      <el-aside width="393px" class="left">
        <div class="left_mian_tree">
          <el-tree
            :key="tree.key"
            :data="tree.data"
            @node-click="fn_handleNodeClick"
            default-expand-all
            highlight-current
            :expand-on-click-node="false"
            accordion
            :props="tree.props"
            node-key="id"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <i class="treeLevel el-icon-folder" v-if="node.level===1"></i>
              <i class="treeLevel el-icon-tickets" v-else-if="node.level===2"></i>
              <i class="treeLevel el-icon-document" v-else-if="node.level===3"></i>
              <i class="treeLevel el-icon-document" v-else></i>
              <span>{{ node.label }}</span>
            </span>
          </el-tree>
        </div>
      </el-aside>
      <el-main class="right">
        <tableComment v-bind:table_getdata.sync="table" @handleSizeChange="handleSizeChange"
                      @handleCurrentChange="handleCurrentChange">
          <!-- 头部左侧添加内容示例 -->
          <template  v-slot:top_left>
            <el-input
              placeholder="请输入流程名称"
              size="small"
              style="width:300px"
              v-model="table.query"
              @keyup.enter.native="fetchFlowList(tree.id)"
            ></el-input>
            <el-button size="small" type="primary" @click="fetchFlowList(tree.id)">查询</el-button>
          </template>

          <!-- 头部列表控制按钮右侧添加内容是咧 -->
          <template  v-slot:top_button_left>
            <el-button size="small" type="success" @click="dialog.createVisible = true">添加</el-button>
            <el-button size="small" type="primary" @click="clearCacheFlow">清除系统缓存</el-button>
            <!--<el-button size="small" type="primary">导出</el-button>-->
          </template>

          <!-- 移动端列 -->
          <template v-slot:supportMobile="slotProps">
            {{
            slotProps.row.supportMobile === 0 ? '不支持'
            : slotProps.row.supportMobile === 1 ? '支持'
            : ''
            }}
          </template>

          <!-- 状态列 -->
          <template v-slot:status="slotProps">
            {{
            slotProps.row.status === 'draft' ? '草稿'
            : slotProps.row.status === 'deploy' ? '已发布'
            : slotProps.row.status === 'forbidden' ? '禁用'
            : ''
            }}
          </template>

          <!-- 列表操作示例-操作列按钮 -->
          <template  v-slot:doed="slotProps">
            <el-button type="text" style="color:#f56c6c" @click="removeFlowData(slotProps.row.id)">删除</el-button>
            <span>|</span>
            <el-button type="text" style="color:#67c23a">授权</el-button>
             <span>|</span>
            <el-button type="text" style="color:#e6a23c" @click="flow(slotProps.row.id)">流程设计</el-button>
            <span>|</span>
            <el-button type="text" style="color:#409eff">启动</el-button>
          </template>
        </tableComment>
      </el-main>
    </el-container>

    <!--弹出框-创建项目-->
    <create-flow
            :visible.sync="dialog.createVisible"
            :treeData="tree.data"
            @operationSuccess="closeCreateDialog"
            title="创建流程定义">
    </create-flow>
  </div>
</template>

<script>
import {
  fetchSysTreeNode, //获取树的数据
  fetchFlow, //获取table的数据
  removeFlow, //删除table的数据
  clearFlow, // 清楚缓存
} from "@/api/api.js";
import tableComment from "@/components/gy_table/table_comment"; // 新增数据源弹列表
import createFlow from "./dialogs/create-flow-modal.vue"; // 新增流程定义模态窗组件
import qs from "qs";
export default {
  name: "flow",
  components: {
    tableComment,
    createFlow
  },
  data() {
    return {
      //树节点数据
      tree:{
        data: [],
        id: '-1',
        key: 0,
        select_node: null,
        select_data: null,
        props: {
          children: "children",
          label: "name"
        },
      },
      // 表格
      table: {
        // 表格数据
        data: [],
        // 列表复选框选中
        multipleSelection: [],
        // 列的属性操作
        header: [
          {
            key: "name", //列的属性
            label: "流程名称", //列的表头名字
            width: "", //列的宽度
            minWidth: "150", //列的最小宽度
            disabled: true, //列是否能控制显示隐藏
            sortable:true,//列是否排序
          },
          {
            key: "key",
            label: "流程KEY",
            width: "",
            minWidth: "120",
            disabled: false
          },
          {
            key: "desc",
            label: "描述",
            width: "",
            minWidth: "150",
            disabled: false,
            sortable:true,//列是否排序
          },
          {
            key: "status",
            label: "状态",
            width: "",
            minWidth: "150",
            disabled: false
          },
          {
            key: "version",
            label: "版本",
            width: "",
            minWidth: "100",
            disabled: false
          },
          {
            key: "supportMobile",
            label: "移动端",
            width: "",
            minWidth: "100",
            disabled: false
          },
          {
            key: "createTime",
            label: "创建时间",
            width: "",
            minWidth: "200",
            disabled: false
          },
          {
            key: "doed",
            label: "操作",
            width: "",
            minWidth: "250",
            disabled: true
          }
        ],
        // 默认显示的列
        table_if: ["name", "key", "desc", "status", "version", "supportMobile", "createTime", "doed"],
        // 表格下面页码控制
        page: {
          currentPage: 1,
          pageSizes: [10, 20, 30, 40],
          pageSize: 100,
          total: 0
        },
        query: '',
        offset: 0,
        limit: 10,
      },
      // 选择机构的树
      tree_organization:{
        treeVisible: false,
        data: [],
        props: {
          children: "children",
          label: "name"
        },
        key: 0,
        //默认选中
        select:[],
      },
      dialog: {
        createVisible: false,
      },
    };
  },
  computed: {
  },
  mounted(){
    this.fn_getTreeData();
    this.fetchFlowList(this.tree.id);
  },
  methods: {
    //tree选中
    fn_handleNodeClick(data) {
      this.tree.id = data.id;
      this.table.offset = 0;
      this.table.limit = 10;
      this.table.query = '';
      // 获取列表数据
      this.fetchFlowList(data.id)
    },
    // 获取树的数据
    fn_getTreeData() {
      let param = {
        treeKey: 'flow',
        rootName: '所有数据',
      };
      fetchSysTreeNode(qs.stringify(param)).then(response => {
        let arr = this.ListToTree(response);
      this.tree.data = arr;
      this.tree_organization.data = arr;
      this.tree.key++;
    })
    .catch(errors => {
        console.error(errors);
    });
    },
    // 点击树获取table数据
    fetchFlowList(id) {
      let param = {
        "order": 'asc',
        "offset": this.table.offset,
        "limit": this.table.limit,
        "name_^VLK": this.table.query.replace(/\ +/g, ""),
        "type_id_$VEQ": id === '-1' ? '' : id,
      };
      fetchFlow(qs.stringify(param)).then(response => {
        if(response.code === '200') {
        this.table.data = response.rows;
        this.table.page.total = response.total;
      }
    })
    .catch(errors => {
        console.error(errors);
    });
    },
    // 删除流程
    removeFlowData(id) {
      this.$confirm("删除流程, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let param = {
          id: id,
        };
      removeFlow(qs.stringify(param)).then(response => {
        if(response.code === '200') {
        this.$message({
          message: response.msg,
          type: 'success'
        })
        this.fetchFlowList(this.tree.id);
      }
    })
    .catch(errors => {
        console.error(errors);
    });
      })
    },
    // 清楚缓存
    clearCacheFlow() {
      this.$confirm("清除缓存, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        clearFlow().then(response => {
        if(response.code === '200') {
        this.$message({
          message: response.msg,
          type: 'success'
        })
        this.fetchFlowList(this.tree.id);
      }
    })
    .catch(errors => {
        console.error(errors);
    });
      })
    },
    // 对树数据进行处理
    ListToTree(list) {
      const copyList = list.slice(0);
      const tree = [];
      for (let i = 0; i < copyList.length; i++) {
        // 找出每一项的父节点，并将其作为父节点的children
        for (let j = 0; j < copyList.length; j++) {
          if (copyList[i].parentId === copyList[j].id) {
            if (
                    copyList[j].children === undefined ||
                    copyList[j].children == ""
            ) {
              copyList[j].children = [];
            }
            // 根据sn确定当前层级下标
            copyList[j].children.push(copyList[i]);
            // copyList[j].children[copyList[i].sn - 1] = copyList[i];
          }
        }
        // 把根节点提取出来，parentId为null的就是根节点
        if (
                copyList[i].parentId === null ||
                copyList[i].parentId === undefined ||
                copyList[i].parentId === "0" ||
                copyList[i].parentId === 0
        ) {
          tree.push(copyList[i]);
        }
      }
      return tree;
    },
    //改变每页条数触发
    handleSizeChange(data) {
      this.table.limit = data;
      this.fetchFlowList(this.tree.id);
    },
    //改变页码触发
    handleCurrentChange(data) {
      this.table.offset = data * 10 - 10;
      this.fetchFlowList(this.tree.id);
    },
    // 关闭模态窗后的操作
    closeCreateDialog(){
      this.fetchFlowList(this.tree.id);
    },
    // 点击流程设计按钮
    flow(id) {
      window.open('flow.html?id=' + id);
    }
  }
};
</script>

<style lang="scss" scoped>
.views-container {
  margin-top: 10px;
  padding: 10px;
  overflow: hidden;
  height: 100%;
}

.left {
  position: relative;
  .left_mian_tree {
    height: 100%;
    position: relative;
    overflow: auto;
    background-color: #fbfbfb;
    border: 1px solid #dcdfe6;
    border-radius: 3px;
  }
  /deep/ .el-tree {
    background-color: #fbfbfb;
  }
}

.right {
  width: 100%;
  margin-left: 20px;
  margin-right: 20px;
  padding: 0;
  .right_top {
    overflow: hidden;
    .search_user {
      float: left;
      .el-input {
        width: 300px;
      }
    }
    .button_user {
      float: right;
    }
  }
  .main_table{
    .user_table {
      margin-top: 20px;
      border: 1px solid #dfe6ec;
      border-bottom: 0;
    }
    /deep/ .el-pagination{
      text-align: right;
      margin: 10px 0;
    }
  }
}
// tree的图标样式
.el-tree{
  .treeLevel {
    width: 16px;
    height: 16px;
    display: inline-block;
    margin-bottom: -2px;
  }
}
</style>
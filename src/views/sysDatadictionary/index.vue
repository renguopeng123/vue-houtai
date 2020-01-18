<template>
  <div class="views-container">
      <el-aside class="left">
        <div class="left_top" @click="fn_getTreeData()">分类</div>
        <div class="left_mian">
          <div class="left_mian_tree">
            <el-tree
              :key="sysDatadictiontree.key"
              :data="sysDatadictiontree.data"
              @node-click="fn_handleNodeClick"
              default-expand-all
              highlight-current
              :expand-on-click-node="false"
              accordion
              node-key="id"
              :props="sysDatadictiontree.props">
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <!-- <i :class="data.icon"></i> -->
                <i class="el-icon-platform-eleme" v-if="data.iconNum===1"></i>
                <i class="el-icon-user" v-else-if="data.iconNum===2"></i>
                <i class="el-icon-star-off" v-else-if="data.iconNum===3"></i>
                <i class="el-icon-coin" v-else></i>
                <span>{{ node.label }}</span>
              </span>
            </el-tree>
          </div>
        </div>
      </el-aside>
      <el-main class="right">
        <div class="right_top">
          字典
          <el-button type="primary" @click="addsysDatadictionaryDialog()">添加数据字典</el-button>
        </div>
        <el-table
          :data="dictionarytablist"
          ref="multipleTable"
          style="width: 100%"
          class="user_table">
          <el-table-column prop="name" label="字典名" min-width="150"></el-table-column>
          <el-table-column prop="key" label="字典Key" min-width="150"></el-table-column>
          <el-table-column prop="createTime" label="创建日期" min-width="150"></el-table-column>
          <el-table-column label="管理" min-width="100">
              <template slot-scope="scope">
                  <el-button type="text" @click="editsysDatadictionaryDialog(scope.row)">编辑</el-button>
                  <el-button type="text" @click="delsysDatadictionaryInfo(scope.row)">删除</el-button>
              </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="page.currentPage"
          :page-size="page.pageSize"
          layout="total, prev, pager, next"
          :total="page.total">
        </el-pagination>
      </el-main>

       <newsysDatadictionary-Dialog
          v-bind:visible.sync="dialog_show.newsysDatadictionaryDialog"
          @closed="closeDialog"
          :edit_data="to_edit_data"
          :add_data="to_add_data"
          :title="add_OR_editor+'数据字典'">
       </newsysDatadictionary-Dialog>
  </div>

</template>

<script>
import {
  sysDatadictTreenodeinfo, //获取树的数据
  getSysdatadictiontreeListById, //点击获取树完整数据
  delSysDatadictionaryById, //删除字典信息
} from "@/api/api.js";
import newsysDatadictionaryDialog from "./dialogs/new-sysDatadictionary-dialog"; // 添加数据字典
export default {
  name: "dept",
  components: {
    newsysDatadictionaryDialog
  },
  data() {
    return {
      //左侧树节点数据
      sysDatadictiontree:{
        data: [],
        key: 0,
        select_node: null,
        select_data: null,
        props: {
          children: "children",
          label: "name"
        },
      },
      // tree_props:{
      //     children: 'children',
      //     label: 'groupName',
      // },

      dict: "dict",

      dialog_show: {
        newsysDatadictionaryDialog: false,
      },
      to_edit_data:{},
      to_add_data:"",
      add_OR_editor: "",
      editree:"",
      
      ruleForm: {
        name: "",
        allAame: "",
        superior: "",
        coding: "",
        remarks: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入机构名称",
            trigger: ["blur", "change"]
          }
        ],
        allAame: [
          {
            required: false,
            message: "请输入机构全称",
            trigger: ["blur", "change"]
          }
        ],
        superior: [
          {
            required: false,
            message: "请输入上级机构",
            trigger: ["blur", "change"]
          }
        ],
        coding: [
          {
            required: false,
            message: "请输入机构编码",
            trigger: ["blur", "change"]
          }
        ],
        remarks: [
          {
            required: false,
            message: "请填写备注",
            trigger: ["blur", "change"]
          }
        ]
      },

      dictionarytablist: [],
      page: {
        currentPage: 0,
        pageSizes: [10, 20, 50],
        pageSize: 10,
        total: 0
      },
      
      dialogVisible: false,
      
    };
  },
  computed: {},
  mounted(){
    this.fn_getTreeData();
  },
  methods: {
    //新增数据字典弹窗
    addsysDatadictionaryDialog() {
      this.add_OR_editor = "新增";
      this.dialog_show.newsysDatadictionaryDialog = true;
      this.$refs.multipleTable.clearSelection();
      // console.log("add",this.editree)
      this.to_add_data = this.editree;
    },

    //编辑数据字典
    editsysDatadictionaryDialog(row){
      this.add_OR_editor = "编辑";
      this.dialog_show.newsysDatadictionaryDialog = true;
      this.to_edit_data = row;
      this.$refs.multipleTable.clearSelection();
      // console.log("to_edit_data",this.to_edit_data)
    },

    /*点击获取该树列表信息*/
    fetchDataDictionarylist(select_data){
      let param = {
        "type_id_^VEQ": select_data.id,
      };
      getSysdatadictiontreeListById(param)
        .then(response => {
          // console.log("aaa",response);
          this.dictionarytablist = response.data;
          this.page.total = parseInt(response.data.length);
        })
        .catch(error => {
          console.error(error);
        });
    },

    //tree选中
    fn_handleNodeClick(data, node, data3) {
      this.sysDatadictiontree.select_data = data;
      this.select_node = node;
      this.$nextTick(function() {
        // console.log("id",this.sysDatadictiontree.select_data);
        this.editree = this.sysDatadictiontree.select_data.name;
        // console.log("editree",this.editree);
        this.fetchDataDictionarylist(this.sysDatadictiontree.select_data)
      });
    },

    //删除字典信息
    delsysDatadictionaryInfo(row){
      this.$confirm('确定要删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
              let param = {
                id: row.id,
              };
              delSysDatadictionaryById(param)
                .then(response => {
                  this.$message({
                    message: response.msg,
                    type: "success"
                  });
                  this.fetchDataDictionarylist(this.sysDatadictiontree.select_data)
                })
                .catch(error => {
                  console.error(error);
                });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
    },

    //分页
    handleCurrentChange(val) {
      // console.log(`当前页1: ${val}`);
      this.temp = val;
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.page.pageSize = val;
    },

    //tree删除
    fn_remove(node, data) {
      if (node === null || node === undefined) {
        this.$message("请选中需要删除的节点");
        return false;
      }
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
      this.select_data = null;
      this.select_node = null;
    },
    //tree增加
    fn_append(data) {
      if (data === null || data === undefined) {
        this.$message("请选中节点");
        return false;
      }
      this.dialogVisible = true;
    },
    //tree上移
    fn_treeUp(node, data) {
      if (node === null || node === undefined) {
        this.$message("请选中需要移动的节点");
        return false;
      }
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      this.zIndexUp(children, index, children.length);
      this.tree_key++;
      this.select_data = null;
      this.select_node = null;
    },
    //tree下移
    fn_treeDown(node, data) {
      if (node === null || node === undefined) {
        this.$message("请选中需要移动的节点");
        return false;
      }
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      this.zIndexDown(children, index, children.length);
      this.tree_key++;
      this.select_data = null;
      this.select_node = null;
    },
    /**
     * 数组元素交换位置
     * @param {array} arr 数组
     * @param {number} index1 添加项目的位置
     * @param {number} index2 删除项目的位置
     * index1和index2分别是两个数组的索引值，即是两个要交换元素位置的索引值
     */
    //获取树的数据
    fn_getTreeData(){
      let param = {
        treeKey: this.dict
      };
      sysDatadictTreenodeinfo(param)
        .then(response => {
          // console.log(response);
          let arr = this.ListToTree(response);
          this.sysDatadictiontree.data = arr;
          // console.log("shu",arr);
        })
        .catch(errors => {
          console.error(errors);
        });
    },
    // 对树数据进行处理
    ListToTree(list) {
      const copyList = list.slice(0);
      const tree = [];
      for (let i = 0; i < copyList.length; i++) {
          tree.push(copyList[i]);
      }
      return tree;
    },

    /*关闭弹窗操作*/
    closeDialog(){
      this.fn_getTreeData();
      this.fetchDataDictionarylist();
    },

    /* 用户信息-start */
      // 打开用户信息
      fn_open_userMessage(){
        this.userMessage.drawerVisible=true;
      },
      // 关闭用户信息
      fn_close_userMessage(){
        this.userMessage.drawerVisible=false;
      }
    /* 用户信息-end */
  }
};
</script>

<style lang="scss" scoped>
.views-container{
  padding: 10px;
  height: 100%;
  width: 98%;
  margin: 0 auto;
  .left {
      position: relative;
      width: 19%!important;
      float: left;
      .left_top {
        height: 57px;
        line-height: 57px;
        padding-left: 20px;
        border-bottom: 2px solid #dcdfe6;
        /deep/ i {
          font-weight: bold;
        }
      }
      .left_mian {
        box-sizing: border-box;
        height: 100%;
        // overflow: hidden;
        .left_top {
          height: 57px;
          line-height: 57px;
          padding-left: 20px;
          border-bottom: 2px solid #dcdfe6;
        }
        .left_mian_tree {
          position: relative;
          height: auto!important;
          height: 300px;
          min-height: 300px;
          background-color: #fbfbfb;
          border: 1px solid #dcdfe6;
          border-top: none;
          border-radius: 3px;
        }
        /deep/ .el-tree {
          background-color: #fbfbfb;
          padding: 15px 0px;
          // border: 1px solid #dcdfe6;
          // border-radius: 3px;
        }
        /deep/ .el-tree-node__content{
          height: 36px;
          line-height: 36px;
        }
      }
  }
  .right {
    width: 79%;
    padding: 0;
    float: right;
    .right_top {
      height: 57px;
      line-height: 57px;
      padding-left: 20px;
      border-bottom: 2px solid #dcdfe6;
      /deep/ .el-button--medium{
        float: right;
        margin-top: 8px;
      }
    }
    .ruleForm {
      padding: 20px 60px 0;
      .form_box1 {
        overflow: hidden;
        .el-form-item {
          float: left;
          width: 50%;
          padding-right: 5%;
        }
        .el-form-item + .el-form-item {
          float: left;
          width: 50%;
          padding-right: 0;
          padding-left: 5%;
        }
      }
      .form_button {
        text-align: center;
      }
    }
    .right_top_search {
      overflow: hidden;
      .user_search {
        float: right;
        .el-input {
          width: 300px;
        }
      }
    }
    /deep/ .el-table th, /deep/ .el-table td{
      text-align: center;
    }

    //分页
    /deep/ .el-pagination{
      margin-top: 15px;
      margin-bottom: 15px;
      float: right;
    }

    .user_table {
      margin-top: 20px;
      border: 1px solid #dfe6ec;
      border-bottom: 0;
    }
  }
}
/deep/ .el-dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: 0 !important;
  transform: translate(-50%, -50%);
  // max-height:calc(100% - 30px);
  // max-width:calc(100% - 30px);
  max-height: 80%;
  max-width: 70%;
  display: flex;
  flex-direction: column;
  border-radius: 7px;
  overflow: hidden;
  > .el-dialog__header {
    background-color: #fff;
    border-bottom: 1px solid #dcdfe6;
    > .el-dialog__title {
      color: #303133 !important;
    }
  }
  > .el-dialog__body {
    overflow: auto;
    color: #666666;
    padding: 20px;
    .diaologMain {
      padding: 20px 50px;
    }
  }
  > .el-dialog__footer {
    padding: 10px 20px 10px;
    border-top: 1px solid #dcdfe6 !important;
  }
}

// 抽屉样式
.drawer {
  /deep/ #el-drawer__title {
    background-color: #fff;
    border-bottom: 1px solid #dcdfe6;
    color: #303133 !important;
    margin-bottom: 0;
    padding: 10px 20px;
  }
  /deep/ .el-drawer__body {
    height: 100%;
    display: flex;
    flex-direction: column;
    .drawer_main {
      flex: 1;
      overflow: auto;
      position: relative;
    }
    .drawer_footer {
      border-top: 1px solid #dcdfe6;
      padding: 10px 20px;
    }
  }
}
// 用户信息
.form_userMessage {
  margin-top: 20px;
  width: 500px;
  padding: 10px 20px;
  /deep/ .el-input.is-disabled .el-input__inner {
    // background-color: #F5F7FA;
    // border-color: #dfe4ed;
    color: #909399;
    // cursor: not-allowed;
  }
  .organization_body {
    height: 36px;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    .organization_box {
      flex: 1;
      height: 36px;
      // border: 1px solid #dfe4ed;
      // border-radius: 4px;
      // background-color: #f6f7fb;
      line-height: 35px;
      .el-tag {
        margin: 2px 0px 2px 6px;
      }
    }
    .organization_search {
      border-radius: 0 4px 4px 0;
    }
  }
}
</style>
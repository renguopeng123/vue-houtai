<template>
  <div class="views-container">
      <div class="views-search">
          <span> 名称：
            <el-input v-model="runName" placeholder="名称"></el-input>
          </span>
          <el-button @click="fetchDesystemtreelist()" type="primary">查询</el-button>
          <el-button @click="resetRUNtemp()">重置</el-button>
      </div>
      <div>
          <h2>
              <el-button @click="addDeveserialnumDialog()" type="primary">新增</el-button>
              <div>
                  <a href="#"></a>
              </div>
          </h2>
          <el-table
            :data="systemTreelistData"
            ref="multipleTable"
            @selection-change="handleSelectionChange"
            @row-click="fn_rowClick"
            style="width: 100%"
            border>
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column align="center" label="名称">
              <template slot-scope="scope">
                  {{scope.row.name}}
              </template>
            </el-table-column>
            <el-table-column align="center" label="别名" width="150">
              <template slot-scope="scope">
                  {{scope.row.key}}
              </template>
            </el-table-column>
            <el-table-column align="center" label="系统内置">
              <template slot-scope="scope">
                  <el-button v-if="scope.row.system == true" type="text">是</el-button>
                  <el-button v-if="scope.row.system == false" type="text">否</el-button>
              </template>
            </el-table-column>
            <el-table-column label="管理" align="center" width="180">
              <template slot-scope="scope">
                  <el-button type="text" @click="editScriptDialog(scope.row)">编辑</el-button>
                  <el-button type="text" @click="editScriptDrawer(scope.row)">编辑树</el-button>
                  <el-button type="text" @click="delDescriptInfo(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
      </div>
      <div class="pagesNum">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="page.currentPage"
          :page-size="page.pageSize"
          layout="total, prev, pager, next"
          :total="page.total">
        </el-pagination>
      </div>

      <!--弹出框-新增编辑-->
      <newsystemtree-dialog
          v-bind:visible.sync="dialog_show.newsystemtreeDialog"
          @closed="closeDialog"
          :edit_data="to_edit_data"
          :title="add_OR_editor">
      </newsystemtree-dialog>

      <!--编辑树节点-->
      <el-drawer
        title="编辑树节点"
        :visible.sync="editsystemtreeDrawer"
        :direction="direction"
        :size="drawsize"
        @closed="closeDrawer">
        <div class="treecontent">
          <el-tree
            :key="treenode.key"
            :data="treenode.data"
            @node-click="fn_handleNodeClick"
            ref="treenoderef"
            default-expand-all
            highlight-current
            :expand-on-click-node="false"
            accordion
            :props="treenode.props"
            node-key="id">
          </el-tree>
          <div class="treecontentrl">
              <el-form :model="deSystemtreenodeForm" ref="deSystemtreenodeForm" label-width="120px" class="demo-ruleForm">
                <el-form-item label="父节点：">
                  <span>{{deSystemtreenodeForm.parentnode}}</span>
                </el-form-item>
                <el-form-item label="名字：">
                  <el-input v-model="deSystemtreenodeForm.name" class="el-inputname"></el-input>
                </el-form-item>
                <el-form-item label="别名：">
                  <el-input v-model="deSystemtreenodeForm.key" class="el-inputname"></el-input>
                </el-form-item>
                <el-form-item label="描述：">
                  <el-input
                    v-model="deSystemtreenodeForm.desc"
                    type="textarea"
                    :rows="3"
                    placeholder="请输入内容">
                  </el-input>
                </el-form-item>
            </el-form>
            <div class="treecontbtn">
              <el-button @click="fn_DetreenodeAdd()" type="primary">新增节点</el-button>
              <el-button @click="fn_DetreenodeSave()" type="primary">保存节点</el-button>
              <el-button @click="fn_DetreenodeDel()" type="primary">删除节点</el-button>
            </div>
          </div>
        </div>
      </el-drawer>

  </div>
</template>

<script>
import {
  getdesystemTreeData,  //获取系统树列表数据
  getSystemtreefullInfoById,  //根据ID返回该脚本的完整信息
  delSystreeById,  //根据ID删除该行信息
  systemTreenodeinfo,   //展示节点列表数据
  systemTreenodeSave,   //保存，更新节点
  systemTreenodeDel,    //删除节点
} from "@/api/api.js";

import newsystemtreeDialog from "./dialogs/new-systemtree-dialog"; // 新增编辑
export default {
  name: "commonscript",
  components: {
    newsystemtreeDialog
  },
  data() {
    return {
      runName: "",
      systemTreelistData:[],
      to_edit_data:{},
      to_edit_node:{},
      add_OR_editor: "",
      dialog_show: {
        newsystemtreeDialog: false,
      },
      editsystemtreeDrawer: false,
      direction: 'rtl',
      drawsize:"50%",
      page: {
        currentPage: 1,
        pageSizes: [10, 20, 50],
        pageSize: 10,
        total: 0
      },

      //编辑树节点数据
      treenode:{
        data: [],
        key: 0,
        select_node: null,
        select_data: null,
        props: {
          children: "children",
          label: "name"
        },
      },

      deSystemtreenodeForm:{
          parentnode:"",
          parentId:"",
          id:"",
          name:"",
          key:"",
          desc:"",
       },

    }
  },
  computed: {},
  methods: {
    handleSelectionChange(val) {
      //val是选中选的数组集合，包含每一个选中项的数据
      this.multipleSelection = val; //选择项发生变化时，选中数组变量跟着改变
    },
    //表格单选
    fn_rowClick(row, column, event) {
      //当某一行被点击时，改行多选框被选中
      this.$refs.multipleTable.toggleRowSelection(row);
    },

    /*查询列表信息*/
    fetchDesystemtreelist(pageFlag){
      /* 初始化当前页 */
      let currPageBefore = this.page.currentPage;
      /* 判断是否是分页  如果当前页是第二页  查询的时候从第一页开始 */
      if(pageFlag!=='page'){
        this.page.currentPage = 1;
      }
      let param = {
        name: this.runName,
        pageNo: this.page.currentPage,
        pageSize: this.page.pageSize
      };
      getdesystemTreeData(param)
        .then(response => {
          this.systemTreelistData = response.rows;
          this.page.total = parseInt(response.total);
        })
        .catch(error => {
          console.error(error);
          this.page.currentPage = currPageBefore;
        });
    },
    /*重置*/
    resetRUNtemp(){
      this.runName ="";
      this.page.currentPage=1;
      this.fetchDesystemtreelist();

    },
    /*新增系统树*/
    addDeveserialnumDialog(){
      this.add_OR_editor = "新增";
      this.dialog_show.newsystemtreeDialog = true;
    },

    /*编辑*/
    editScriptDialog(row) {
      this.add_OR_editor = "编辑";
      let param = {
        id: row.id
      };
      getSystemtreefullInfoById(param)
        .then(response => {
          this.to_edit_data = response.data;
          this.dialog_show.newsystemtreeDialog = true;
          this.$refs.multipleTable.clearSelection();
      })
    },
    //编辑树节点、打开抽屉
    editScriptDrawer(row){
      this.editsystemtreeDrawer = true;
      this.fetchDesystemtreenode(row);
    },

    /*展示树节点*/
    fetchDesystemtreenode(row){
      let param = {
        treeId: row.id
      };
      systemTreenodeinfo(param)
        .then(response => {
            let arr = this.ListToTree(response);
            this.treenode.data = arr;
            this.treenode.key++;
        })
        .catch(error => {
          console.error(error);
        });
    },

    // 对树数据进行处理
    ListToTree(list) {
      const copyList = list.slice(0);
      const tree = [];
      // for (let i = 0; i < copyList.length; i++) {
      //     tree.push(copyList[i]);
      // }
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
      console.log("tree",tree);
    },

    //tree选中
    fn_handleNodeClick(data, node, data3) {
        this.treenode.select_data = data;
        this.treenode.select_node = node;
        this.$nextTick(function() {
          this.deSystemtreenodeForm = data;
          this.deSystemtreenodeForm.parentnode = node.parent.label;
        });
    },

    //新增节点
    fn_DetreenodeAdd(){
      // this.$refs.treenoderef.setCheckedKeys();
      this.$refs.treenoderef.node-key == "";
      this.deSystemtreenodeForm.name = "";
      this.deSystemtreenodeForm.key = "";
      this.deSystemtreenodeForm.desc = "";
    },

    //点击保存节点信息
    fn_DetreenodeSave() {
      let param = {
        id: this.deSystemtreenodeForm.id,
        parentId: this.deSystemtreenodeForm.parentId,
        parentName: this.deSystemtreenodeForm.parentnode,
        name: this.deSystemtreenodeForm.name,
        key: this.deSystemtreenodeForm.key,
        desc: this.deSystemtreenodeForm.desc
      };
      systemTreenodeSave(param)
        .then(response => {
          this.$message({
            message: response.msg,
            type: "success"
          });
        })
        .catch(error => {
          console.error(error);
        });
        this.editsystemtreeDrawer = false;
    },

    //删除节点
    fn_DetreenodeDel(){
      let param = {
        id: this.deSystemtreenodeForm.id,
      };
      systemTreenodeDel(param)
        .then(response => {
          this.$message({
            message: response.message,
            type: "success"
          });
        })
        .catch(error => {
          console.error(error);
        });
        this.editsystemtreeDrawer = false;
    },

    /*删除*/
    delDescriptInfo(row) {
      this.$confirm('确定要删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
      let param = {
        id: row.id
      };
      delSystreeById(param)
        .then(response => {
          if (response.isOk === true) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.fetchDesystemtreelist();
          } else {
            this.$message.error("删除失败");
          }
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

    /*关闭弹窗操作*/
    closeDialog(){
      this.fetchDesystemtreelist();
    },

    /*关闭抽屉操作*/
    closeDrawer(){
      this.deSystemtreenodeForm.parentnode = "";
      this.deSystemtreenodeForm.id = "";
      this.deSystemtreenodeForm.name = "";
      this.deSystemtreenodeForm.key = "";
      this.deSystemtreenodeForm.desc = "";
    },

    //分页
    handleCurrentChange(val) {
      // console.log(`当前页1: ${val}`);
      this.temp = val;
      this.fetchDesystemtreelist("page");
      // this.currentDBRow = "-1";
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.page.pageSize = val;
      this.fetchDesystemtreelist("page");
    },

  },
  // mounted--钩子函数，一来到该页面即执行
  mounted: function() {
    this.fetchDesystemtreelist();
  }
};
</script>

<style lang="scss" scoped>
.views-container {
  padding: 10px 70px 10px 10px;
  height: 100%;
}
.views-search{
  width: auto;
  padding: 6px 0;
  clear: both;
  margin-bottom: 10px;
}
.views-search span{
  padding: 0px 10px;
}
.views-search span /deep/ .el-input{
  width: 30%;
}
.views-search span /deep/ .el-select .el-input{
  width: 90%;
}
.pagesNum {
  margin-top: 15px;
  text-align: right;
}
/deep/ .el-drawer__header{
  margin-bottom: 10px;
  height: 46px;
  line-height: 46px;
  border-bottom: 1px solid #dcdfe6;
  padding: 0px 20px;
  color: #222;
}
.treecontent{
  width: 90%;
  margin: 0 auto;
  padding: 20px 0px;
}
/deep/ .el-tree{
  width: 30%;
  float: left;
}
/deep/ .el-tree-node__content{
  height: 32px;
  line-height: 32px;
}
.treecontentrl{
  width: 70%;
  float: right;
  text-align: left;
}
/deep/ .el-form-item{
  margin-bottom: 10px;
}
.treecontbtn{
  margin-top: 20px;
  text-align: right;
  padding-right: 10px;
}

</style>
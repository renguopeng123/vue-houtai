<template>
  <div class="views-container">
      <div class="views-search">
          <span> 名称：
            <el-input v-model="templeName" placeholder="请输入需要检索的模板名称"></el-input>
          </span>
          <el-button @click="fetchDataSourcetemp()" type="primary">查询</el-button>
          <el-button @click="resetDStemp()">重置</el-button>
      </div>
      <div>
          <h2>
              <el-button @click="addDStempDialog()" type="primary">新增</el-button>
              <div>
                  <a href="#"></a>
              </div>
          </h2>
          <el-table
            :data="systemDatasource"
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
            <el-table-column align="center" label="对应类路径">
              <template slot-scope="scope">
                  {{scope.row.classPath}}
              </template>
            </el-table-column>
            <el-table-column label="管理" align="center" width="120">
              <template slot-scope="scope">
                  <el-button type="text" @click="editDStempDialog(scope.row)">编辑</el-button>
                  <el-button type="text" @click="delDStempdata(scope.row)">删除</el-button>
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

      <!--弹出框-新增-->
      <newDStemp-dialog
        v-bind:visible.sync="dialog_show.newDStempDialog"
        @open-otherdialogs="fn_opendiaolog"
        @closed="closeDialog"
        :edit_data="to_edit_data"
        :title="add_OR_editor">
      </newDStemp-dialog>
  </div>
</template>

<script>
import {
  getDatasourceListData,  //获取数据源模板列表数据
  removeDStemp,  //删除数据源模板数据
  getDStempInfoById,  //根据ID返回该行的完整信息
} from "@/api/api.js";

import newDStempDialog from "./dialogs/new-DStemp-dialog"; // 新增数据源模板
export default {
  name: "dept",
  components: {
    newDStempDialog
  },
  data() {
    return {
      templeName: "",
      systemDatasource:[],
      to_edit_data:{},
      add_OR_editor: "",
      dialog_show: {
        newDStempDialog: false
      },

      page: {
        currentPage: 0,
        pageSizes: [10, 20, 50],
        pageSize: 10,
        total: 0
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
      // console.log("row"+ event.target.innerHTML);
      this.currentDSRow = row;
    },

    /*查询列表信息*/
    fetchDataSourcetemp(){
      let param = {
        offset: this.page.currentPage,
        limit: this.page.pageSize,
        name: this.templeName,
      };
      getDatasourceListData(param)
        .then(response => {
          this.systemDatasource = response.rows;
          this.page.total = parseInt(response.total);
        })
        .catch(error => {
          console.error(error);
        });
    },
    /*重置*/
    resetDStemp(){
      this.fechsystem ="";
      this.page.currentPage=1;
      this.fetchDataSourcetemp();

    },
    /*新增*/
    addDStempDialog() {
      this.add_OR_editor = "新增";
      this.dialog_show.newDStempDialog = true;
    },

    /*编辑数据源*/
    editDStempDialog(row) {
      this.add_OR_editor = "编辑";
      let param = {
        id: row.id
      };
      getDStempInfoById(param)
        .then(response => {
          this.to_edit_data = response.data;
          this.dialog_show.newDStempDialog = true;
          this.$refs.multipleTable.clearSelection();
      })
    },
    
    //删除
    delDStempdata(row) {
      this.$confirm('确定要删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
      let param = {
        id: row.id
      };
      removeDStemp(param)
        .then(response => {
          if (response.isOk === true) {
            this.$message({
              type: 'success',
              message: response.msg
            });
          } else {
            this.$message.error("删除失败");
          }
          this.fetchDataSourcetemp();
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

    fn_opendiaolog(data) {
      
    },

    /*关闭弹窗操作*/
    closeDialog(){
      this.fetchDataSourcetemp();
    },

    //分页
    handleCurrentChange(val) {
      // console.log(`当前页1: ${val}`);
      this.temp = val;
      this.fetchDataSource("page");
      // this.currentDBRow = "-1";
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.page.pageSize = val;
      this.fetchDataSource("page");
    },

  },
  // mounted--钩子函数，一来到该页面即执行
  mounted: function() {
    this.fetchDataSourcetemp();
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
  width: 40%;
}
.pagesNum {
  margin-top: 15px;
  text-align: right;
}
</style>
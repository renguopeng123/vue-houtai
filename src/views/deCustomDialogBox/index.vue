<template>
  <div class="views-container">
    <div class="views-search">
      <span> 别名：
        <el-input v-model="anotherName" placeholder="请输入别名"></el-input>
      </span>
      <span> 名称：
        <el-input v-model="runName" placeholder="请输入名称"></el-input>
      </span>
      <el-button @click="fetchDecusdialogboxtemp()" type="primary">查询</el-button>
      <el-button @click="resetRUNtemp()">重置</el-button>
    </div>
    <div>
      <h2>
        <el-button @click="addCustomboxDialog()" type="primary">新增</el-button>
        <div>
          <a href="#"></a>
        </div>
      </h2>
      <el-table :data="custDialogboxlistData" ref="multipleTable" @selection-change="handleSelectionChange"
        @row-click="fn_rowClick" style="width: 100%" border :key='tableKey'>
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column align="center" label="别名">
          <template slot-scope="scope">
            {{scope.row.key}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="名称">
          <template slot-scope="scope">
            {{scope.row.name}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="显示类型" width="100">
          <template slot-scope="scope">
            <el-button v-if="scope.row.style =='list'" type="text">列表</el-button>
            <!-- <el-button v-if="scope.row.style =='0'" type="primary">递增</el-button> -->
          </template>
        </el-table-column>
        <el-table-column align="center" label="对象类型" width="100">
          <template slot-scope="scope">
            <el-link v-if="scope.row.objType =='table'" type="primary">表</el-link>
            <el-link v-if="scope.row.objType =='view'" type="success">视图</el-link>
          </template>
        </el-table-column>
        <el-table-column align="center" label="对象名称">
          <template slot-scope="scope">
            {{scope.row.objName}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="数据源" width="180">
          <template slot-scope="scope">
            {{scope.row.dsName}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="系统内置" width="80">
          <template slot-scope="scope">
            <el-link v-if="scope.row.system ==true" type="primary">是</el-link>
            <el-link v-if="scope.row.system ==false" type="success">否</el-link>
          </template>
        </el-table-column>
        <el-table-column label="管理" align="center" width="180">
          <template slot-scope="scope">
            <el-button type="text" @click="editCustomboxDialog(scope.row)">编辑</el-button>
            <ab-cust-dialog :dialogKey="scope.row.key" v-model="abCustDialogData">
              <!-- <el-button type="text" @click="privieDecustomboxDialog(scope.row)">预览</el-button> -->
                   <el-button type="text" >预览</el-button>
                   <!-- <el-button type="text" >{{scope.row.key}}</el-button> -->
            </ab-cust-dialog>
            <el-button type="text" @click="privieDecustomboxInfo(scope.row)">预览查询</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagesNum">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page.sync="page.currentPage" @prev-click="handleCurrentChange" @next-click="handleCurrentChange"
        :page-sizes="page.pageSizes" :page-size="page.pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="page.total">
      </el-pagination>
    </div>

    <!--弹出框-新增编辑-->
    <newcustombox-dialog v-bind:visible.sync="dialog_show.newcustomboxDialog" @closed="closeDialog"
      :edit_data="to_edit_data" :title="add_OR_editor">
    </newcustombox-dialog>

    <!--弹出框-预览-->
    <priviewcustombox-dialog v-bind:visible.sync="dialog_show.priviewcustomboxDialog" @closed="closeDialog"
      :priview_data="to_info_data">
    </priviewcustombox-dialog>

  </div>
</template>

<script>
  import {
    getdecusdialogboxData, //获取自定义对话框列表数据
    getDecustomboxfullInfo, //根据ID返回该脚本的完整信息
    // delDescriptById,  //根据ID删除该行信息
  } from "@/api/api.js";

  import newcustomboxDialog from "./dialogs/new-custombox-dialog"; // 编辑新增对话框
  import priviewcustomboxDialog from "./dialogs/priview-custombox-dialog"; // 编辑新增对话框

  export default {
    name: "commonscript",
    components: {
      newcustomboxDialog,
      priviewcustomboxDialog
    },
    data() {
      return {
        tableKey:0,
        anotherName: "",
        runName: "",
        custDialogboxlistData: [],
        to_edit_data: {},
        to_info_data: {},
        add_OR_editor: "",
        dialog_show: {
          newcustomboxDialog: false,
          priviewcustomboxDialog: false
        },
        temp: 1,
        page: {
          currentPage: 1,
          pageSizes: [10, 25, 50, 100],
          pageSize: 10,
          total: 0
        },
        abCustDialogData: []
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
      fetchDecusdialogboxtemp(pageFlag) {
        /* 初始化当前页 */
        let currPageBefore = this.page.currentPage;
        /* 判断是否是分页  如果当前页是第二页  查询的时候从第一页开始 */
        if (pageFlag !== 'page') {
          this.page.currentPage = 1;
        }
        let param = {
          offset: (this.temp - 1) * this.page.pageSize,
          limit: this.page.pageSize,
          name: this.runName,
          key: this.anotherName
        };
        getdecusdialogboxData(param)
          .then(response => {
            this.custDialogboxlistData = response.rows;
            this.page.total = parseInt(response.total);
            this.tableKey++
          })
          .catch(error => {
            console.error(error);
            this.page.currentPage = currPageBefore;
          });
      },
      /*重置*/
      resetRUNtemp() {
        this.runName = "";
        this.anotherName = "";
        this.page.currentPage = 1;
        this.fetchDecusdialogboxtemp();

      },
      /*新增*/
      addCustomboxDialog() {
        this.add_OR_editor = "新增";
        this.dialog_show.newcustomboxDialog = true;
      },

      /*编辑*/
      editCustomboxDialog(row) {
        this.add_OR_editor = "编辑";
        let param = {
          id: row.id
        };
        getDecustomboxfullInfo(param)
          .then(response => {
            this.to_edit_data = response.data;
            console.log("toedit", response);
            this.dialog_show.newcustomboxDialog = true;
            this.$refs.multipleTable.clearSelection();
          })
      },

      /*预览*/
      privieDecustomboxDialog(row) {
        let param = {
          key: row.key
        };
        getDecustomboxfullInfo(param)
          .then(response => {
            this.to_info_data = response;
            console.log("toinfo", response);
            this.dialog_show.priviewcustomboxDialog = true;
            this.$refs.multipleTable.clearSelection();
          })
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
          delDescriptById(param)
            .then(response => {
              if (response.isOk === true) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.fetchDecusdialogboxtemp();
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
      closeDialog() {
        this.fetchDecusdialogboxtemp();
      },

      //分页
      handleCurrentChange(val) {
        // console.log(`当前页1: ${val}`);
        this.temp = val;
        this.fetchDecusdialogboxtemp("page");
        // this.currentDBRow = "-1";
      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.page.pageSize = val;
        this.fetchDecusdialogboxtemp("page");
      },

    },
    // mounted--钩子函数，一来到该页面即执行
    mounted: function () {
      this.fetchDecusdialogboxtemp();
    }
  };
</script>

<style lang="scss" scoped>
  .views-container {
    padding: 10px 70px 10px 10px;
  }

  .views-search {
    width: auto;
    padding: 6px 0;
    clear: both;
    margin-bottom: 10px;
  }

  .views-search span {
    padding: 0px 10px;
  }

  .views-search span /deep/ .el-input {
    width: 30%;
  }

  .views-search span /deep/ .el-select .el-input {
    width: 90%;
  }

  .pagesNum {
    margin-top: 15px;
    text-align: right;
  }
</style>
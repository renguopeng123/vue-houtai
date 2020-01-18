<template>
  <div class="views-container">
      <div class="views-search">
          <span> 名称：
            <el-input v-model="runName" placeholder="请输入需要检索的流水号名称"></el-input>
          </span>
          <span> 别名：
            <el-input v-model="anotherName" placeholder="请输入流水号别名"></el-input>
          </span>
          <el-button @click="fetchDeveSerialnumtemp()" type="primary">查询</el-button>
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
            :data="deveSerialData"
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
            <el-table-column align="center" label="别名">
              <template slot-scope="scope">
                  {{scope.row.alias}}
              </template>
            </el-table-column>
            <el-table-column align="center" label="规则">
              <template slot-scope="scope">
                  {{scope.row.regulation}}
              </template>
            </el-table-column>
            <el-table-column align="center" label="生成类型">
              <template slot-scope="scope">
                  <el-button v-if="scope.row.genType =='1'" type="text">每天生成</el-button>
                  <el-button v-if="scope.row.genType =='0'" type="text">递增</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" label="长度">
              <template slot-scope="scope">
                  {{scope.row.noLength}}
              </template>
            </el-table-column>
            <el-table-column label="管理" align="center" width="180">
              <template slot-scope="scope">
                  <el-button type="text" @click="editDeveserialnumDialog(scope.row)">编辑</el-button>
                  <el-button type="text" @click="privieDeveserialnumDialog(scope.row)">预览</el-button>
                  <el-button type="text" @click="delDeveserialnum(scope.row)">删除</el-button>
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
      <newdeveserialnum-dialog
          v-bind:visible.sync="dialog_show.newdeveserialnumDialog"
          @closed="closeDialog"
          :edit_data="to_edit_data"
          :title="add_OR_editor">
      </newdeveserialnum-dialog>

      <!--弹出框-预览-->
      <infodeveserialnum-dialog
        v-bind:visible.sync="dialog_show.infodeveserialnumDialog"
          @closed="closeDialog"
          :priview_data="to_info_data">
      </infodeveserialnum-dialog>
  </div>
</template>

<script>
import {
  getdeveSerialnumData,  //获取流水号列表数据
  getDeveservialfullInfoById,  //根据ID返回该行的完整信息
  // getDeveservialInfoByname,  //根据别名返回该行流水号预览结果
  delDeveservialById,  //根据ID删除该行流水号
} from "@/api/api.js";

import newdeveserialnumDialog from "./dialogs/new-deveserialnum-dialog"; // 新增流水号
import infodeveserialnumDialog from "./dialogs/info-deveserialnum-dialog"; // 流水号结果预览
export default {
  name: "deveSerialnum",
  components: {
    newdeveserialnumDialog,
    infodeveserialnumDialog
  },
  data() {
    return {
      runName: "",
      anotherName:"",
      deveSerialData:[],
      to_edit_data:{},
      to_info_data:[],
      add_OR_editor: "",
      dialog_show: {
        newdeveserialnumDialog: false,
        infodeveserialnumDialog: false
      },

      page: {
        currentPage: 1,
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
      this.$refs.multipleTable.toggleRowSelection(row);
      
    },

    //根据输入的数据源名称查询列表
    referDeveSerialnumtemp(searchitem) {
      this.runName = searchitem;
      this.anotherName = searchitem;
      this.fetchDeveSerialnumtemp();
      console.log("runName",this.runName);
    },


    /*查询流水号列表信息*/
    fetchDeveSerialnumtemp(pageFlag){
      /* 初始化当前页 */
      let currPageBefore = this.page.currentPage;
      /* 判断是否是分页  如果当前页是第二页  查询的时候从第一页开始 */
      if(pageFlag!=='page'){
        this.page.currentPage = 1;
      }
      let param = {
        name: this.runName,
        alias: this.anotherName,
        pageNo: this.page.currentPage,
        pageSize: this.page.pageSize
      };
      getdeveSerialnumData(param)
        .then(response => {
          this.deveSerialData = response.rows;
          this.page.total = parseInt(response.total);
        })
        .catch(error => {
          console.error(error);
        });
        this.page.currentPage = 1;
    },
    /*重置*/
    resetRUNtemp(){
      this.runName ="";
      this.anotherName ="";
      this.page.currentPage=1;
      this.fetchDeveSerialnumtemp();

    },
    /*新增流水号*/
    addDeveserialnumDialog(){
      this.add_OR_editor = "新增";
      this.dialog_show.newdeveserialnumDialog = true;
    },

    /*编辑流水号*/
    editDeveserialnumDialog(row) {
      this.add_OR_editor = "编辑";
      let param = {
        id: row.id
      };
      getDeveservialfullInfoById(param)
        .then(response => {
          this.to_edit_data = response.data;
          this.dialog_show.newdeveserialnumDialog = true;
          this.$refs.multipleTable.clearSelection();
      })
    },

    /*预览流水号*/
    privieDeveserialnumDialog(row) {
      this.dialog_show.infodeveserialnumDialog = true;
      let param = {
        // id: row.id,
        alias: row.alias
      };
      getDeveservialInfoByname(param)
        .then(response => {
          this.to_info_data = response.data;
          this.dialog_show.infodeveserialnumDialog = true;
          this.$refs.multipleTable.clearSelection();
          console.log("aaa",response);
      })
    },

    fn_opendiaolog(data) {
      
    },

    delDeveserialnum(row) {
      this.$confirm('确定要删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
      let param = {
        id: row.id
      };
      delDeveservialById(param)
        .then(response => {
          if (response.isOk === true) {
            this.$message({
              type: 'success',
              message: '删除流水号成功!'
            });
            this.fetchDeveSerialnumtemp();
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
      this.fetchDeveSerialnumtemp();
    },

    //分页
    handleCurrentChange(val) {
      // console.log(`当前页1: ${val}`);
      this.temp = val;
      this.fetchDeveSerialnumtemp("page");
      // this.currentDBRow = "-1";
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.page.pageSize = val;
      this.fetchDeveSerialnumtemp("page");
    },

  },
  // mounted--钩子函数，一来到该页面即执行
  mounted: function() {
    this.fetchDeveSerialnumtemp();
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
.pagesNum {
  margin-top: 15px;
  text-align: right;
}
</style>
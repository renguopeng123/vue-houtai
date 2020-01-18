<template>
  <div class="views-container">
      <div class="views-search">
          <span> 标题：
            <el-input v-model="title" placeholder="请输入标题"></el-input>
          </span>
          <el-button @click="fetchData()" type="primary">查询</el-button>
          <el-button @click="reset()">重置</el-button>
      </div>
      <div class="views-content">
          <h2>
              <el-button @click="toAdd()">新增</el-button>
              <el-button @click="layout_dialog_visible=true">设置默认工作台布局</el-button>
          </h2>
          <el-table
            :data="scriptlistData"
            ref="multipleTable"
            @selection-change="handleSelectionChange"
            @row-click="fn_rowClick"
            style="width: 100%"
            border>
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column align="center" label="标题" prop="title">
            </el-table-column>
            <el-table-column align="center" label="数据类型" width="100" :formatter="formatDataType">
            </el-table-column>
            <el-table-column align="center" label="数据来源" prop="dataSource">
            </el-table-column>
            <el-table-column align="center" label="自动刷新" width="100">
              <template slot-scope="scope">
                  <span v-if="!scope.row.refresh">否</span>
                  <span v-else>{{scope.row.refresh}} 秒</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="宽" width="80">
              <template slot-scope="scope">
                  {{scope.row.width}}/24
              </template>
            </el-table-column>
            <el-table-column align="center" label="创建时间" width="220" prop="createTime">
            </el-table-column>
            <el-table-column label="管理" align="center" width="200">
              <template slot-scope="scope">
                  <el-button type="text" @click="toEdit(scope.row)">编辑</el-button>
                  <el-button type="text"  @click="del(scope.row)">删除</el-button>
                  <!--<el-button type="text">授权</el-button>-->
              </template>
            </el-table-column>
          </el-table>
      </div>
      <div class="pagesNum">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          @prev-click="handleCurrentChange"
          @next-click="handleCurrentChange"
          :current-page.sync="page.currentPage"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total">
        </el-pagination>
      </div>

      <!--弹出框-新增编辑-->
      <add-dialog
          v-bind:visible.sync="add_dialog_visible"
          v-if="add_dialog_visible"
          @closed="closeDialog"
          :edit_data="to_edit_data"
          :title="add_OR_editor">
      </add-dialog>
      <layout-dialog v-if="layout_dialog_visible" :visible.sync="layout_dialog_visible"></layout-dialog>

  </div>
</template>

<script>
import {
  getSysBenchManageListData,  //获取列表数据
   getWorkbenchById,
   delWorkbenchById,
} from "@/api/sysBenchManage/api_sysBenchManage.js";

import AddDialog from "./dialogs/add-dialog"; // 新增编辑
import  "./make/index";
import LayoutDialog from "./dialogs/layout-dialog"; //布局

export default {
  name: "WorkbenchIndex",
  components: {
    AddDialog,LayoutDialog
  },
  data() {
    return {
      title:"",
      scriptlistData:[],
      to_edit_data:{},
      add_OR_editor: "",
      add_dialog_visible:false,
      layout_dialog_visible:false,
      temp: 1,
      page: {
        currentPage: 1,
        pageSizes: [10, 25, 50, 100],
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
      this.$refs.multipleTable.toggleRowSelection(row);
    },

    /*查询列表信息*/
    fetchData(pageFlag){
      /* 初始化当前页 */
      let currPageBefore = this.page.currentPage;
      /* 判断是否是分页  如果当前页是第二页  查询的时候从第一页开始 */
      if(pageFlag!=='page'){
        this.page.currentPage = 1;
      }
      let param = {
        pageNo: (this.temp-1)*this.page.pageSize,
        pageSize: this.page.pageSize,
        name: this.title,
      };
      getSysBenchManageListData(param)
        .then(res => {
          if(res.success){
            this.scriptlistData = res.data.records;
            this.page.total = parseInt(res.data.total);
          }else{
            this.$message.error(res.message)
          }

        })
        .catch(error => {
          console.error(error);
          this.page.currentPage =currPageBefore;
        });
    },
    /*重置*/
    reset(){
      this.title ="";
      this.page.currentPage=1;
      this.fetchData();

    },
    /*新增*/
    toAdd(){
      this.add_OR_editor = "新增";
      this.add_dialog_visible = true;
    },

    /*编辑*/
    toEdit({id}) {
      this.add_OR_editor = "编辑";
      getWorkbenchById({id})
        .then(response => {
          if(response.success){
            this.to_edit_data = response.data;
            this.add_dialog_visible = true;
            this.$refs.multipleTable.clearSelection();
          }else{
            this.$message.error(response.message)
          }

      }).catch(error=>{
        console.error(error)
      })
    },

    /*删除*/
    del({id}) {
      this.$confirm('确定要删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
        delWorkbenchById({id})
        .then(response => {
          if (response.success === true) {
            this.$message.success("删除成功")
            this.fetchData();
          } else {
            this.$message.error(response.message);
          }
        })
        .catch(error => {
          console.error(error);
        });
        }).catch(() => {

        });
    },

    /*关闭弹窗操作*/
    closeDialog(){
      this.add_dialog_visible=false;
      this.fetchData();
    },

    //分页
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.temp = val;
      this.fetchData("page");
      // alert('现在是第'+val+'页');
      // this.currentDBRow = "-1";
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.page.pageSize = val;
      this.fetchData("page");
      // alert('现在是每页'+val+'条');
    },
    formatDataType(val){
      if(val.dataType==='component'){
        return '组件'
      }else if(val.dataType==='interface'){
        return '接口'
      }

      return val.dataType;
    }

  },
  // mounted--钩子函数，一来到该页面即执行
  mounted: function() {
    this.fetchData();
  }
};
</script>

<style lang="scss" scoped>
.views-container {
  padding: 10px;
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
.views-content{
  height: 96%;
}
.pagesNum {
  height: 50px;
  margin-top: 15px;
  text-align: right;
}
</style>
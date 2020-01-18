<template>
  <div class="views-container">
      <div class="views-search">
          <span> 请求地址：
            <el-input v-model="runUrl" placeholder="请输入地址"></el-input>
          </span>
          <span> 状态：
            <el-select v-model="abnormalstate" placeholder="请选择">
              <el-option
                v-for="item in abnormalstates"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </span>
          <span> 内容：
            <el-input v-model="runContent" placeholder="请输入内容"></el-input>
          </span>
          <el-button @click="fetchDescriptemp()" type="primary">查询</el-button>
          <el-button @click="resetRUNtemp()">重置</el-button>
      </div>
      <div class="views-content">
          <h2>
              <div>
                  <a href="#"></a>
              </div>
          </h2>
          <el-table
            :data="scriptlistData"
            ref="multipleTable"
            @selection-change="handleSelectionChange"
            @row-click="fn_rowClick"
            style="width: 100%"
            border>
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column align="center" label="登录账号" width="120">
              <template slot-scope="scope">
                  {{scope.row.account}}
              </template>
            </el-table-column>
            <el-table-column align="center" label="访问IP" width="180">
              <template slot-scope="scope">
                  {{scope.row.ip}}
              </template>
            </el-table-column>
            <el-table-column align="center" label="IP地址" width="150">
              <template slot-scope="scope">
                  {{scope.row.ipAddress}}
              </template>
            </el-table-column>
            <el-table-column align="center" label="状态" width="150">
              <template slot-scope="scope">
                  <el-button v-if="scope.row.status == 'unchecked'" type="text">未检查</el-button>
                  <el-button v-if="scope.row.status == 'checked'" type="text">已检查</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" label="请求地址">
              <template slot-scope="scope">
                  {{scope.row.url}}
              </template>
            </el-table-column>
            <el-table-column align="center" label="异常描述">
              <template slot-scope="scope">
                  {{scope.row.content}}
              </template>
            </el-table-column>
            <el-table-column align="center" label="创建日期" width="220">
              <template slot-scope="scope">
                  {{scope.row.createTime}}
              </template>
            </el-table-column>
            <el-table-column label="管理" align="center" width="100">
              <template slot-scope="scope">
                  <el-button type="text" @click="editScriptDialog(scope.row)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
      </div>
      <div class="pagesNum">
        <!-- <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          @prev-click="handleCurrentChange"
          @next-click="handleCurrentChange"
          :current-page.sync="page.currentPage"
          :page-size="page.pageSize"
          layout="total, prev, pager, next"
          :total="page.total">
        </el-pagination> -->
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
      <newclomscript-dialog
          v-bind:visible.sync="dialog_show.newclomscriptDialog"
          @closed="closeDialog"
          :edit_data="to_edit_data"
          :title="add_OR_editor">
      </newclomscript-dialog>

  </div>
</template>

<script>
import {
  getdeabnormalLogData,  //获取异常日志列表数据
  // getDescriptfullInfoById,  //根据ID返回该脚本的完整信息
  // delDescriptById,  //根据ID删除该行信息
} from "@/api/api.js";

import newclomscriptDialog from "./dialogs/new-clomscript-dialog"; // 新增流脚本
import { param } from '../../utils';
export default {
  name: "commonscript",
  components: {
    newclomscriptDialog,
  },
  data() {
    return {
      runUrl: "",
      runContent:"",
      abnormalstate:"",
      abnormalstates:[{
        value: '选项1',
        label: '未检查'
      }, {
        value: '选项2',
        label: '已检查'
      }, {
        value: '选项3',
        label: '已解决'
      }],
      scriptlistData:[],
      to_edit_data:{},
      add_OR_editor: "",
      dialog_show: {
        newclomscriptDialog: false,
      },
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
    fetchDescriptemp(pageFlag){
      /* 初始化当前页 */
      let currPageBefore = this.page.currentPage;
      /* 判断是否是分页  如果当前页是第二页  查询的时候从第一页开始 */
      if(pageFlag!=='page'){
        this.page.currentPage = 1;
      }
      let param = {
        offset: (this.temp-1)*this.page.pageSize,
        limit: this.page.pageSize,
        url: this.runUrl,
        status: this.abnormalstate,
        content: this.runContent
      };
      getdeabnormalLogData(param)
        .then(response => {
          this.scriptlistData = response.rows;
          this.page.total = parseInt(response.total);
        })
        .catch(error => {
          console.error(error);
          this.page.currentPage =currPageBefore;
        });
    },
    /*重置*/
    resetRUNtemp(){
      this.runUrl ="";
      this.sortScript ="";
      this.page.currentPage=1;
      this.fetchDescriptemp();

    },
    /*新增*/
    addDeveserialnumDialog(){
      this.add_OR_editor = "新增";
      this.dialog_show.newclomscriptDialog = true;
    },

    /*编辑*/
    editScriptDialog(row) {
      this.add_OR_editor = "编辑";
      let param = {
        id: row.id
      };
      getDescriptfullInfoById(param)
        .then(response => {
          this.to_edit_data = response.data;
          this.dialog_show.newclomscriptDialog = true;
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
            this.fetchDescriptemp();
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
      this.fetchDescriptemp();
    },

    //分页
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.temp = val;
      this.fetchDescriptemp("page");
      // alert('现在是第'+val+'页');
      // this.currentDBRow = "-1";
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.page.pageSize = val;
      this.fetchDescriptemp("page");
      // alert('现在是每页'+val+'条');
    },

  },
  // mounted--钩子函数，一来到该页面即执行
  mounted: function() {
    this.fetchDescriptemp();
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
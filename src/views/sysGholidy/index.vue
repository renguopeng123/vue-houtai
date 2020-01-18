<template>
  <div class="views-container">
      <div class="views-search">
          <span> 系统
          <el-select v-model="fechsystem" placeholder="请选择">
            <el-option
              v-for="item in fechsystems"
              @change="fetchDataHoliday()"
              :key="item.value"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
          </span>
          <span>
             年份 <el-date-picker v-model="fechyear" type="year" placeholder="选择年"></el-date-picker>
          </span>
          <el-button @click="fetchDataHoliday()" type="primary">查询</el-button>
          <el-button @click="resetHoliday()">重置</el-button>
      </div>
      <div>
          <h2>
              <el-button @click="addHolidayDialog()">新增</el-button>
              <el-button @click="testInterfaceDialog()">接口测试</el-button>
              <div>
                  <a href="#"></a>
              </div>
          </h2>
          <el-table
            :data="NaholidayData"
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
            <el-table-column align="center" label="系统" width="180">
              <template slot-scope="scope">
                  <el-button v-if="scope.row.system === 'public'" type="text">共有</el-button>
                  <el-button v-if="scope.row.system === 'agilebpm'" type="text">AgileBPM</el-button>
                  <!-- <el-button v-if="scope.row.system === 'AgileBPM'" type="primary">AgileBPM</el-button> -->
              </template>
            </el-table-column>
            <el-table-column align="center" label="年份" width="180">
              <template slot-scope="scope">
                  {{scope.row.year}}
              </template>
            </el-table-column>
            <el-table-column align="center" label="开始日期">
              <template slot-scope="scope">
                  {{scope.row.startDay}}
              </template>
            </el-table-column>
            <el-table-column align="center" label="结束日期">
              <template slot-scope="scope">
                  {{scope.row.endDay}}
              </template>
            </el-table-column>
            <el-table-column align="center" label="分类">
              <template slot-scope="scope">
                  <el-button v-if="scope.row.type === 'LW'" type="text">法定工作日</el-button>
                  <el-button v-if="scope.row.type === 'LR'" type="text">法定节假日</el-button>
                  <el-button v-if="scope.row.type === 'CW'" type="text">公司工作日</el-button>
                  <el-button v-if="scope.row.type === 'CR'" type="text">公司节假日</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" label="描述">
              <template slot-scope="scope">
                  {{scope.row.remark}}
              </template>
            </el-table-column>
            <el-table-column label="管理" align="center" width="120">
              <template slot-scope="scope">
                  <el-button type="text" @click="editHolidayDialog(scope.row)">编辑</el-button>
                  <el-button type="text" @click="delHoliday(scope.row)">删除</el-button>
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
      <newHoliday-dialog
        v-bind:visible.sync="dialog_show.newHolidayDialog"
        @open-otherdialogs="fn_opendiaolog"
        @closed="closeDialog"
        :edit_data="to_edit_data"
        :title="add_OR_editor">
      </newHoliday-dialog>
  </div>
</template>

<script>
import {
  getHolidayData,  //获取节日列表数据
  getHolidayfullInfoById,  //根据ID返回该行节日的完整信息
  calendarHolidayInitwork, //初始化日历表
  removeHoliday,  //删除日历列表数据
} from "@/api/api.js";

import newHolidayDialog from "./dialogs/new-holiday-dialog"; // 新增节假日
export default {
  name: "dept",
  components: {
    newHolidayDialog
  },
  data() {
    return {
      fechsystems: [{
        value: '选项1',
        label: '共有'
      }, {
        value: '选项2',
        label: 'AgileBPM'
      }],
      fechsystem: "",
      fechyear: "",
      NaholidayData:[],
      to_edit_data:{},
      add_OR_editor: "",
      dialog_show: {
        newHolidayDialog: false
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
    fetchDataHoliday(){
      let param = {
        // pageNo: this.page.currentPage, new
        // pageSize: this.page.pageSize, new
        offset: this.page.currentPage,
        limit: this.page.pageSize,
        system:this.fechsystem,
        year: this.fechyear
      };
      getHolidayData(param)
        .then(response => {
          //console.log(response);
          this.NaholidayData = response.rows;
          this.page.total = parseInt(response.total);
        })
        .catch(error => {
          console.error(error);
        });
    },

    /*初始化日历表*/
    calendarHoliday(){
      let param = {
        year: this.fechyear
      };
      calendarHolidayInitwork(param)
        .then(response => {
          this.page.total = parseInt(response.pageSize);
        })
        .catch(error => {
          console.error(error);
        });
    },

    /*重置*/
    resetHoliday(){
      this.fechsystem ="";
      this.page.currentPage=1;
      this.fetchDataHoliday();

    },
    /*新增*/
    addHolidayDialog() {
      this.add_OR_editor = "新增";
      this.dialog_show.newHolidayDialog = true;
    },

    /*编辑日历表*/
    editHolidayDialog(row) {
      this.add_OR_editor = "编辑";
      let param = {
        id: row.id
      };
      getHolidayfullInfoById(param)
        .then(response => {
          this.to_edit_data = response.data;
          this.dialog_show.newHolidayDialog = true;
          this.$refs.multipleTable.clearSelection();
      })
    },

    // 删除日历表
    // delHoliday(row){
    //   let param = {
    //     id: row.id
    //   };
    //   removeHoliday(param)
    //     .then(response => {
    //       this.$message({
    //         message: response.msg,
    //         success: "success"
    //       });
    //     this.fetchDataHoliday();
    //   })
    // },

    delHoliday(row) {
      this.$confirm('确定要删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
      let param = {
        id: row.id
      };
      removeHoliday(param)
        .then(response => {
          if (response.isOk === true) {
            this.$message({
              type: 'success',
              message: response.msg
            });
          } else {
            this.$message.error("删除失败");
          }
          this.fetchDataHoliday();
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
      this.fetchDataHoliday();
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
    this.fetchDataHoliday();
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
  padding: 0px 20px;
}
.pagesNum {
  margin-top: 15px;
  text-align: right;
}
</style>
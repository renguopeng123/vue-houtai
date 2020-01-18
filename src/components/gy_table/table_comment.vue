<template>
  <div class="table_comment">
    <!-- 表格 -->
    <div class="main">
      <div class="main_top">
        <div class="top_left">
          <slot name="top_left"></slot>
        </div>
        <div class="button_user">
          <i class="select_help_btn list-table" @click="select_help=!select_help"></i>
          <!-- <el-button size="small" type="primary" icon="el-icon-s-grid" @click="select_help=!select_help"></el-button> -->
        </div>
        <div class="top_button_left">
          <slot name="top_button_left"></slot>
        </div>
        <div class="select_help" v-if="select_help">
          <p @click="select_help=false">收藏</p>
          <p @click="fn_openDialog">显示列</p>
          <p @click="select_help=false">帮助</p>
        </div>
        <div style="clear:both"></div>
      </div>
      <div class="main_table">
        <el-table
          :data="table.data"
          style="width: 100%"
          class="user_table"
          @selection-change="handleSelectionChange"
          :key="table_key"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            v-for="(item, index) in table.header"
            :key="index"
            :prop="item.key"
            :label="item.label"
            :width="item.width"
            :min-width="item.minWidth"
            :sortable='item.sortable?item.sortable:false'
            show-overflow-tooltip
          >
            <!-- v-if="table.table_if.indexOf(item.key) > -1" -->
            <template slot-scope="scope">
              <slot :name="item.key" :row="scope.row">{{scope.row[item.key]}}</slot>
            </template>
          </el-table-column>

      <!-- //增加的按钮 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
      
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="table.page.currentPage"
          :page-sizes="table.page.pageSizes"
          :page-size="table.page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="table.page.total"
        ></el-pagination>
      </div>
    </div>

    <el-dialog
      :title="dialog_tableIf.title"
      :visible.sync="dialog_tableIf.dialogVisible"
      :before-close="fn_closeDialog"
      append-to-body
    >
      <el-transfer
        v-model="table.table_if"
        :data="table.header"
        :key="transfer_key"
        :titles="['待显', '已选']"
        @change="transfer_key++"
      >
        <span slot-scope="{ option }">{{ option.label }}</span>
      </el-transfer>

      <span slot="footer" class="dialog-footer">
        <!-- <el-button type="primary" @click="fn_closeDialog">确 定</el-button> -->
        <el-button @click="fn_closeDialog">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "aaa",
  props: {
    table_getdata: {
      type: Object,
      default: {
        // 表格数据
        data: [
          // {
          //   name: "张三",
          //   sex: "男",
          //   age: "27",
          //   phone: "11111111111",
          //   date: "2016-05-02",
          //   address: "上海市普陀区金沙江路 1518 弄"
          // }
        ],
        multipleSelection: [],
        // 列的属性操作
        header: [
          // {
          //   key: "name", //列的属性
          //   label: "姓名", //列的表头名字
          //   width: "", //列的宽度
          //   minWidth: "100", //列的最小宽度
          //   disabled: true, //列是否能控制显示隐藏
          //   sortable:true,//列是否排序
          // },
          // {
          //   key: "sex",
          //   label: "性别",
          //   width: "",
          //   minWidth: "100",
          //   disabled: false
          // },
          // {
          //   key: "age",
          //   label: "年龄",
          //   width: "",
          //   minWidth: "100",
          //   disabled: false
          // },
          // {
          //   key: "phone",
          //   label: "电话",
          //   width: "",
          //   minWidth: "100",
          //   disabled: false
          // },
          // {
          //   key: "date",
          //   label: "入职日期",
          //   width: "",
          //   minWidth: "200",
          //   disabled: false
          // },
          // {
          //   key: "address",
          //   label: "居住地址",
          //   width: "",
          //   minWidth: "200",
          //   disabled: true
          // },
          // {
          //   key: "doed",
          //   label: "操作",
          //   width: "",
          //   minWidth: "200",
          //   disabled: true
          // }
        ],
        // 默认显示的列
        table_if: [
          // "name",
          // "sex",
          // "age",
          // "phone",
          // "date",
          // "address",
          // "doed"
          ],
        // 表格下面页码控制
        page: {
          currentPage: 1,
          pageSizes: [100, 200, 300, 400],
          pageSize: 100,
          total: 400
        }
      }
    }
  },
  data() {
    return {
      table_key: 0,
      transfer_key: 0,
      select_help: false,

      dialog_tableIf: {
        dialogVisible: false,
        title: "列表显示列控制"
      }
    };
  },
  watch: {
    data: {
      //深度监听，可监听到对象、数组的变化
      handler(val) {
        this.fn_getdata();
      },
      deep: true
    }
  },
  computed: {
    table: {
      // getter
      get: function() {
        return JSON.parse(JSON.stringify(this.table_getdata));
      },
      // setter
      set: function(newValue) {
        this.table_key++;
        this.$emit("update:table_getdata", newValue);
      }
    }
  },
  mounted() {
    this.fn_getdata();
  },
  methods: {
    // 对数组数据进行处理
    fn_getdata() {},

    //表格选中复选框触发
    handleSelectionChange(val) {
      this.table.multipleSelection = val;
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.table.page.pageSize = val;
      this.table.page.currentPage = 1;
      this.$emit("handleSizeChange", this.table.page.pageSize);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.$emit("handleCurrentChange", this.table.page.currentPage);
    },
    fn_openDialog() {
      this.select_help = false;
      this.dialog_tableIf.dialogVisible = true;
    },
    fn_closeDialog() {
      this.dialog_tableIf.dialogVisible = false;
    },
    sortByDate(obj1, obj2) {
      let val1 = obj1.deadline
      let val2 = obj2.deadline
      return val1 - val2
    }
  }
};
</script>

<style lang="scss" scoped>
@import url(../../assets/font/table/style.css);
// .views-container {
//   padding: 10px;
//   overflow: hidden;
//   height: 100%;
// }
/deep/ .el-transfer-panel__item.el-checkbox {
  width: 100%;
  box-sizing: border-box;
  margin-right: 0;
}
.main {
  margin: 0 20px 0;
  .main_top {
    height: 32px;
    position: relative;
    .top_left {
      float: left;
    }
    .top_button_left {
      float: right;
    }
    .button_user {
      float: right;
      height: 100%;
      // line-height: 32px;
      margin-left: 10px;
      .select_help_btn {
        width: 32px;
        height: 100%;
        display: inline-block;
        cursor: pointer;
        font-size: 32px;
        // margin-bottom: -2px;

        // background: url(/static/img/菜单-其他.svg) center center no-repeat;
        // background-size: auto 22px;
      }
    }
    .select_help {
      position: absolute;
      // top: 32px;
      // right: 0;
      top: 100%;
      margin-top: -3px;
      right: 3px;
      border: 1px solid #dfe6ec;
      border-radius: 4px;
      width: 100px;
      // height: 400px;
      z-index: 2;
      background-color: #fff;
      p {
        height: 40px;
        line-height: 40px;
        margin: 0;
        padding-left: 10px;
        cursor: pointer;
      }
      p:hover {
        background-color: #f5f7fa;
        color: #2e87c1;
      }
      p + p {
        border-top: 1px solid #dfe6ec;
      }
    }
  }
  .main_table {
    margin-top: 10px;
    .user_table {
      border: 1px solid #dfe6ec;
      border-bottom: 0;
    }
    /deep/ .el-pagination {
      text-align: right;
      margin: 10px 0;
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
  // max-width: 70%;
  width: 650px;
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
  }
  > .el-dialog__footer {
    padding: 10px 20px 10px;
    border-top: 1px solid #dcdfe6 !important;
  }
}
.el-transfer {
  margin: 40px auto;
  width: 500px;
}
</style>